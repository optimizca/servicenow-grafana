package utils

import (
	"encoding/json"
	"fmt"
	"reflect"
	"strconv"
	"strings"
	"time"

	"github.com/grafana/grafana-plugin-sdk-go/backend"
	"github.com/grafana/grafana-plugin-sdk-go/data"
	"github.com/optimizca/servicenow-grafana/pkg/models"
)

// ConvertMsTimeToMin converts a timestamp to minutes.
func ConvertMsTimeToMin(value time.Time) int64 {
	return value.Unix() / 60
}

// NumericConverter handles all numeric type conversions
type NumericConverter struct{}

// ToFloat converts any numeric type to float64 with proper handling
// Returns 0 for non-numeric or nil values
func (nc *NumericConverter) ToFloat(val interface{}) float64 {
    if val == nil {
        return 0
    }

    switch v := val.(type) {
    case int, int8, int16, int32, int64:
        return float64(reflect.ValueOf(v).Int())
    case uint, uint8, uint16, uint32, uint64:
        return float64(reflect.ValueOf(v).Uint())
    case float32:
        return float64(v)
    case float64:
        return v
    case string:
        if f, err := strconv.ParseFloat(v, 64); err == nil {
            return f
        }
    }
    return 0
}

// TypeAnalyzer determines the appropriate data type for fields
type TypeAnalyzer struct {
    maxSamples int
}

// NewTypeAnalyzer creates a new TypeAnalyzer with default settings
func NewTypeAnalyzer() *TypeAnalyzer {
    return &TypeAnalyzer{
        maxSamples: 10, // Default sample size
    }
}

// InferType determines the most suitable data type for a field
func (ta *TypeAnalyzer) InferType(records []map[string]interface{}, field string) data.FieldType {
    var (
        timeVals   int
        numberVals int
        stringVals int
        sampled    int
    )

    for _, record := range records {
        if record[field] == nil {
            continue
        }

        sampled++
        if sampled > ta.maxSamples {
            break
        }

        switch {
        case isTimestamp(record[field]):
            timeVals++
        case isNumeric(record[field]):
            numberVals++
        default:
            stringVals++
        }
    }

    if timeVals > 0 {
        return data.FieldTypeTime
    }
    if numberVals > 0 && stringVals == 0 {
        return data.FieldTypeFloat64
    }
    return data.FieldTypeString
}

// TimeConverter handles timestamp conversions
type TimeConverter struct{}

// ToTime converts various input types to time.Time
func (tc *TimeConverter) ToTime(val interface{}) time.Time {
    if val == nil {
        return time.Time{}
    }

    switch v := val.(type) {
    case time.Time:
        return v
    case string:
        return tc.parseTimeString(v)
    case int64:
		return tc.convertUnixTime(v)
    case float64:
        return tc.convertUnixTime(int64(v))
    case json.Number:
        if unix, err := v.Int64(); err == nil {
            return tc.convertUnixTime(unix)
        }
    }
    return time.Time{}
}

// parseTimeString attempts to parse a string as timestamp
func (tc *TimeConverter) parseTimeString(s string) time.Time {
    formats := []string{
        time.RFC3339Nano,
        "2006-01-02 15:04:05.999999999",
        "2006-01-02 15:04:05",
    }

    for _, format := range formats {
        if t, err := time.Parse(format, s); err == nil {
            return t
        }
    }

    if unix, err := strconv.ParseInt(s, 10, 64); err == nil {
        return tc.convertUnixTime(unix)
    }

    return time.Time{}
}

// StringConverter handles string conversions
type StringConverter struct{}

// ToString converts any value to its string representation
func (sc *StringConverter) ToString(val interface{}) string {
    if val == nil {
        return ""
    }
    return fmt.Sprintf("%v", val)
}

// Handles both second and millisecond timestamps
func (tc *TimeConverter) convertUnixTime(timestamp int64) time.Time {
    if timestamp > 1e12 { // Milliseconds
        return time.Unix(timestamp/1000, (timestamp%1000)*1e6)
    }
    return time.Unix(timestamp, 0) // Seconds
}

// isTimestamp checks if a value represents a timestamp
func isTimestamp(val interface{}) bool {
    switch v := val.(type) {
    case time.Time:
        return true
    case string:
        if _, err := time.Parse(time.RFC3339Nano, v); err == nil {
            return true
        }
        if unix, err := strconv.ParseInt(v, 10, 64); err == nil && unix > 1e9 {
            return true
        }
    case int64, float64:
        return true
    }
    return false
}

