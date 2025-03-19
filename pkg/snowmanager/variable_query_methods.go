package snowmanager

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/grafana/grafana-plugin-sdk-go/backend"
	"github.com/optimizca/servicenow-grafana/pkg/client"
	"github.com/optimizca/servicenow-grafana/pkg/utils"
)

func (sm *SNOWManager) GetGroupByVariable(w http.ResponseWriter, r *http.Request) {
	// Parse the request body
	var requestBody struct {
		TableName string `json:"tableName"`
		GroupBy   string `json:"groupBy"`
		Sysparam  string `json:"sysparam"`
		Asterisk  bool   `json:"asterisk"`
		ShowNull  bool   `json:"showNull"`
	}

	if err := json.NewDecoder(r.Body).Decode(&requestBody); err != nil {
		http.Error(w, fmt.Sprintf("failed to decode request body: %v", err), http.StatusBadRequest)
		return
	}

	// Prepare the body data for the API request
	bodyData := map[string]string{
		"tableName": requestBody.TableName,
		"groupBy":   requestBody.GroupBy,
		"sysparam":  requestBody.Sysparam,
	}

	backend.Logger.Debug("getGroupByVariable bodyData:", bodyData)
	if utils.DebugLevel() == 1 {
		fmt.Println("getGroupByVariable bodyData:", bodyData)
	}

	// Make the API request
	responseBytes, err := sm.APIClient.Request("POST", "/v1/variable/groupby", bodyData, "")
	if err != nil {
		http.Error(w, fmt.Sprintf("getGroupByVariable query error: %v", err), http.StatusInternalServerError)
		return
	}
	backend.Logger.Debug("getGroupByVariable query response:", string(responseBytes))

	// Parse the API response
	var responseData struct {
		Result []map[string]interface{} `json:"result"`
		Error  struct {
			Message string `json:"message"`
		} `json:"error"`
	}

	if err := json.Unmarshal(responseBytes, &responseData); err != nil {
		http.Error(w, fmt.Sprintf("failed to decode response: %v", err), http.StatusInternalServerError)
		return
	}

	if responseData.Error.Message != "" {
		http.Error(w, fmt.Sprintf("getGroupByVariable query error: %s", responseData.Error.Message), http.StatusInternalServerError)
		return
	}

	// Map the response to client.Option
	options := client.MapResponseToVariable(responseData.Result, requestBody.Asterisk, requestBody.ShowNull)
	fmt.Println("print getGroupByVariable query response from SNOW:", options)
	backend.Logger.Debug("getGroupByVariable query response from SNOW:", options)

	// Write the response back to the client
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(options); err != nil {
		http.Error(w, fmt.Sprintf("failed to encode response: %v", err), http.StatusInternalServerError)
		return
	}
}

func (sm *SNOWManager) GetGenericVariable(w http.ResponseWriter, r *http.Request) {
	// Parse the request body
	var requestBody struct {
		TableName  string `json:"tableName"`
		NameColumn string `json:"nameColumn"`
		IDColumn   string `json:"idColumn"`
		Sysparam   string `json:"sysparam"`
		Limit      string `json:"limit"`
		Asterisk   bool   `json:"asterisk"`
		ShowNull   bool   `json:"showNull"`
	}

	if err := json.NewDecoder(r.Body).Decode(&requestBody); err != nil {
		http.Error(w, fmt.Sprintf("failed to decode request body: %v", err), http.StatusBadRequest)
		return
	}

	// Prepare the body data for the API request
	  bodyData := map[string]interface{}{
		"targets": []map[string]interface{}{
			{
				"tableName":  requestBody.TableName,
				"nameColumn": requestBody.NameColumn,
				"idColumn":   requestBody.IDColumn,
				"sysparm":    requestBody.Sysparam,
				"limit":      requestBody.Limit,
			},
		},
	  }

	  backend.Logger.Debug("getGenericVariable bodyData:", bodyData)
	// Make the API request
	responseBytes, err := sm.APIClient.Request("POST", "/v1/variable/generic", bodyData, "")
	if err != nil {
		http.Error(w, fmt.Sprintf("generic variable request error: %v", err), http.StatusInternalServerError)
		return
	}
	backend.Logger.Debug("getGenericVariable query response:", string(responseBytes))
	// Parse the API response
	var response struct {
			Result []map[string]interface{} `json:"result"`
	}
	if err := json.Unmarshal(responseBytes, &response); err != nil {
		http.Error(w, fmt.Sprintf("failed to unmarshal response: %v", err), http.StatusInternalServerError)
		return
	}

	// Map the response to client.Option
	options := client.MapResponseToVariable(response.Result, requestBody.Asterisk, requestBody.ShowNull)
	backend.Logger.Debug("getGenericVariable query response:", options)

	// Write the response back to the client
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(options); err != nil {
		http.Error(w, fmt.Sprintf("failed to encode response: %v", err), http.StatusInternalServerError)
		return
	}
}

