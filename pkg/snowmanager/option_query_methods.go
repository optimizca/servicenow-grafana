package snowmanager

import (
	"encoding/json"
	"errors"
	"fmt"
	"strings"

	"github.com/optimizca/servicenow-grafana/pkg/client"
	"github.com/optimizca/servicenow-grafana/pkg/utils"
)

type QueryOption struct {
	label       string `json:"label"`
	value       string `json:"value"`
	description string `json:"description,omitempty"`
}

func GetMetricAnomalyOptions() []QueryOption {
	return []QueryOption{
		{label: "true", value: "true"},
		{label: "false", value: "false"},
	}
}

func GetAlertTypeOptions() []QueryOption {
	return []QueryOption{
		{
			label:       "CI",
			value:       "CI",
			description: "Get Alerts at the CI level",
		},
		{
			label:       "Service",
			value:       "Service",
			description: "Get Alerts at the Service level",
		},
		{
			label:       "None",
			value:       "None",
			description: "Ignore CI selection and use sysparam_query",
		},
	}
}

func GetAlertStateOptions() []QueryOption {
	return []QueryOption{
		{
			label:       "Active",
			value:       "Active",
			description: "Get Open and Reopen Alerts",
		},
		{
			label:       "All",
			value:       "All",
			description: "Get All alerts Open,Reopen, and Closed",
		},
	}
}

func GetAggregateTypeOptions() []QueryOption {
	return []QueryOption{
		{label: "AVG", value: "AVG"}, {label: "COUNT", value: "COUNT"},
		{label: "MIN", value: "MIN"}, {label: "MAX", value: "MAX"},
		{label: "STDDEV", value: "STDDEV"}, {label: "SUM", value: "SUM"},
	}
}

