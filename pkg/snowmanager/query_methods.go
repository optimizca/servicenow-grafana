package snowmanager

import (
	"encoding/json"
	"fmt"

	"github.com/grafana/grafana-plugin-sdk-go/data"
	"github.com/optimizca/servicenow-grafana/pkg/client"
	"github.com/optimizca/servicenow-grafana/pkg/services"
	"github.com/optimizca/servicenow-grafana/pkg/utils"
)

func (sm *SNOWManager) GetMetrics(target map[string]interface{}, timeFrom, timeTo, cacheOverride string, options map[string]string) ([]byte, error) {
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

	// Process various lists
	if selectedSourceList, ok := target["selectedSourceList"].([]map[string]interface{}); ok {
		for _, listItem := range selectedSourceList {
			if value, ok := listItem["value"].(string); ok {
				sourceArray = append(sourceArray, services.NewTemplateService().Replace(value, options, ""))
			}
		}
		sourceTarget = utils.CreateRegEx(sourceArray)
	}

	if selectedMetricTypeList, ok := target["selectedMetricTypeList"].([]map[string]interface{}); ok {
		for _, listItem := range selectedMetricTypeList {
			if value, ok := listItem["value"].(string); ok {
				resourceNameArray = append(resourceNameArray, services.NewTemplateService().Replace(value, options, ""))
			}
		}
		resourceName = utils.CreateRegEx(resourceNameArray)
	}

	if selectedMetricNameList, ok := target["selectedMetricNameList"].([]map[string]interface{}); ok {
		for _, listItem := range selectedMetricNameList {
			if value, ok := listItem["value"].(string); ok {
				metricNameArray = append(metricNameArray, services.NewTemplateService().Replace(value, options, ""))
			}
		}
		metricName = utils.CreateRegEx(metricNameArray)
	}

	if selectedMetricAnomalyList, ok := target["selectedMetricAnomalyList"].(map[string]interface{}); ok {
		if value, ok := selectedMetricAnomalyList["value"].(string); ok {
			metricAnomaly = services.NewTemplateService().Replace(value, options, "")
			if metricAnomaly == "true" {
				anomaly = true
			}
		}
	}

	optionsInterface := make(map[string]interface{})
	for key, value := range options {
		optionsInterface[key] = value
	}

	// Process sysparam_query
	if sysparamQuery, ok := target["sysparam_query"].(string); ok {
		sysparam = sm.ParseBasicSysparm(sysparamQuery, optionsInterface)
	}

	metricName = utils.TrimRegEx(metricName)
	sourceTarget = utils.TrimRegEx(sourceTarget)

	// Create request body
	bodyData := map[string]interface{}{
		"targets": []map[string]string{
			{
				"target":        sourceTarget,
				"resourceName":  resourceName,
				"metricName":    metricName,
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
	if target["metricValueType"] == "latest" {
		metricURL = sm.APIPath + "/v1/query/latest_single_metric?startTime=" + timeFrom + "&endTime=" + timeTo
	}
	if metricName == "*" {
		metricURL = sm.APIPath + "/v1/query/all_metrics?startTime=" + timeFrom + "&endTime=" + timeTo
	}
	if anomaly {
		metricURL = sm.APIPath + "/v1/query/anomaly_metrics?startTime=" + timeFrom + "&endTime=" + timeTo
	}

	response, err := sm.APIClient.Request("POST", metricURL, bodyJSON)
	if err != nil {
		return nil, fmt.Errorf("metric query error: %w", err)
	}

	// Parse the response data
	var result []map[string]interface{}
	if err := json.Unmarshal(response, &result); err != nil {
		return nil, fmt.Errorf("error unmarshaling response data: %w", err)
	}

	// Determine whether to use anomaly or standard metric mapping
	var frames []*data.Frame
	if anomaly {
		frames = client.MapAnamMetricsResponseToFrame(result, target["refId"].(string))
	} else {
		frames = client.MapMetricsResponseToFrame(result, target["refId"].(string))
	}

	// Marshal the frames into JSON for returning as []byte
	framesJSON, err := json.Marshal(frames)
	if err != nil {
		return nil, fmt.Errorf("error marshaling frames to JSON: %w", err)
	}

	return framesJSON, nil

}
