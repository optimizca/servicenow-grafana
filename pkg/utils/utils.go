package utils

import (
	"fmt"
	"reflect"
	"strings"
	"time"

	"github.com/grafana/grafana-plugin-sdk-go/data"
	"github.com/optimizca/servicenow-grafana/pkg/models"
)

// ConvertMsTimeToMin converts a timestamp to minutes.
func ConvertMsTimeToMin(value time.Time) int64 {
	return value.Unix() / 60
}

// ParseResponse converts time series data to a Grafana DataFrame.
func ParseResponse(
	timeseries [][]interface{},
	seriesName string,
	targetRefID string,
	fieldType data.FieldType,
) *data.Frame {
	// Time field
	timeValues := make([]time.Time, len(timeseries))
	for i, point := range timeseries {
		if ts, ok := point[1].(float64); ok {
			timeValues[i] = time.Unix(0, int64(ts)*int64(time.Millisecond))
		}
	}
	timeField := data.NewField("time", nil, timeValues)

	// Value field, with type adjustment for string or number data
	var valueField *data.Field
	if fieldType == data.FieldTypeString {
		values := make([]string, len(timeseries))
		for i, point := range timeseries {
			if val, ok := point[0].(string); ok {
				values[i] = val
			}
		}
		valueField = data.NewField("value", nil, values)
	} else {
		values := make([]float64, len(timeseries))
		for i, point := range timeseries {
			if val, ok := point[0].(float64); ok {
				values[i] = val
			}
		}
		valueField = data.NewField("value", nil, values)
	}

	// Set up the DataFrame
	frame := data.NewFrame(seriesName, timeField, valueField)
	frame.RefID = targetRefID
	frame.Meta = &data.FrameMeta{
		Custom: map[string]interface{}{},
	}

	return frame
}

func ParseAnomResponse(
	timeseries [][]interface{},
	seriesName string,
	targetRefID string,
	fieldType data.FieldType,
) *data.Frame {
	timeValues := make([]time.Time, len(timeseries))
	for i, point := range timeseries {
		if ts, ok := point[0].(float64); ok {
			timeValues[i] = time.Unix(0, int64(ts)*int64(time.Millisecond))
		} else {
			fmt.Println("Warning: Invalid or missing timestamp in timeseries data")
		}
	}
	timeField := data.NewField("time", nil, timeValues)

	var valueField *data.Field
	if fieldType == data.FieldTypeString {
		values := make([]string, len(timeseries))
		for i, point := range timeseries {
			if val, ok := point[1].(string); ok {
				values[i] = val
			} else {
				fmt.Println("Warning: Invalid or missing value in timeseries data")
			}
		}
		valueField = data.NewField("value", nil, values)
	} else {
		values := make([]float64, len(timeseries))
		for i, point := range timeseries {
			if val, ok := point[1].(float64); ok {
				values[i] = val
			} else {
				fmt.Println("Warning: Invalid or missing value in timeseries data")
			}
		}
		valueField = data.NewField("value", nil, values)
	}

	// Setting up the DataFrame
	frame := data.NewFrame(seriesName, timeField, valueField)
	frame.RefID = targetRefID
	frame.Meta = &data.FrameMeta{
		Custom: map[string]interface{}{},
	}

	return frame
}

var TimeFieldNames = []string{"timestamp", "time", "date"}

// printDebug prints debug information if the debug level is set to 1
func PrintDebug(value interface{}) {
	if DebugLevel() == 1 {
		fmt.Println(value)
	}
}

// debugLevel returns the debug level (hardcoded to 1)
func DebugLevel() int {
	return 1
}

// getFieldType determines the field type based on the field name and its value
func GetFieldType(value interface{}, fieldName string) data.FieldType {
	// Check if the field name is a recognized time field
	for _, timeFieldName := range TimeFieldNames {
		if fieldName == timeFieldName {
			return data.FieldTypeTime
		}
	}

	// Determine the type based on the value's Go type
	switch reflect.TypeOf(value).Kind() {
	case reflect.Int, reflect.Int8, reflect.Int16, reflect.Int32, reflect.Int64,
		reflect.Uint, reflect.Uint8, reflect.Uint16, reflect.Uint32, reflect.Uint64,
		reflect.Float32, reflect.Float64:
		return data.FieldTypeFloat64
	case reflect.String:
		return data.FieldTypeString
	case reflect.Bool:
		return data.FieldTypeBool
	case reflect.Struct:
		if _, ok := value.(time.Time); ok {
			return data.FieldTypeTime
		}
	}
	return data.FieldTypeString
}