func GetOperatorOptions(typeStr string) []QueryOption {
	if typeStr == "True/False" {
		return []QueryOption{
			{label: "is", value: "=", description: "="},
			{label: "is not", value: "!=", description: "!="},
			{label: "is empty", value: "ISEMPTY", description: "ISEMPTY"},
			{label: "is not empty", value: "ISNOTEMPTY", description: "ISNOTEMPTY"},
			{label: "is anything", value: "ANYTHING", description: "ANYTHING"},
			{label: "is same", value: "SAMEAS", description: "SAMEAS"},
			{label: "is different", value: "NSAMEAS", description: "NSAMEAS"},
		}
	} else if typeStr == "Integer" || typeStr == "Long" || typeStr == "Decimal" || typeStr == "Floating Point Number" {
		return []QueryOption{
			{label: "is", value: "=", description: "="},
			{label: "is not", value: "!=", description: "!="},
			{label: "is empty", value: "ISEMPTY", description: "ISEMPTY"},
			{label: "is not empty", value: "ISNOTEMPTY", description: "ISNOTEMPTY"},
			{label: "less than", value: "<", description: "<"},
			{label: "greater than", value: ">", description: ">"},
			{label: "less than or is", value: "<=", description: "<="},
			{label: "greater than or is", value: ">=", description: ">="},
			{label: "between", value: "BETWEEN", description: "BETWEEN"},
			{label: "is anything", value: "ANYTHING", description: "ANYTHING"},
			{label: "is same", value: "SAMEAS", description: "SAMEAS"},
			{label: "is different", value: "NSAMEAS", description: "NSAMEAS"},
			{label: "greater than field", value: "GT_FIELD", description: "GT_FIELD"},
			{label: "less than field", value: "LT_FIELD", description: "LT_FIELD"},
			{label: "greater than or is field", value: "GT_OR_EQUALS_FIELD", description: "GT_OR_EQUALS_FIELD"},
			{label: "less than or is field", value: "LT_OR_EQUALS_FIELD", description: "LT_OR_EQUALS_FIELD"},
		}
	} else if typeStr == "Date/Time" || typeStr == "Date" || typeStr == "Time" {
		return []QueryOption{
			{label: "on", value: "ON", description: "ON"},
			{label: "not on", value: "NOTON", description: "NOTON"},
			{label: "before", value: "<", description: "<"},
			{label: "at or before", value: "<=", description: "<="},
			{label: "after", value: ">", description: ">"},
			{label: "at or after", value: ">=", description: ">="},
			{label: "between", value: "BETWEEN", description: "BETWEEN"},
			{label: "relative (on or after)", value: "RELATIVEGE", description: "RELATIVEGE"},
			{label: "relative (on or before)", value: "RELATIVELE", description: "RELATIVELE"},
			{label: "relative (after)", value: "RELATIVEGT", description: "RELATIVEGT"},
			{label: "relative (before)", value: "RELATIVELT", description: "RELATIVELT"},
			{label: "relative (on)", value: "RELATIVEEE", description: "RELATIVEEE"},
			{label: "is empty", value: "ISEMPTY", description: "ISEMPTY"},
			{label: "is not empty", value: "ISNOTEMPTY", description: "ISNOTEMPTY"},
			{label: "is anything", value: "ANYTHING", description: "ANYTHING"},
			{label: "is same", value: "SAMEAS", description: "SAMEAS"},
			{label: "is different", value: "NSAMEAS", description: "NSAMEAS"},
			{label: "is more than", value: "MORETHAN", description: "MORETHAN"},
			{label: "is less than", value: "LESSTHAN", description: "LESSTHAN"},
		}
	} else if typeStr == "Choice" {
		return []QueryOption{
			{label: "is", value: "=", description: "="},
			{label: "is not", value: "!=", description: "!="},
			{label: "is one of", value: "IN", description: "IN"},
			{label: "is not one of", value: "NOT IN", description: "NOT IN"},
			{label: "contains", value: "LIKE", description: "LIKE"},
			{label: "does not contain", value: "NOT LIKE", description: "NOT LIKE"},
			{label: "starts with", value: "STARTSWITH", description: "STARTSWITH"},
			{label: "ends with", value: "ENDSWITH", description: "ENDSWITH"},
			{label: "is anything", value: "ANYTHING", description: "ANYTHING"},
			{label: "is same", value: "SAMEAS", description: "SAMEAS"},
			{label: "is different", value: "NSAMEAS", description: "NSAMEAS"},
			{label: "less than", value: "<", description: "<"},
			{label: "greater than", value: ">", description: ">"},
			{label: "less than or is", value: "<=", description: "<="},
			{label: "greater than or is", value: ">=", description: ">="},
			{label: "between", value: "BETWEEN", description: "BETWEEN"},
		}
	} else if typeStr == "Reference" {
		return []QueryOption{
			{label: "is", value: "=", description: "="},
			{label: "is not", value: "!=", description: "!="},
			{label: "is empty", value: "ISEMPTY", description: "ISEMPTY"},
			{label: "is not empty", value: "ISNOTEMPTY", description: "ISNOTEMPTY"},
			{label: "starts with", value: "STARTSWITH", description: "STARTSWITH"},
			{label: "ends with", value: "ENDSWITH", description: "ENDSWITH"},
			{label: "contains", value: "LIKE", description: "LIKE"},
			{label: "does not contain", value: "NOT LIKE", description: "NOT LIKE"},
			{label: "is one of", value: "IN", description: "IN"},
			{label: "is not one of", value: "NOT IN", description: "NOT IN"},
			{label: "is anything", value: "ANYTHING", description: "ANYTHING"},
			{label: "is same", value: "SAMEAS", description: "SAMEAS"},
			{label: "is different", value: "NSAMEAS", description: "NSAMEAS"},
			{label: "is empty string", value: "EMPTYSTRING", description: "EMPTYSTRING"},
			{label: "is (dynamic)", value: "DYNAMIC", description: "DYNAMIC"},
		}
	} else {
		return []QueryOption{
			{label: "is", value: "=", description: "="},
			{label: "is not", value: "!=", description: "!="},
			{label: "is empty", value: "ISEMPTY", description: "ISEMPTY"},
			{label: "is not empty", value: "ISNOTEMPTY", description: "ISNOTEMPTY"},
			{label: "starts with", value: "STARTSWITH", description: "STARTSWITH"},
			{label: "ends with", value: "ENDSWITH", description: "ENDSWITH"},
			{label: "contains", value: "LIKE", description: "LIKE"},
			{label: "does not contain", value: "NOT LIKE", description: "NOT LIKE"},
			{label: "is one of", value: "IN", description: "IN"},
			{label: "is not one of", value: "NOT IN", description: "NOT IN"},
			{label: "is empty", value: "ISEMPTY", description: "ISEMPTY"},
			{label: "is not empty", value: "ISNOTEMPTY", description: "ISNOTEMPTY"},
			{label: "is empty string", value: "EMPTYSTRING", description: "EMPTYSTRING"},
			{label: "is anything", value: "ANYTHING", description: "ANYTHING"},
			{label: "less than or is", value: "<=", description: "<="},
			{label: "greater than or is", value: ">=", description: ">="},
			{label: "between", value: "BETWEEN", description: "BETWEEN"},
			{label: "is same", value: "SAMEAS", description: "SAMEAS"},
			{label: "is different", value: "NSAMEAS", description: "NSAMEAS"},
		}
	}
}