func (sm *SNOWManager) GetMetricNamesInCIs(w http.ResponseWriter, r *http.Request) {
	// Parse the request body
	var requestBody struct {
		MetricType string 	`json:"metricType"`
		CIS            []string `json:"cis"`
		Asterisk       bool   	`json:"asterisk"`
		ShowNull       bool   	`json:"showNull"`
	}

	if err := json.NewDecoder(r.Body).Decode(&requestBody); err != nil {
		backend.Logger.Info("metric error", "err", err)
		http.Error(w, fmt.Sprintf("failed to decode request body: %v", err), http.StatusBadRequest)
		return
	}

	// Create the regex target and trim it
	ciTarget := utils.CreateRegEx(requestBody.CIS)
	ciTarget = utils.TrimRegEx(ciTarget)

	// Prepare the body data for the API request
	bodyData := map[string]interface{}{
		"targets": []map[string]interface{}{
			{
				"target":     ciTarget,
				"metricType": requestBody.MetricType,
			},
		},
	}

	backend.Logger.Debug("getMetricNamesInCIs bodyData:", bodyData)
	if utils.DebugLevel() == 1 {
		fmt.Println("inside GetMetricNamesInCIs")
		fmt.Println("print target")
		fmt.Println(requestBody.MetricType)
		fmt.Println("source after replace")
		fmt.Println(ciTarget)
		fmt.Println("bodyData:", bodyData)
	}

	// Make the API request
	responseBytes, err := sm.APIClient.Request("POST", "/v1/variable/metrics", bodyData, "")
	if err != nil {
		http.Error(w, fmt.Sprintf("metric variable request error: %v", err), http.StatusInternalServerError)
		return
	}

	backend.Logger.Debug("getMetric query response:", string(responseBytes))
	// Parse the API response
	var response struct {
			Result []map[string]interface{} `json:"result"`
	}
	if err := json.Unmarshal(responseBytes, &response); err != nil {
		http.Error(w, fmt.Sprintf("failed to unmarshal response: %v", err), http.StatusInternalServerError)
		return
	}

	// Map the response to client.Option
	options := client.MapResponseToVariable(response.Result, requestBody.Asterisk, requestBody.ShowNull)

	// Write the response back to the client
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(options); err != nil {
		http.Error(w, fmt.Sprintf("failed to encode response: %v", err), http.StatusInternalServerError)
		return
	}
}

func (sm *SNOWManager) GetNestedCIS(w http.ResponseWriter, r *http.Request) {
	// Parse the request body
	var requestBody struct {
		CI          string `json:"ci"`
		ParentDepth string `json:"parentDepth"`
		ChildDepth  string `json:"childDepth"`
		Sysparam    string `json:"sysparam"`
		Asterisk    bool   `json:"asterisk"`
		ShowNull    bool   `json:"showNull"`
	}

	if err := json.NewDecoder(r.Body).Decode(&requestBody); err != nil {
		http.Error(w, fmt.Sprintf("failed to decode request body: %v", err), http.StatusBadRequest)
		return
	}

	// Prepare the body data for the API request
	bodyData := map[string]interface{}{
		"targets": []map[string]interface{}{
			{
				"ci":          requestBody.CI,
				"parentDepth": requestBody.ParentDepth,
				"childDepth":  requestBody.ChildDepth,
				"sysparm":     requestBody.Sysparam,
				"type":        "ci",
			},
		},
	}

	if utils.DebugLevel() == 1 {
		fmt.Println("get nested cis")
		fmt.Println(bodyData)
	}

	// Make the API request
	responseBytes, err := sm.APIClient.Request("POST", "/v1/variable/nested_value", (bodyData), "")
	if err != nil {
		http.Error(w, fmt.Sprintf("nested cis variable error: %v", err), http.StatusInternalServerError)
		return
	}

	backend.Logger.Debug("getNestedCIS query response:", string(responseBytes))
	// Parse the API response
	var response struct {
		Result []map[string]interface{} `json:"result"`
	}
	if err := json.Unmarshal(responseBytes, &response); err != nil {
		http.Error(w, fmt.Sprintf("failed to unmarshal response: %v", err), http.StatusInternalServerError)
		return
	}

	// Map the response to client.Option
	options := client.MapResponseToVariable(response.Result, requestBody.Asterisk, requestBody.ShowNull)

	// Write the response back to the client
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(options); err != nil {
		http.Error(w, fmt.Sprintf("failed to encode response: %v", err), http.StatusInternalServerError)
		return
	}
}

