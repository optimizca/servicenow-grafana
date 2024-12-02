package snowmanager

import (
	"encoding/json"
	"fmt"

	"github.com/grafana/grafana-plugin-sdk-go/data"
	"github.com/optimizca/servicenow-grafana/pkg/client"
	"github.com/optimizca/servicenow-grafana/pkg/models"
	"github.com/optimizca/servicenow-grafana/pkg/services"
	"github.com/optimizca/servicenow-grafana/pkg/utils"
)

func (sm *SNOWManager) QueryNodeGraph(
	target models.PluginQuery,
	options map[string]string,
	cacheOverride string,
	refID string,
) ([]byte, error) {
	// Baseline code to remove errors
	// Construct request body
	bodyData := map[string]interface{}{
		"target":  target,
		"options": options,
		"refID":   refID,
	}
	// Make request
	response, err := sm.APIClient.Request("POST", sm.APIPath, bodyData, cacheOverride)
	if err != nil {
		return nil, fmt.Errorf("error querying node graph: %w", err)
	}
	return response, nil
}

func (sm *SNOWManager) GetMetrics(
	target models.PluginQuery,
	timeFrom string,
	timeTo string,
	options map[string]string,
	cacheOverride string,
	refID string,
) ([]byte, error) {
	var (
		anomaly           bool
		sourceTarget      string
		resourceName      string
		metricName        string
		metricAnomaly     string
		sysparam          string
		sourceArray       []string
		resourceNameArray []string
		metricNameArray   []string
	)

	// Process selectedSourceList
	if target.SelectedSourceList != nil && target.SelectedSourceList.Value != nil {
		for _, value := range target.SelectedSourceList.Value.([]interface{}) {
			if strVal, ok := value.(string); ok {
				sourceArray = append(sourceArray, services.NewTemplateService().Replace(strVal, options, "csv"))
			}
		}
		sourceTarget = utils.CreateRegEx(sourceArray)
	}

	// Process selectedMetricTypeList
	if target.SelectedMetricTypeList != nil && target.SelectedMetricTypeList.Value != nil {
		for _, value := range target.SelectedMetricTypeList.Value.([]interface{}) {
			if strVal, ok := value.(string); ok {
				resourceNameArray = append(resourceNameArray, services.NewTemplateService().Replace(strVal, options, "csv"))
			}
		}
		resourceName = utils.CreateRegEx(resourceNameArray)
	}

	// Process selectedMetricNameList
	if target.SelectedMetricNameList != nil && target.SelectedMetricNameList.Value != nil {
		for _, value := range target.SelectedMetricNameList.Value.([]interface{}) {
			if strVal, ok := value.(string); ok {
				metricNameArray = append(metricNameArray, services.NewTemplateService().Replace(strVal, options, "csv"))
			}
		}
		metricName = utils.CreateRegEx(metricNameArray)
	}

	// Process selectedMetricAnomalyList
	if target.SelectedMetricAnomalyList != nil && target.SelectedMetricAnomalyList.Value != nil {
		if metricAnomalyString, ok := target.SelectedMetricAnomalyList.Value.(string); ok {
			metricAnomaly = services.NewTemplateService().Replace(metricAnomalyString, options, "")
			if metricAnomaly == "true" {
				anomaly = true
			}
		}
	}

	// Process sysparam_query
	if target.SysparamQuery != "" {
		parsedSysparams := sm.SingleSysParamQuery(target.SysparamQuery)
		sysparam = sm.ParseBasicSysparm(parsedSysparams, options)
	}

	// Trim values
	metricName = utils.TrimRegEx(metricName)
	sourceTarget = utils.TrimRegEx(sourceTarget)

	// Construct request body
	bodyData := map[string]interface{}{
		"targets": []map[string]string{
			{
				"target":        utils.TrimRegEx(sourceTarget),
				"resourceName":  utils.TrimRegEx(resourceName),
				"metricName":    utils.TrimRegEx(metricName),
				"sysparm_query": sysparam,
			},
		},
	}
	bodyJSON, err := json.Marshal(bodyData)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal request body: %w", err)
	}

	// Construct request URL
	metricURL := sm.APIPath + "/v1/query/single_metric?startTime=" + timeFrom + "&endTime=" + timeTo
	if target.MetricValueType == "latest" {
		metricURL = sm.APIPath + "/v1/query/latest_single_metric?startTime=" + timeFrom + "&endTime=" + timeTo
	}
	if metricName == "*" {
		metricURL = sm.APIPath + "/v1/query/all_metrics?startTime=" + timeFrom + "&endTime=" + timeTo
	}
	if anomaly {
		metricURL = sm.APIPath + "/v1/query/anomaly_metrics?startTime=" + timeFrom + "&endTime=" + timeTo
	}

	// Send API request
	response, err := sm.APIClient.Request("POST", metricURL, bodyJSON, cacheOverride)
	if err != nil {
		return nil, fmt.Errorf("metric query error: %w", err)
	}

	// Parse the response data
	var result []map[string]interface{}
	if err := json.Unmarshal(response, &result); err != nil {
		return nil, fmt.Errorf("error unmarshaling response data: %w", err)
	}

	// Map the response to frames
	var frames []*data.Frame
	if anomaly {
		frames = client.MapAnamMetricsResponseToFrame(result, refID)
	} else {
		frames = client.MapMetricsResponseToFrame(result, refID)
	}

	// Marshal frames to JSON for returning
	framesJSON, err := json.Marshal(frames)
	if err != nil {
		return nil, fmt.Errorf("error marshaling frames to JSON: %w", err)
	}

	return framesJSON, nil
}