func GetSysparmTypeOptions(typeStr string) []QueryOption {
	return []QueryOption{
		{label: "is", value: "=", description: "="},
		{label: "is not", value: "!=", description: "!="},
		{label: "starts with", value: "STARTSWITH", description: "STARTSWITH"},
		{label: "ends with", value: "ENDSWITH", description: "ENDSWITH"},
		{label: "contains", value: "LIKE", description: "LIKE"},
		{label: "does not contain", value: "NOT LIKE", description: "NOT LIKE"},
		{label: "is empty", value: "ISEMPTY", description: "ISEMPTY"},
		{label: "is not empty", value: "ISNOTEMPTY", description: "ISNOTEMPTY"},
		{label: "is anything", value: "ANYTHING", description: "ANYTHING"},
		{label: "is one of", value: "IN", description: "IN"},
		{label: "is not one of", value: "NOT IN", description: "NOT IN"},
		{label: "is empty string", value: "EMPTYSTRING", description: "EMPTYSTRING"},
		{label: "less than or is", value: "<=", description: "<="},
		{label: "greater than or is", value: ">=", description: ">="},
		{label: "between", value: "BETWEEN", description: "BETWEEN"},
		{label: "instance of", value: "INSTANCEOF", description: "INSTANCEOF"},
	}
}

func GetTrendByOptions(typeStr string) []QueryOption {
	return []QueryOption{
		{label: "Minute", value: "minute"},
		{label: "Week", value: "week"},
	}
}

func LoadServiceOptions(apiClient *client.APIClient, input string) ([]client.Option, error) {
	search := input
	if search == "" {
		search = ""
	}

	bodyData := map[string]interface{}{
		"targets": []map[string]interface{}{
			{
				"target":        "cmdb_ci_service",
				"columns":       "name:d,sys_id:v",
				"sysparm":       fmt.Sprintf("operational_status=1^name!=All^nameLIKE%s", search),
				"limit":         100,
				"sortBy":        "name",
				"sortDirection": "ASC",
			},
		},
	}

	if utils.DebugLevel() == 1 {
		utils.PrintDebug(fmt.Sprintf("Request Body: %+v", bodyData))
		utils.PrintDebug("Calling LoadServiceOptions")
	}

	responseData, err := apiClient.Request("POST", "/v1/query/table", bodyData, "")
	if err != nil {
		utils.PrintDebug("Error in LoadServiceOptions request")
		return nil, fmt.Errorf("failed to load service options: %w", err)
	}

	var response struct {
		Result []map[string]interface{} `json:"result"`
	}
	err = json.Unmarshal(responseData, &response)
	if err != nil {
		return nil, fmt.Errorf("failed to parse response: %w", err)
	}

	if utils.DebugLevel() == 1 {
		utils.PrintDebug("Response from ServiceNow:")
		utils.PrintDebug(string(responseData))
	}

	options := client.MapChecksToValue(response.Result)
	return options, nil
}