// isNumeric checks if a value is numeric
func isNumeric(val interface{}) bool {
    switch v := val.(type) {
    case int, int8, int16, int32, int64, uint, uint8, uint16, uint32, uint64, float32, float64:
        return true
    case string:
        _, err := strconv.ParseFloat(v, 64)
        return err == nil
    }
    return false
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
	backend.Logger.Info("Before replacing", "target", target, "scopedVars", scopedVars)
	for key, value := range scopedVars {
		placeholder := "${" + key + "}"
		target = strings.ReplaceAll(target, placeholder, value)
	}
	backend.Logger.Info("After replacing", "target", target)
	return target
}

// ReplaceTargetUsingTemplVars replaces template variables in the given target string
// using the provided scopedVars map. This function converts the target string into
// a regex-compatible format if it contains multiple values.
func ReplaceTargetUsingTemplVars(target string, scopedVars map[string]string) string {
	backend.Logger.Info("Before replacing", "target", target, "scopedVars", scopedVars)
	replacedValue := ReplaceTargetUsingTemplVarsCSV(target, scopedVars)
	backend.Logger.Info("After replacing", "replacedValue", replacedValue)

	if strings.Contains(replacedValue, ",") {
		replacedValue = strings.ReplaceAll(replacedValue, ",", "|")
		replacedValue = "(" + replacedValue + ")"
	}

	if strings.HasPrefix(replacedValue, "(") && strings.HasSuffix(replacedValue, ")") {
		return "/" + replacedValue + "/"
	}
	backend.Logger.Info("Final replaced value", "replacedValue", replacedValue)
	return replacedValue
}

