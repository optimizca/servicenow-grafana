package plugin

import (
	"context"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"sync"
	"time"

	"github.com/grafana/grafana-plugin-sdk-go/backend"
	// "github.com/grafana/grafana-plugin-sdk-go/backend/datasource"
	"github.com/grafana/grafana-plugin-sdk-go/backend/instancemgmt"
	"github.com/grafana/grafana-plugin-sdk-go/backend/resource/httpadapter"
	"github.com/grafana/grafana-plugin-sdk-go/data"
	"github.com/optimizca/servicenow-grafana/pkg/client"
	"github.com/optimizca/servicenow-grafana/pkg/models"
	"github.com/optimizca/servicenow-grafana/pkg/services"
	"github.com/optimizca/servicenow-grafana/pkg/snowmanager"
	"github.com/optimizca/servicenow-grafana/pkg/utils"
)

// Datasource is the main data source instance that handles Grafana queries
type Datasource struct {
	Connection          *snowmanager.SNOWManager
	Annotations         map[string]interface{}
	InstanceName        string
	GlobalImage         string
	APIPath             string
	TemplateSrv         *services.TemplateService
	PluginQuery         *models.PluginQuery
	AuthHeader          string
	CallResourceHandler backend.CallResourceHandler
}

// Ensure Datasource implements required Grafana interfaces
var (
	_ backend.QueryDataHandler      = (*Datasource)(nil)
	_ backend.CheckHealthHandler    = (*Datasource)(nil)
	_ instancemgmt.InstanceDisposer = (*Datasource)(nil)
	_ backend.CallResourceHandler   = (*Datasource)(nil)
)

// // ConnectionOptions holds the settings for establishing a connection to a data source.
// type ConnectionOptions struct {
// 	Type            string
// 	URL             string
// 	Name            string
// 	BasicAuth       bool
// 	WithCredentials bool
// 	APIPath         string
// 	CacheTimeout    string
// }

func NewDatasource(ctx context.Context, instanceSettings backend.DataSourceInstanceSettings) (*Datasource, error) {
	// Load PluginSettings
	settings, err := models.LoadPluginSettings(instanceSettings)
	if err != nil {
		return nil, fmt.Errorf("failed to load plugin settings: %w", err)
	}

	// Set up basic auth and API key authentication headers
	var authHeader string
	if instanceSettings.BasicAuthEnabled {
		// Basic Auth enabled, use the provided username and password
		password, exists := instanceSettings.DecryptedSecureJSONData["basicAuthPassword"]
		if !exists {
			return nil, fmt.Errorf("basic auth password not found in instance settings")
		}
		authHeader = "Basic " + base64.StdEncoding.EncodeToString([]byte(
			strings.TrimSpace(instanceSettings.BasicAuthUser)+":"+strings.TrimSpace(password)))
	}

	// Connection Options mapped from instance settings
	connectionOptions := snowmanager.SnowManagerOptions{
		WithCredentials: instanceSettings.BasicAuthEnabled,
		URL:             instanceSettings.URL,
		APIPath:         settings.APIPath,
		CacheTimeout:    time.Duration(settings.CacheTimeout) * time.Second,
		AuthHeader:      authHeader,
	}

	snowConnection := snowmanager.NewSNOWManager(connectionOptions)
	templateSrv := services.NewTemplateService()

	// Initialize Annotations map
	annotations := make(map[string]interface{})

	return &Datasource{
		Connection:          snowConnection,
		GlobalImage:         settings.ImageURL,
		InstanceName:        settings.InstanceName,
		APIPath:             settings.APIPath,
		TemplateSrv:         templateSrv,
		Annotations:         annotations,
		AuthHeader:          authHeader,
		CallResourceHandler: newResourceHandler(snowConnection),
	}, nil
}

// Handler function to handle the requests from frontend for queries- custom resource requests (e.g., /node-graph)
func (d *Datasource) CallResource(ctx context.Context, req *backend.CallResourceRequest, sender backend.CallResourceResponseSender) error {
	return d.CallResourceHandler.CallResource(ctx, req, sender)
}

