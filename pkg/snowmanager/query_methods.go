package snowmanager

import (
	"encoding/json"
	"fmt"
	"strconv"
	"strings"
	"time"

	// "github.com/grafana/grafana-plugin-sdk-go/backend"
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
	nodeGraphURL := "/v1/query/node-graph"

	// Send API request
	responseBytes, err := sm.APIClient.Request("POST", nodeGraphURL, bodyData, cacheOverride)
	if err != nil {
		return nil, fmt.Errorf("node graph query error: %w", err)
	}

	// Parse response into result
	var response map[string]interface{}
	if err := json.Unmarshal(responseBytes, &response); err != nil {
		return nil, fmt.Errorf("failed to parse response: %w", err)
	}

	// Check if the "result" field exists and is an object
	resultInterface, ok := response["result"]
	if !ok {
		backend.Logger.Error("Missing 'result' field in API response", "Response", response)
		return nil, fmt.Errorf("missing 'result' field in response")
	}

	// Handle the case where the result is an object
	if resultMap, ok := resultInterface.(map[string]interface{}); ok {
		// Check if the result is empty (nodes and edges are empty)
		nodes, nodesOk := resultMap["nodes"].([]interface{})
		edges, edgesOk := resultMap["edges"].([]interface{})
		if !nodesOk || !edgesOk {
			return nil, fmt.Errorf("invalid 'nodes' or 'edges' format in response")
		}

		if len(nodes) == 0 && len(edges) == 0 {
			return []byte("[]"), nil
		}

		// Map response to frames
		frames := utils.CreateNodeGraphFrame(resultMap, refID)

		// Marshal frames into JSON
		frameJSON, err := json.Marshal(frames)
		if err != nil {
			return nil, fmt.Errorf("failed to marshal frame to JSON: %w", err)
		}

		return frameJSON, nil
	} else {
		return nil, fmt.Errorf("unexpected result format: expected an object")
	}
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
		sourceTarget      string
		resourceName      string
		metricName        string
		// sysparam          string
		sourceArray       []string
		resourceNameArray []string
		metricNameArray   []string
	)

	// Process selectedSourceList
	if target.SelectedSourceList != nil {
		for _, source := range target.SelectedSourceList {
			if source.Value != nil {
				if strVal, ok := source.Value.(string); ok {
					sourceArray = append(sourceArray, services.NewTemplateService().Replace(strVal, options, "csv"))
				}
			}
		}
		sourceTarget = utils.CreateRegEx(sourceArray)
	}

	// Process selectedMetricTypeList
	if target.SelectedMetricTypeList != nil {
		for _, metricType := range target.SelectedMetricTypeList {
			if metricType.Value != nil {
				if strVal, ok := metricType.Value.(string); ok {
					resourceNameArray = append(resourceNameArray, services.NewTemplateService().Replace(strVal, options, "csv"))
				}
			}
		}
		resourceName = utils.CreateRegEx(resourceNameArray)
	}

	// Process selectedMetricNameList
	if target.SelectedMetricNameList != nil {
		for _, metricName := range target.SelectedMetricNameList {
			if metricName.Value != nil {
				if strVal, ok := metricName.Value.(string); ok {
					metricNameArray = append(metricNameArray, services.NewTemplateService().Replace(strVal, options, "csv"))
				}
			}
		}
		metricName = utils.CreateRegEx(metricNameArray)
	}

	// // Process sysparam_query
	// if target.SysparamQuery != "" {
	// 	parsedSysparams := sm.SingleSysParamQuery(target.SysparamQuery)
	// 	sysparam = sm.ParseBasicSysparm(parsedSysparams, options)
	// }

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
				// "sysparm_query": sysparam,
			},
		},
	}

	backend.Logger.Debug("Metric Query Body Data", "bodyData", bodyData)

	// Construct request URL
	metricURL := "/v1/query/single_metric?startTime=" + timeFrom + "&endTime=" + timeTo
	if target.MetricValueType == "latest" {
		metricURL = "/v1/query/latest_single_metric?startTime=" + timeFrom + "&endTime=" + timeTo
	}
	if metricName == "*" {
		metricURL = "/v1/query/all_metrics?startTime=" + timeFrom + "&endTime=" + timeTo
	}

	// Send API request
	responseBytes, err := sm.APIClient.Request("POST", metricURL, bodyData, cacheOverride)
	if err != nil {
		return nil, fmt.Errorf("metric query error: %w", err)
	}

	// Parse response into result
	var response map[string]interface{}
	if err := json.Unmarshal(responseBytes, &response); err != nil {
		return nil, fmt.Errorf("failed to parse response: %w", err)
	}

	// Check if the "result" field exists and is an array
	resultInterface, ok := response["result"]
	if !ok {
		backend.Logger.Error("Missing 'result' field in API response", "Response", response)
		return nil, fmt.Errorf("missing 'result' field in response")
	}

	// Handle the case where the result is an empty array (if empty response is expected)
	if resultArray, ok := resultInterface.([]interface{}); ok {
		if len(resultArray) == 0 {
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
		frames := client.MapMetricsResponseToFrame(result, refID)

		backend.Logger.Info("Metric Query Frames", "frames", frames)
		// Marshal frames into JSON
		frameJSON, err := json.Marshal(frames)
		if err != nil {
			return nil, fmt.Errorf("failed to marshal frame to JSON: %w", err)
		}

		return frameJSON, nil
	} else {
		return nil, fmt.Errorf("unexpected result format: expected an array")
	}
}

