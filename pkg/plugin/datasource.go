package plugin

import (
	"context"
	"encoding/json"
	"fmt"
	"strings"
	"sync"
	"time"

	"github.com/grafana/grafana-plugin-sdk-go/backend"
	"github.com/grafana/grafana-plugin-sdk-go/backend/instancemgmt"
	"github.com/optimizca/servicenow-grafana/pkg/models"
	"github.com/optimizca/servicenow-grafana/pkg/services"
	"github.com/optimizca/servicenow-grafana/pkg/snowmanager"
)

// Datasource is the main data source instance that handles Grafana queries
type Datasource struct {
	Connection   *snowmanager.SNOWManager
	Annotations  map[string]interface{}
	InstanceName string
	GlobalImage  string
	APIPath      string
	TemplateSrv  *services.TemplateService
	PluginQuery  *models.PluginQuery
}

// Ensure Datasource implements required Grafana interfaces
var (
	_ backend.QueryDataHandler      = (*Datasource)(nil)
	_ backend.CheckHealthHandler    = (*Datasource)(nil)
	_ instancemgmt.InstanceDisposer = (*Datasource)(nil)
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

// NewDatasource creates a new datasource instance
func NewDatasource(_ context.Context, instanceSettings backend.DataSourceInstanceSettings) (*Datasource, error) {
	// Load PluginSettings
	settings, err := models.LoadPluginSettings(instanceSettings)
	if err != nil {
		return nil, fmt.Errorf("failed to load plugin settings: %w", err)
	}

	// Connection Options mapped from instance settings
	connectionOptions := snowmanager.SnowManagerOptions{
		WithCredentials: instanceSettings.BasicAuthEnabled,
		URL:             instanceSettings.URL,
		APIPath:         settings.APIPath,
		CacheTimeout:    time.Duration(settings.CacheTimeout) * time.Second,
	}

	snowConnection := snowmanager.NewSNOWManager(connectionOptions)
	templateSrv := services.NewTemplateService()

	// Initialize Annotations map
	annotations := make(map[string]interface{})

	return &Datasource{
		Connection:   snowConnection,
		GlobalImage:  settings.ImageURL,
		InstanceName: settings.InstanceName,
		APIPath:      settings.APIPath,
		TemplateSrv:  templateSrv,
		Annotations:  annotations,
	}, nil
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

// basicSysparmBackwardsCompatFix corrects the format of legacy basic_sysparam items to match BasicSysparamItem
func (d *Datasource) basicSysparmBackwardsCompatFix(basicSysparam []models.SysParamColumnObject) []models.BasicSysparamItem {
	defaultSeparator := models.LabelValuePair{Label: "AND", Value: "^"}
	var newBasicSysparam []models.BasicSysparamItem

	// Iterate each SysParamColumnObject and map it to BasicSysparamItem
	for _, row := range basicSysparam {
		newItem := models.BasicSysparamItem{
			One:   safeLabelValuePair(row.Column),
			Two:   safeLabelValuePair(row.Operator),
			Three: safeLabelValuePair(row.Value),
			Four:  parseSeparator(row.Separator, defaultSeparator),
		}
		newBasicSysparam = append(newBasicSysparam, newItem)
	}
	return newBasicSysparam
}

// safeLabelValuePair converts a LabelValuePair or provides an empty LabelValuePair if nil
func safeLabelValuePair(value models.LabelValuePair) models.LabelValuePair {
	if value.Label != "" && value.Value != "" {
		return value
	}
	return models.LabelValuePair{}
}

// parseSeparator retrieves a separator LabelValuePair, using the default if none is provided
func parseSeparator(separator models.LabelValuePair, defaultSeparator models.LabelValuePair) models.LabelValuePair {
	if separator.Label != "" && separator.Value != "" {
		return separator
	}
	return defaultSeparator
}

// MetricFindQuery processes template variable queries for the Grafana frontend
func (d *Datasource) MetricFindQuery(query models.CustomVariableQuery, scopedVars map[string]interface{}) ([]models.LabelValuePair, error) {
	asterisk := query.ShowAsterisk
	showNull := query.ShowNull

	switch query.Namespace {
	case "global_image":
		// Return global image as label-value pair
		return []models.LabelValuePair{{Label: d.GlobalImage, Value: d.GlobalImage}}, nil

	case "global_instance_name":
		// Return global instance name as label-value pair
		return []models.LabelValuePair{{Label: d.InstanceName, Value: d.InstanceName}}, nil

	case "group_by":
		if query.RawQuery != "" {
			values := strings.Split(query.RawQuery, "||")
			tableName := d.TemplateSrv.Replace(values[0], scopedVars["scopedVars"].(map[string]string), "csv")
			nameColumn := d.TemplateSrv.Replace(values[1], scopedVars["scopedVars"].(map[string]string), "csv")
			sysparam := d.TemplateSrv.Replace(values[2], scopedVars["scopedVars"].(map[string]string), "csv")
			return d.Connection.GetGroupByVariable(tableName, nameColumn, sysparam, asterisk, showNull)
		}
		return nil, nil

	case "generic":
		if query.RawQuery != "" {
			values := strings.Split(query.RawQuery, "||")
			tableName := d.TemplateSrv.Replace(values[0], scopedVars["scopedVars"].(map[string]string), "csv")
			nameColumn := d.TemplateSrv.Replace(values[1], scopedVars["scopedVars"].(map[string]string), "csv")
			idColumn := d.TemplateSrv.Replace(values[2], scopedVars["scopedVars"].(map[string]string), "csv")
			sysparam := d.TemplateSrv.Replace(values[3], scopedVars["scopedVars"].(map[string]string), "csv")
			limit := d.TemplateSrv.Replace(values[4], scopedVars["scopedVars"].(map[string]string), "csv")

			parsedSysParam := d.Connection.SingleSysParamQuery(sysparam)
			sysparam = d.Connection.ParseBasicSysparm(parsedSysParam, scopedVars)

			return d.Connection.GetGenericVariable(tableName, nameColumn, idColumn, sysparam, limit, asterisk, showNull)
		}
		return nil, nil

	case "metric_names":
		replacedValue := d.TemplateSrv.Replace(query.RawQuery, scopedVars["scopedVars"].(map[string]string), "csv")
		cis := strings.Split(replacedValue, ",")
		return d.Connection.GetMetricNamesInCIs("", cis, asterisk, showNull)

	case "golden_metric_names":
		replacedValue := d.TemplateSrv.Replace(query.RawQuery, scopedVars["scopedVars"].(map[string]string), "csv")
		cis := strings.Split(replacedValue, ",")
		return d.Connection.GetMetricNamesInCIs("GOLDEN", cis, asterisk, showNull)

	case "custom_kpis":
		replacedValue := d.TemplateSrv.Replace(query.RawQuery, scopedVars["scopedVars"].(map[string]string), "csv")
		cis := strings.Split(replacedValue, ",")
		return d.Connection.GetMetricNamesInCIs("CUSTOM_KPIS", cis, asterisk, showNull)

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
func (d *Datasource) handleNestedQuery(query models.CustomVariableQuery, scopedVars map[string]interface{}, queryType string) ([]models.LabelValuePair, error) {
	values := strings.Split(query.RawQuery, "||")
	for i, value := range values {
		values[i] = d.TemplateSrv.Replace(value, scopedVars["scopedVars"].(map[string]string), "csv")
	}

	sysparam := d.TemplateSrv.Replace(values[3], scopedVars["scopedVars"].(map[string]string), "csv")
	parsedSysParam := d.Connection.SingleSysParamQuery(sysparam)
	sysparam = d.Connection.ParseBasicSysparm(parsedSysParam, scopedVars)

	obj := models.NestedObject{
		CI:          values[0],
		ParentDepth: values[1],
		ChildDepth:  values[2],
		SysParam:    sysparam,
	}

	if queryType == "nested_cis" {
		return d.Connection.GetNestedCIS(obj, query.ShowAsterisk, query.ShowNull)
	}
	return d.Connection.GetNestedClasses(obj, query.ShowAsterisk, query.ShowNull)
}

// handleV2NestedQuery processes v2 nested variable queries
func (d *Datasource) handleV2NestedQuery(query models.CustomVariableQuery, scopedVars map[string]interface{}) ([]models.LabelValuePair, error) {
	values := strings.Split(query.RawQuery, "||")
	for i, value := range values {
		values[i] = d.TemplateSrv.Replace(value, scopedVars["scopedVars"].(map[string]string), "csv")
	}

	sysparam := d.TemplateSrv.Replace(values[3], scopedVars["scopedVars"].(map[string]string), "csv")
	parsedSysParam := d.Connection.SingleSysParamQuery(sysparam)
	sysparam = d.Connection.ParseBasicSysparm(parsedSysParam, scopedVars)

	obj := models.V2NestedObject{
		StartingPoint:    values[0],
		RelationshipType: values[1],
		ExcludedClasses:  values[2],
		ParentLimit:      sysparam,
		ChildLimit:       values[4],
		Type:             "ci",
	}
	if query.Namespace == "v2_nested_classes" {
		obj.Type = "class"
	}
	return d.Connection.GetV2NestedValues(obj, query.ShowAsterisk, query.ShowNull)
}

// QueryData handles multiple queries in a single request
func (d *Datasource) QueryData(ctx context.Context, req *backend.QueryDataRequest) (*backend.QueryDataResponse, error) {
	response := backend.NewQueryDataResponse()

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
func (d *Datasource) processQuery(ctx context.Context, pCtx backend.PluginContext, query backend.DataQuery) backend.DataResponse {
	var response backend.DataResponse
	var qm models.PluginQuery

	err := json.Unmarshal(query.JSON, &qm)
	if err != nil {
		return backend.ErrDataResponse(backend.StatusBadRequest, fmt.Sprintf("json unmarshal: %v", err))
	}

	// Apply legacy fix if basic_sysparam exists
	if len(qm.BasicSysparam) == 0 && len(qm.BasicSysparm) > 0 {
		qm.BasicSysparam = d.basicSysparmBackwardsCompatFix(qm.BasicSysparm)
	}

	from := query.TimeRange.From.UnixMilli()
	to := query.TimeRange.To.UnixMilli()
	cacheOverride := qm.CacheOverride
	queryType := qm.SelectedQueryCategory.Value

	switch queryType {
	case "Node_Graph":
		frame, err := d.Connection.QueryNodeGraph(ctx, qm, from, to, cacheOverride)
		if err != nil {
			response.Error = err
			return response
		}
		response.Frames = append(response.Frames, frame)

	case "Metrics":
		frame, err := d.Connection.GetMetrics(ctx, qm, from, to, cacheOverride)
		if err != nil {
			response.Error = err
			return response
		}
		response.Frames = append(response.Frames, frame)

	case "Alerts":
		frame, err := d.Connection.GetAlerts(ctx, qm, from, to, d.InstanceName, cacheOverride)
		if err != nil {
			response.Error = err
			return response
		}
		response.Frames = append(response.Frames, frame)

	case "Table":
		frame, err := d.Connection.QueryTable(ctx, qm, from, to, cacheOverride)
		if err != nil {
			response.Error = err
			return response
		}
		response.Frames = append(response.Frames, frame)

	case "Row_Count":
		frame, err := d.Connection.GetRowCount(ctx, qm, from, to, cacheOverride)
		if err != nil {
			response.Error = err
			return response
		}
		response.Frames = append(response.Frames, frame)

	case "Aggregate":
		frame, err := d.Connection.GetAggregateQuery(ctx, qm, from, to, cacheOverride)
		if err != nil {
			response.Error = err
			return response
		}
		response.Frames = append(response.Frames, frame)

	case "Geohash_Map":
		frame, err := d.Connection.GetGeohashMap(ctx, qm, cacheOverride)
		if err != nil {
			response.Error = err
			return response
		}
		response.Frames = append(response.Frames, frame)

	case "Log_Data":
		frame, err := d.Connection.QueryLogData(ctx, qm, from, to, cacheOverride)
		if err != nil {
			response.Error = err
			return response
		}
		response.Frames = append(response.Frames, frame)

	case "Trend_Data":
		frame, err := d.Connection.GetTrendData(ctx, qm, from, to, cacheOverride)
		if err != nil {
			response.Error = err
			return response
		}
		response.Frames = append(response.Frames, frame)

	case "Outage_Status":
		frame, err := d.Connection.GetOutageStatus(ctx, qm, from, to, cacheOverride)
		if err != nil {
			response.Error = err
			return response
		}
		response.Frames = append(response.Frames, frame)

	case "Anomaly":
		frame, err := d.Connection.GetAnomaly(ctx, qm, from, to, cacheOverride)
		if err != nil {
			response.Error = err
			return response
		}
		response.Frames = append(response.Frames, frame)

	default:
		response.Error = fmt.Errorf("unsupported query type: %s", queryType)
	}

	return response
}

// CheckHealth performs a health check of the datasource connection
func (d *Datasource) CheckHealth(ctx context.Context, req *backend.CheckHealthRequest) (*backend.CheckHealthResult, error) {
	if d.Connection == nil {
		return &backend.CheckHealthResult{
			Status:  backend.HealthStatusError,
			Message: "SNOWManager connection not initialized",
		}, nil
	}

	err := d.Connection.TestConnection(ctx, d.APIPath)
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