func newResourceHandler(connection *snowmanager.SNOWManager) backend.CallResourceHandler {
	mux := http.NewServeMux()
	mux.HandleFunc("/metricAnomalyOptions", connection.GetMetricAnomalyOptions)
	mux.HandleFunc("/alertTypeOptions", connection.GetAlertTypeOptions)
	mux.HandleFunc("/alertStateOptions", connection.GetAlertTypeOptions)
	mux.HandleFunc("/trendByOptions", connection.GetTrendByOptions)
	mux.HandleFunc("/aggregateTypeOptions", connection.GetAggregateTypeOptions)
	mux.HandleFunc("/operatorOptions", connection.GetOperatorOptions)
	// mux.HandleFunc("/sysparmTypeOptions", connection.GetSysparmTypeOptions)
	mux.HandleFunc("/serviceOptions", connection.LoadServiceOptions)
	mux.HandleFunc("/CIOptions", connection.LoadCIOptions)
	mux.HandleFunc("/metricOptions", connection.LoadMetricOptions)
	mux.HandleFunc("/resourceOptions", connection.LoadResourceOptions)
	// mux.HandleFunc("/dataTimePresentChoices", connection.GetDateTimePresetChoices)
	mux.HandleFunc("/columnChoices", connection.LoadColumnChoices)
	mux.HandleFunc("/tableColumnOptions", connection.GetTableColumnOptions)
	mux.HandleFunc("/tableOptions", connection.LoadTableOptions)
	mux.HandleFunc("/relationshipTypeOptions", connection.GetRelationshipTypeOptions)
	mux.HandleFunc("/startingPointOptions", connection.LoadStartingPointOptions)
	mux.HandleFunc("/classOptions", connection.LoadClassOptions)
	return httpadapter.New(mux)
}


// Dispose cleans up resources when a datasource instance is disposed
func (d *Datasource) Dispose() {
	// Check if the SNOWManager connection is initialized
	if d.Connection != nil {
		err := d.Connection.Close()
		if err != nil {
			fmt.Printf("Error closing SNOWManager connection: %v\n", err)
		} else {
			fmt.Println("SNOWManager connection successfully closed.")
		}
	}

	// Clear allocated data structs
	d.Annotations = nil
	d.TemplateSrv = nil

	fmt.Println("Datasource disposed and resources cleaned up.")
}

// basicSysparmBackwardsCompatFix corrects the format of legacy basic_sysparam items to match []*BasicSysparamItem.
func (d *Datasource) basicSysparmBackwardsCompatFix(basicSysparam []*models.SysParamColumnObject) []*models.BasicSysparamItem {
	defaultSeparator := &models.LabelValuePair{Label: "AND", Value: "^"}
	var newBasicSysparam []*models.BasicSysparamItem

	// Iterate each SysParamColumnObject and map it to *BasicSysparamItem
	for _, row := range basicSysparam {
		if row == nil {
			continue
		}
		newItem := &models.BasicSysparamItem{
			One:   safeLabelValuePairPtr(row.Column),
			Two:   safeLabelValuePairPtr(row.Operator),
			Three: safeLabelValuePairPtr(row.Value),
			Four:  parseSeparatorPtr(row.Separator, defaultSeparator),
		}
		newBasicSysparam = append(newBasicSysparam, newItem)
	}
	return newBasicSysparam
}

// safeLabelValuePairPtr converts a LabelValuePair to a pointer, or provides a pointer to an empty LabelValuePair if nil.
func safeLabelValuePairPtr(value *models.LabelValuePair) *models.LabelValuePair {
	if value != nil && value.Label != "" && value.Value != nil {
		return value
	}
	return &models.LabelValuePair{}
}

// parseSeparatorPtr retrieves a pointer to a separator LabelValuePair, using the default if none is provided.
func parseSeparatorPtr(separator *models.LabelValuePair, defaultSeparator *models.LabelValuePair) *models.LabelValuePair {
	if separator != nil && separator.Label != "" && separator.Value != nil {
		return separator
	}
	return defaultSeparator
}

