package snowmanager

import (
	"encoding/json"
	"fmt"
	"strconv"
	"strings"

	"github.com/grafana/grafana-plugin-sdk-go/backend"
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
	var (
		startingPoint     string
		relationshipTypes []string
		excludedClasses   []string
		parentLimit       int
		childLimit        int
	)

	// selectedServiceList for starting_point
	if target.SelectedServiceList != nil && target.SelectedServiceList.Value != nil {
		if value, ok := target.SelectedServiceList.Value.(string); ok {
			startingPoint = services.NewTemplateService().Replace(value, options, "csv")
		}
	}

	// relationshipTypes
	for _, rt := range target.RelationshipTypes {
		if value, ok := rt.Value.(string); ok {
			relationshipTypes = append(relationshipTypes, services.NewTemplateService().Replace(value, options, "csv"))
		}
	}

	// excludedClasses
	for _, ec := range target.ExcludedClasses {
		if value, ok := ec.Value.(string); ok {
			excludedClasses = append(excludedClasses, services.NewTemplateService().Replace(value, options, "csv"))
		}
	}

	// topology_parent_depth
	if target.TopologyParentDepth != "" {
		if parsedDepth, err := strconv.Atoi(services.NewTemplateService().Replace(target.TopologyParentDepth, options, "csv")); err == nil {
			parentLimit = parsedDepth
		}
	}

	// topology_child_depth
	if target.TopologyChildDepth != "" {
		if parsedDepth, err := strconv.Atoi(services.NewTemplateService().Replace(target.TopologyChildDepth, options, "csv")); err == nil {
			childLimit = parsedDepth
		}
	}

	// Construct request body
	bodyData := map[string]interface{}{
		"starting_point":     startingPoint,
		"parent_limit":       parentLimit,
		"child_limit":        childLimit,
		"relationship_types": relationshipTypes,
		"excluded_classes":   excludedClasses,
	}

	// Construct request URL
	nodeGraphURL := sm.APIPath + "/v1/query/node-graph"

	// Send API request
	responseBytes, err := sm.APIClient.Request("POST", nodeGraphURL, bodyData, cacheOverride)
	if err != nil {
		return nil, fmt.Errorf("node graph query error: %w", err)
	}

	// Parse the response data
	var response struct {
		Data map[string]interface{} `json:"data"`
	}
	if err := json.Unmarshal(responseBytes, &response); err != nil {
		return nil, fmt.Errorf("error unmarshaling response data: %w", err)
	}

	// Map the response to node graph frames
	frames := utils.CreateNodeGraphFrame(response.Data, refID)

	// Marshal frames to JSON for returning
	framesJSON, err := json.Marshal(frames)
	if err != nil {
		return nil, fmt.Errorf("error marshaling frames to JSON: %w", err)
	}

	return framesJSON, nil
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
	response, err := sm.APIClient.Request("POST", metricURL, bodyData, cacheOverride)
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
	timeFrom string,
	timeTo string,
	options map[string]string,
	instanceName string,
	cacheOverride string,
	refID string,
) ([]byte, error) {
	if utils.DebugLevel() == 1 {
		fmt.Println("Inside GetAlerts")
		fmt.Printf("Target: %+v\n", target)
		fmt.Printf("Scoped Vars: %+v\n", options)
	}

	//Extract Service and CI information
	service := ""
	if target.SelectedServiceList != nil && target.SelectedServiceList.Value != nil {
		if value, ok := target.SelectedServiceList.Value.(string); ok {
			service = utils.ReplaceTargetUsingTemplVarsCSV(value, options)
		}
	}

	ci := ""
	if target.SelectedSourceList != nil && target.SelectedSourceList.Value != nil {
		var sourceArray []string
		for _, value := range target.SelectedSourceList.Value.([]interface{}) {
			if strVal, ok := value.(string); ok {
				sourceArray = append(sourceArray, utils.ReplaceTargetUsingTemplVars(strVal, options))
			}
		}
		ci = utils.CreateRegEx(sourceArray)
	}

	bodyTarget := service
	alertState := "All"
	alertType := "none"

	// Determine alertState, alertType, and sysQuery
	if target.SelectedAlertStateList != nil && target.SelectedAlertStateList.Value != nil {
		if value, ok := target.SelectedAlertStateList.Value.(string); ok {
			alertState = value
		}
	}

	if target.SelectedAlertTypeList != nil && target.SelectedAlertTypeList.Value != nil {
		if value, ok := target.SelectedAlertTypeList.Value.(string); ok {
			switch value {
			case "CI":
				alertType = "ci"
				bodyTarget = ci
			case "OS":
				alertType = "os"
				bodyTarget = ci
				if strings.Contains(bodyTarget, "(") {
					bodyTarget = bodyTarget[strings.Index(bodyTarget, "(")+1 : strings.Index(bodyTarget, ")")]
				}
			case "None":
				alertType = "none"
			}
		}
	}

	// Parse sysparam
	sysQuery := ""
	if target.SysparamQuery != "" {
		parsedSysparams := sm.SingleSysParamQuery(target.SysparamQuery)
		sysQuery = sm.ParseBasicSysparm(parsedSysparams, options)
	}

	// Handle tags
	tagString := utils.GenerateTagString(target, options)

	//Sorting and pagination parameters
	sortBy := ""
	if target.SortBy != nil && target.SortBy.Value != nil {
		if value, ok := target.SortBy.Value.(string); ok {
			sortBy = utils.ReplaceTargetUsingTemplVarsCSV(value, options)
		}
	}

	sortDirection := "ASC"
	if target.SortDirection != "" {
		validDirections := map[string]bool{"ASC": true, "DESC": true}
		if _, valid := validDirections[target.SortDirection]; valid {
			sortDirection = target.SortDirection
		}
	}

	limit := 9999
	if target.RowLimit != "" {
		if parsedLimit, err := strconv.Atoi(target.RowLimit); err == nil && parsedLimit > 0 && parsedLimit < 10000 {
			limit = parsedLimit
		}
	}

	page := 0
	if target.Page > 0 {
		page = target.Page
	}

	// timeRangeColumn
	timerangeColumn := "sys_updated_on"
	if target.GrafanaTimerangeColumn != nil && target.GrafanaTimerangeColumn.Value != nil {
		if value, ok := target.GrafanaTimerangeColumn.Value.(string); ok {
			timerangeColumn = utils.ReplaceTargetUsingTemplVarsCSV(value, options)
		}
	}

	// Request Body
	bodyData := map[string]interface{}{
		"targets": []map[string]interface{}{
			{
				"target":        bodyTarget,
				"sysparm_query": sysQuery,
				"alertType":     alertType,
				"alertState":    alertState,
				"sortBy":        sortBy,
				"sortDirection": sortDirection,
				"limit":         limit,
				"page":          page,
				"tagFilters":    tagString,
			},
		},
	}

	// URL
	url := sm.APIPath + "/v1/query/alerts"
	if target.GrafanaTimerange {
		url += fmt.Sprintf("?startTime=%s&endTime=%s&timerangeColumn=%s", timeFrom, timeTo, timerangeColumn)
	}

	if utils.DebugLevel() == 1 {
		fmt.Println("Service after replace:", service)
		fmt.Println("Request Body:", bodyData)
		fmt.Println("Request URL:", url)
	}

	//HTTP request
	responseBytes, err := sm.APIClient.Request("POST", url, bodyData, cacheOverride)
	if err != nil {
		return nil, fmt.Errorf("alert query error: %w", err)
	}

	var response map[string]interface{}
	if err := json.Unmarshal(responseBytes, &response); err != nil {
		return nil, fmt.Errorf("failed to parse response: %w", err)
	}

	// Convert response["result"] to []Option
	rawResultsBytes, err := json.Marshal(response["result"])
	if err != nil {
		return nil, fmt.Errorf("failed to serialize response result: %w", err)
	}

	var rawResults []client.Option
	if err := json.Unmarshal(rawResultsBytes, &rawResults); err != nil {
		return nil, fmt.Errorf("failed to deserialize response result into []Option: %w", err)
	}

	results := client.AppendInstanceNameToResponse(rawResults, instanceName)

	// Convert []Option to []map[string]interface{} if needed
	var formattedResults []map[string]interface{}
	for _, option := range results {
		formattedResults = append(formattedResults, map[string]interface{}{
			"label":        option.Label,
			"value":        option.Value,
			"suffix":       option.Suffix,
			"type":         option.Type,
			"description":  option.Description,
			"instanceName": option.InstanceName,
		})
	}

	frame := client.MapTextResponseToFrame(formattedResults, refID)

	// Serialize the frame to JSON
	frameJSON, err := json.Marshal([]*data.Frame{frame})
	if err != nil {
		return nil, fmt.Errorf("failed to serialize frame to JSON: %w", err)
	}

	return frameJSON, nil
}

