package snowmanager

import (
	"encoding/json"
	"fmt"

	"github.com/optimizca/servicenow-grafana/pkg/client"
	"github.com/optimizca/servicenow-grafana/pkg/utils"
)

func (sm *SNOWManager) GetGroupByVariable(tableName, groupBy, sysparam string, asterisk, showNull bool) ([]client.Option, error) {
	bodyData := map[string]string{
		"tableName": tableName,
		"groupBy":   groupBy,
		"sysparam":  sysparam,
	}

	if utils.DebugLevel() == 1 {
		fmt.Println("getGroupByVariable bodyData:", bodyData)
	}

	responseBytes, err := sm.APIClient.Request("POST", "/v1/variable/groupby", bodyData)
	if err != nil {
		fmt.Printf("getGroupByVariable query error: %v\n", err)
		return nil, fmt.Errorf("failed to make request: %w", err)
	}

	var responseData struct {
		Result []map[string]interface{} `json:"result"`
		Error  struct {
			Message string `json:"message"`
		} `json:"error"`
	}

	if err := json.Unmarshal(responseBytes, &responseData); err != nil {
		return nil, fmt.Errorf("failed to decode response: %w", err)
	}

	if responseData.Error.Message != "" {
		return nil, fmt.Errorf("getGroupByVariable query error: %s", responseData.Error.Message)
	}

	options := client.MapResponseToVariable(responseData.Result, asterisk, showNull)
	fmt.Println("print getGroupByVariable query response from SNOW:", options)

	return options, nil
}

func (sm *SNOWManager) GetGenericVariable(tableName, nameColumn, idColumn, sysparam, limit string, asterisk, showNull bool) ([]client.Option, error) {
	bodyData := fmt.Sprintf(`{"targets":[{"tableName":"%s","nameColumn":"%s","idColumn":"%s","sysparm":"%s","limit":%s}]}`, tableName, nameColumn, idColumn, sysparam, limit)
	bodyBytes := []byte(bodyData)

	responseBytes, err := sm.APIClient.Request("POST", "/v1/variable/generic", bodyBytes)
	if err != nil {
		return nil, fmt.Errorf("generic variable request error: %w", err)
	}

	var response struct {
		Data struct {
			Result []map[string]interface{} `json:"result"`
		} `json:"data"`
	}
	if err := json.Unmarshal(responseBytes, &response); err != nil {
		return nil, fmt.Errorf("failed to unmarshal response: %w", err)
	}

	return client.MapResponseToVariable(response.Data.Result, asterisk, showNull), nil
}

func (sm *SNOWManager) GetMetricNamesInCIs(metricCategory, cis string, asterisk, showNull bool) ([]client.Option, error) {
	if utils.DebugLevel() == 1 {
		fmt.Println("inside GetMetricNamesInCIs")
		fmt.Println("print target")
		fmt.Println(metricCategory)
	}

	ciTarget := utils.CreateRegEx(cis)
	ciTarget = utils.TrimRegEx(ciTarget)

	bodyData := fmt.Sprintf(`{"targets":[{"target":"%s","metricType":"%s"}]}`, ciTarget, metricCategory)
	cisURL := sm.APIPath + "/v1/variable/metrics"

	if utils.DebugLevel() == 1 {
		fmt.Println("source after replace")
		fmt.Println(ciTarget)
		fmt.Println(bodyData)
	}

	responseBytes, err := sm.APIClient.Request("POST", cisURL, []byte(bodyData))
	if err != nil {
		return nil, fmt.Errorf("metric variable error: %w", err)
	}

	var response struct {
		Data struct {
			Result []map[string]interface{} `json:"result"`
		} `json:"data"`
	}
	if err := json.Unmarshal(responseBytes, &response); err != nil {
		return nil, fmt.Errorf("failed to unmarshal response: %w", err)
	}

	return client.MapResponseToVariable(response.Data.Result, asterisk, showNull), nil
}

func (sm *SNOWManager) GetNestedCIS(bodyObj map[string]interface{}, asterisk, showNull bool) ([]client.Option, error) {
	bodyData := fmt.Sprintf(`{"targets":[{"ci":"%s","parentDepth":"%s","childDepth":"%s","sysparm":"%s","type":"ci"}]}`,
		bodyObj["ci"], bodyObj["parentDepth"], bodyObj["childDepth"], bodyObj["sysparam"])

	if utils.DebugLevel() == 1 {
		fmt.Println("get nested cis")
		fmt.Println(bodyData)
	}

	cisURL := sm.APIPath + "/v1/variable/nested_value"

	responseBytes, err := sm.APIClient.Request("POST", cisURL, []byte(bodyData))
	if err != nil {
		return nil, fmt.Errorf("nested cis variable error: %w", err)
	}

	var response struct {
		Data []map[string]interface{} `json:"data"`
	}
	if err := json.Unmarshal(responseBytes, &response); err != nil {
		return nil, fmt.Errorf("failed to unmarshal response: %w", err)
	}

	return client.MapResponseToVariable(response.Data, asterisk, showNull), nil
}

func (sm *SNOWManager) GetNestedClasses(bodyObj map[string]interface{}, asterisk, showNull bool) ([]client.Option, error) {
	bodyData := fmt.Sprintf(`{"targets":[{"ci":"%s","parentDepth":"%s","childDepth":"%s","sysparm":"%s","type":"class"}]}`,
		bodyObj["ci"], bodyObj["parentDepth"], bodyObj["childDepth"], bodyObj["sysparam"])

	if utils.DebugLevel() == 1 {
		fmt.Println("get nested classes")
		fmt.Println(bodyData)
	}

	classesURL := sm.APIPath + "/v1/variable/nested_value"

	responseBytes, err := sm.APIClient.Request("POST", classesURL, []byte(bodyData))
	if err != nil {
		return nil, fmt.Errorf("nested classes variable error: %w", err)
	}

	var response struct {
		Data []map[string]interface{} `json:"data"`
	}
	if err := json.Unmarshal(responseBytes, &response); err != nil {
		return nil, fmt.Errorf("failed to unmarshal response: %w", err)
	}

	return client.MapResponseToVariable(response.Data, asterisk, showNull), nil
}

func (sm *SNOWManager) GetV2NestedValues(bodyObj map[string]interface{}, asterisk, showNull bool) ([]client.Option, error) {
	if utils.DebugLevel() == 1 {
		fmt.Println("getV2NestedValues bodyObj:", bodyObj)
	}

	v2NestedValuesURL := sm.APIPath + "/v2/variable/nested_value"

	responseBytes, err := sm.APIClient.Request("POST", v2NestedValuesURL, bodyObj)
	if err != nil {
		return nil, fmt.Errorf("getV2NestedValues error: %w", err)
	}

	var response struct {
		Data struct {
			Result []map[string]interface{} `json:"result"`
		} `json:"data"`
	}
	if err := json.Unmarshal(responseBytes, &response); err != nil {
		return nil, fmt.Errorf("failed to unmarshal response: %w", err)
	}

	return client.MapResponseToVariable(response.Data.Result, asterisk, showNull), nil
}