// MetricFindQuery processes template variable queries for the Grafana frontend
func (d *Datasource) MetricFindQuery(query models.CustomVariableQuery, scopedVars map[string]string) ([]client.Option, error) {
	asterisk := query.ShowAsterisk
	showNull := query.ShowNull

	switch query.Namespace {
	case "global_image":
		// Return global image as label-value pair
		return []client.Option{{Label: d.GlobalImage, Value: d.GlobalImage}}, nil

	case "global_instance_name":
		// Return global instance name as label-value pair
		return []client.Option{{Label: d.InstanceName, Value: d.InstanceName}}, nil

	case "group_by":
		if query.RawQuery != "" {
			values := strings.Split(query.RawQuery, "||")
			tableName := d.TemplateSrv.Replace(values[0], scopedVars, "csv")
			nameColumn := d.TemplateSrv.Replace(values[1], scopedVars, "csv")
			sysparam := d.TemplateSrv.Replace(values[2], scopedVars, "csv")
			return d.Connection.GetGroupByVariable(tableName, nameColumn, sysparam, asterisk, showNull)
		}
		return nil, nil

	case "generic":
		if query.RawQuery != "" {
			values := strings.Split(query.RawQuery, "||")
			tableName := d.TemplateSrv.Replace(values[0], scopedVars, "csv")
			nameColumn := d.TemplateSrv.Replace(values[1], scopedVars, "csv")
			idColumn := d.TemplateSrv.Replace(values[2], scopedVars, "csv")
			sysparam := d.TemplateSrv.Replace(values[3], scopedVars, "csv")
			limit := d.TemplateSrv.Replace(values[4], scopedVars, "csv")

			parsedSysParam := d.Connection.SingleSysParamQuery(sysparam)
			sysparam = d.Connection.ParseBasicSysparm(parsedSysParam, scopedVars)

			return d.Connection.GetGenericVariable(tableName, nameColumn, idColumn, sysparam, limit, asterisk, showNull)
		}
		return nil, nil

	case "metric_names", "golden_metric_names", "custom_kpis":
		replacedValue := d.TemplateSrv.Replace(query.RawQuery, scopedVars, "csv")
		cis := strings.Join(strings.Split(replacedValue, ","), "|")
		metricCategory := ""
		if query.Namespace == "golden_metric_names" {
			metricCategory = "GOLDEN"
		} else if query.Namespace == "custom_kpis" {
			metricCategory = "CUSTOM_KPIS"
		}
		return d.Connection.GetMetricNamesInCIs(metricCategory, cis, asterisk, showNull)

	case "nested_cis":
		return d.handleNestedQuery(query, scopedVars, "nested_cis")

	case "nested_classes":
		return d.handleNestedQuery(query, scopedVars, "nested_classes")

	case "v2_nested_cis", "v2_nested_classes":
		return d.handleV2NestedQuery(query, scopedVars)

	default:
		return nil, fmt.Errorf("unsupported namespace: %s", query.Namespace)
	}
}

// handleNestedQuery process nested variable queries
func (d *Datasource) handleNestedQuery(query models.CustomVariableQuery, scopedVars map[string]string, queryType string) ([]client.Option, error) {
	values := strings.Split(query.RawQuery, "||")
	for i, value := range values {
		values[i] = d.TemplateSrv.Replace(value, scopedVars, "csv")
	}

	sysparam := d.TemplateSrv.Replace(values[3], scopedVars, "csv")
	parsedSysParam := d.Connection.SingleSysParamQuery(sysparam)
	sysparam = d.Connection.ParseBasicSysparm(parsedSysParam, scopedVars)

	obj := map[string]interface{}{
		"ci":          values[0],
		"parentDepth": values[1],
		"childDepth":  values[2],
		"sysparam":    sysparam,
	}

	if queryType == "nested_cis" {
		return d.Connection.GetNestedCIS(obj, query.ShowAsterisk, query.ShowNull)
	}
	return d.Connection.GetNestedClasses(obj, query.ShowAsterisk, query.ShowNull)
}