func (sm *SNOWManager) QueryTable(
	target models.PluginQuery,
	timeFrom string,
	timeTo string,
	options map[string]string,
	cacheOverride string,
	refID string,
) ([]byte, error) {
	if utils.DebugLevel() == 1 {
		fmt.Println("queryTable target: ", target)
	}

	// Extract scopedVars
	scopedVars := options

	// Extract tableName
	tableName := ""
	if target.TableName != nil && target.TableName.Value != nil {
		if value, ok := target.TableName.Value.(string); ok {
			tableName = utils.ReplaceTargetUsingTemplVars(value, scopedVars)
		}
	}

	tableColumns := ""
	if target.SelectedTableColumns != nil {
		var columns []string
		for _, col := range target.SelectedTableColumns {
			if strVal, ok := col.Value.(string); ok {
				columns = append(columns, utils.ReplaceTargetUsingTemplVars(strVal, scopedVars))
			}
		}
		tableColumns = strings.Join(columns, ",")
	}

	// // Extract tableColumns
	// tableColumns := ""
	// if target.SelectedTableColumns != nil {
	// 	var columns []string
	// 	if target.SelectedTableColumns.Value != nil {
	// 		for _, col := range target.SelectedTableColumns.Value.([]interface{}) {
	// 			if strVal, ok := col.(string); ok {
	// 				columns = append(columns, utils.ReplaceTargetUsingTemplVars(strVal, scopedVars))
	// 			}
	// 		}
	// 	}
	// 	tableColumns = strings.Join(columns, ",")
	// }

	// Extract sysparam
	sysparam := ""
	if target.SysparamQuery != "" {
		parsedSysparams := sm.SingleSysParamQuery(target.SysparamQuery)
		sysparam = sm.ParseBasicSysparm(parsedSysparams, options)
	}

	// Determine row limit
	limit := 9999
	if target.RowLimit != "" {
		if parsedLimit,
			err := strconv.Atoi(target.RowLimit); err == nil && parsedLimit > 0 && parsedLimit < 10000 {
			limit = parsedLimit
		}
	}
	// Determine page number
	page := 0
	if target.Page > 0 {
		page = target.Page
	}

	// Process sortBy and sortDirection
	sortBy := ""
	sortDirection := ""
	if target.SortBy != nil && target.SortBy.Value != nil {
		if sortValue, ok := target.SortBy.Value.(string); ok {
			sortBy = utils.ReplaceTargetUsingTemplVarsCSV(sortValue, scopedVars)
		}
	}

	getAlertCount := false
    if target.GetAlertCount != nil && target.GetAlertCount.Value != nil {
        if val, ok := target.GetAlertCount.Value.(string); ok {
            getAlertCount = val == "true" // Convert string to boolean
        }
    }

	// Process timerangeColumn
	timerangeColumn := "sys_updated_on"
	if target.GrafanaTimerangeColumn != nil && target.GrafanaTimerangeColumn.Value != nil {
		if value, ok := target.GrafanaTimerangeColumn.Value.(string); ok {
			timerangeColumn = utils.ReplaceTargetUsingTemplVarsCSV(value, scopedVars)
		}
	}

	// Construct bodyData
	bodyData := map[string]interface{}{
		"targets": []map[string]interface{}{
			{
				"target":        tableName,
				"columns":       tableColumns,
				"sysparm":       sysparam,
				"limit":         limit,
				"page":          page,
				"sortBy":        sortBy,
				"sortDirection": sortDirection,
				"getAlertCount": getAlertCount,
			},
		},
	}
	// backend.Logger.Info("Query Table body data", "body data", bodyData)
	//HTTP request
	// bodyJSON, err := json.Marshal(bodyData)
	// if err != nil {
	// 	return nil, fmt.Errorf("failed to marshal request body: %w", err)
	// }
	// backend.Logger.Info("Query Table body JSON", "body JSON", string(bodyJSON))

	// Construct URL
	// url := sm.APIPath + "/v1/query/table"
	url := "/v1/query/table"
	if target.GrafanaTimerange {
		url += fmt.Sprintf("?startTime=%s&endTime=%s&timerangeColumn=%s", timeFrom, timeTo, timerangeColumn)
	}

	if utils.DebugLevel() == 1 {
		fmt.Println("Request URL:", url)
		fmt.Println("Request Body:", bodyData)
	}
	
	// Send HTTP request
	responseBytes, err := sm.APIClient.Request("POST", url, bodyData, cacheOverride)
	if err != nil {
		return nil, fmt.Errorf("table query error: %w", err)
	}

	// backend.Logger.Info("Response Bytes from API", "response", string(responseBytes))
	if utils.DebugLevel() == 1 {
		fmt.Println("Response from API:", string(responseBytes))
	}

	// Parse response into result
	var response map[string]interface{}
	if err := json.Unmarshal(responseBytes, &response); err != nil {
		return nil, fmt.Errorf("failed to parse response: %w", err)
	}

	// backend.Logger.Info("Response from API", "response", string(responseBytes))

	// Check if the "result" field exists and is an array
	resultInterface, ok := response["result"]
	if !ok {
		return nil, fmt.Errorf("missing 'result' field in response")
	}

	// Handle the case where the result is an empty array (if empty response is expected)
	if resultArray, ok := resultInterface.([]interface{}); ok {
		if len(resultArray) == 0 {
			// Return an empty result without error
			backend.Logger.Info("Empty result array received")
			return []byte("[]"), nil
		}

		// Convert []interface{} to []map[string]interface{}
		var result []map[string]interface{}
		for _, item := range resultArray {
			if itemMap, ok := item.(map[string]interface{}); ok {
				result = append(result, itemMap)
			} else {
				return nil, fmt.Errorf("unexpected item format in result array")
			}
		}

		backend.Logger.Info("Result Query Table method, can be accessed??", "result", result)

		// Map response to frames
		frame := client.MapTextResponseToFrame(result, refID)

		// Marshal frames into JSON
		frameJSON, err := json.Marshal([]*data.Frame{frame})
		if err != nil {
			return nil, fmt.Errorf("failed to marshal frame to JSON: %w", err)
		}

		return frameJSON, nil
	} else {
		return nil, fmt.Errorf("unexpected result format: expected an array")
	}
}