func CreateRegEx(input interface{}) string {
	fmt.Println("inside createRegEx")
	fmt.Printf("Input: %v\n", input)

	var regExStr string

	// Check if input is a string
	switch v := input.(type) {
	case string:
		return v
	case []string:
		fmt.Printf("Input Length: %d\n", len(v))
		if len(v) == 1 {
			fmt.Println("Using original input value")
			return v[0]
		}

		for _, item := range v {
			regExStr += "|" + item
		}

		if strings.HasPrefix(regExStr, "|") {
			regExStr = "/" + regExStr[1:] + "/"
		}
	default:
		fmt.Println("Invalid input type")
		return ""
	}

	fmt.Printf("New Regex Expression: %s\n", regExStr)
	return regExStr
}

func TrimRegEx(str string) string {
	if len(str) >= 3 && str[len(str)-2] == ')' && str[1] == '(' {
		str = string(str[0]) + str[2:len(str)-2] + string(str[len(str)-1])
	}
	return str
}

// ReplaceTargetUsingTemplVarsCSV replaces template variables in the given target string
// with their corresponding values from the scopedVars map. Template variables are identified
// by the syntax `${variableName}` and replaced with the matching value from scopedVars.
func ReplaceTargetUsingTemplVarsCSV(target string, scopedVars map[string]string) string {
	for key, value := range scopedVars {
		placeholder := "${" + key + "}"
		target = strings.ReplaceAll(target, placeholder, value)
	}
	return target
}

// ReplaceTargetUsingTemplVars replaces template variables in the given target string
// using the provided scopedVars map. This function converts the target string into
// a regex-compatible format if it contains multiple values.
func ReplaceTargetUsingTemplVars(target string, scopedVars map[string]string) string {
	replacedValue := ReplaceTargetUsingTemplVarsCSV(target, scopedVars)

	if strings.Contains(replacedValue, ",") {
		replacedValue = strings.ReplaceAll(replacedValue, ",", "|")
		replacedValue = "(" + replacedValue + ")"
	}

	if strings.HasPrefix(replacedValue, "(") && strings.HasSuffix(replacedValue, ")") {
		return "/" + replacedValue + "/"
	}

	return replacedValue
}

// GenerateTagString constructs a tag string from the provided target and options.
//
// The function processes `tagKeys` and `tagValues` from the `target` map, replacing template
// variables using scoped variables from the `options` map. It generates a formatted string
// of key-value pairs (e.g., "key1=value1,key2=value2").
func GenerateTagString(target map[string]interface{}, options map[string]string) string {
	tagString := ""
	if tagKeys, ok := target["tagKeys"].([]interface{}); ok {
		if tagValues, ok := target["tagValues"].([]interface{}); ok {
			for _, keyItem := range tagKeys {
				key := ReplaceTargetUsingTemplVarsCSV(keyItem.(map[string]interface{})["value"].(string), options)
				keys := strings.Split(key, ",")
				for _, k := range keys {
					for _, valueItem := range tagValues {
						value := ReplaceTargetUsingTemplVarsCSV(valueItem.(map[string]interface{})["value"].(string), options)
						values := strings.Split(value, ",")
						for _, v := range values {
							if k != "" && v != "" {
								tagString += fmt.Sprintf("%s=%s,", k, v)
							}
						}
					}
				}
			}
		}
	}
	if strings.HasSuffix(tagString, ",") {
		tagString = tagString[:len(tagString)-1]
	}
	return tagString
}

// Temporary solution for options