// handleV2NestedQuery processes v2 nested variable queries
func (d *Datasource) handleV2NestedQuery(query models.CustomVariableQuery, scopedVars map[string]string) ([]client.Option, error) {
	values := strings.Split(query.RawQuery, "||")
	for i, value := range values {
		values[i] = d.TemplateSrv.Replace(value, scopedVars, "csv")
	}

	sysparam := d.TemplateSrv.Replace(values[3], scopedVars, "csv")
	parsedSysParam := d.Connection.SingleSysParamQuery(sysparam)
	sysparam = d.Connection.ParseBasicSysparm(parsedSysParam, scopedVars)

	obj := map[string]interface{}{
		"startingPoint":    values[0],
		"relationshipType": values[1],
		"excludedClasses":  values[2],
		"parentLimit":      sysparam,
		"childLimit":       values[4],
		"type":             "ci",
	}
	if query.Namespace == "v2_nested_classes" {
		obj["type"] = "class"
	}
	return d.Connection.GetV2NestedValues(obj, query.ShowAsterisk, query.ShowNull)
}

// QueryData handles multiple queries in a single request
func (d *Datasource) QueryData(ctx context.Context, req *backend.QueryDataRequest) (*backend.QueryDataResponse, error) {
	response := backend.NewQueryDataResponse()
	// not needed, I believe
	// instanceSettings := req.PluginContext.DataSourceInstanceSettings

	// if apiKey, exists := instanceSettings.DecryptedSecureJSONData["apiKey"]; exists {
	// 		d.AuthHeader = fmt.Sprintf("Bearer %s", apiKey)

	//     // Optionally log or perform any other action with the apiKey
	//     fmt.Println("API Key found:", apiKey)
	// } else {
	//     return nil, fmt.Errorf("API Key not found in instance settings")
	// }

	// Concurrency setup for processing each query concurrently
	var wg sync.WaitGroup
	mu := &sync.Mutex{}
	for _, q := range req.Queries {
		wg.Add(1)
		go func(q backend.DataQuery) {
			defer wg.Done()
			res := d.processQuery(ctx, req.PluginContext, q)

			// Append to the response map
			mu.Lock()
			response.Responses[q.RefID] = res
			mu.Unlock()
		}(q)
	}
	wg.Wait()

	return response, nil
}

// processQuery handles each individual query based on queryType and
// converts them into DataResponse frames
func (d *Datasource) processQuery(_ context.Context, _ backend.PluginContext, query backend.DataQuery) backend.DataResponse {
	var target models.PluginQuery

	backend.Logger.Info("Query JSON", "json", query.JSON)
	// Unmarshal the JSON query into PluginQuery
	if err := json.Unmarshal(query.JSON, &target); err != nil {
		backend.Logger.Error("Backend Query Listening", "Error", err)
		return backend.ErrDataResponse(backend.StatusBadRequest, fmt.Sprintf("json unmarshal: %v", err))
	}
	backend.Logger.Info("Query Target", "target", target)
	// Apply legacy fix if basic_sysparam exists
	if len(target.BasicSysparam) == 0 && len(target.BasicSysparm) > 0 {
		target.BasicSysparam = d.basicSysparmBackwardsCompatFix(target.BasicSysparm)
	}

	// Extract time range and additional options
	from := query.TimeRange.From.UnixMilli()
	to := query.TimeRange.To.UnixMilli()
	options := utils.ExtractOptions(target)

	// Determine the query type
	queryType, ok := target.SelectedQueryCategory.Value.(string)
	if !ok {
		return backend.ErrDataResponse(backend.StatusBadRequest, "query type is not a valid string")
	}

	// Handle query based on type
	switch queryType {
	case "Node_Graph":
		return d.handleNodeGraph(target, options, target.CacheOverride, query.RefID)
	case "Metrics":
		return d.handleMetrics(target, from, to, options, target.CacheOverride, query.RefID)
	case "Alerts":
		return d.handleAlerts(target, from, to, options, d.InstanceName, target.CacheOverride, query.RefID)
	case "Table":
		return d.handleTable(target, from, to, options, target.CacheOverride, query.RefID)
	case "Row_Count":
		return d.handleRowCount(target, from, to, options, target.CacheOverride, query.RefID)
	case "Aggregate":
		return d.handleAggregate(target, from, to, options, target.CacheOverride, query.RefID)
	case "Geohash_Map":
		return d.handleGeohashMap(target, options, target.CacheOverride, query.RefID)
	case "Log_Data":
		return d.handleLogData(target, from, to, options, target.CacheOverride, query.RefID)
	case "Trend_Data":
		return d.handleTrendData(target, from, to, options, target.CacheOverride, query.RefID)
	case "Outage_Status":
		return d.handleOutageStatus(target, from, to, options, target.CacheOverride, query.RefID)
	case "Anomaly":
		return d.handleAnomaly(target, from, to, options, target.CacheOverride, query.RefID)
	default:
		return backend.ErrDataResponse(backend.StatusBadRequest, fmt.Sprintf("unsupported query type: %s", queryType))
	}
}