func (sm *SNOWManager) GetRowCount(
	target models.PluginQuery,
	timeFrom string,
	timeTo string,
	options map[string]string,
	cacheOverride string,
	refID string,
) ([]byte, error) {
	if utils.DebugLevel() == 1 {
		fmt.Println("Inside GetRowCount")
		fmt.Printf("Target: %+v\n", target)
		fmt.Printf("Scoped Vars: %+v\n", options)
	}

	// Extract tableName
	tableName := ""
	if target.TableName != nil && target.TableName.Value != nil {
		if value, ok := target.TableName.Value.(string); ok {
			tableName = utils.ReplaceTargetUsingTemplVars(value, options)
		}
	}

	// Extract sysparam
	sysparam := ""
	if target.SysparamQuery != "" {
		parsedSysparams := sm.SingleSysParamQuery(target.SysparamQuery)
		sysparam = sm.ParseBasicSysparm(parsedSysparams, options)
	}

	// Extract timerangeColumn
	timerangeColumn := "sys_updated_on"
	if target.GrafanaTimerangeColumn != nil && target.GrafanaTimerangeColumn.Value != nil {
		if value, ok := target.GrafanaTimerangeColumn.Value.(string); ok {
			timerangeColumn = utils.ReplaceTargetUsingTemplVarsCSV(value, options)
		}
	}

	// Request Body
	bodyData := map[string]interface{}{
		"targets": []map[string]interface{}{
			{
				"target":        tableName,
				"sysparm_query": sysparam,
			},
		},
	}

	url := sm.APIPath + "/v1/query/row_count"
	if target.GrafanaTimerange {
		url += fmt.Sprintf("?startTime=%s&endTime=%s&timerangeColumn=%s", timeFrom, timeTo, timerangeColumn)
	}

	if utils.DebugLevel() == 1 {
		utils.PrintDebug(target)
		utils.PrintDebug(bodyData)
	}

	// HTTP request
	responseBytes, err := sm.APIClient.Request("POST", url, bodyData, cacheOverride)
	if err != nil {
		return nil, fmt.Errorf("row count query error: %w", err)
	}

	utils.PrintDebug("Print row count response from SNOW")
	utils.PrintDebug(string(responseBytes))

	// Parse response
	var response map[string]interface{}
	if err := json.Unmarshal(responseBytes, &response); err != nil {
		return nil, fmt.Errorf("failed to parse response: %w", err)
	}

	// Map response to frame
	if result, ok := response["result"].([]interface{}); ok {
		var formattedResults []map[string]interface{}
		for _, item := range result {
			if row, ok := item.(map[string]interface{}); ok {
				formattedResults = append(formattedResults, row)
			}
		}

		frame := client.MapTextResponseToFrame(formattedResults, refID)

		frameJSON, err := json.Marshal([]*data.Frame{frame})
		if err != nil {
			return nil, fmt.Errorf("failed to serialize frame to JSON: %w", err)
		}

		return frameJSON, nil
	}

	return nil, fmt.Errorf("unexpected result format in row count response")
}