// ExtractOptions converts PluginQuery into a map for variable replacements.
func ExtractOptions(query models.PluginQuery) map[string]string {
	options := make(map[string]string)

	if query.SysparamQuery != "" {
		options["sysparamQuery"] = query.SysparamQuery
	}
	if query.MetricAnomaly != "" {
		options["metricAnomaly"] = query.MetricAnomaly
	}
	if query.TopologyParentDepth != "" {
		options["topologyParentDepth"] = query.TopologyParentDepth
	}
	if query.TopologyChildDepth != "" {
		options["topologyChildDepth"] = query.TopologyChildDepth
	}
	if query.TopologyNamespaces != "" {
		options["topologyNamespaces"] = query.TopologyNamespaces
	}
	if query.TopologyFilter != "" {
		options["topologyFilter"] = query.TopologyFilter
	}
	if query.LiveOsquery != "" {
		options["liveOsquery"] = query.LiveOsquery
	}
	if query.AggregateColumn != "" {
		options["aggregateColumn"] = query.AggregateColumn
	}
	if query.RowLimit != "" {
		options["rowLimit"] = query.RowLimit
	}
	if query.ElasticSearch != "" {
		options["elasticSearch"] = query.ElasticSearch
	}
	if query.TrendPeriod != "" {
		options["trendPeriod"] = query.TrendPeriod
	}
	if query.SortDirection != "" {
		options["sortDirection"] = query.SortDirection
	}
	if query.MetricValueType != "" {
		options["metricValueType"] = query.MetricValueType
	}

	options["showPercent"] = fmt.Sprintf("%v", query.ShowPercent)
	options["compressLogs"] = fmt.Sprintf("%v", query.CompressLogs)
	options["grafanaTimerange"] = fmt.Sprintf("%v", query.GrafanaTimerange)

	options["page"] = fmt.Sprintf("%d", query.Page)

	addLabelValuePair(options, "tableName", query.TableName)
	addLabelValuePair(options, "groupBy", query.GroupBy)
	addLabelValuePair(options, "getAlertCount", query.GetAlertCount)
	addLabelValuePair(options, "selectedQueryCategory", query.SelectedQueryCategory)
	addLabelValuePair(options, "selectedServiceList", query.SelectedServiceList)
	addLabelValuePair(options, "selectedSourceList", query.SelectedSourceList)
	addLabelValuePair(options, "selectedMetricTypeList", query.SelectedMetricTypeList)
	addLabelValuePair(options, "selectedMetricNameList", query.SelectedMetricNameList)
	addLabelValuePair(options, "selectedMetricAnomalyList", query.SelectedMetricAnomalyList)
	addLabelValuePair(options, "selectedAlertTypeList", query.SelectedAlertTypeList)
	addLabelValuePair(options, "selectedAlertStateList", query.SelectedAlertStateList)
	addLabelValuePair(options, "selectedChangeTypeList", query.SelectedChangeTypeList)
	addLabelValuePair(options, "selectedTopologyDependsOnFilter", query.SelectedTopologyDependsOnFilter)
	addLabelValuePair(options, "selectedAgentFilterType", query.SelectedAgentFilterType)
	addLabelValuePair(options, "selectedAgentFilter", query.SelectedAgentFilter)
	addLabelValuePair(options, "selectedAggregateType", query.SelectedAggregateType)
	addLabelValuePair(options, "selectedTableColumns", query.SelectedTableColumns)
	addLabelValuePair(options, "sortBy", query.SortBy)
	addLabelValuePair(options, "selectedTrendColumn", query.SelectedTrendColumn)
	addLabelValuePair(options, "selectedTrendBy", query.SelectedTrendBy)
	addLabelValuePair(options, "grafanaTimerangeColumn", query.GrafanaTimerangeColumn)
	addLabelValuePair(options, "tagKeys", query.TagKeys)
	addLabelValuePair(options, "tagValues", query.TagValues)
	addLabelValuePairSlice(options, "relationshipTypes", query.RelationshipTypes)
	addLabelValuePairSlice(options, "excludedClasses", query.ExcludedClasses)

	return options
}

func addLabelValuePair(options map[string]string, key string, pair *models.LabelValuePair) {
	if pair != nil && pair.Value != nil {
		options[key] = fmt.Sprintf("%v", pair.Value)
	}
}

func addLabelValuePairSlice(options map[string]string, key string, pairs []*models.LabelValuePair) {
	if len(pairs) > 0 {
		values := make([]string, len(pairs))
		for i, pair := range pairs {
			if pair != nil && pair.Value != nil {
				values[i] = fmt.Sprintf("%v", pair.Value)
			}
		}
		options[key] = fmt.Sprintf("[%s]", joinStrings(values, ","))
	}
}

func joinStrings(strings []string, sep string) string {
	result := ""
	for i, s := range strings {
		if i > 0 {
			result += sep
		}
		result += s
	}
	return result
}