// Specific handlers for each query type

func (d *Datasource) handleNodeGraph(
	target models.PluginQuery,
	options map[string]string,
	cacheOverride string,
	refID string,
) backend.DataResponse {
	response, err := d.Connection.QueryNodeGraph(target, options, cacheOverride, refID)
	if err != nil {
		return backend.ErrDataResponse(backend.StatusInternal, fmt.Sprintf("error in node graph query: %v", err))
	}
	return createDataResponseFromFrames(response)
}

func (d *Datasource) handleMetrics(
	target models.PluginQuery,
	from int64,
	to int64,
	options map[string]string,
	cacheOverride string,
	refID string,
) backend.DataResponse {
	response, err := d.Connection.GetMetrics(
		target,
		fmt.Sprintf("%d", from),
		fmt.Sprintf("%d", to),
		options,
		cacheOverride,
		refID)
	if err != nil {
		return backend.ErrDataResponse(backend.StatusInternal, fmt.Sprintf("error in metrics query: %v", err))
	}
	return createDataResponseFromFrames(response)
}

func (d *Datasource) handleAlerts(
	target models.PluginQuery,
	from int64,
	to int64,
	options map[string]string,
	instanceName string,
	cacheOverride string,
	refID string,
) backend.DataResponse {
	response, err := d.Connection.GetAlerts(
		target,
		fmt.Sprintf("%d", from),
		fmt.Sprintf("%d", to),
		options,
		instanceName,
		cacheOverride,
		refID)
	if err != nil {
		return backend.ErrDataResponse(backend.StatusInternal, fmt.Sprintf("error in alerts query: %v", err))
	}
	return createDataResponseFromFrames(response)
}

func (d *Datasource) handleTable(
	target models.PluginQuery,
	from int64,
	to int64,
	options map[string]string,
	cacheOverride string,
	refID string,
) backend.DataResponse {
	backend.Logger.Info("Target in handleTable", "target", target)
	backend.Logger.Info("Options in handleTable", "options", options)
	response, err := d.Connection.QueryTable(target, fmt.Sprintf("%d", from), fmt.Sprintf("%d", to), options, cacheOverride, refID)
	if err != nil {
		backend.Logger.Info("Backend Table query response", "res", response)
		backend.Logger.Error("Backend Table query", "Error", err)
		return backend.ErrDataResponse(backend.StatusInternal, fmt.Sprintf("error in table query: %v", err))
	}
	return createDataResponseFromFrames(response)
}

func (d *Datasource) handleRowCount(
	target models.PluginQuery,
	from int64,
	to int64,
	options map[string]string,
	cacheOverride string,
	refID string,
) backend.DataResponse {
	response, err := d.Connection.GetRowCount(target, fmt.Sprintf("%d", from), fmt.Sprintf("%d", to), options, cacheOverride, refID)
	if err != nil {
		return backend.ErrDataResponse(backend.StatusInternal, fmt.Sprintf("error in row count query: %v", err))
	}
	return createDataResponseFromFrames(response)
}

func (d *Datasource) handleAggregate(
	target models.PluginQuery,
	from int64,
	to int64,
	options map[string]string,
	cacheOverride string,
	refID string,
) backend.DataResponse {
	response, err := d.Connection.GetAggregateQuery(target, fmt.Sprintf("%d", from), fmt.Sprintf("%d", to), options, cacheOverride, refID)
	if err != nil {
		return backend.ErrDataResponse(backend.StatusInternal, fmt.Sprintf("error in aggregate query: %v", err))
	}
	return createDataResponseFromFrames(response)
}

