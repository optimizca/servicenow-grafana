package snowmanager

import (
	"context"
	"encoding/json"
	"fmt"
	"sort"
	"strings"
	"time"

	// "github.com/grafana/grafana-plugin-sdk-go/backend"
	"github.com/optimizca/servicenow-grafana/pkg/client"
	"github.com/optimizca/servicenow-grafana/pkg/models"
	"github.com/optimizca/servicenow-grafana/pkg/services"
)

type SNOWManager struct {
	APIClient *client.APIClient
}

type SnowManagerOptions struct {
	WithCredentials bool   `json:"withCredentials"`
	URL             string `json:"url"`
	APIPath         string `json:"apiPath"`
	CacheTimeout    time.Duration
	AuthHeader      string
}

func NewSNOWManager(options SnowManagerOptions) *SNOWManager {
	headers := map[string]string{
		"Content-Type":  "application/json",
		"Authorization": options.AuthHeader,
		"Accept":        "application/json",
	}

	apiClient := client.Initialize(headers, options.WithCredentials, options.URL, options.APIPath, options.CacheTimeout)
	return &SNOWManager{
		APIClient: apiClient,
	}
}

// RemoveFiltersWithAll removes filters containing '*' from the sysparam query string.
// For example:
// Input: "operational_status=1^clusterIN*"
// Output: "operational_status=1"
func (sm *SNOWManager) RemoveFiltersWithAll(sysparam string) string {
	fmt.Println("inside RemoveFiltersWithAll")
	fmt.Println("starting sysparam:", sysparam)

	inputArray := strings.Split(sysparam, "^")

	var parsedInput []string
	for _, instance := range inputArray {
		if !strings.Contains(instance, "*") {
			parsedInput = append(parsedInput, instance)
		}
	}

	// Reconstruct the sysparam string
	if len(parsedInput) > 1 {
		sysparam = strings.Join(parsedInput, "^")
	} else if len(parsedInput) == 1 {
		sysparam = parsedInput[0]
	} else {
		sysparam = ""
	}

	fmt.Println("return sysparam:", sysparam)
	return sysparam
}

func (sm *SNOWManager) ParseBasicSysparm(sysparamQuery []models.SysParamColumnObject, options map[string]string) string {
	// var basicSysparm []map[string]interface{}
	// if err := json.Unmarshal([]byte(sysparamQuery), &basicSysparm); err != nil {
	// 	fmt.Println("failed to parse sysparamQuery:", err)
	// 	return ""
	// }

	var sysparm []string
	templateService := services.NewTemplateService()

	// Helper function to extract and replace values
	extractAndReplace := func(label *models.LabelValuePair, options map[string]string) string {
		if val, ok := label.Value.(string); ok {
			return templateService.Replace(val, options, "")
		}
		return ""
	}

	for _, sysparmRow := range sysparamQuery {
		if sysparmRow.Column.Value == "" {
			continue
		}

		columnValue := extractAndReplace(sysparmRow.Column, options)
		operatorValue := extractAndReplace(sysparmRow.Operator, options)
		valueValue := extractAndReplace(sysparmRow.Value, options)

		queryInstance := QueryInstanceFormatter(columnValue, operatorValue, valueValue)
		if strings.TrimSpace(queryInstance) != "" {
			sysparm = append(sysparm, queryInstance)
		}
	}

	result := strings.Join(sysparm, "^")
	fmt.Println("END OF PARSE BASIC SYSPARM:", result)
	return result
}