func (sm *SNOWManager) GetAggregateQuery(
	target models.PluginQuery,
	timeFrom string,
	timeTo string,
	options map[string]string,
	cacheOverride string,
	refID string,
) ([]byte, error) {
	if utils.DebugLevel() == 1 {
		fmt.Println("Inside GetAggregateQuery")
		fmt.Printf("Target: %+v\n", target)
		fmt.Printf("Scoped Vars: %+v\n", options)
	}

	tableName, groupBy, aggregateType, aggregateColumn, sysparam := "", "", "", "", ""

	// Helper function for scopedVars validation
	if target.TableName != nil && target.TableName.Value != nil {
		if value, ok := target.TableName.Value.(string); ok {
			tableName = utils.ReplaceTargetUsingTemplVars(value, options)
		}
	}
	backend.Logger.Info("Table Name in Query Table", "tableName", tableName)

	// Extract tableName
	if target.TableName != nil && target.TableName.Value != nil {
		if value, ok := target.TableName.Value.(string); ok {
			tableName = utils.ReplaceTargetUsingTemplVars(value, options)
		}
	}

	// Extract groupBy
	if target.GroupBy != nil && target.GroupBy.Value != nil {
		if value, ok := target.GroupBy.Value.(string); ok {
			groupBy = utils.ReplaceTargetUsingTemplVarsCSV(value, options)
		}
	}

	// Extract aggregate type
	if target.SelectedAggregateType != nil && target.SelectedAggregateType.Value != nil {
		if value, ok := target.SelectedAggregateType.Value.(string); ok {
			aggregateType = value
		}
	}

	// Extract aggregate column
	if target.AggregateColumn != nil && target.AggregateColumn.Value != nil {
		if value, ok := target.AggregateColumn.Value.(string); ok {
		aggregateColumn = utils.ReplaceTargetUsingTemplVarsCSV(value, options)
		}
	}

	// sysparam query
	if target.SysparamQuery != "" {
		parsedSysparams := sm.SingleSysParamQuery(target.SysparamQuery)
		sysparam = sm.ParseBasicSysparm(parsedSysparams, options)
	}

	limit := 9999
	if target.RowLimit != "" {
		if parsedLimit, err := strconv.Atoi(target.RowLimit); err == nil && parsedLimit > 0 && parsedLimit < 10000 {
			limit = parsedLimit
		}
	}

	// Extract timerangeColumn
	timerangeColumn := "sys_updated_on"
	if target.GrafanaTimerangeColumn != nil && target.GrafanaTimerangeColumn.Value != nil {
		if value, ok := target.GrafanaTimerangeColumn.Value.(string); ok {
			timerangeColumn = utils.ReplaceTargetUsingTemplVarsCSV(value, options)
		}
	}

	// Construct bodyData
	bodyData := map[string]interface{}{
		"targets": []map[string]interface{}{
			{
				"target":  tableName,
				"type":    aggregateType,
				"column":  aggregateColumn,
				"groupBy": groupBy,
				"sysparm": sysparam,
				"limit":   limit,
			},
		},
	}

	backend.Logger.Info("Body Data in Query Aggregate", "bodyData", bodyData)

	url := "/v1/query/aggregate"
	if target.GrafanaTimerange {
		url += fmt.Sprintf("?startTime=%s&endTime=%s&timerangeColumn=%s", timeFrom, timeTo, timerangeColumn)
	}

	if utils.DebugLevel() == 1 {
		utils.PrintDebug("getAggregate target: ")
		utils.PrintDebug(target)
		utils.PrintDebug("getAggregate bodyData: ")
		utils.PrintDebug(bodyData)
	}

	// HTTP request
	responseBytes, err := sm.APIClient.Request("POST", url, bodyData, cacheOverride)
	if err != nil {
		return nil, fmt.Errorf("aggregate query error: %w", err)
	}

	utils.PrintDebug("Print aggregate query response from SNOW: ")
	utils.PrintDebug(string(responseBytes))

	// Parse response into result
	var response map[string]interface{}
	if err := json.Unmarshal(responseBytes, &response); err != nil {
		return nil, fmt.Errorf("failed to parse response: %w", err)
	}

	backend.Logger.Info("Response from API", "response", string(responseBytes))

	// Check if the "result" field exists and is an array
	resultInterface, ok := response["result"]
	if !ok {
		return nil, fmt.Errorf("missing 'result' field in response")
	}

	// Handle the case where the result is an empty array (if empty response is expected)
	if resultArray, ok := resultInterface.([]interface{}); ok {
		if len(resultArray) == 0 {
			// Return an empty result without error
			backend.Logger.Info("Empty result array received")
			return []byte("[]"), nil
		}

		// Convert []interface{} to []map[string]interface{}
		var result []map[string]interface{}
		for _, item := range resultArray {
			if itemMap, ok := item.(map[string]interface{}); ok {
				result = append(result, itemMap)
			} else {
				return nil, fmt.Errorf("unexpected item format in result array")
			}
		}

		backend.Logger.Info("Result Query Table method, can be accessed??", "result", result)

		// Map response to frames
		frame := client.MapTextResponseToFrame(result, refID)

		// Marshal frames into JSON
		frameJSON, err := json.Marshal([]*data.Frame{frame})
		if err != nil {
			return nil, fmt.Errorf("failed to marshal frame to JSON: %w", err)
		}

		return frameJSON, nil
	} else {
		return nil, fmt.Errorf("unexpected result format: expected an array")
	}
}

	// // Parse response
	// var response map[string]interface{}
	// if err := json.Unmarshal(responseBytes, &response); err != nil {
	// 	return nil, fmt.Errorf("failed to parse response: %w", err)
	// }

	// // Map response to a frame
	// if result, ok := response["result"].([]interface{}); ok {
	// 	var formattedResults []map[string]interface{}
	// 	for _, item := range result {
	// 		if row, ok := item.(map[string]interface{}); ok {
	// 			formattedResults = append(formattedResults, row)
	// 		}
	// 	}

	// 	frame := client.MapTextResponseToFrame(formattedResults, refID)

	// 	// Serialize frame to JSON
	// 	frameJSON, err := json.Marshal([]*data.Frame{frame})
	// 	if err != nil {
	// 		return nil, fmt.Errorf("failed to serialize frame to JSON: %w", err)
	// 	}

	// 	return frameJSON, nil
	// }

	// return nil, fmt.Errorf("unexpected result format in aggregate query response")

