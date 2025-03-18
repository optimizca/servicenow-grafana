package snowmanager

import (
	"encoding/json"
	"fmt"
	"net/http"

	"strings"

	"github.com/grafana/grafana-plugin-sdk-go/backend"
	"github.com/optimizca/servicenow-grafana/pkg/client"
	"github.com/optimizca/servicenow-grafana/pkg/utils"
	// "golang.org/x/text/search"
)

type QueryOption struct {
	Label       string `json:"label"`
	Value       string `json:"value"`
	Description string `json:"description,omitempty"`
}

// func (s *SNOWManager) GetMetricAnomalyOptions(w http.ResponseWriter, r *http.Request) {
// 	options := []QueryOption{
// 		{Label: "true", Value: "true"},
// 		{Label: "false", Value: "false"},
// 	}

// 	jsonResponse, err := json.Marshal(options)
// 	if err != nil {
// 		http.Error(w, fmt.Sprintf("failed to encode response: %v", err), http.StatusInternalServerError)
// 		return
// 	}

// 	w.Header().Set("Content-Type", "application/json")
// 	w.WriteHeader(http.StatusOK)
// 	w.Write(jsonResponse)
// }

func (s *SNOWManager) GetAlertTypeOptions(w http.ResponseWriter, r *http.Request) {
	options := []QueryOption{
		{
			Label:       "CI",
			Value:       "CI",
			Description: "Get Alerts at the CI level",
		},
		{
			Label:       "Service",
			Value:       "Service",
			Description: "Get Alerts at the Service level",
		},
		{
			Label:       "None",
			Value:       "None",
			Description: "Ignore CI selection and use sysparam_query",
		},
	}
	jsonResponse, err := json.Marshal(options)

	if err != nil {
		http.Error(w, fmt.Sprintf("failed to encode response: %v", err), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonResponse)
}

func (s *SNOWManager) GetAlertStateOptions(w http.ResponseWriter, r *http.Request) {
	options := []QueryOption{
		{
			Label:       "Active",
			Value:       "Active",
			Description: "Get Open and Reopen Alerts",
		},
		{
			Label:       "All",
			Value:       "All",
			Description: "Get All alerts Open,Reopen, and Closed",
		},
	}
	jsonResponse, err := json.Marshal(options)

	if err != nil {
		http.Error(w, fmt.Sprintf("failed to encode response: %v", err), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonResponse)
}

func (s *SNOWManager) GetAggregateTypeOptions(w http.ResponseWriter, r *http.Request) {
	options := []QueryOption{
		{Label: "AVG", Value: "AVG"}, {Label: "COUNT", Value: "COUNT"},
		{Label: "MIN", Value: "MIN"}, {Label: "MAX", Value: "MAX"},
		{Label: "STDDEV", Value: "STDDEV"}, {Label: "SUM", Value: "SUM"},
	}

	jsonResponse, err := json.Marshal(options)

	if err != nil {
		http.Error(w, fmt.Sprintf("failed to encode response: %v", err), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonResponse)
}

func (s *SNOWManager) GetOperatorOptions(w http.ResponseWriter, r *http.Request) {
	typeStr := r.URL.Query().Get("type")
	var options []QueryOption

	switch typeStr {
	case "True/False":
		options = []QueryOption{
			{Label: "is", Value: "=", Description: "="},
			{Label: "is not", Value: "!=", Description: "!="},
			{Label: "is empty", Value: "ISEMPTY", Description: "ISEMPTY"},
			{Label: "is not empty", Value: "ISNOTEMPTY", Description: "ISNOTEMPTY"},
			{Label: "is anything", Value: "ANYTHING", Description: "ANYTHING"},
			{Label: "is same", Value: "SAMEAS", Description: "SAMEAS"},
			{Label: "is different", Value: "NSAMEAS", Description: "NSAMEAS"},
		}
		backend.Logger.Info("True/False", "options", options)
	case "Integer", "Long", "Decimal", "Floating Point Number":
		options = []QueryOption{
			{Label: "is", Value: "=", Description: "="},
			{Label: "is not", Value: "!=", Description: "!="},
			{Label: "is empty", Value: "ISEMPTY", Description: "ISEMPTY"},
			{Label: "is not empty", Value: "ISNOTEMPTY", Description: "ISNOTEMPTY"},
			{Label: "less than", Value: "<", Description: "<"},
			{Label: "greater than", Value: ">", Description: ">"},
			{Label: "less than or is", Value: "<=", Description: "<="},
			{Label: "greater than or is", Value: ">=", Description: ">="},
			{Label: "between", Value: "BETWEEN", Description: "BETWEEN"},
			{Label: "is anything", Value: "ANYTHING", Description: "ANYTHING"},
			{Label: "is same", Value: "SAMEAS", Description: "SAMEAS"},
			{Label: "is different", Value: "NSAMEAS", Description: "NSAMEAS"},
			{Label: "greater than field", Value: "GT_FIELD", Description: "GT_FIELD"},
			{Label: "less than field", Value: "LT_FIELD", Description: "LT_FIELD"},
			{Label: "greater than or is field", Value: "GT_OR_EQUALS_FIELD", Description: "GT_OR_EQUALS_FIELD"},
			{Label: "less than or is field", Value: "LT_OR_EQUALS_FIELD", Description: "LT_OR_EQUALS_FIELD"},
		}
		backend.Logger.Info("numeric type", "options", options)
	case "Date/Time", "Date", "Time":
		options = []QueryOption{
			{Label: "on", Value: "ON", Description: "ON"},
			{Label: "not on", Value: "NOTON", Description: "NOTON"},
			{Label: "before", Value: "<", Description: "<"},
			{Label: "at or before", Value: "<=", Description: "<="},
			{Label: "after", Value: ">", Description: ">"},
			{Label: "at or after", Value: ">=", Description: ">="},
			{Label: "between", Value: "BETWEEN", Description: "BETWEEN"},
			{Label: "relative (on or after)", Value: "RELATIVEGE", Description: "RELATIVEGE"},
			{Label: "relative (on or before)", Value: "RELATIVELE", Description: "RELATIVELE"},
			{Label: "relative (after)", Value: "RELATIVEGT", Description: "RELATIVEGT"},
			{Label: "relative (before)", Value: "RELATIVELT", Description: "RELATIVELT"},
			{Label: "relative (on)", Value: "RELATIVEEE", Description: "RELATIVEEE"},
			{Label: "is empty", Value: "ISEMPTY", Description: "ISEMPTY"},
			{Label: "is not empty", Value: "ISNOTEMPTY", Description: "ISNOTEMPTY"},
			{Label: "is anything", Value: "ANYTHING", Description: "ANYTHING"},
			{Label: "is same", Value: "SAMEAS", Description: "SAMEAS"},
			{Label: "is different", Value: "NSAMEAS", Description: "NSAMEAS"},
			{Label: "is more than", Value: "MORETHAN", Description: "MORETHAN"},
			{Label: "is less than", Value: "LESSTHAN", Description: "LESSTHAN"},
		}
		backend.Logger.Info("Date/Time", "options", options)
	case "Choice":
		options = []QueryOption{
			{Label: "is", Value: "=", Description: "="},
			{Label: "is not", Value: "!=", Description: "!="},
			{Label: "is one of", Value: "IN", Description: "IN"},
			{Label: "is not one of", Value: "NOT IN", Description: "NOT IN"},
			{Label: "contains", Value: "LIKE", Description: "LIKE"},
			{Label: "does not contain", Value: "NOT LIKE", Description: "NOT LIKE"},
			{Label: "starts with", Value: "STARTSWITH", Description: "STARTSWITH"},
			{Label: "ends with", Value: "ENDSWITH", Description: "ENDSWITH"},
			{Label: "is anything", Value: "ANYTHING", Description: "ANYTHING"},
			{Label: "is same", Value: "SAMEAS", Description: "SAMEAS"},
			{Label: "is different", Value: "NSAMEAS", Description: "NSAMEAS"},
			{Label: "less than", Value: "<", Description: "<"},
			{Label: "greater than", Value: ">", Description: ">"},
			{Label: "less than or is", Value: "<=", Description: "<="},
			{Label: "greater than or is", Value: ">=", Description: ">="},
			{Label: "between", Value: "BETWEEN", Description: "BETWEEN"},
		}
		backend.Logger.Info("Choice", "options", options)
	case "Reference":
		options = []QueryOption{
			{Label: "is", Value: "=", Description: "="},
			{Label: "is not", Value: "!=", Description: "!="},
			{Label: "is empty", Value: "ISEMPTY", Description: "ISEMPTY"},
			{Label: "is not empty", Value: "ISNOTEMPTY", Description: "ISNOTEMPTY"},
			{Label: "starts with", Value: "STARTSWITH", Description: "STARTSWITH"},
			{Label: "ends with", Value: "ENDSWITH", Description: "ENDSWITH"},
			{Label: "contains", Value: "LIKE", Description: "LIKE"},
			{Label: "does not contain", Value: "NOT LIKE", Description: "NOT LIKE"},
			{Label: "is one of", Value: "IN", Description: "IN"},
			{Label: "is not one of", Value: "NOT IN", Description: "NOT IN"},
			{Label: "is anything", Value: "ANYTHING", Description: "ANYTHING"},
			{Label: "is same", Value: "SAMEAS", Description: "SAMEAS"},
			{Label: "is different", Value: "NSAMEAS", Description: "NSAMEAS"},
			{Label: "is empty string", Value: "EMPTYSTRING", Description: "EMPTYSTRING"},
			{Label: "is (dynamic)", Value: "DYNAMIC", Description: "DYNAMIC"},
		}
		backend.Logger.Info("Reference", "options", options)
	default:
		options = []QueryOption{
			{Label: "is", Value: "=", Description: "="},
			{Label: "is not", Value: "!=", Description: "!="},
			{Label: "is empty", Value: "ISEMPTY", Description: "ISEMPTY"},
			{Label: "is not empty", Value: "ISNOTEMPTY", Description: "ISNOTEMPTY"},
			{Label: "starts with", Value: "STARTSWITH", Description: "STARTSWITH"},
			{Label: "ends with", Value: "ENDSWITH", Description: "ENDSWITH"},
			{Label: "contains", Value: "LIKE", Description: "LIKE"},
			{Label: "does not contain", Value: "NOT LIKE", Description: "NOT LIKE"},
			{Label: "is one of", Value: "IN", Description: "IN"},
			{Label: "is not one of", Value: "NOT IN", Description: "NOT IN"},
			{Label: "is empty", Value: "ISEMPTY", Description: "ISEMPTY"},
			{Label: "is not empty", Value: "ISNOTEMPTY", Description: "ISNOTEMPTY"},
			{Label: "is empty string", Value: "EMPTYSTRING", Description: "EMPTYSTRING"},
			{Label: "is anything", Value: "ANYTHING", Description: "ANYTHING"},
			{Label: "less than or is", Value: "<=", Description: "<="},
			{Label: "greater than or is", Value: ">=", Description: ">="},
			{Label: "between", Value: "BETWEEN", Description: "BETWEEN"},
			{Label: "is same", Value: "SAMEAS", Description: "SAMEAS"},
			{Label: "is different", Value: "NSAMEAS", Description: "NSAMEAS"},
		}
		backend.Logger.Info("Default", "options", options)
	}

	jsonResponse, err := json.Marshal(options)
	if err != nil {
		http.Error(w, fmt.Sprintf("failed to encode response: %v", err), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonResponse)
}

func (s *SNOWManager) GetSysparmTypeOptions(w http.ResponseWriter, r *http.Request) {
	options := []QueryOption{
		{Label: "is", Value: "=", Description: "="},
		{Label: "is not", Value: "!=", Description: "!="},
		{Label: "starts with", Value: "STARTSWITH", Description: "STARTSWITH"},
		{Label: "ends with", Value: "ENDSWITH", Description: "ENDSWITH"},
		{Label: "contains", Value: "LIKE", Description: "LIKE"},
		{Label: "does not contain", Value: "NOT LIKE", Description: "NOT LIKE"},
		{Label: "is empty", Value: "ISEMPTY", Description: "ISEMPTY"},
		{Label: "is not empty", Value: "ISNOTEMPTY", Description: "ISNOTEMPTY"},
		{Label: "is anything", Value: "ANYTHING", Description: "ANYTHING"},
		{Label: "is one of", Value: "IN", Description: "IN"},
		{Label: "is not one of", Value: "NOT IN", Description: "NOT IN"},
		{Label: "is empty string", Value: "EMPTYSTRING", Description: "EMPTYSTRING"},
		{Label: "less than or is", Value: "<=", Description: "<="},
		{Label: "greater than or is", Value: ">=", Description: ">="},
		{Label: "between", Value: "BETWEEN", Description: "BETWEEN"},
		{Label: "instance of", Value: "INSTANCEOF", Description: "INSTANCEOF"},
	}

	jsonResponse, err := json.Marshal(options)
	if err != nil {
		http.Error(w, fmt.Sprintf("failed to encode response: %v", err), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonResponse)
}

func (s *SNOWManager) GetTrendByOptions(w http.ResponseWriter, r *http.Request) {
	options := []QueryOption{
		{Label: "Minute", Value: "minute"},
		{Label: "Week", Value: "week"},
	}

	jsonResponse, err := json.Marshal(options)
	if err != nil {
		http.Error(w, fmt.Sprintf("failed to encode response: %v", err), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonResponse)
}

func (s *SNOWManager) LoadServiceOptions(w http.ResponseWriter, r *http.Request) {
	// Parse the input query parameter
	queryParams := r.URL.Query()
	search := queryParams.Get("search")

	// Handle empty search parameter
	if search == "" {
		search = " "
	}

	// Prepare the request body
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

	// Make the API request
	responseData, err := s.APIClient.Request("POST", "/v1/query/table", bodyData, "")
	if err != nil {
		http.Error(w, fmt.Sprintf("failed to load service options: %v", err), http.StatusInternalServerError)
		return
	}

	// Parse the response
	var response struct {
		Result []map[string]interface{} `json:"result"`
	}
	if err := json.Unmarshal(responseData, &response); err != nil {
		http.Error(w, fmt.Sprintf("failed to  parse response: %v", err), http.StatusInternalServerError)
		return
	}

	// Map the response to client.Option format
	options := client.MapGenericToLabelValue(response.Result)

	// Convert options to JSON
	jsonResponse, err := json.Marshal(options)
	if err != nil {
		http.Error(w, fmt.Sprintf("failed to encode response: %v", err), http.StatusInternalServerError)
		return
	}

	// Write the JSON response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonResponse)
}

func (s *SNOWManager) LoadCIOptions(w http.ResponseWriter, r *http.Request) {
	// Parse query parameters
	queryParams := r.URL.Query()
	search := queryParams.Get("search")
	serviceID := queryParams.Get("serviceID")

	// Construct the request body
	var bodyData string
	if serviceID != "" {
		bodyData = fmt.Sprintf(`{"targets":[{"target":"em_impact_graph","columns":"child_name:d,child_id:v,child_id:d","sysparm":"business_service=%s^child_nameLIKE%s","limit":100,"sortBy":"ci_name","sortDirection":"ASC"}]}`,
			serviceID, search)
	} else {
		bodyData = fmt.Sprintf(`{"targets":[{"target":"cmdb_ci","columns":"name:d,sys_id:v,sys_class_name:d","sysparm":"nameLIKE%s^name!=NULL","limit":100,"sortBy":"cmdb_ci.name","sortDirection":"ASC"}]}`,
			search)
	}

	// Log the request body for debugging
	if utils.DebugLevel() == 1 {
		backend.Logger.Debug("Request body", "body", bodyData)
	}

	// Make the API request
	responseData, err := s.APIClient.Request("POST", "/v1/query/table", json.RawMessage(bodyData), "")
	if err != nil {
		http.Error(w, fmt.Sprintf("failed to load CI options: %v", err), http.StatusInternalServerError)
		return
	}

	// Parse the response
	var response map[string]interface{}
	if err := json.Unmarshal(responseData, &response); err != nil {
		http.Error(w, fmt.Sprintf("failed to parse response: %v", err), http.StatusInternalServerError)
		return
	}

	// Extract the "result" field from the data
	resultInterface, ok := response["result"].([]interface{})
	if !ok {
		http.Error(w, "unexpected response format: missing result data", http.StatusInternalServerError)
		return
	}

	// Convert the result to a slice of maps
	var resultData []map[string]interface{}
	for _, item := range resultInterface {
		if itemMap, ok := item.(map[string]interface{}); ok {
			resultData = append(resultData, itemMap)
		} else {
			http.Error(w, "unexpected response format: result item is not a map", http.StatusInternalServerError)
			return
		}
	}

	// Map the result to options
	mappedOptions := client.MapChecksToValuePlusSuffix(resultData)
	if utils.DebugLevel() == 1 {
		backend.Logger.Debug("Mapped Options with Suffix", "options", mappedOptions)
	}

	finalOptions := client.MapSuffixToLabel(mappedOptions)

	// Marshal the final response and send it back to the client
	jsonResponse, err := json.Marshal(finalOptions)
	if err != nil {
		http.Error(w, fmt.Sprintf("failed to encode response: %v", err), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonResponse)
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

func (s *SNOWManager) LoadResourceOptions(w http.ResponseWriter, r *http.Request) {
	// Parse query parameters
	queryParams := r.URL.Query()
	search := queryParams.Get("search")
	selectedCIS := queryParams["selectedCIS"]

	// Log the received query parameters for debugging
	backend.Logger.Info("LoadResourceOptions query parameters", "search", search, "selectedCIS", selectedCIS)

	var bodyData string
	if len(selectedCIS) > 0 {
		ciArray := selectedCIS
		bodyData = fmt.Sprintf(`{"targets":[{"target":"sa_metric_map","columns":"resource_id:d,resource_id:v","sysparm":"cmdb_ciIN%s^resource_idLIKE%s^resource_id!=NULL","limit":100,"sortBy":"resource_id","sortDirection":"ASC"}]}`,
			strings.Join(ciArray, ","),
			search)
	} else {
		bodyData = fmt.Sprintf(`{"targets":[{"target":"sa_metric_map","columns":"resource_id:d,resource_id:v","sysparm":"resource_idLIKE%s^resource_id!=NULL","limit":100,"sortBy":"resource_id","sortDirection":"ASC"}]}`, search)
	}

	// Log the request body for debugging
	backend.Logger.Debug("Request body", "body", bodyData)

	// Call the core logic to load resource options
	responseData, err := s.APIClient.Request("POST", "/v1/query/table", json.RawMessage(bodyData), "")
	if err != nil {
		// Log the error and return an HTTP error response
		backend.Logger.Error("Failed to load resource options", "error", err)
		http.Error(w, fmt.Sprintf("failed to load resource options: %v", err), http.StatusInternalServerError)
		return
	}

	// Log the successful response for debugging
	backend.Logger.Debug("API response", "response", string(responseData))

	// Parse the response into the expected structure
	var response struct {
		Result []map[string]interface{} `json:"result"`
	}

	err = json.Unmarshal(responseData, &response)
	if err != nil {
		backend.Logger.Error("Failed to parse response", "error", err)
		http.Error(w, fmt.Sprintf("failed to parse response: %v", err), http.StatusInternalServerError)
		return
	}

	// Transform the response into a list of client.Option objects
	result := []client.Option{
		{Label: "*", Value: "*"},
	}
	options := append(result, client.MapGenericToLabelValue(response.Result)...)

	// Remove duplicates
	uniqueOptions := RemoveDuplicateOptions(options)

	// Marshal the final response and send it back to the client
	jsonResponse, err := json.Marshal(uniqueOptions)
	if err != nil {
		backend.Logger.Error("Failed to encode response", "error", err)
		http.Error(w, fmt.Sprintf("failed to encode response: %v", err), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonResponse)
}

func (s *SNOWManager) LoadMetricOptions(w http.ResponseWriter, r *http.Request) {
	// Extract query parameters
	queryParams := r.URL.Query()
	input := queryParams.Get("input")
	selectedCIS := queryParams["selectedCIS"]

	// Debug logging for query parameters
	fmt.Println("input:", input)
	fmt.Println("selectedCIS:", selectedCIS)

	// Prepare the search string
	search := ""
	if input != "" {
		search = input
	}

	// Prepare the bodyData based on whether selectedCIS is provided
	var bodyData string
	if len(selectedCIS) > 0 {
		ciArray := selectedCIS
		bodyData = fmt.Sprintf(
			`{"targets":[{"target":"sa_metric_map","columns":"metric_type_id.metric_type_tiny_name:d,metric_type_id:v","sysparm":"cmdb_ciIN%s^metric_type_id.metric_type_tiny_nameLIKE%s","limit":100,"sortBy":"","sortDirection":"ASC"}]}`,
			strings.Join(ciArray, ","),
			search,
		)
	} else {
		bodyData = fmt.Sprintf(
			`{"targets":[{"target":"sa_metric_map","columns":"metric_type_id.metric_type_tiny_name:d,metric_type_id:v","sysparm":"metric_type_id.metric_type_tiny_nameLIKE%s","limit":100,"sortBy":"","sortDirection":"ASC"}]}`,
			search,
		)
	}

	// Debug logging for bodyData
	fmt.Println("bodyData:", bodyData)

	// Make the API request
	responseData, err := s.APIClient.Request("POST", "/v1/query/table", json.RawMessage(bodyData), "")
	if err != nil {
		http.Error(w, fmt.Sprintf("Error making API request: %v", err), http.StatusInternalServerError)
		return
	}

	// Debug logging for API response
	fmt.Println("responseData:", string(responseData))

	// Parse the API response
	var response struct {
		Result []map[string]interface{} `json:"result"`
	}

	err = json.Unmarshal(responseData, &response)
	if err != nil {
		http.Error(w, fmt.Sprintf("Error parsing API response: %v", err), http.StatusInternalServerError)
		return
	}

	// Debug logging for parsed response
	fmt.Println("response.Result:", response.Result)

	// Prepare the result with a default option
	result := []client.Option{
		{Label: "*", Value: "*"},
	}

	// Append the mapped options from the response
	options := client.MapGenericToLabelValue(response.Result)
	fmt.Println("options:", options)
	result = append(result, options...)

	// Remove duplicate options
	uniqueOptions := RemoveDuplicateOptions(result)

	// Debug logging for unique options
	fmt.Println("uniqueOptions:", uniqueOptions)

	// Return the unique options as JSON
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(uniqueOptions)
}

func (s *SNOWManager) GetDateTimePresetChoices(w http.ResponseWriter, r *http.Request) {
	options := []client.Option{
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

	jsonResponse, err := json.Marshal(options)
	if err != nil {
		http.Error(w, fmt.Sprintf("failed to encode response: %v", err), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonResponse)
}

func (s *SNOWManager) LoadColumnChoices(w http.ResponseWriter, r *http.Request) {
	queryParams := r.URL.Query()
	tableName := queryParams.Get("tableName")
	tableColumn := queryParams.Get("tableColumn")
	search := queryParams.Get("search")
	choiceType := queryParams.Get("choiceType")

	if tableColumn == "" {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode([]client.Option{})
		return
	}

	if choiceType == "True/False" {
		options := []client.Option{
			{Label: "True", Value: "true"},
			{Label: "False", Value: "false"},
		}
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(options)
		return
	} else if choiceType == "Date/Time" {
		s.GetDateTimePresetChoices(w, r)
		return
	}

	// Prepare the request body for the API call
	bodyData := map[string]interface{}{
		"targets": []map[string]interface{}{
			{
				"target":      "sys_choice",
				"columns":     "label,value",
				"sysparm":     fmt.Sprintf("name=%s^element!=NULL^elementLIKE%s^labelLIKE%s^language=en", tableName, tableColumn, search),
				"limit":       100,
				"sortBy":      "label",
				"sortDirection": "ASC",
			},
		},
	}

	// Log the request body for debugging
	backend.Logger.Info("loadColumnChoices bodyData", "bodyData", bodyData)

	if utils.DebugLevel() == 1 {
		fmt.Println("loadColumnChoices bodyData:", bodyData)
	}

	backend.Logger.Info("loadColumnChoices bodyBytes", "bodyBytes", bodyData)

	// Make the API request
	responseData, err := s.APIClient.Request("POST", "/v1/query/table", bodyData, "")
	if err != nil {
		backend.Logger.Info("Error making API request", "error", err)
		http.Error(w, fmt.Sprintf("Error making API request: %v", err), http.StatusInternalServerError)
		return
	}

	backend.Logger.Info("loadColumnChoices response from SNOW", "response", string(responseData))

	// Parse the API response
	var response struct {
		Result []map[string]interface{} `json:"result"`
	}

	err = json.Unmarshal(responseData, &response)
	if err != nil {
		http.Error(w, fmt.Sprintf("Error parsing API response: %v", err), http.StatusInternalServerError)
		return
	}

	utils.PrintDebug("loadColumnChoices response from SNOW")
	utils.PrintDebug(string(responseData))

	// Map the response to client.Option
	options := client.MapGenericToLabelValue(response.Result)

	// Return the options as JSON
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(options)
}

func (s *SNOWManager) GetTableColumnOptions(w http.ResponseWriter, r *http.Request) {
	// Parse query parameters
	queryParams := r.URL.Query()
	tableName := queryParams.Get("tableName")
	typeFilter := queryParams.Get("typeFilter")

	// Extract scopedVars from the request context or query parameters
	// scopedVars := make(map[string]string)
	// if scopedVarsParam := queryParams.Get("scopedVars"); scopedVarsParam != "" {
	//   if err := json.Unmarshal([]byte(scopedVarsParam), &scopedVars); err != nil {
	// 	http.Error(w, fmt.Sprintf("failed to parse scopedVars: %v", err), http.StatusBadRequest)
	// 	return
	//   }
	// }

	if tableName == "" {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode([]client.Option{})
		return
	}

	// tableName = utils.ReplaceTargetUsingTemplVarsCSV(tableName, scopedVars)
	// typeFilter = utils.ReplaceTargetUsingTemplVarsCSV(typeFilter, scopedVars)

	// Prepare the request body
	bodyData := map[string]interface{}{
		"targets": []map[string]string{
			{
				"table":      tableName,
				"typeFilter": typeFilter,
			},
		},
	}

	backend.Logger.Info("Sending request to ServiceNow for GetTableColumnOptions", "bodyData", bodyData)
	// Make the API request
	responseData, err := s.APIClient.Request("POST", "/v1/select/table_columns", bodyData, "")
	if err != nil {
		http.Error(w, fmt.Sprintf("failed to load table column options: %v", err), http.StatusInternalServerError)
		return
	}

	// backend.Logger.Info("Received response from ServiceNow for GetTableColumnOptions", "response", string(responseData))
	// Parse the response
	var response struct {
		Result []map[string]interface{} `json:"result"`
	}

	if err := json.Unmarshal(responseData, &response); err != nil {
		http.Error(w, fmt.Sprintf("failed to unmarshal table options: %v", err), http.StatusInternalServerError)
		return
	}

	// Map the response to the desired format
	options := client.MapToLabelValue(response.Result)

	// Convert options to JSON
	jsonResponse, err := json.Marshal(options)
	if err != nil {
		http.Error(w, fmt.Sprintf("failed to encode response: %v", err), http.StatusInternalServerError)
		return
	}

	// Write the JSON response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonResponse)
}

func (s *SNOWManager) LoadTableOptions(w http.ResponseWriter, r *http.Request) {
	queryParams := r.URL.Query()
	search := queryParams.Get("search")
	if search == "" {
		search = ""
	}

	bodyData := map[string]interface{}{
		"targets": []map[string]interface{}{
			{
				"target":  "sys_db_object",
				"columns": "label,name",
				"sysparm": fmt.Sprintf("nameLIKE%s^ORlabelLIKE%s", search, search),
				"limit":   100,
			},
		},
	}

	// Make the API request
	responseData, err := s.APIClient.Request("POST", "/v1/query/table", bodyData, "")
	if err != nil {
		http.Error(w, fmt.Sprintf("failed to load table options: %v", err), http.StatusInternalServerError)
		return
	}

	// Parse the response
	var response struct {
		Result []map[string]interface{} `json:"result"`
	}

	if err := json.Unmarshal(responseData, &response); err != nil {
		http.Error(w, fmt.Sprintf("failed to unmarshal table options: %v", err), http.StatusInternalServerError)
		return
	}

	// Map the result to options
	options := client.MapTableToLabelValue(response.Result)
	finalOptions := client.MapValueAsSuffix(options, false)

	// Convert options to JSON
	jsonResponse, err := json.Marshal(finalOptions)
	if err != nil {
		http.Error(w, fmt.Sprintf("failed to encode response: %v", err), http.StatusInternalServerError)
		return
	}

	// Write the JSON response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonResponse)
}

func (s *SNOWManager) GetRelationshipTypeOptions(w http.ResponseWriter, r *http.Request) {
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

	backend.Logger.Info("Sending request to ServiceNow for GetRelationshipTypeOptions", "bodyData", bodyData)

	responseData, err := s.APIClient.Request("POST", "/v1/variable/generic", bodyData, "")
	if err != nil {
		backend.Logger.Info("Failed to load relationship type options", "error", err)
		http.Error(w, fmt.Sprintf("failed to load relationship type options: %v", err), http.StatusInternalServerError)
		return
	}

	backend.Logger.Info("Received response from ServiceNow for GetRelationshipTypeOptions", "response", string(responseData))
	// Debug response
	fmt.Println("Received response from ServiceNow for LoadRelationshipTypeOptions")
	utils.PrintDebug(string(responseData))

	var response struct {
		Result []map[string]interface{} `json:"result"`
	}

	if err := json.Unmarshal(responseData, &response); err != nil {
		http.Error(w, fmt.Sprintf("failed to unmarshal relationship type options: %v", err), http.StatusInternalServerError)
		return
	}

	options := client.MapGenericToLabelValue(response.Result)
	// Convert options to JSON
	jsonResponse, err := json.Marshal(options)
	if err != nil {
		http.Error(w, fmt.Sprintf("failed to encode response: %v", err), http.StatusInternalServerError)
		return
	}

	// Write the JSON response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonResponse)
}

func (s *SNOWManager) LoadStartingPointOptions(w http.ResponseWriter, r *http.Request) {
	queryParams := r.URL.Query()
	search := queryParams.Get("search")

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

	responseData, err := s.APIClient.Request("POST", "/v1/variable/generic", bodyData, "")
	if err != nil {
		http.Error(w, fmt.Sprintf("failed to load starting point options: %v", err), http.StatusInternalServerError)
		return
	}

	// Debug response
	fmt.Println("Received response from ServiceNow for LoadStartingPointOptions")
	utils.PrintDebug(string(responseData))

	var response struct {
		Result []map[string]interface{} `json:"result"`
	}

	if err := json.Unmarshal(responseData, &response); err != nil {
		http.Error(w, fmt.Sprintf("failed to unmarshal starting point options: %v", err), http.StatusInternalServerError)
		return
	}

	options := client.MapGenericToLabelValue(response.Result)
	// Convert options to JSON
	jsonResponse, err := json.Marshal(options)
	if err != nil {
		http.Error(w, fmt.Sprintf("failed to encode response: %v", err), http.StatusInternalServerError)
		return
	}

	// Write the JSON response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonResponse)
}

func (s *SNOWManager) LoadClassOptions(w http.ResponseWriter, r *http.Request) {
	// Parse query parameters
	queryParams := r.URL.Query()
	search := queryParams.Get("search")

	// Construct the request body
	bodyData := map[string]interface{}{
		"targets": []map[string]interface{}{
			{
				"tableName":  "sys_db_object",
				"nameColumn": "label",
				"idColumn":   "name",
				"sysparm": func() string {
					if search != "" {
						return fmt.Sprintf("nameSTARTSWITHcmdb_ci^labelLIKE%s", search)
					}
					return "nameSTARTSWITHcmdb_ci"
				}(),
				"limit": 50,
			},
		},
	}

	// Make the API request
	responseData, err := s.APIClient.Request("POST", "/v1/variable/generic", bodyData, "")
	if err != nil {
		http.Error(w, fmt.Sprintf("failed to load class options: %v", err), http.StatusInternalServerError)
		return
	}

	// Parse the response
	var response struct {
		Result []map[string]interface{} `json:"result"`
	}

	if err := json.Unmarshal(responseData, &response); err != nil {
		http.Error(w, fmt.Sprintf("failed to unmarshal response: %v", err), http.StatusInternalServerError)
		return
	}

	// Map the result to options
	options := client.MapGenericToLabelValue(response.Result)

	// Convert options to JSON
	jsonResponse, err := json.Marshal(options)
	if err != nil {
		http.Error(w, fmt.Sprintf("failed to encode response: %v", err), http.StatusInternalServerError)
		return
	}

	// Write the JSON response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonResponse)
}