func LoadCIOptions(apiClient *client.APIClient, apiPath string, serviceID string, input string) ([]client.Option, error) {
	search := ""
	if input != "" {
		search = input
	}
	var bodyData string
	if serviceID != "" {
		bodyData = fmt.Sprintf(`{"targets":[{"target":"em_impact_graph","columns":"child_name:d,child_id:v,child_id:d","sysparm":"business_service=%s^child_nameLIKE%s","limit":100,"sortBy":"ci_name","sortDirection":"ASC"}]}`, serviceID, search)
	} else {
		bodyData = fmt.Sprintf(`{"targets":[{"target":"cmdb_ci","columns":"name:d,sys_id:v,sys_class_name:d","sysparm":"nameLIKE%s^name!=NULL","limit":100,"sortBy":"cmdb_ci.name","sortDirection":"ASC"}]}`, search)
	}

	if utils.DebugLevel() == 1 {
		fmt.Println(bodyData)
		fmt.Println("loadCIOptions")
	}

	responseBytes, err := apiClient.Request("POST", apiPath+"/v1/query/table", bodyData, "")
	if err != nil {
		return nil, fmt.Errorf("loadCIOptions API request error: %w", err)
	}

	var response map[string]interface{}
	if err := json.Unmarshal(responseBytes, &response); err != nil {
		return nil, fmt.Errorf("error unmarshalling loadCIOptions response: %w", err)
	}

	dataField, ok := response["data"].(map[string]interface{})
	if !ok {
		return nil, errors.New("unexpected response format: missing data field")
	}

	resultInterface, ok := dataField["result"].([]interface{})
	if !ok {
		return nil, errors.New("unexpected response format: missing result data")
	}

	var resultData []map[string]interface{}
	for _, item := range resultInterface {
		if itemMap, ok := item.(map[string]interface{}); ok {
			resultData = append(resultData, itemMap)
		} else {
			return nil, errors.New("unexpected response format: result item is not a map")
		}
	}

	mappedOptions := client.MapChecksToValuePlusSuffix(resultData)
	if utils.DebugLevel() == 1 {
		fmt.Println("Mapped Options with Suffix:")
		fmt.Println(mappedOptions)
	}

	finalOptions := client.MapSuffixToLabel(mappedOptions)
	return finalOptions, nil
}

func RemoveDuplicateOptions(options []client.Option) []client.Option {
	seen := make(map[string]bool)
	uniqueOptions := []client.Option{}

	for _, opt := range options {
		if _, exists := seen[opt.Value]; !exists {
			seen[opt.Value] = true
			uniqueOptions = append(uniqueOptions, opt)
		}
	}

	return uniqueOptions
}