func (sm *SNOWManager) GetGeohashMap(
	target models.PluginQuery,
	options map[string]string,
	cacheOverride string,
	refID string,
) ([]byte, error) {
	if utils.DebugLevel() == 1 {
		fmt.Println("Inside GetGeohashMap")
		fmt.Printf("Target: %+v\n", target)
		fmt.Printf("Scoped Vars: %+v\n", options)
	}

	tableName, groupBy, sysparam := "", "", ""

	// tableName
	if target.TableName != nil && target.TableName.Value != nil {
		if value, ok := target.TableName.Value.(string); ok {
			tableName = utils.ReplaceTargetUsingTemplVars(value, options)
		}
	}

	// groupBy
	if target.GroupBy != nil && target.GroupBy.Value != nil {
		if value, ok := target.GroupBy.Value.(string); ok {
			groupBy = utils.ReplaceTargetUsingTemplVarsCSV(value, options)
		}
	}

	// sysparam
	if target.SysparamQuery != "" {
		parsedSysparams := sm.SingleSysParamQuery(target.SysparamQuery)
		sysparam = sm.ParseBasicSysparm(parsedSysparams, options)
	}

	// Construct request body
	bodyData := map[string]interface{}{
		"targets": []map[string]interface{}{
			{
				"target":  tableName,
				"column":  groupBy,
				"sysparm": sysparam,
			},
		},
	}

	if utils.DebugLevel() == 1 {
		utils.PrintDebug("getGeohashMap target: ")
		utils.PrintDebug(target)
		utils.PrintDebug("getGeohashMap bodyData: ")
		utils.PrintDebug(bodyData)
	}

	// URL
	url := sm.APIPath + "/v1/query/geohash_map"
	responseBytes, err := sm.APIClient.Request("POST", url, bodyData, cacheOverride)
	if err != nil {
		return nil, fmt.Errorf("geohash_map query error: %w", err)
	}
	if utils.DebugLevel() == 1 {
		fmt.Println("Print geohash_map response from SNOW: ", string(responseBytes))
	}

	// Parse response
	var response map[string]interface{}
	if err := json.Unmarshal(responseBytes, &response); err != nil {
		return nil, fmt.Errorf("failed to parse response: %w", err)
	}

	// Map response to a frame
	if result, ok := response["result"].([]interface{}); ok {
		var formattedResults []map[string]interface{}
		for _, item := range result {
			if row, ok := item.(map[string]interface{}); ok {
				formattedResults = append(formattedResults, row)
			}
		}

		frame := client.MapTextResponseToFrame(formattedResults, refID)

		frameJSON, err := json.Marshal([]*data.Frame{frame})
		if err != nil {
			return nil, fmt.Errorf("failed to serialize frame to JSON: %w", err)
		}

		return frameJSON, nil
	}

	return nil, fmt.Errorf("unexpected result format in geohash_map query response")
}