func (sm *SNOWManager) GetAlerts(
	target models.PluginQuery,
	from string,
	to string,
	options map[string]string,
	instanceName string,
	cacheOverride string,
	refID string,
) ([]byte, error) {
	// Baseline code to remove errors
	// Construct request body
	bodyData := map[string]interface{}{
		"target":       target,
		"timeFrom":     from,
		"timeTo":       to,
		"options":      options,
		"instanceName": instanceName,
		"refID":        refID,
	}
	// Make request
	response, err := sm.APIClient.Request("POST", sm.APIPath, bodyData, cacheOverride)
	if err != nil {
		return nil, fmt.Errorf("error querying alerts: %w", err)
	}
	return response, nil
}

func (sm *SNOWManager) QueryTable(
	target models.PluginQuery,
	from string,
	to string,
	options map[string]string,
	cacheOverride string,
	refID string,
) ([]byte, error) {
	// Baseline code to remove errors
	// Construct request body
	bodyData := map[string]interface{}{
		"target":   target,
		"timeFrom": from,
		"timeTo":   to,
		"options":  options,
		"refID":    refID,
	}
	// Make request
	response, err := sm.APIClient.Request("POST", sm.APIPath, bodyData, cacheOverride)
	if err != nil {
		return nil, fmt.Errorf("error querying table: %w", err)
	}
	return response, nil
}

func (sm *SNOWManager) GetRowCount(
	target models.PluginQuery,
	from string,
	to string,
	options map[string]string,
	cacheOverride string,
	refID string,
) ([]byte, error) {
	// Baseline code to remove errors
	// Construct request body
	bodyData := map[string]interface{}{
		"target":   target,
		"timeFrom": from,
		"timeTo":   to,
		"options":  options,
		"refID":    refID,
	}
	// Make request
	response, err := sm.APIClient.Request("POST", sm.APIPath, bodyData, cacheOverride)
	if err != nil {
		return nil, fmt.Errorf("error querying row count: %w", err)
	}
	return response, nil
}

func (sm *SNOWManager) GetAggregateQuery(
	target models.PluginQuery,
	from string,
	to string,
	options map[string]string,
	cacheOverride string,
	refID string,
) ([]byte, error) {
	// Baseline code to remove errors
	// Construct request body
	bodyData := map[string]interface{}{
		"target":   target,
		"timeFrom": from,
		"timeTo":   to,
		"options":  options,
		"refID":    refID,
	}
	// Make request
	response, err := sm.APIClient.Request("POST", sm.APIPath, bodyData, cacheOverride)
	if err != nil {
		return nil, fmt.Errorf("error querying aggregate: %w", err)
	}
	return response, nil
}

func (sm *SNOWManager) GetGeohashMap(
	target models.PluginQuery,
	options map[string]string,
	cacheOverride string,
	refID string,
) ([]byte, error) {
	// Baseline code to remove errors
	// Construct request body
	bodyData := map[string]interface{}{
		"target":  target,
		"options": options,
		"refID":   refID,
	}
	// Make request
	response, err := sm.APIClient.Request("POST", sm.APIPath, bodyData, cacheOverride)
	if err != nil {
		return nil, fmt.Errorf("error querying geohash map: %w", err)
	}
	return response, nil
}

func (sm *SNOWManager) QueryLogData(
	target models.PluginQuery,
	from string,
	to string,
	options map[string]string,
	cacheOverride string,
	refID string,
) ([]byte, error) {
	// Baseline code to remove errors
	// Construct request body
	bodyData := map[string]interface{}{
		"target":   target,
		"timeFrom": from,
		"timeTo":   to,
		"options":  options,
		"refID":    refID,
	}
	// Make request
	response, err := sm.APIClient.Request("POST", sm.APIPath, bodyData, cacheOverride)
	if err != nil {
		return nil, fmt.Errorf("error querying log data: %w", err)
	}
	return response, nil
}

func (sm *SNOWManager) GetTrendData(
	target models.PluginQuery,
	from string,
	to string,
	options map[string]string,
	cacheOverride string,
	refID string,
) ([]byte, error) {
	// Baseline code to remove errors
	// Construct request body
	bodyData := map[string]interface{}{
		"target":   target,
		"timeFrom": from,
		"timeTo":   to,
		"options":  options,
		"refID":    refID,
	}
	// Make request
	response, err := sm.APIClient.Request("POST", sm.APIPath, bodyData, cacheOverride)
	if err != nil {
		return nil, fmt.Errorf("error querying trend data: %w", err)
	}
	return response, nil
}

func (sm *SNOWManager) GetOutageStatus(
	target models.PluginQuery,
	from string,
	to string,
	options map[string]string,
	cacheOverride string,
	refID string,
) ([]byte, error) {
	// Baseline code to remove errors
	// Construct request body
	bodyData := map[string]interface{}{
		"target":   target,
		"timeFrom": from,
		"timeTo":   to,
		"options":  options,
		"refID":    refID,
	}
	// Make request
	response, err := sm.APIClient.Request("POST", sm.APIPath, bodyData, cacheOverride)
	if err != nil {
		return nil, fmt.Errorf("error querying outage status: %w", err)
	}
	return response, nil
}

func (sm *SNOWManager) GetAnomaly(
	target models.PluginQuery,
	from string,
	to string,
	options map[string]string,
	cacheOverride string,
	refID string,
) ([]byte, error) {
	// Baseline code to remove errors
	// Construct request body
	bodyData := map[string]interface{}{
		"target":   target,
		"timeFrom": from,
		"timeTo":   to,
		"options":  options,
		"refID":    refID,
	}
	// Make request
	response, err := sm.APIClient.Request("POST", sm.APIPath, bodyData, cacheOverride)
	if err != nil {
		return nil, fmt.Errorf("error querying anomaly: %w", err)
	}
	return response, nil
}