func LoadResourceOptions(apiClient *client.APIClient, apiPath string, selectedCIS []client.Option, input string) ([]client.Option, error) {
	search := ""
	if input != "" {
		search = input
	}

	var bodyData string
	if selectedCIS != nil && len(selectedCIS) > 0 {
		ciArray := []string{}
		for _, option := range selectedCIS {
			ciArray = append(ciArray, option.Value)
		}

		bodyData = fmt.Sprintf(`{"targets":[{"target":"sa_metric_map","columns":"resource_id:d,resource_id:v","sysparm":"cmdb_ciIN%s^resource_idLIKE%s^resource_id!=NULL","limit":100,"sortBy":"resource_id","sortDirection":"ASC"}]}`,
			strings.Join(ciArray, ","),
			search)
	} else {
		bodyData = fmt.Sprintf(`{"targets":[{"target":"sa_metric_map","columns":"resource_id:d,resource_id:v","sysparm":"resource_idLIKE%s^resource_id!=NULL","limit":100,"sortBy":"resource_id","sortDirection":"ASC"}]}`, search)
	}

	if utils.DebugLevel() == 1 {
		fmt.Println(bodyData)
		fmt.Println("loadResourceOptions")
	}

	responseData, err := apiClient.Request("POST", apiPath+"/v1/query/table", json.RawMessage(bodyData), "")
	if err != nil {
		return nil, fmt.Errorf("loadResourceOptions error: %w", err)
	}

	var response struct {
		Data struct {
			Result []map[string]interface{} `json:"result"`
		} `json:"data"`
	}

	err = json.Unmarshal(responseData, &response)
	if err != nil {
		return nil, fmt.Errorf("failed to parse response: %w", err)
	}

	utils.PrintDebug("print loadResourceOptions response from SNOW")
	utils.PrintDebug(string(responseData))

	result := []client.Option{
		{Label: "*", Value: "*"},
	}

	options := append(result, client.MapChecksToValue(response.Data.Result)...)

	// Remove duplicates
	uniqueOptions := RemoveDuplicateOptions(options)

	return uniqueOptions, nil
}

func LoadMetricOptions(apiClient *client.APIClient, apiPath string, selectedCIS []client.Option, input string) ([]client.Option, error) {
	search := ""
	if input != "" {
		search = input
	}

	var bodyData string
	if selectedCIS != nil && len(selectedCIS) > 0 {
		ciArray := []string{}
		for _, option := range selectedCIS {
			ciArray = append(ciArray, option.Value)
		}

		bodyData = fmt.Sprintf(`{"targets":[{"target":"sa_metric_map","columns":"metric_type_id.metric_type_tiny_name:d,metric_type_id:v","sysparm":"cmdb_ciIN%s^metric_type_id.metric_type_tiny_nameLIKE%s","limit":100,"sortBy":"","sortDirection":"ASC"}]}`,
			strings.Join(ciArray, ","),
			search)
	} else {
		bodyData = fmt.Sprintf(`{"targets":[{"target":"sa_metric_map","columns":"metric_type_id.metric_type_tiny_name:d,metric_type_id:v","sysparm":"metric_type_id.metric_type_tiny_nameLIKE%s","limit":100,"sortBy":"","sortDirection":"ASC"}]}`, search)
	}

	if utils.DebugLevel() == 1 {
		fmt.Println(bodyData)
		fmt.Println("loadMetricOptions")
	}

	responseData, err := apiClient.Request("POST", apiPath+"/v1/query/table", json.RawMessage(bodyData), "")
	if err != nil {
		return nil, fmt.Errorf("loadMetricOptions error: %w", err)
	}

	var response struct {
		Data struct {
			Result []map[string]interface{} `json:"result"`
		} `json:"data"`
	}

	err = json.Unmarshal(responseData, &response)
	if err != nil {
		return nil, fmt.Errorf("failed to parse response: %w", err)
	}

	utils.PrintDebug("print loadMetricOptions response from SNOW")
	utils.PrintDebug(string(responseData))

	result := []client.Option{
		{Label: "*", Value: "*"},
	}

	options := append(result, client.MapChecksToValue(response.Data.Result)...)

	uniqueOptions := RemoveDuplicateOptions(options)

	return uniqueOptions, nil
}