func (sm *SNOWManager) QueryLogData(
	target models.PluginQuery,
	timeFrom string,
	timeTo string,
	options map[string]string,
	cacheOverride string,
	refID string,
) ([]byte, error) {
	var (
		sysparam      string
		elasticSearch string
		sortBy        string
		sortDirection string
		compressLog   bool
		limit         int = 9999
		page          int = 0
	)

	// compressLogs
	compressLog = target.CompressLogs

	// basicSysparm
	if target.SysparamQuery != "" {
		parsedSysparams := sm.SingleSysParamQuery(target.SysparamQuery)
		sysparam = sm.ParseBasicSysparm(parsedSysparams, options)
	}

	// rowLimit
	if target.RowLimit != "" {
		if parsedLimit, err := strconv.Atoi(target.RowLimit); err == nil && parsedLimit > 0 && parsedLimit < 10000 {
			limit = parsedLimit
		}
	}

	// page
	if target.Page >= 0 {
		page = target.Page
	}

	// sortBy and sortDirection
	if target.SortBy != nil && target.SortBy.Value != nil && target.SortDirection != "" {
		if sortByValue, ok := target.SortBy.Value.(string); ok {
			sortBy = services.NewTemplateService().Replace(sortByValue, options, "csv")
			sortDirection = target.SortDirection
		}
	}

	// elasticSearch
	if target.ElasticSearch != "" {
		elasticSearch = services.NewTemplateService().Replace(target.ElasticSearch, options, "csv")
	}

	// Construct request body
	bodyData := map[string]interface{}{
		"targets": []map[string]interface{}{
			{
				"sysparm":       sysparam,
				"limit":         limit,
				"page":          page,
				"sortBy":        sortBy,
				"sortDirection": sortDirection,
				"esSearch":      elasticSearch,
				"startTime":     timeFrom,
				"endTime":       timeTo,
				"compressLog":   compressLog,
			},
		},
	}
	bodyJSON, err := json.Marshal(bodyData)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal request body: %w", err)
	}

	// Construct request URL
	logURL := sm.APIPath + "/v1/query/logs"

	// Send API request
	responseBytes, err := sm.APIClient.Request("POST", logURL, bodyJSON, cacheOverride)
	if err != nil {
		return nil, fmt.Errorf("log data query error: %w", err)
	}

	// Parse the response data
	var response struct {
		Data []map[string]interface{} `json:"data"`
	}
	if err := json.Unmarshal(responseBytes, &response); err != nil {
		return nil, fmt.Errorf("error unmarshaling response data: %w", err)
	}

	// Map the response to frames
	frames := client.MapTextResponseToFrame(response.Data, refID)

	// Marshal frames to JSON for returning
	framesJSON, err := json.Marshal(frames)
	if err != nil {
		return nil, fmt.Errorf("error marshaling frames to JSON: %w", err)
	}

	return framesJSON, nil
}