func (sm *SNOWManager) GetNestedClasses(w http.ResponseWriter, r *http.Request) {
	// Parse the request body
	var requestBody struct {
		CI          string `json:"ci"`
		ParentDepth string `json:"parentDepth"`
		ChildDepth  string `json:"childDepth"`
		Sysparam    string `json:"sysparam"`
		Asterisk    bool   `json:"asterisk"`
		ShowNull    bool   `json:"showNull"`
	}

	if err := json.NewDecoder(r.Body).Decode(&requestBody); err != nil {
		http.Error(w, fmt.Sprintf("failed to decode request body: %v", err), http.StatusBadRequest)
		return
	}

	// Prepare the body data for the API request
	bodyData := map[string]interface{}{
		"targets": []map[string]interface{}{
			{
				"ci":          requestBody.CI,
				"parentDepth": requestBody.ParentDepth,
				"childDepth":  requestBody.ChildDepth,
				"sysparm":     requestBody.Sysparam,
				"type":        "class",
			},
		},
	}

	if utils.DebugLevel() == 1 {
		fmt.Println("get nested classes")
		fmt.Println(bodyData)
	}

	backend.Logger.Debug("getNestedClasses bodyData:", bodyData)

	// Make the API request
	responseBytes, err := sm.APIClient.Request("POST", "/v1/variable/nested_value", (bodyData), "")
	if err != nil {
		http.Error(w, fmt.Sprintf("nested classes variable error: %v", err), http.StatusInternalServerError)
		return
	}

	backend.Logger.Debug("getNestedClasses query response:", string(responseBytes))
	// Parse the API response
	var response struct {
		Result []map[string]interface{} `json:"result"`
	}

	if err := json.Unmarshal(responseBytes, &response); err != nil {
		http.Error(w, fmt.Sprintf("failed to unmarshal response: %v", err), http.StatusInternalServerError)
		return
	}

	// Map the response to client.Option
	options := client.MapResponseToVariable(response.Result, requestBody.Asterisk, requestBody.ShowNull)

	// Write the response back to the client
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(options); err != nil {
		http.Error(w, fmt.Sprintf("failed to encode response: %v", err), http.StatusInternalServerError)
		return
	}
}

func (sm *SNOWManager) GetV2NestedValues(w http.ResponseWriter, r *http.Request) {
	// Parse the request body
	var requestBody struct {
		Starting_Point 		string `json:"starting_point"`
		Relationship_Types 	string `json:"relationship_types"`
		Excluded_Classes 	string `json:"excluded_classes"`
		Parent_Limit		string `json:"parent_limit"`
		Child_Limit			string `json:"child_limit"`
		Type 				string `json:"type"`
		Asterisk    		bool   `json:"asterisk"`
		ShowNull    		bool   `json:"showNull"`
	}

	if err := json.NewDecoder(r.Body).Decode(&requestBody); err != nil {
		http.Error(w, fmt.Sprintf("failed to decode request body: %v", err), http.StatusBadRequest)
		return
	}

	// Prepare the body data for the API request
		bodyData := map[string]interface{}{
				"starting_point": 		requestBody.Starting_Point,
				"relationship_types": 	requestBody.Relationship_Types,
				"excluded_classes": 	requestBody.Excluded_Classes,
				"parent_limit": 		requestBody.Parent_Limit,
				"child_limit": 			requestBody.Child_Limit,
				"type": 				requestBody.Type,
		}

	if utils.DebugLevel() == 1 {
		fmt.Println("getV2NestedValues bodyData:", bodyData)
	}

	backend.Logger.Debug("getV2NestedValues bodyData:", bodyData)

	// Make the API request
	responseBytes, err := sm.APIClient.Request("POST", "/v2/variable/nested_value", bodyData, "")

	if err != nil {
		http.Error(w, fmt.Sprintf("getV2NestedValues error: %v", err), http.StatusInternalServerError)
		return
	}

	backend.Logger.Debug("getV2NestedValues query response:", string(responseBytes))

	// Parse the API response
	var response struct {
		Result []map[string]interface{} `json:"result"`
	}

	if err := json.Unmarshal(responseBytes, &response); err != nil {
		http.Error(w, fmt.Sprintf("failed to unmarshal response: %v", err), http.StatusInternalServerError)
		return
	}

	// Map the response to client.Option
	options := client.MapResponseToVariable(response.Result, requestBody.Asterisk, requestBody.ShowNull)

	// Write the response back to the client
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(options); err != nil {
		http.Error(w, fmt.Sprintf("failed to encode response: %v", err), http.StatusInternalServerError)
		return
	}
}