func GetDateTimePresetChoices() []client.Option {
	return []client.Option{
		{Label: "Today", Value: "Today@javascript:gs.beginningOfToday()@javascript:gs.endOfToday()"},
		{Label: "Yesterday", Value: "Yesterday@javascript:gs.beginningOfYesterday()@javascript:gs.endOfYesterday()"},
		{Label: "Tomorrow", Value: "Tomorrow@javascript:gs.beginningOfTomorrow()@javascript:gs.endOfTomorrow()"},
		{Label: "This Week", Value: "This week@javascript:gs.beginningOfThisWeek()@javascript:gs.endOfThisWeek()"},
		{Label: "Last Week", Value: "Last week@javascript:gs.beginningOfLastWeek()@javascript:gs.endOfLastWeek()"},
		{Label: "Next Week", Value: "Next week@javascript:gs.beginningOfNextWeek()@javascript:gs.endOfNextWeek()"},
		{Label: "This Month", Value: "This month@javascript:gs.beginningOfThisMonth()@javascript:gs.endOfThisMonth()"},
		{Label: "Last Month", Value: "Last month@javascript:gs.beginningOfLastMonth()@javascript:gs.endOfLastMonth()"},
		{Label: "Next Month", Value: "Next month@javascript:gs.beginningOfNextMonth()@javascript:gs.endOfNextMonth()"},
		{Label: "Last 3 Months", Value: "Last 3 months@javascript:gs.beginningOfLast3Months()@javascript:gs.endOfLast3Months()"},
		{Label: "Last 6 Months", Value: "Last 6 months@javascript:gs.beginningOfLast6Months()@javascript:gs.endOfLast6Months()"},
		{Label: "Last 9 Months", Value: "Last 9 months@javascript:gs.beginningOfLast9Months()@javascript:gs.endOfLast9Months()"},
		{Label: "Last 12 Months", Value: "Last 12 months@javascript:gs.beginningOfLast12Months()@javascript:gs.endOfLast12Months()"},
		{Label: "This Quarter", Value: "This quarter@javascript:gs.beginningOfThisQuarter()@javascript:gs.endOfThisQuarter()"},
		{Label: "Last Quarter", Value: "Last quarter@javascript:gs.beginningOfLastQuarter()@javascript:gs.endOfLastQuarter()"},
		{Label: "Last 2 Quarters", Value: "Last 2 quarters@javascript:gs.beginningOfLast2Quarters()@javascript:gs.endOfLast2Quarters()"},
		{Label: "Next Quarter", Value: "Next quarter@javascript:gs.beginningOfNextQuarter()@javascript:gs.endOfNextQuarter()"},
		{Label: "Next 2 Quarters", Value: "Next 2 quarters@javascript:gs.beginningOfNext2Quarters()@javascript:gs.endOfNext2Quarters()"},
		{Label: "This Year", Value: "This year@javascript:gs.beginningOfThisYear()@javascript:gs.endOfThisYear()"},
		{Label: "Next Year", Value: "Next year@javascript:gs.beginningOfNextYear()@javascript:gs.endOfNextYear()"},
		{Label: "Last Year", Value: "Last year@javascript:gs.beginningOfLastYear()@javascript:gs.endOfLastYear()"},
		{Label: "Last 2 Years", Value: "Last 2 years@javascript:gs.beginningOfLast2Years()@javascript:gs.endOfLast2Years()"},
		{Label: "Last 7 Days", Value: "Last 7 days@javascript:gs.beginningOfLast7Days()@javascript:gs.endOfLast7Days()"},
		{Label: "Last 30 Days", Value: "Last 30 days@javascript:gs.beginningOfLast30Days()@javascript:gs.endOfLast30Days()"},
		{Label: "Last 60 Days", Value: "Last 60 days@javascript:gs.beginningOfLast60Days()@javascript:gs.endOfLast60Days()"},
		{Label: "Last 90 Days", Value: "Last 90 days@javascript:gs.beginningOfLast90Days()@javascript:gs.endOfLast90Days()"},
	}
}