func (sm *SNOWManager) GetTrendData(
	target models.PluginQuery,
	timeFrom string,
	timeTo string,
	options map[string]string,
	cacheOverride string,
	refID string,
) ([]byte, error) {
	var (
		table         string
		sysparam      string
		elasticSearch string
		groupBy       string
		trendColumn   string
		trendBy       string
		period        int = 1
	)

	// tableName
	if target.TableName != nil && target.TableName.Value != nil {
		if tableName, ok := target.TableName.Value.(string); ok {
			table = services.NewTemplateService().Replace(tableName, options, "")
		}
	}

	// basicSysparm
	if target.SysparamQuery != "" {
		parsedSysparams := sm.SingleSysParamQuery(target.SysparamQuery)
		sysparam = sm.ParseBasicSysparm(parsedSysparams, options)
	}

	// elasticSearch
	if target.ElasticSearch != "" {
		elasticSearch = services.NewTemplateService().Replace(target.ElasticSearch, options, "csv")
	}

	// groupBy
	if target.GroupBy != nil {
		switch groupByValue := target.GroupBy.Value.(type) {
		case string:
			groupBy = services.NewTemplateService().Replace(groupByValue, options, "csv")
		}
	}

	// selectedTrendColumn
	if target.SelectedTrendColumn != nil && target.SelectedTrendColumn.Value != nil {
		if trendColumnValue, ok := target.SelectedTrendColumn.Value.(string); ok {
			trendColumn = services.NewTemplateService().Replace(trendColumnValue, options, "csv")
		}
	}

	// selectedTrendBy
	if target.SelectedTrendBy != nil && target.SelectedTrendBy.Value != nil {
		if trendByValue, ok := target.SelectedTrendBy.Value.(string); ok {
			trendBy = services.NewTemplateService().Replace(trendByValue, options, "csv")
		}
	}

	// trendPeriod
	if target.TrendPeriod != "" {
		parsedPeriod, err := strconv.Atoi(target.TrendPeriod)
		if err == nil && parsedPeriod > 0 {
			period = parsedPeriod
		}
	}

	// Construct request body
	bodyData := map[string]interface{}{
		"targets": []map[string]interface{}{
			{
				"target":      table,
				"sysparm":     sysparam,
				"esSearch":    elasticSearch,
				"trendColumn": trendColumn,
				"trendBy":     trendBy,
				"period":      period,
				"groupBy":     groupBy,
			},
		},
	}

	// Construct request URL
	trendURL := sm.APIPath + "/v1/query/trend?startTime=" + timeFrom + "&endTime=" + timeTo

	// Send API request
	responseBytes, err := sm.APIClient.Request("POST", trendURL, bodyData, cacheOverride)
	if err != nil {
		return nil, fmt.Errorf("trend data query error: %w", err)
	}

	// Parse the response data
	var response struct {
		Data map[string]map[string]interface{} `json:"data"`
	}
	if err := json.Unmarshal(responseBytes, &response); err != nil {
		return nil, fmt.Errorf("error unmarshaling response data: %w", err)
	}

	// Map the response to frames
	frames := client.MapTrendResponseToFrame(response.Data, refID)

	// Marshal frames to JSON for returning
	framesJSON, err := json.Marshal(frames)
	if err != nil {
		return nil, fmt.Errorf("error marshaling frames to JSON: %w", err)
	}

	return framesJSON, nil
}

