package snowmanager

import (
	"encoding/json"
	"fmt"
	"strings"

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
	target map[string]interface{},
	timeFrom string,
	timeTo string,
	options map[string]string,
	instanceName string,
	cacheOverride string,
) (*data.Frame, error) {
	if utils.DebugLevel() == 1 {
		fmt.Println("Inside GetAlerts")
		fmt.Printf("Target: %+v\n", target)
		fmt.Printf("Scoped Vars: %+v\n", options)
	}

	//Extract Service and CI information
	service := ""
	if selectedServiceList, ok := target["selectedServiceList"].(map[string]interface{}); ok {
		if value, exists := selectedServiceList["value"].(string); exists {
			service = utils.ReplaceTargetUsingTemplVarsCSV(value, options)
		}
	}

	var ci string
	if selectedSourceList, ok := target["selectedSourceList"].([]interface{}); ok {
		var sourceArray []string
		for _, listItem := range selectedSourceList {
			if listMap, valid := listItem.(map[string]interface{}); valid {
				if value, exists := listMap["value"].(string); exists {
					sourceArray = append(sourceArray, utils.ReplaceTargetUsingTemplVars(value, options))
				}
			}
		}
		ci = utils.CreateRegEx(sourceArray)
		fmt.Println("ciIds:", ci)
	}

	bodyTarget := service
	alertState := "All"
	alertType := "none"
	sysQuery := ""

	// Determine alertState, alertType, and sysQuery
	if selectedAlertStateList, ok := target["selectedAlertStateList"].(map[string]interface{}); ok {
		if value, exists := selectedAlertStateList["value"].(string); exists {
			alertState = value
		}
	}

	if selectedAlertTypeList, ok := target["selectedAlertTypeList"].(map[string]interface{}); ok {
		if value, exists := selectedAlertTypeList["value"].(string); exists {
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

	if sysparamQuery, ok := target["sysparam_query"].(string); ok {
		parsedSysParam := sm.SingleSysParamQuery(sysparamQuery)
		fmt.Println("NULL SYS PARAM:", parsedSysParam)
		sysQuery = sm.ParseBasicSysparm(parsedSysParam, options)
		fmt.Println("PARSE BASIC SYSPARM:", sysQuery)
	}

	// Handle tags
	tagString := utils.GenerateTagString(target, options)

	//Sorting and pagination parameters
	sortBy, sortDirection := "", ""
	if value, exists := target["sortBy"].(map[string]interface{})["value"].(string); exists {
		sortBy = utils.ReplaceTargetUsingTemplVarsCSV(value, options)
	}
	if direction, exists := target["sortDirection"].(string); exists {
		sortDirection = direction
	}

	limit, page := 9999, 0
	if rowLimit, exists := target["rowLimit"].(int); exists && rowLimit > 0 && rowLimit < 10000 {
		limit = rowLimit
	}
	if pageValue, exists := target["page"].(int); exists && pageValue >= 0 {
		page = pageValue
	}

	timerangeColumn := "sys_updated_on"
	if grafanaTimerangeColumn, exists := target["grafanaTimerangeColumn"].(map[string]interface{})["value"].(string); exists {
		timerangeColumn = utils.ReplaceTargetUsingTemplVarsCSV(grafanaTimerangeColumn, options)
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

	url := sm.APIPath + "/v1/query/alerts"
	if grafanaTimerange, exists := target["grafanaTimerange"].(bool); exists && grafanaTimerange {
		url += fmt.Sprintf("?startTime=%s&endTime=%s&timerangeColumn=%s", timeFrom, timeTo, timerangeColumn)
	}

	if utils.DebugLevel() == 1 {
		fmt.Println("Service after replace:", service)
		fmt.Println("Request Body:", bodyData)
		fmt.Println("Request URL:", url)
	}

	//HTTP request
	bodyJSON, err := json.Marshal(bodyData)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal request body: %w", err)
	}

	responseBytes, err := sm.APIClient.Request("POST", url, bodyJSON, cacheOverride)
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

	return client.MapTextResponseToFrame(formattedResults, target["refId"].(string)), nil
}

func (sm *SNOWManager) QueryTable(target map[string]interface{}, timeFrom, timeTo string, options map[string]interface{}, cacheOverride string) (*data.Frame, error) {
	if utils.DebugLevel() == 1 {
		fmt.Println("queryTable target: ", target)
	}

	// Extract scopedVars
	scopedVars, ok := options["scopedVars"].(map[string]string)
	if !ok {
		return nil, fmt.Errorf("expected scopedVars to be of type map[string]string")
	}

	// Extract tableName
	tableName := ""
	if targetTableName, ok := target["tableName"].(map[string]interface{}); ok {
		if value, ok := targetTableName["value"].(string); ok {
			tableName = utils.ReplaceTargetUsingTemplVars(value, scopedVars)
		}
	}

	// Extract tableColumns
	tableColumns := ""
	if selectedColumns, ok := target["selectedtableColumns"].([]interface{}); ok {
		var columns []string
		for _, listItem := range selectedColumns {
			if columnMap, ok := listItem.(map[string]interface{}); ok {
				if value, ok := columnMap["value"].(string); ok {
					columns = append(columns, utils.ReplaceTargetUsingTemplVars(value, scopedVars))
				}
			}
		}
		tableColumns = strings.Join(columns, ",")
	}

	// Extract sysparam
	sysparam := ""
	if basicSysparam, ok := target["basicSysparm"].([]interface{}); ok {
		var sysparamQuery []models.SysParamColumnObject
		for _, item := range basicSysparam {
			if row, ok := item.(map[string]interface{}); ok {
				rowBytes, err := json.Marshal(row)
				if err != nil {
					return nil, fmt.Errorf("failed to marshal sysparam row: %w", err)
				}
				var sysParamObj models.SysParamColumnObject
				if err := json.Unmarshal(rowBytes, &sysParamObj); err != nil {
					return nil, fmt.Errorf("failed to unmarshal sysparam row: %w", err)
				}
				sysparamQuery = append(sysparamQuery, sysParamObj)
			}
		}
		sysparam = sm.ParseBasicSysparm(sysparamQuery, scopedVars)
	}

	// Determine row limit
	limit := 9999
	if rowLimit, ok := target["rowLimit"].(float64); ok {
		if rowLimit > 0 && rowLimit < 10000 {
			limit = int(rowLimit)
		}
	}

	// Determine page number
	page := 0
	if pageNum, ok := target["page"].(float64); ok {
		if pageNum >= 0 {
			page = int(pageNum)
		}
	}

	// Process sortBy and sortDirection
	sortBy := ""
	sortDirection := ""
	if sortByMap, ok := target["sortBy"].(map[string]interface{}); ok {
		if sortValue, ok := sortByMap["value"].(string); ok {
			// Type assertion for scopedVars
			scopedVars, ok := options["scopedVars"].(map[string]string)
			if !ok {
				return nil, fmt.Errorf("expected scopedVars to be of type map[string]string")
			}
			sortBy = utils.ReplaceTargetUsingTemplVarsCSV(sortValue, scopedVars)
		}
	}
	if sortDir, ok := target["sortDirection"].(string); ok {
		sortDirection = sortDir
	}

	// Process getAlertCount
	getAlertCount := "false"
	if alertCount, ok := target["getAlertCount"].(map[string]interface{}); ok {
		if value, ok := alertCount["value"].(string); ok {
			getAlertCount = value
		}
	}

	// Process timerangeColumn
	timerangeColumn := "sys_updated_on"
	if timerangeCol, ok := target["grafanaTimerangeColumn"].(map[string]interface{}); ok {
		if value, ok := timerangeCol["value"].(string); ok {
			scopedVars, ok := options["scopedVars"].(map[string]string)
			if !ok {
				return nil, fmt.Errorf("expected scopedVars to be of type map[string]string")
			}
			timerangeColumn = utils.ReplaceTargetUsingTemplVarsCSV(value, scopedVars)
		}
	}

	// Construct bodyData
	bodyData := fmt.Sprintf(`{"targets":[{"target":"%s","columns":"%s","sysparm":"%s","limit":%d,"page":%d,"sortBy":"%s","sortDirection":"%s","getAlertCount":%s}]}`,
		tableName, tableColumns, sysparam, limit, page, sortBy, sortDirection, getAlertCount)

	// Construct URL
	url := sm.APIPath + "/v1/query/table"
	if _, ok := target["grafanaTimerange"]; ok {
		url += fmt.Sprintf("?startTime=%s&endTime=%s&timerangeColumn=%s", timeFrom, timeTo, timerangeColumn)
	}

	if utils.DebugLevel() == 1 {
		utils.PrintDebug(target)
		utils.PrintDebug(bodyData)
	}

	// HTTP request
	responseBytes, err := sm.APIClient.Request("POST", url, bodyData, cacheOverride)
	if err != nil {
		return nil, fmt.Errorf("table query error: %w", err)
	}

	utils.PrintDebug("Print table query response from SNOW")
	utils.PrintDebug(string(responseBytes))

	// Parse and extract result
	var response map[string]interface{}
	if err := json.Unmarshal(responseBytes, &response); err != nil {
		return nil, fmt.Errorf("failed to parse response: %w", err)
	}

	result, ok := response["result"].([]map[string]interface{})
	if !ok {
		return nil, fmt.Errorf("unexpected result format")
	}
	return client.MapTextResponseToFrame(result, target["refId"].(string)), nil
}

func (sm *SNOWManager) GetRowCount(target map[string]interface{}, timeFrom, timeTo string, options map[string]interface{}, cacheOverride string) (*data.Frame, error) {
	// Extract tableName
	tableName := ""
	if tableNameMap, ok := target["tableName"].(map[string]interface{}); ok {
		if value, ok := tableNameMap["value"].(string); ok {
			scopedVars, ok := options["scopedVars"].(map[string]string)
			if !ok {
				return nil, fmt.Errorf("expected scopedVars to be of type map[string]string")
			}
			tableName = utils.ReplaceTargetUsingTemplVars(value, scopedVars)
		}
	}

	sysparam := ""
	if sysparamQuery, ok := target["sysparam_query"].(string); ok {
		parsedSysParam := sm.SingleSysParamQuery(sysparamQuery)
		fmt.Println("NULL SYS PARAM: ", parsedSysParam)

		scopedVars, ok := options["scopedVars"].(map[string]string)
		if !ok {
			return nil, fmt.Errorf("expected scopedVars to be of type map[string]string")
		}

		sysparam = sm.ParseBasicSysparm(parsedSysParam, scopedVars)
		fmt.Println("PARSE BASIC SYSPARM: ", sysparam)
	}

	// Extract timerangeColumn
	timerangeColumn := "sys_updated_on"
	if timerangeColMap, ok := target["grafanaTimerangeColumn"].(map[string]interface{}); ok {
		if value, ok := timerangeColMap["value"].(string); ok {
			scopedVars, ok := options["scopedVars"].(map[string]string)
			if !ok {
				return nil, fmt.Errorf("expected scopedVars to be of type map[string]string")
			}
			timerangeColumn = utils.ReplaceTargetUsingTemplVarsCSV(value, scopedVars)
		}
	}

	bodyData := fmt.Sprintf(`{"targets":[{"target":"%s","sysparm":"%s"}]}`, tableName, sysparam)

	url := sm.APIPath + "/v1/query/row_count"
	if _, ok := target["grafanaTimerange"]; ok {
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

	// Extract result and map it to a frame
	if result, ok := response["result"].([]interface{}); ok {
		mappedResults := []map[string]interface{}{}
		for _, item := range result {
			if row, ok := item.(map[string]interface{}); ok {
				mappedResults = append(mappedResults, row)
			}
		}
		return client.MapTextResponseToFrame(mappedResults, target["refId"].(string)), nil
	}

	return nil, fmt.Errorf("unexpected result format in row count response")
}

func (sm *SNOWManager) GetAggregateQuery(target map[string]interface{}, timeFrom, timeTo string, options map[string]interface{}, cacheOverride string) (*data.Frame, error) {
	tableName, groupBy, aggregateType, column, sysparam := "", "", "", "", ""

	// Extract tableName
	if tableNameMap, ok := target["tableName"].(map[string]interface{}); ok {
		if value, ok := tableNameMap["value"].(string); ok {
			scopedVars, ok := options["scopedVars"].(map[string]string)
			if !ok {
				return nil, fmt.Errorf("expected scopedVars to be of type map[string]string")
			}
			tableName = utils.ReplaceTargetUsingTemplVars(value, scopedVars)
		}
	}

	// Extract groupBy
	if groupByVal, ok := target["groupBy"].(string); ok && groupByVal != "" {
		scopedVars, ok := options["scopedVars"].(map[string]string)
		if !ok {
			return nil, fmt.Errorf("expected scopedVars to be of type map[string]string")
		}
		groupBy = utils.ReplaceTargetUsingTemplVarsCSV(groupByVal, scopedVars)
	} else if groupByMap, ok := target["groupBy"].(map[string]interface{}); ok {
		if value, ok := groupByMap["value"].(string); ok {
			scopedVars, ok := options["scopedVars"].(map[string]string)
			if !ok {
				return nil, fmt.Errorf("expected scopedVars to be of type map[string]string")
			}
			groupBy = utils.ReplaceTargetUsingTemplVarsCSV(value, scopedVars)
		}
	}

	// Extract aggregate type
	if selectedAggregateTypeMap, ok := target["selectedAggregateType"].(map[string]interface{}); ok {
		if value, ok := selectedAggregateTypeMap["value"].(string); ok {
			aggregateType = value
		}
	}

	// Extract aggregate column
	if aggregateColumnMap, ok := target["aggregateColumn"].(map[string]interface{}); ok {
		if value, ok := aggregateColumnMap["value"].(string); ok {
			scopedVars, ok := options["scopedVars"].(map[string]string)
			if !ok {
				return nil, fmt.Errorf("expected scopedVars to be of type map[string]string")
			}
			column = utils.ReplaceTargetUsingTemplVarsCSV(value, scopedVars)
		}
	}

	if sysparamQuery, ok := target["sysparam_query"].(string); ok {
		parsedSysParam := sm.SingleSysParamQuery(sysparamQuery)
		fmt.Println("NULL SYS PARAM: ", parsedSysParam)

		scopedVars, ok := options["scopedVars"].(map[string]string)
		if !ok {
			return nil, fmt.Errorf("expected scopedVars to be of type map[string]string")
		}

		sysparam = sm.ParseBasicSysparm(parsedSysParam, scopedVars)
		fmt.Println("PARSE BASIC SYSPARM: ", sysparam)
	}

	limit := 9999
	if rowLimit, ok := target["rowLimit"].(int); ok && rowLimit > 0 && rowLimit < 10000 {
		limit = rowLimit
	}

	// Extract timerangeColumn
	timerangeColumn := "sys_updated_on"
	if timerangeColMap, ok := target["grafanaTimerangeColumn"].(map[string]interface{}); ok {
		if value, ok := timerangeColMap["value"].(string); ok {
			scopedVars, ok := options["scopedVars"].(map[string]string)
			if !ok {
				return nil, fmt.Errorf("expected scopedVars to be of type map[string]string")
			}
			timerangeColumn = utils.ReplaceTargetUsingTemplVarsCSV(value, scopedVars)
		}
	}

	// Construct bodyData
	bodyData := fmt.Sprintf(
		`{"targets":[{"target":"%s","type":"%s","column":"%s","groupBy":"%s","sysparm":"%s","limit":%d}]}`,
		tableName, aggregateType, column, groupBy, sysparam, limit,
	)

	url := sm.APIPath + "/v1/query/aggregate"
	if _, ok := target["grafanaTimerange"]; ok {
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

	var response map[string]interface{}
	if err := json.Unmarshal(responseBytes, &response); err != nil {
		return nil, fmt.Errorf("failed to parse response: %w", err)
	}

	// Extract result and map it to a frame
	if result, ok := response["result"].([]interface{}); ok {
		mappedResults := []map[string]interface{}{}
		for _, item := range result {
			if row, ok := item.(map[string]interface{}); ok {
				mappedResults = append(mappedResults, row)
			}
		}
		return client.MapTextResponseToFrame(mappedResults, target["refId"].(string)), nil
	}

	return nil, fmt.Errorf("unexpected result format in aggregate query response")
}

func (sm *SNOWManager) GetGeohashMap(target map[string]interface{}, options map[string]interface{}, cacheOverride string) (*data.Frame, error) {
	tableName, groupBy, sysparam := "", "", ""

	if tableNameMap, ok := target["tableName"].(map[string]interface{}); ok {
		if value, ok := tableNameMap["value"].(string); ok {
			scopedVars, ok := options["scopedVars"].(map[string]string)
			if !ok {
				return nil, fmt.Errorf("expected scopedVars to be of type map[string]string")
			}
			tableName = utils.ReplaceTargetUsingTemplVars(value, scopedVars)
		}
	}

	if groupByVal, ok := target["groupBy"].(string); ok && groupByVal != "" {
		scopedVars, ok := options["scopedVars"].(map[string]string)
		if !ok {
			return nil, fmt.Errorf("expected scopedVars to be of type map[string]string")
		}
		groupBy = utils.ReplaceTargetUsingTemplVarsCSV(groupByVal, scopedVars)
	} else if groupByMap, ok := target["groupBy"].(map[string]interface{}); ok {
		if value, ok := groupByMap["value"].(string); ok && value != "" {
			scopedVars, ok := options["scopedVars"].(map[string]string)
			if !ok {
				return nil, fmt.Errorf("expected scopedVars to be of type map[string]string")
			}
			groupBy = utils.ReplaceTargetUsingTemplVarsCSV(value, scopedVars)
		}
	}

	if sysparamQuery, ok := target["sysparam_query"].(string); ok {
		parsedSysParam := sm.SingleSysParamQuery(sysparamQuery)
		fmt.Println("NULL SYS PARAM: ", parsedSysParam)

		scopedVars, ok := options["scopedVars"].(map[string]string)
		if !ok {
			return nil, fmt.Errorf("expected scopedVars to be of type map[string]string")
		}

		sysparam = sm.ParseBasicSysparm(parsedSysParam, scopedVars)
		fmt.Println("PARSE BASIC SYSPARM: ", sysparam)
	}

	bodyData := fmt.Sprintf(
		`{"targets":[{"target":"%s","column":"%s","sysparm":"%s"}]}`,
		tableName, groupBy, sysparam,
	)

	if utils.DebugLevel() == 1 {
		utils.PrintDebug("getGeohashMap target: ")
		utils.PrintDebug(target)
		utils.PrintDebug("getGeohashMap bodyData: ")
		utils.PrintDebug(bodyData)
	}

	url := sm.APIPath + "/v1/query/geohash_map"
	responseBytes, err := sm.APIClient.Request("POST", url, bodyData, cacheOverride)
	if err != nil {
		return nil, fmt.Errorf("geohash_map query error: %w", err)
	}

	utils.PrintDebug("Print geohash_map response from SNOW: ")
	utils.PrintDebug(string(responseBytes))

	var response map[string]interface{}
	if err := json.Unmarshal(responseBytes, &response); err != nil {
		return nil, fmt.Errorf("failed to parse response: %w", err)
	}

	if result, ok := response["result"].([]interface{}); ok {
		mappedResults := []map[string]interface{}{}
		for _, item := range result {
			if row, ok := item.(map[string]interface{}); ok {
				mappedResults = append(mappedResults, row)
			}
		}
		return client.MapTextResponseToFrame(mappedResults, target["refId"].(string)), nil
	}

	return nil, fmt.Errorf("unexpected result format in geohash_map query response")
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