// GenerateTagString constructs a tag string from the provided target and options.
//
// The function processes `tagKeys` and `tagValues` from the `target` map, replacing template
// variables using scoped variables from the `options` map. It generates a formatted string
// of key-value pairs (e.g., "key1=value1,key2=value2").
func GenerateTagString(target models.PluginQuery, options map[string]string) string {
	tagString := ""

	// Check if TagKeys and TagValues are available
	if target.TagKeys != nil && target.TagValues != nil && target.TagKeys.Value != nil && target.TagValues.Value != nil {
		if tagKeys, ok := target.TagKeys.Value.(string); ok {
			keys := strings.Split(ReplaceTargetUsingTemplVarsCSV(tagKeys, options), ",")
			for _, key := range keys {
				if tagValues, ok := target.TagValues.Value.(string); ok {
					values := strings.Split(ReplaceTargetUsingTemplVarsCSV(tagValues, options), ",")
					for _, value := range values {
						if key != "" && value != "" {
							tagString += fmt.Sprintf("%s=%s,", key, value)
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

// CreateNodeGraphFrame generates Grafana data frames for a node graph visualization.
func CreateNodeGraphFrame(dataResponse map[string]interface{}, refID string) []*data.Frame {
	var frames []*data.Frame

	// Handle nodes
	if result, ok := dataResponse["result"].(map[string]interface{}); ok {
		if nodes, ok := result["nodes"].([]map[string]interface{}); ok && len(nodes) > 0 {
			nodeFrame := data.NewFrame("Nodes")
			nodeFrame.RefID = refID
			nodeFrame.Meta = &data.FrameMeta{
				PreferredVisualization: "nodeGraph",
			}

			// Add fields for each key in the first node
			for key := range nodes[0] {
				fieldConfig := getFieldConfigForNode(key)

				// Collect all values for the field
				values := make([]interface{}, len(nodes))
				for i, node := range nodes {
					values[i] = node[key]
				}

				field := data.NewField(key, nil, values).SetConfig(fieldConfig)
				nodeFrame.Fields = append(nodeFrame.Fields, field)
			}

			frames = append(frames, nodeFrame)
		}

		// Handle edges
		if edges, ok := result["edges"].([]map[string]interface{}); ok && len(edges) > 0 {
			edgeFrame := data.NewFrame("Edges")
			edgeFrame.RefID = refID
			edgeFrame.Meta = &data.FrameMeta{
				PreferredVisualization: "nodeGraph",
			}

			// Add fields for each key in the first edge
			for key := range edges[0] {
				// Collect all values for the field
				values := make([]interface{}, len(edges))
				for i, edge := range edges {
					values[i] = edge[key]
				}

				field := data.NewField(key, nil, values).SetConfig(&data.FieldConfig{})
				edgeFrame.Fields = append(edgeFrame.Fields, field)
			}

			frames = append(frames, edgeFrame)
		}
	}

	return frames
}

// getFieldConfigForNode provides field configurations based on node keys.
func getFieldConfigForNode(key string) *data.FieldConfig {
	config := &data.FieldConfig{}

	switch key {
	case "id":
		config.Links = []data.DataLink{
			{
				Title:       "Generic CI 360 Degree View",
				TargetBlank: true,
				URL:         "/d/AEOITnWnz?var-ci=${__data.fields.id}&var-ciClasses=${__data.fields.subtitle}",
			},
		}
	case "arc__impact_clear":
		config.Custom = createColorConfig("fixed", "#77B27B")
	case "arc__impact_critical":
		config.Custom = createColorConfig("fixed", "#DD8581")
	case "arc__impact_major":
		config.Custom = createColorConfig("fixed", "#EABA75")
	case "arc__impact_minor":
		config.Custom = createColorConfig("fixed", "#E3D960")
	case "arc__impact_warning":
		config.Custom = createColorConfig("fixed", "#68ABDB")
	case "arc__impact_ok":
		config.Custom = createColorConfig("fixed", "#77B27B")
	default:
		config = &data.FieldConfig{}
	}

	return config
}

// createColorConfig creates a color configuration for fields.
func createColorConfig(mode, fixedColor string) map[string]interface{} {
	return map[string]interface{}{
		"color": map[string]interface{}{
			"mode":       mode,
			"fixedColor": fixedColor,
		},
	}
}

// Temporary solution for datasource options

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
	// if query.AggregateColumn != nil && query.AggregateColumn.Value != nil {
	// 	options["aggregateColumn"] = query.AggregateColumn
	// }
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
	// options["getAlertCount"] = fmt.Sprintf("%v", query.GetAlertCount)

	options["page"] = fmt.Sprintf("%d", query.Page)

	addLabelValuePair(options, "aggregateColumn", query.AggregateColumn)
	addLabelValuePair(options, "tableName", query.TableName)
	addLabelValuePair(options, "groupBy", query.GroupBy)
	addLabelValuePair(options, "getAlertCount", query.GetAlertCount)
	addLabelValuePair(options, "selectedQueryCategory", query.SelectedQueryCategory)
	addLabelValuePair(options, "selectedServiceList", query.SelectedServiceList)
	addLabelValuePairSlice(options, "selectedSourceList", query.SelectedSourceList)
	addLabelValuePairSlice(options, "selectedMetricTypeList", query.SelectedMetricTypeList)
	addLabelValuePairSlice(options, "selectedMetricNameList", query.SelectedMetricNameList)
	// addLabelValuePair(options, "selectedMetricAnomalyList", query.SelectedMetricAnomalyList)
	addLabelValuePair(options, "selectedAlertTypeList", query.SelectedAlertTypeList)
	addLabelValuePair(options, "selectedAlertStateList", query.SelectedAlertStateList)
	addLabelValuePair(options, "selectedChangeTypeList", query.SelectedChangeTypeList)
	addLabelValuePair(options, "selectedTopologyDependsOnFilter", query.SelectedTopologyDependsOnFilter)
	addLabelValuePair(options, "selectedAgentFilterType", query.SelectedAgentFilterType)
	addLabelValuePair(options, "selectedAgentFilter", query.SelectedAgentFilter)
	addLabelValuePair(options, "selectedAggregateType", query.SelectedAggregateType)
	addLabelValuePairSlice(options, "selectedTableColumns", query.SelectedTableColumns)
	addLabelValuePair(options, "sortBy", query.SortBy)
	addLabelValuePair(options, "selectedTrendColumn", query.SelectedTrendColumn)
	addLabelValuePair(options, "selectedTrendBy", query.SelectedTrendBy)
	addLabelValuePair(options, "grafanaTimerangeColumn", query.GrafanaTimerangeColumn)
	addLabelValuePair(options, "tagKeys", query.TagKeys)
	addLabelValuePair(options, "tagValues", query.TagValues)
	addLabelValuePairSlice(options, "relationshipTypes", query.RelationshipTypes)
	addLabelValuePairSlice(options, "excludedClasses", query.ExcludedClasses)

	backend.Logger.Info("Extracted options", "options", options)
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