func (d *Datasource) handleGeohashMap(
	target models.PluginQuery,
	options map[string]string,
	cacheOverride string,
	refID string,
) backend.DataResponse {
	response, err := d.Connection.GetGeohashMap(
		target,
		options,
		cacheOverride,
		refID)
	if err != nil {
		return backend.ErrDataResponse(backend.StatusInternal, fmt.Sprintf("error in geohash map query: %v", err))
	}
	return createDataResponseFromFrames(response)
}

func (d *Datasource) handleLogData(
	target models.PluginQuery,
	from int64,
	to int64,
	options map[string]string,
	cacheOverride string,
	refID string,
) backend.DataResponse {
	response, err := d.Connection.QueryLogData(target, fmt.Sprintf("%d", from), fmt.Sprintf("%d", to), options, cacheOverride, refID)
	if err != nil {
		return backend.ErrDataResponse(backend.StatusInternal, fmt.Sprintf("error in log data query: %v", err))
	}
	return createDataResponseFromFrames(response)
}

func (d *Datasource) handleTrendData(
	target models.PluginQuery,
	from int64,
	to int64,
	options map[string]string,
	cacheOverride string,
	refID string,
) backend.DataResponse {
	//response, err := d.Connection.GetTrendData(target, fmt.Sprintf("%d", from), fmt.Sprintf("%d", to), options, cacheOverride, refID)
	response, err := d.Connection.GetTrendData(target, from, to, options, cacheOverride, refID)
	if err != nil {
		return backend.ErrDataResponse(backend.StatusInternal, fmt.Sprintf("error in trend data query: %v", err))
	}

	// **Log the API response before processing**
	backend.Logger.Debug("Raw API Response", "response", response)
	
	return createDataResponseFromFrames(response)
}

func (d *Datasource) handleOutageStatus(
	target models.PluginQuery,
	from int64,
	to int64,
	options map[string]string,
	cacheOverride string,
	refID string,
) backend.DataResponse {
	response, err := d.Connection.GetOutageStatus(target, fmt.Sprintf("%d", from), fmt.Sprintf("%d", to), options, cacheOverride, refID)
	if err != nil {
		return backend.ErrDataResponse(backend.StatusInternal, fmt.Sprintf("error in outage status query: %v", err))
	}
	return createDataResponseFromFrames(response)
}

func (d *Datasource) handleAnomaly(
	target models.PluginQuery,
	from int64,
	to int64,
	options map[string]string,
	cacheOverride string,
	refID string,
) backend.DataResponse {
	response, err := d.Connection.GetAnomaly(target, fmt.Sprintf("%d", from), fmt.Sprintf("%d", to), options, cacheOverride, refID)
	if err != nil {
		return backend.ErrDataResponse(backend.StatusInternal, fmt.Sprintf("error in anomaly query: %v", err))
	}
	return createDataResponseFromFrames(response)
}

// createDataResponseFromFrames converts JSON frames into a DataResponse
func createDataResponseFromFrames(framesJSON []byte) backend.DataResponse {
	var frames []*data.Frame
	err := json.Unmarshal(framesJSON, &frames)
	if err != nil {
		return backend.ErrDataResponse(backend.StatusInternal, fmt.Sprintf("error unmarshaling frames: %v", err))
	}
	return backend.DataResponse{Frames: frames}
}

// CheckHealth performs a health check of the datasource connection
func (d *Datasource) CheckHealth(ctx context.Context, req *backend.CheckHealthRequest) (*backend.CheckHealthResult, error) {
	if d.Connection == nil {
		return &backend.CheckHealthResult{
			Status:  backend.HealthStatusError,
			Message: "SNOWManager connection not initialized",
		}, nil
	}

	err := d.Connection.TestConnection(ctx)
	if err != nil {
		return &backend.CheckHealthResult{
			Status:  backend.HealthStatusError,
			Message: fmt.Sprintf("Connection failed: %v", err),
		}, nil
	}

	return &backend.CheckHealthResult{
		Status:  backend.HealthStatusOk,
		Message: "Data source is working",
	}, nil
}