func LoadColumnChoices(apiClient *client.APIClient, apiPath string, tableName, tableColumn, input, choiceType string) ([]client.Option, error) {
	if tableColumn == "" {
		return []client.Option{}, nil
	}

	if choiceType == "True/False" {
		return []client.Option{
			{Label: "True", Value: "true"},
			{Label: "False", Value: "false"},
		}, nil
	} else if choiceType == "Date/Time" {
		// return utils.GetDateTimePresetChoices()
		return []client.Option{}, nil
	}

	bodyData := fmt.Sprintf(
		`{"targets":[{"target":"sys_choice","columns":"label,value","sysparm":"name=%s^element!=NULL^elementLIKE%s^labelLIKE%s^language=en","limit":100,"sortBy":"label","sortDirection":"ASC"}]}`,
		tableName, tableColumn, input,
	)

	if utils.DebugLevel() == 1 {
		fmt.Println("loadColumnChoices bodyData:", bodyData)
	}

	responseData, err := apiClient.Request("POST", apiPath+"/v1/query/table", json.RawMessage(bodyData), "")
	if err != nil {
		return nil, fmt.Errorf("loadColumnChoices error: %w", err)
	}

	var response struct {
		Data struct {
			Result []map[string]interface{} `json:"result"`
		} `json:"data"`
	}

	err = json.Unmarshal(responseData, &response)
	if err != nil {
		return nil, fmt.Errorf("failed to parse response: %w", err)
	}

	utils.PrintDebug("loadColumnChoices response from SNOW")
	utils.PrintDebug(string(responseData))

	options := client.MapChecksToValue(response.Data.Result)
	return options, nil
}

func GetTableColumnOptions(apiClient *client.APIClient, tableName string, typeFilter string) ([]client.Option, error) {
	if tableName == "" {
		return []client.Option{}, nil
	}

	bodyData := map[string]interface{}{
		"targets": []map[string]string{
			{
				"table":      tableName,
				"typeFilter": typeFilter,
			},
		},
	}

	bodyBytes, err := json.Marshal(bodyData)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal request body: %w", err)
	}

	if utils.DebugLevel() == 1 {
		fmt.Printf("Request Body: %s\n", string(bodyBytes))
	}

	responseData, err := apiClient.Request("POST", "/v1/select/table_columns", bodyBytes, "")
	if err != nil {
		return nil, fmt.Errorf("API request failed: %w", err)
	}

	utils.PrintDebug("Received response from ServiceNow for GetTableColumnOptions")
	utils.PrintDebug(string(responseData))

	var response struct {
		Data struct {
			Result []client.Option `json:"result"`
		} `json:"data"`
	}

	if err := json.Unmarshal(responseData, &response); err != nil {
		return nil, fmt.Errorf("failed to unmarshal response: %w", err)
	}

	return client.MapValueAsSuffix(response.Data.Result, true), nil
}

func LoadTableOptions(apiClient *client.APIClient, input string) ([]client.Option, error) {
	bodyData := map[string]interface{}{
		"targets": []map[string]interface{}{
			{
				"target":  "sys_db_object",
				"columns": "label,name",
				"sysparm": fmt.Sprintf("nameLIKE%s^ORlabelLIKE%s", input, input),
				"limit":   100,
			},
		},
	}

	bodyBytes, err := json.Marshal(bodyData)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal request body: %w", err)
	}

	if utils.DebugLevel() == 1 {
		fmt.Printf("Request Body: %s\n", string(bodyBytes))
		fmt.Println("Executing LoadTableOptions")
	}

	responseData, err := apiClient.Request("POST", "/v1/query/table", bodyBytes, "")
	if err != nil {
		return nil, fmt.Errorf("API request failed: %w", err)
	}

	utils.PrintDebug("Received response from ServiceNow for LoadTableOptions")
	utils.PrintDebug(string(responseData))

	var response struct {
		Data struct {
			Result []map[string]interface{} `json:"result"`
		} `json:"data"`
	}

	if err := json.Unmarshal(responseData, &response); err != nil {
		return nil, fmt.Errorf("failed to unmarshal response: %w", err)
	}

	result := client.MapChecksToValue(response.Data.Result)
	utils.PrintDebug(fmt.Sprintf("Mapped result: %+v", result))

	return client.MapValueAsSuffix(result, false), nil
}