func (sm *SNOWManager) GetOutageStatus(
	target models.PluginQuery,
	timeFrom string,
	timeTo string,
	options map[string]string,
	cacheOverride string,
	refID string,
) ([]byte, error) {
	var (
		ciIds       string
		sysparam    string
		limit       int = 9999
		page        int = 0
		showPercent bool
	)

	// selectedServiceList
	if target.SelectedServiceList != nil && target.SelectedServiceList.Value != nil {
		if serviceValue, ok := target.SelectedServiceList.Value.(string); ok {
			ciIds = services.NewTemplateService().Replace(serviceValue, options, "csv")
		}
	}

	// sysparam_query
	if target.SysparamQuery != "" {
		parsedSysParams := sm.SingleSysParamQuery(target.SysparamQuery)
		sysparam = sm.ParseBasicSysparm(parsedSysParams, options)
	}

	// showPercent
	if target.ShowPercent {
		showPercent = true
	}

	// rowLimit
	if target.RowLimit != "" {
		if parsedLimit, err := strconv.Atoi(target.RowLimit); err == nil {
			if parsedLimit > 0 && parsedLimit < 10000 {
				limit = parsedLimit
			}
		}
	}

	// page
	if target.Page >= 0 {
		page = target.Page
	}

	// request body
	bodyData := map[string]interface{}{
		"targets": []map[string]interface{}{
			{
				"target":      ciIds,
				"showPercent": showPercent,
				"sysparm":     sysparam,
				"limit":       limit,
				"page":        page,
			},
		},
	}

	// Construct request URL
	outageURL := sm.APIPath + "/v1/query/outage?startTime=" + timeFrom + "&endTime=" + timeTo

	// Send API request
	response, err := sm.APIClient.Request("POST", outageURL, bodyData, cacheOverride)
	if err != nil {
		return nil, fmt.Errorf("outage status query error: %w", err)
	}

	// Parse the response data
	var result []map[string]interface{}
	if err := json.Unmarshal(response, &result); err != nil {
		return nil, fmt.Errorf("error unmarshaling response data: %w", err)
	}

	// Map the response to frames
	var frames []*data.Frame
	if showPercent {
		for _, entry := range result {
			frame := client.MapTextResponseToFrame([]map[string]interface{}{entry}, refID)
			if frame != nil {
				frames = append(frames, frame)
			}
		}
	} else {
		frames = client.MapOutageResponseToFrame(result, refID)
	}

	// Marshal frames to JSON for returning
	framesJSON, err := json.Marshal(frames)
	if err != nil {
		return nil, fmt.Errorf("error marshaling frames to JSON: %w", err)
	}

	return framesJSON, nil
}

func (sm *SNOWManager) GetAnomaly(
	target models.PluginQuery,
	timeFrom string,
	timeTo string,
	options map[string]string,
	cacheOverride string,
	refID string,
) ([]byte, error) {
	var (
		tableColumns  string
		sysparam      string
		limit         int = 9999
		page          int = 0
		sortBy        string
		sortDirection string
	)

	// selectedTableColumns
	// tableColumns := ""
	if target.SelectedTableColumns != nil {
		for _, col := range target.SelectedTableColumns {
			if columnValue, ok := col.Value.(string); ok {
				tableColumns += services.NewTemplateService().Replace(columnValue, options, "csv") + ","
			}
		}
		tableColumns = strings.TrimSuffix(tableColumns, ",")
	}
	// if target.SelectedTableColumns != nil && target.SelectedTableColumns.Value != nil {
	// 	for _, value := range target.SelectedTableColumns.Value.([]interface{}) {
	// 		if columnValue, ok := value.(string); ok {
	// 			tableColumns += services.NewTemplateService().Replace(columnValue, options, "csv") + ","
	// 		}
	// 	}
	// 	tableColumns = strings.TrimSuffix(tableColumns, ",")
	// }

	// sysparam_query
	if target.SysparamQuery != "" {
		parsedSysparams := sm.SingleSysParamQuery(target.SysparamQuery)
		sysparam = sm.ParseBasicSysparm(parsedSysparams, options)
	}

	// rowLimit
	if target.RowLimit != "" {
		if convRowLimit, err := strconv.Atoi(target.RowLimit); err == nil {
			if convRowLimit > 0 && convRowLimit < 10000 {
				limit = convRowLimit
			}
		}
	}

	// page
	if target.Page >= 0 {
		page = target.Page
	}

	// sortBy and sortDirection
	if target.SortBy != nil && target.SortBy.Value != nil && target.SortDirection != "" {
		sortBy = services.NewTemplateService().Replace(target.SortBy.Value.(string), options, "csv")
		sortDirection = target.SortDirection
	}

	// request body
	bodyData := map[string]interface{}{
		"targets": []map[string]interface{}{
			{
				"columns":       tableColumns,
				"sysparm":       sysparam,
				"limit":         limit,
				"page":          page,
				"sortBy":        sortBy,
				"sortDirection": sortDirection,
			},
		},
	}

	anomalyURL := sm.APIPath + "/v1/query/anomaly?startTime=" + timeFrom + "&endTime=" + timeTo

	// Send API request
	response, err := sm.APIClient.Request("POST", anomalyURL, bodyData, cacheOverride)
	if err != nil {
		return nil, fmt.Errorf("anomaly query error: %w", err)
	}

	var result []map[string]interface{}
	if err := json.Unmarshal(response, &result); err != nil {
		return nil, fmt.Errorf("error unmarshaling response data: %w", err)
	}

	frames := client.MapTextResponseToFrame(result, refID)

	// Marshal frames to JSON for returning
	framesJSON, err := json.Marshal(frames)
	if err != nil {
		return nil, fmt.Errorf("error marshaling frames to JSON: %w", err)
	}

	return framesJSON, nil
}