//helper function for GetAlerts
func convertToTime(value interface{}) time.Time {
    switch v := value.(type) {
    case int64: // Assuming it's a Unix timestamp in seconds
        return time.Unix(v, 0)
    case float64: // Unix timestamp in float (milliseconds)
        return time.Unix(int64(v/1000), 0)
    case string: // Assuming it's an ISO8601 formatted time string
        parsedTime, err := time.Parse(time.RFC3339, v)
        if err == nil {
            return parsedTime
        }
    case time.Time:
        return v
    }
    return time.Time{} // Default empty time
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
	if target.SelectedSourceList != nil {
		var sourceArray []string
		for _, source := range target.SelectedSourceList {
			if source.Value != nil {
				if strVal, ok := source.Value.(string); ok {
					sourceArray = append(sourceArray, services.NewTemplateService().Replace(strVal, options, "csv"))
				}
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
		sysQuery = utils.ReplaceTargetUsingTemplVars(target.SysparamQuery, options)
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
	url := "/v1/query/alerts"
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
		backend.Logger.Error("HTTP request failed", "error", err)
		return nil, fmt.Errorf("alert query error: %w", err)
	}

	var response map[string]interface{}
	if err := json.Unmarshal(responseBytes, &response); err != nil {
		backend.Logger.Error("Failed to parse response", "error", err, "ResponseBytes", string(responseBytes))
		return nil, fmt.Errorf("failed to parse response: %w", err)
	}

	// Ensure response["result"] is in the expected format before marshaling
	rawResultsInterface, ok := response["result"].([]interface{})
	if !ok {
    	backend.Logger.Error("Response result is not in expected format", "Result", response["result"])
    	return nil, fmt.Errorf("response result is not an array")
	}

	// Only marshal if the type is correct
	rawResultsBytes, err := json.Marshal(rawResultsInterface)
	if err != nil {
    	backend.Logger.Error("Failed to serialize response result", "error", err, "Result", response["result"])
    	return nil, fmt.Errorf("failed to serialize response result: %w", err)
	}


	var rawResults []client.Option
	if err := json.Unmarshal(rawResultsBytes, &rawResults); err != nil {
		return nil, fmt.Errorf("failed to deserialize response result into []Option: %w", err)
	}

	backend.Logger.Debug("Parsed raw results successfully", "RawResults", rawResults)
	
	results := client.AppendInstanceNameToResponse(rawResults, instanceName)

	// Convert []Option to the desired format
    var formattedResults []map[string]interface{}
    for _, option := range results {
        formattedResults = append(formattedResults, map[string]interface{}{
            "UpdatedRelativeTime":       option.UpdatedRelativeTime,
            "CreatedRelativeTime":       option.CreatedRelativeTime,
            "SysCreatedOn":              convertToTime(option.SysCreatedOn),
            "AlertId":                   option.AlertId,
            "Incident":                  option.Incident,
            "IncidentSysID":             option.IncidentSysID,
		//	"IncidentPriority":          option.IncidentPriority,
            "Group":                     option.Group,
            "Severity":                  option.Severity,
            "Priority":                  option.Priority,
            "State":                     option.State,
            "Acknowledged":              option.Acknowledged,
            "Summary":                   option.Summary,
            "CI":                        option.CI,
            "CIClass":                   option.CIClass,
            "CISysID":                   option.CISysID,
            "MetricName":                option.MetricName,
            "Resource":                  option.Resource,
            "Source":                    option.Source,
            "Maintenance":               option.Maintenance,
            "Description":               option.Description,
            "EventCount":                option.EventCount,
            "IsGroup":                   option.IsGroup,
            "SeverityNum":               option.SeverityNum,
            "PriorityNum":               option.PriorityNum,
            "Updated":                   convertToTime(option.Updated),
           "LastEventTime":             convertToTime(option.LastEventTime),
            "SysID":                     option.SysID,
            "AdditionalInfo":            option.AdditionalInfo,
            "Type":                      option.Type,
            "UIAction":                  option.UIAction,
            "AnnotationText":            option.AnnotationText,
            "AnomalyCount":              option.AnomalyCount,
            "Node":                      option.Node,
            "StartTime":                 convertToTime(option.StartTime),
            "SecondaryAlerts":           option.SecondaryAlerts,
            "SecondaryDistinctSources":  option.SecondaryDistinctSources,
            "DrilldownSysID":            option.DrilldownSysID,
            "ImpactedServicesCount":     option.ImpactedServicesCount,
            "ImpactedServices":          option.ImpactedServices,
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

	// Extract sysparam
	sysparam := ""
	// Process basicSysparm
	if len(target.BasicSysparm) > 0 {
        for _, param := range target.BasicSysparm {
            if param.Column != nil && param.Operator != nil && param.Value != nil {
                column := utils.ReplaceTargetUsingTemplVars(param.Column.Value.(string), scopedVars)
                operator := utils.ReplaceTargetUsingTemplVars(param.Operator.Value.(string), scopedVars)
                value := utils.ReplaceTargetUsingTemplVars(param.Value.Value.(string), scopedVars)

                // Construct the sysparam condition
                condition := fmt.Sprintf("%s%s%s", column, operator, value)
                if sysparam != "" {
                    sysparam += "^"
                }
                sysparam += condition
            }
        }
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

	// Process sortDirection
	sortDirection := "ASC"
	if target.SortDirection != "" {
		validDirections := map[string]bool{"ASC": true, "DESC": true}
		if _, valid := validDirections[target.SortDirection]; valid {
			sortDirection = target.SortDirection
		}
	}

	// Process sortBy
	sortBy := ""
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

	if utils.DebugLevel() == 1 {
		fmt.Println("Response from API:", string(responseBytes))
	}

	// Parse response into result
	var response map[string]interface{}
	if err := json.Unmarshal(responseBytes, &response); err != nil {
		return nil, fmt.Errorf("failed to parse response: %w", err)
	}

	// Check if the "result" field exists and is an array
	resultInterface, ok := response["result"]
	if !ok {
		backend.Logger.Error("Missing 'result' field in API response", "Response", response)
		return nil, fmt.Errorf("missing 'result' field in response")
	}

	// Handle the case where the result is an empty array (if empty response is expected)
	if resultArray, ok := resultInterface.([]interface{}); ok {
		if len(resultArray) == 0 {
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

		backend.Logger.Info("Table Result", "result", result)
		// Map response to frames
		frame := client.MapTextResponseToFrame(result, refID)
		backend.Logger.Info("Table frames", "frames", frame)

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
		sysparam = utils.ReplaceTargetUsingTemplVars(target.SysparamQuery, options)
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
				"sysparm": sysparam,
			},
		},
	}

	url := "/v1/query/row_count"
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

	// Parse response into result
	var response map[string]interface{}
	if err := json.Unmarshal(responseBytes, &response); err != nil {
		return nil, fmt.Errorf("failed to parse response: %w", err)
	}

	// Check if the "result" field exists and is an array
	resultInterface, ok := response["result"]
	if !ok {
		backend.Logger.Error("Missing 'result' field in API response", "Response", response)
		return nil, fmt.Errorf("missing 'result' field in response")
	}

	// Handle the case where the result is an empty array (if empty response is expected)
	if resultArray, ok := resultInterface.([]interface{}); ok {
		if len(resultArray) == 0 {
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
		sysparam = utils.ReplaceTargetUsingTemplVars(target.SysparamQuery, options)
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

	// Check if the "result" field exists and is an array
	resultInterface, ok := response["result"]
	if !ok {
		backend.Logger.Error("Missing 'result' field in API response", "Response", response)
		return nil, fmt.Errorf("missing 'result' field in response")
	}

	// Handle the case where the result is an empty array (if empty response is expected)
	if resultArray, ok := resultInterface.([]interface{}); ok {
		if len(resultArray) == 0 {
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
		sysparam = utils.ReplaceTargetUsingTemplVars(target.SysparamQuery, options)
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
	url := "/v1/query/geohash_map"
	responseBytes, err := sm.APIClient.Request("POST", url, bodyData, cacheOverride)
	if err != nil {
		return nil, fmt.Errorf("geohash_map query error: %w", err)
	}
	if utils.DebugLevel() == 1 {
		fmt.Println("Print geohash_map response from SNOW: ", string(responseBytes))
	}

	// Parse response
	// Parse response into result
	var response map[string]interface{}
	if err := json.Unmarshal(responseBytes, &response); err != nil {
		return nil, fmt.Errorf("failed to parse response: %w", err)
	}

	// Check if the "result" field exists and is an array
	resultInterface, ok := response["result"]
	if !ok {
		backend.Logger.Error("Missing 'result' field in API response", "Response", response)
		return nil, fmt.Errorf("missing 'result' field in response")
	}

	// Handle the case where the result is an empty array (if empty response is expected)
	if resultArray, ok := resultInterface.([]interface{}); ok {
		if len(resultArray) == 0 {
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

	// Process basicSysparm
	if len(target.BasicSysparm) > 0 {
        for _, param := range target.BasicSysparm {
            if param.Column != nil && param.Operator != nil && param.Value != nil {
                column := utils.ReplaceTargetUsingTemplVars(param.Column.Value.(string), options)
                operator := utils.ReplaceTargetUsingTemplVars(param.Operator.Value.(string), options)
                value := utils.ReplaceTargetUsingTemplVars(param.Value.Value.(string), options)

                // Construct the sysparam condition
                condition := fmt.Sprintf("%s%s%s", column, operator, value)
                if sysparam != "" {
                    sysparam += "^"
                }
                sysparam += condition
            }
        }
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

	// Send API request
	responseBytes, err := sm.APIClient.Request("POST", "/v1/query/logs", bodyData, cacheOverride)
	if err != nil {
		return nil, fmt.Errorf("log data query error: %w", err)
	}

	// Parse response into result
	var response map[string]interface{}
	if err := json.Unmarshal(responseBytes, &response); err != nil {
		return nil, fmt.Errorf("failed to parse response: %w", err)
	}

	// Check if the "result" field exists and is an array
	resultInterface, ok := response["result"]
	if !ok {
		return nil, fmt.Errorf("missing 'result' field in response")
	}

	// Handle the case where the result is an empty array (if empty response is expected)
	if resultArray, ok := resultInterface.([]interface{}); ok {
		if len(resultArray) == 0 {
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

	// Process basicSysparm
	if len(target.BasicSysparm) > 0 {
		 for _, param := range target.BasicSysparm {
            if param.Column != nil && param.Operator != nil && param.Value != nil {
                column := utils.ReplaceTargetUsingTemplVars(param.Column.Value.(string), options)
                operator := utils.ReplaceTargetUsingTemplVars(param.Operator.Value.(string), options)
                value := utils.ReplaceTargetUsingTemplVars(param.Value.Value.(string), options)

                // Construct the sysparam condition
                condition := fmt.Sprintf("%s%s%s", column, operator, value)
                if sysparam != "" {
                    sysparam += "^"
                }
                sysparam += condition
            }
        }
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
	trendURL := "/v1/query/trend?startTime=" + timeFrom + "&endTime=" + timeTo

	// Send API request
	responseBytes, err := sm.APIClient.Request("POST", trendURL, bodyData, cacheOverride)
	if err != nil {
		return nil, fmt.Errorf("trend data query error: %w", err)
	}

	// Parse the response data
	var response struct {
		Result []map[string]interface{} `json:"result"`
	}
	if err := json.Unmarshal(responseBytes, &response); err != nil {
		return nil, fmt.Errorf("error unmarshaling response data: %w", err)
	}

	backend.Logger.Info("Trend data response: ", "response", response)

	// Map the response to frames
	frames := client.MapTrendResponseToFrame(response.Result, refID)
	backend.Logger.Info("Trend data frames: ", "frames", frames)

	// Marshal frames to JSON for returning
	framesJSON, err := json.Marshal(frames)
	if err != nil {
		return nil, fmt.Errorf("error marshaling frames to JSON: %w", err)
	}
	backend.Logger.Info("Trend data frame json: ", "framesJson", framesJSON)

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
		sysparam = utils.ReplaceTargetUsingTemplVars(target.SysparamQuery, options)
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
	outageURL := "/v1/query/outage?startTime=" + timeFrom + "&endTime=" + timeTo

	// Send API request
	responseBytes, err := sm.APIClient.Request("POST", outageURL, bodyData, cacheOverride)
	if err != nil {
		return nil, fmt.Errorf("outage status query error: %w", err)
	}

	// Parse response into result
	var response map[string]interface{}
	if err := json.Unmarshal(responseBytes, &response); err != nil {
		return nil, fmt.Errorf("failed to parse response: %w", err)
	}

	// Check if the "result" field exists and is an array
	resultInterface, ok := response["result"]
	if !ok {
		backend.Logger.Error("Missing 'result' field in API response", "Response", response)
		return nil, fmt.Errorf("missing 'result' field in response")
	}

	// Handle the case where the result is an empty array (if empty response is expected)
	if resultArray, ok := resultInterface.([]interface{}); ok {


		
		if len(resultArray) == 0 {
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

		// Map response to frames
		frame := client.MapOutageResponseToFrame(result, refID, showPercent)

		// Marshal frames into JSON
		frameJSON, err := json.Marshal(frame)
		if err != nil {
			return nil, fmt.Errorf("failed to marshal frame to JSON: %w", err)
		}

		return frameJSON, nil
	} else {
		return nil, fmt.Errorf("unexpected result format: expected an array")
	}
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

	// Process basicSysparm
	if len(target.BasicSysparm) > 0 {
        for _, param := range target.BasicSysparm {
            if param.Column != nil && param.Operator != nil && param.Value != nil {
                column := utils.ReplaceTargetUsingTemplVars(param.Column.Value.(string), options)
                operator := utils.ReplaceTargetUsingTemplVars(param.Operator.Value.(string), options)
                value := utils.ReplaceTargetUsingTemplVars(param.Value.Value.(string), options)

                // Construct the sysparam condition
                condition := fmt.Sprintf("%s%s%s", column, operator, value)
                if sysparam != "" {
                    sysparam += "^"
                }
                sysparam += condition
            }
        }
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

	anomalyURL := "/v1/query/anomaly?startTime=" + timeFrom + "&endTime=" + timeTo

	// Send API request
	responseBytes, err := sm.APIClient.Request("POST", anomalyURL, bodyData, cacheOverride)
	if err != nil {
		return nil, fmt.Errorf("anomaly query error: %w", err)
	}

	// Parse response into result
	var response map[string]interface{}
	if err := json.Unmarshal(responseBytes, &response); err != nil {
		return nil, fmt.Errorf("failed to parse response: %w", err)
	}

	// Check if the "result" field exists and is an array
	resultInterface, ok := response["result"]
	if !ok {
		backend.Logger.Error("Missing 'result' field in API response", "Response", response)
		return nil, fmt.Errorf("missing 'result' field in response")
	}

	// Handle the case where the result is an empty array (if empty response is expected)
	if resultArray, ok := resultInterface.([]interface{}); ok {
		if len(resultArray) == 0 {
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