func GetRelationshipTypeOptions(apiClient *client.APIClient) ([]client.Option, error) {
	bodyData := map[string]interface{}{
		"targets": []map[string]interface{}{
			{
				"tableName":  "cmdb_rel_type",
				"nameColumn": "name",
				"idColumn":   "sys_id",
				"sysparm":    "",
				"limit":      500,
			},
		},
	}

	bodyBytes, err := json.Marshal(bodyData)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal request body: %w", err)
	}

	fmt.Printf("Request Body: %s\n", string(bodyBytes))

	responseData, err := apiClient.Request("POST", "/v1/variable/generic", bodyBytes, "")
	if err != nil {
		return nil, fmt.Errorf("API request failed: %w", err)
	}

	fmt.Println("Received response from ServiceNow for GetRelationshipTypeOptions")
	utils.PrintDebug(string(responseData))

	var response struct {
		Data struct {
			Result []map[string]interface{} `json:"result"`
		} `json:"data"`
	}

	if err := json.Unmarshal(responseData, &response); err != nil {
		return nil, fmt.Errorf("failed to unmarshal response: %w", err)
	}

	return client.MapChecksToValue(response.Data.Result), nil
}

func LoadStartingPointOptions(apiClient *client.APIClient, search string) ([]client.Option, error) {
	fmt.Printf("LoadStartingPointOptions search: %s\n", search)

	bodyData := map[string]interface{}{
		"targets": []map[string]interface{}{
			{
				"tableName":  "cmdb_ci",
				"nameColumn": "name",
				"idColumn":   "sys_id",
				"sysparm":    fmt.Sprintf("nameLIKE%s", search),
				"limit":      50,
			},
		},
	}

	bodyBytes, err := json.Marshal(bodyData)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal request body: %w", err)
	}

	fmt.Printf("Request Body: %s\n", string(bodyBytes))

	responseData, err := apiClient.Request("POST", "/v1/variable/generic", bodyBytes, "")
	if err != nil {
		return nil, fmt.Errorf("API request failed: %w", err)
	}

	fmt.Println("Received response from ServiceNow for LoadStartingPointOptions")
	utils.PrintDebug(string(responseData))

	var response struct {
		Data struct {
			Result []map[string]interface{} `json:"result"`
		} `json:"data"`
	}

	if err := json.Unmarshal(responseData, &response); err != nil {
		return nil, fmt.Errorf("failed to unmarshal response: %w", err)
	}

	return client.MapChecksToValue(response.Data.Result), nil
}

func LoadClassOptions(apiClient *client.APIClient, search string) ([]client.Option, error) {
	fmt.Printf("LoadClassOptions search: %s\n", search)

	bodyData := map[string]interface{}{
		"targets": []map[string]interface{}{
			{
				"tableName":  "sys_db_object",
				"nameColumn": "label",
				"idColumn":   "name",
				"sysparm":    fmt.Sprintf("nameSTARTSWITHcmdb_ci^labelLIKE%s", search),
				"limit":      50,
			},
		},
	}

	bodyBytes, err := json.Marshal(bodyData)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal request body: %w", err)
	}

	fmt.Printf("Request Body: %s\n", string(bodyBytes))

	responseData, err := apiClient.Request("POST", "/v1/variable/generic", bodyBytes, "")
	if err != nil {
		return nil, fmt.Errorf("API request failed: %w", err)
	}

	// Debug response
	fmt.Println("Received response from ServiceNow for LoadClassOptions")
	utils.PrintDebug(string(responseData))

	var response struct {
		Data struct {
			Result []map[string]interface{} `json:"result"`
		} `json:"data"`
	}

	if err := json.Unmarshal(responseData, &response); err != nil {
		return nil, fmt.Errorf("failed to unmarshal response: %w", err)
	}

	return client.MapChecksToValue(response.Data.Result), nil
}
