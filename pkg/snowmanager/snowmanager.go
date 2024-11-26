package snowmanager

import (
	"encoding/json"
	"fmt"
	"sort"
	"strings"
	"time"

	"github.com/optimizca/servicenow-grafana/pkg/client"
	"github.com/optimizca/servicenow-grafana/pkg/services"
)

type SNOWManager struct {
	APIClient *client.APIClient
	APIPath   string
}

type SnowManagerOptions struct {
	WithCredentials bool   `json:"withCredentials"`
	URL             string `json:"url"`
	APIPath         string `json:"apiPath"`
	CacheTimeout    time.Duration
}

func NewSNOWManager(options SnowManagerOptions) *SNOWManager {
	headers := map[string]string{"Content-Type": "application/json"}
	apiClient := client.Initialize(headers, options.WithCredentials, options.URL, options.CacheTimeout)

	return &SNOWManager{
		APIClient: apiClient,
		APIPath:   options.APIPath,
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

func (sm *SNOWManager) ParseBasicSysparm(sysparamQuery string, options map[string]interface{}) string {
	var basicSysparm []map[string]interface{}
	if err := json.Unmarshal([]byte(sysparamQuery), &basicSysparm); err != nil {
		fmt.Println("failed to parse sysparamQuery:", err)
		return ""
	}

	var sysparm []string
	for _, sysparmRow := range basicSysparm {
		if sysparmRow["column"] == nil {
			continue
		}

		columnValue := ""
		if columnObject, ok := sysparmRow["column"].(map[string]interface{}); ok {
			if val, ok := columnObject["value"].(string); ok {
				columnValue = services.NewTemplateService().Replace(val, options["scopedVars"].(map[string]string), "")
			}
		}

		operatorValue := ""
		if operatorObject, ok := sysparmRow["operator"].(map[string]interface{}); ok {
			if val, ok := operatorObject["value"].(string); ok {
				operatorValue = services.NewTemplateService().Replace(val, options["scopedVars"].(map[string]string), "")
			}
		}

		valueValue := ""
		if valueObject, ok := sysparmRow["value"].(map[string]interface{}); ok {
			if val, ok := valueObject["value"].(string); ok {
				valueValue = services.NewTemplateService().Replace(val, options["scopedVars"].(map[string]string), "")
			}
		}

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
func (sm *SNOWManager) SingleSysParamQuery(queryParam string) []map[string]map[string]string {
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
	var result []map[string]map[string]string

	for _, instance := range instances {
		for _, operator := range operators {
			index := strings.Index(instance, operator)
			if index != -1 {
				column := strings.TrimSpace(instance[:index])
				value := strings.TrimSpace(instance[index+len(operator):])

				result = append(result, map[string]map[string]string{
					"column":    {"value": column},
					"operator":  {"value": operator},
					"value":     {"value": value},
					"separator": {"value": "^"},
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