// SingleSysParamQuery reformats a sysparam query string into a structured array of objects.
//
// Example Input: "column1=value1^column2!=value2"
// Example Output:
// [
//
//	{column: {value: "column1"}, operator: {value: "="}, value: {value: "value1"}, separator: {value: "^"}},
//	{column: {value: "column2"}, operator: {value: "!="}, value: {value: "value2"}, separator: {value: "^"}}
//
// ]
func (sm *SNOWManager) SingleSysParamQuery(queryParam string) []models.SysParamColumnObject {
	operators := []string{
		"=", "!=", "ISEMPTY", "ISNOTEMPTY", "ANYTHING", "SAMEAS", "NSAMEAS",
		"<", ">", "<=", ">=", "BETWEEN", "GT_FIELD", "LT_FIELD", "GT_OR_EQUALS_FIELD",
		"LT_OR_EQUALS_FIELD", "ON", "NOTON", "RELATIVEGE", "RELATIVELE", "RELATIVEGT",
		"RELATIVELT", "RELATIVEEE", "MORETHAN", "LESSTHAN", "IN", "NOT IN", "LIKE",
		"NOT LIKE", "STARTSWITH", "ENDSWITH", "EMPTYSTRING", "DYNAMIC",
	}
	sort.Slice(operators, func(i, j int) bool {
		return len(operators[i]) > len(operators[j])
	})

	instances := strings.Split(queryParam, "^")
	var result []models.SysParamColumnObject

	for _, instance := range instances {
		for _, operator := range operators {
			index := strings.Index(instance, operator)
			if index != -1 {
				column := strings.TrimSpace(instance[:index])
				value := strings.TrimSpace(instance[index+len(operator):])
				result = append(result, models.SysParamColumnObject{
					Column:    &models.LabelValuePair{Value: column},
					Operator:  &models.LabelValuePair{Value: operator},
					Value:     &models.LabelValuePair{Value: value},
					Separator: &models.LabelValuePair{Value: "^"},
				})
				break
			}
		}
	}

	return result
}

func QueryInstanceFormatter(column, operator, value string) string {
	sysparam := ""
	nullSysparam := ""

	fmt.Println("INSIDE QueryInstanceFormatter")
	fmt.Printf("STARTING SYSPARAM QUERY INSTANCE: %s%s%s\n", column, operator, value)

	// Various checks ("*", "NULL")
	if strings.Contains(value, "*") {
		return ""
	}

	if strings.Contains(value, "NULL") {
		separator := ","
		items := strings.Split(value, separator)
		var filteredItems []string

		// Filter out 'NULL' from the list of values
		for _, item := range items {
			if item != "NULL" {
				filteredItems = append(filteredItems, item)
			}
		}
		value = strings.Join(filteredItems, separator)

		// Determine the appropriate operator for 'NULL'
		var nullOperatorValue string
		switch operator {
		case "IN", "LIKE":
			nullOperatorValue = "="
		case "NOT IN", "NOT LIKE":
			nullOperatorValue = "!="
		default:
			nullOperatorValue = operator
		}

		nullSysparam = "^OR" + column + nullOperatorValue + "NULL"
		sysparam = column + operator + value + nullSysparam
	} else {
		sysparam = column + operator + value
	}

	fmt.Printf("RETURNING SYSPARAM QUERY INSTANCE: %s\n", sysparam)
	return sysparam
}

// TestConnection verifies the connection to the ServiceNow instance
func (sm *SNOWManager) TestConnection(ctx context.Context) error {
	response, err := sm.APIClient.Request("GET", "", nil, "")
	if err != nil {
		return fmt.Errorf("connection test failed: %w", err)
	}

	var result map[string]interface{}
	if err := json.Unmarshal(response, &result); err != nil {
		return fmt.Errorf("failed to parse connection test response: %w", err)
	}
	
	if result["result"] != nil {
		if len(result["result"].(map[string]interface{})) == 0 {
			return nil
		} else {
			return fmt.Errorf("connection test failed with unexpected response: %v", result)
		}
	}
	return nil
}

// Close terminates the SNOWManager connection and releases resources
func (sm *SNOWManager) Close() error {
	// resource disposal.
	if sm.APIClient != nil {
		fmt.Println("SNOWManager: Cleaning up APIClient resources.")
		sm.APIClient = nil
	}

	fmt.Println("SNOWManager: All resources successfully released.")
	return nil
}
