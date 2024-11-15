package snowmanager

import (
	"encoding/json"
	"fmt"
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
	WithCredentials bool
	URL             string
	APIPath         string
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
				columnValue = services.NewTemplateService().Replace(val, options["scopedVars"].(map[string]string))
			}
		}

		operatorValue := ""
		if operatorObject, ok := sysparmRow["operator"].(map[string]interface{}); ok {
			if val, ok := operatorObject["value"].(string); ok {
				operatorValue = services.NewTemplateService().Replace(val, options["scopedVars"].(map[string]string))
			}
		}

		valueValue := ""
		if valueObject, ok := sysparmRow["value"].(map[string]interface{}); ok {
			if val, ok := valueObject["value"].(string); ok {
				valueValue = services.NewTemplateService().Replace(val, options["scopedVars"].(map[string]string))
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
