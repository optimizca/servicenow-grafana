package client

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"reflect"
	"sort"
	"strings"
	"time"

	// "github.com/grafana/grafana-plugin-sdk-go/backend"
	"github.com/grafana/grafana-plugin-sdk-go/backend"
	"github.com/grafana/grafana-plugin-sdk-go/data"
	"github.com/optimizca/servicenow-grafana/pkg/utils"
)

type RequestOptions struct {
	Headers         map[string]string
	WithCredentials bool
	URL             string
	APIPath         string
}

type APIClient struct {
	RequestOptions RequestOptions
	CacheTimeout   time.Duration
}

type Option struct {
	Label               string   `json:"label"`
	Value               string   `json:"value"`
	Suffix              string   `json:"suffix,omitempty"`
	Type                string   `json:"type,omitempty"`
	Description         string   `json:"description,omitempty"`
	InstanceName        string   `json:"instanceName,omitempty"`
	Options             []Option `json:"options,omitempty"`
	UpdatedRelativeTime string   `json:"updated_relative_time,omitempty"`
	CreatedRelativeTime string   `json:"created_relative_time,omitempty"`
	SysCreatedOn        float64  `json:"sys_created_on,omitempty"`
	AlertId             string   `json:"AlertId,omitempty"`
	Incident            string   `json:"Incident,omitempty"`
	IncidentSysID       *string  `json:"IncidentSysID,omitempty"`
	//	IncidentPriority          float64 `json:"incidentPriority,omitempty"`
	Group                    string  `json:"Group,omitempty"`
	Severity                 string  `json:"Severity,omitempty"`
	Priority                 string  `json:"Priortity,omitempty"`
	State                    string  `json:"State,omitempty"`
	Acknowledged             string  `json:"Acknowledged,omitempty"`
	Summary                  string  `json:"Summary,omitempty"`
	CI                       string  `json:"CI,omitempty"`
	CIClass                  string  `json:"CIClass,omitempty"`
	CISysID                  *string `json:"CISysID,omitempty"`
	MetricName               string  `json:"MetricName,omitempty"`
	Resource                 string  `json:"Resource,omitempty"`
	Source                   string  `json:"Source,omitempty"`
	Maintenance              string  `json:"Maintenance,omitempty"`
	EventCount               float64 `json:"EventCount,omitempty"`
	IsGroup                  string  `json:"IsGroup,omitempty"`
	SeverityNum              float64 `json:"SeverityNum,omitempty"`
	PriorityNum              float64 `json:"PriortityNum,omitempty"`
	Updated                  float64 `json:"Updated,omitempty"`
	LastEventTime            float64 `json:"last_event_time,omitempty"`
	SysID                    string  `json:"sys_id,omitempty"`
	AdditionalInfo           string  `json:"additional_info,omitempty"`
	UIAction                 string  `json:"uiAction,omitempty"`
	AnnotationText           string  `json:"annotationText,omitempty"`
	AnomalyCount             string  `json:"anomaly_count,omitempty"`
	Node                     string  `json:"node,omitempty"`
	StartTime                float64 `json:"start_time,omitempty"`
	SecondaryAlerts          float64 `json:"secondary_alerts,omitempty"`
	SecondaryDistinctSources float64 `json:"secondary_distinct_sources,omitempty"`
	DrilldownSysID           string  `json:"drilldownSysID,omitempty"`
	ImpactedServicesCount    string  `json:"impactedServicesCount,omitempty"`
	ImpactedServices         string  `json:"impactedServices,omitempty"`
}

// Constructor function to initialize the APIClient
func Initialize(headers map[string]string, withCredentials bool, url string, apiPath string, cacheTimeout time.Duration) *APIClient {
	return &APIClient{
		RequestOptions: RequestOptions{
			Headers:         headers,
			WithCredentials: withCredentials,
			URL:             url,
			APIPath:         apiPath,
		},
		CacheTimeout: cacheTimeout,
	}
}

// Performs an HTTP Request
func (client *APIClient) Request(method string, endpoint string, body interface{}, cacheOverride string) ([]byte, error) {
	fullURL := client.RequestOptions.URL + client.RequestOptions.APIPath + endpoint
	jsonBody, err := json.Marshal(body)
	if err != nil {
		return nil, err
	}

	backend.Logger.Debug("Request URL: ", fullURL)
	backend.Logger.Debug("Request Body: ", string(jsonBody))
	req, err := http.NewRequest(method, fullURL, bytes.NewBuffer(jsonBody))
	if err != nil {
		return nil, err
	}

	for key, value := range client.RequestOptions.Headers {
		req.Header.Set(key, value)
	}

	if cacheOverride != "" {
		req.Header.Set("Cache-Override", cacheOverride)
	}

	clientHTTP := &http.Client{}
	resp, err := clientHTTP.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, errors.New("request failed: " + resp.Status)
	}

	return io.ReadAll(resp.Body)
}

func MapResponseToVariable(result []map[string]interface{}, asterisk bool, showNull bool) []Option {
	var resultsParsed []Option

	for _, d := range result {
		if name, nameOk := d["name"]; nameOk {
			if id, idOk := d["id"]; idOk {
				nameStr := "NULL"
				idStr := "NULL"
				if name != "" && name != nil {
					nameStr = fmt.Sprintf("%v", name)
				}
				if id != "" && id != nil {
					idStr = fmt.Sprintf("%v", id)
				}
				resultsParsed = append(resultsParsed, Option{Label: nameStr, Value: idStr})
			}
		} else {
			keys := reflect.ValueOf(d).MapKeys()
			if len(keys) > 0 {
				firstKey := fmt.Sprintf("%v", keys[0])
				firstVal := fmt.Sprintf("%v", d[firstKey])

				if firstVal == "" || d[firstKey] == nil {
					firstVal = "NULL"
				}

				secondVal := firstVal
				if len(keys) > 1 {
					secondKey := fmt.Sprintf("%v", keys[1])
					secondVal = fmt.Sprintf("%v", d[secondKey])
					if secondVal == "" || d[secondKey] == nil {
						secondVal = "NULL"
					}
				}

				resultsParsed = append(resultsParsed, Option{Label: firstVal, Value: secondVal})
			}
		}
	}

	if showNull {
		resultsParsed = append(resultsParsed, Option{Label: "NULL", Value: "NULL"})
	}
	if asterisk {
		resultsParsed = append(resultsParsed, Option{Label: "*", Value: "*"})
	}

	return resultsParsed
}

func MapToLabelValue(result []map[string]interface{}) []Option {
	var mappedResults []Option

	for _, d := range result {
		// Extract label, value, and type with full type checking
		var label, value, fieldType string

		// Handle label
		if labelInterface, exists := d["label"]; exists {
			switch v := labelInterface.(type) {
			case string:
				label = v
			case []interface{}:
				if len(v) > 0 {
					label = fmt.Sprintf("%v", v[0])
				}
			default:
				label = fmt.Sprintf("%v", v)
			}
		}

		// Handle value
		if valueInterface, exists := d["value"]; exists {
			switch v := valueInterface.(type) {
			case string:
				value = v
			case []interface{}:
				if len(v) > 0 {
					value = fmt.Sprintf("%v", v[0])
				}
			default:
				value = fmt.Sprintf("%v", v)
			}
		}

		// Handle type
		if typeInterface, exists := d["type"]; exists {
			switch v := typeInterface.(type) {
			case string:
				fieldType = v
			case []interface{}:
				if len(v) > 0 {
					fieldType = fmt.Sprintf("%v", v[0])
				}
			default:
				fieldType = fmt.Sprintf("%v", v)
			}
		}

		// Create the option
		option := Option{
			Label:       fmt.Sprintf("%s (%s)", label, fieldType),
			Value:       value,
			Description: value,
			Type:        fieldType,
		}

		// Handle reference field options
		if fieldType == "Reference" {
			if optionsInterface, exists := d["options"]; exists {
				if options, ok := optionsInterface.([]interface{}); ok {
					var childOptions []Option
					for _, opt := range options {
						if optMap, ok := opt.(map[string]interface{}); ok {
							childOptions = append(childOptions, MapToLabelValue([]map[string]interface{}{optMap})...)
						}
					}
					option.Options = childOptions
				}
			}
		}

		mappedResults = append(mappedResults, option)
	}

	return mappedResults
}

func MapGenericToLabelValue(result []map[string]interface{}) []Option {
	var mappedResults []Option

	for _, d := range result {
		if name, ok := d["name"]; ok && d["id"] != nil {
			if name == "" || name == nil {
				name = d["id"]
			}
			if d["id"] == "" || d["id"] == nil {
				d["id"] = "NULL"
			}
			mappedResults = append(mappedResults, Option{
				Label: name.(string),
				Value: d["id"].(string),
			})
		} else {
			keys := make([]string, 0, len(d))
			for k := range d {
				keys = append(keys, k)
			}
			if d[keys[0]] == "" || d[keys[0]] == nil {
				d[keys[0]] = "NULL"
			}
			if len(keys) > 1 && (d[keys[1]] == "" || d[keys[1]] == nil) {
				d[keys[1]] = "NULL"
			}
			label := d[keys[0]].(string)
			value := label
			if len(keys) > 1 {
				value = d[keys[1]].(string)
			}
			mappedResults = append(mappedResults, Option{
				Label: label,
				Value: value,
			})
		}
	}
	return mappedResults
}

func MapTableToLabelValue(result []map[string]interface{}) []Option {
	var mappedResults []Option

	for _, d := range result {
		label, labelExists := d["label"]
		name, nameExists := d["name"]

		var labelStr, nameStr string

		if labelExists {
			labelStr = fmt.Sprintf("%v", label)
		}

		if nameExists {
			nameStr = fmt.Sprintf("%v", name)
		}

		backend.Logger.Debug("Label: ", labelStr)
		backend.Logger.Debug("Name: ", nameStr)

		// Use label as the display value and name as the internal value
		if labelStr != "" {
			mappedResults = append(mappedResults, Option{
				Label: labelStr,
				Value: nameStr,
			})
		} else if nameStr != "" {
			// Fallback to using name as both label and value if label is not present
			mappedResults = append(mappedResults, Option{
				Label: nameStr,
				Value: nameStr,
			})
		}
	}
	return mappedResults
}

func MapChecksToValuePlusSuffix(result []map[string]interface{}) []Option {
	var mappedResults []Option

	for _, d := range result {
		label := fmt.Sprintf("%v", d["name:display"])
		value := fmt.Sprintf("%v", d["sys_id:value"])
		suffix := fmt.Sprintf("%v", d["sys_class_name:display"])

		mappedResults = append(mappedResults, Option{
			Label:  label,
			Value:  value,
			Suffix: suffix,
		})
	}
	return mappedResults
}

func MapValueSuffixToColumns(result []Option) []Option {
	var displayArray, valueArray []Option

	for _, d := range result {
		displayArray = append(displayArray, Option{
			Label: d.Label + ":display",
			Value: d.Value + ":d",
		})
		valueArray = append(valueArray, Option{
			Label: d.Label + ":value",
			Value: d.Value + ":v",
		})
	}

	finalResult := append(displayArray, valueArray...)

	sort.Slice(finalResult, func(i, j int) bool {
		return finalResult[i].Label < finalResult[j].Label
	})

	return finalResult
}

func MapValueAsSuffix(result []Option, addType bool) []Option {
	var options []Option

	for _, d := range result {
		option := Option{
			Label:       d.Label,
			Value:       d.Value,
			Description: d.Value,
		}

		if addType && d.Type != "" {
			option.Label = d.Label + " (" + d.Type + ")"
		}

		if len(d.Options) > 0 {
			for _, nested := range d.Options {
				nestedOption := Option{
					Label:       nested.Label,
					Value:       nested.Value,
					Description: nested.Value,
				}
				if addType && nested.Type != "" {
					nestedOption.Label = nested.Label + " (" + nested.Type + ")"
				}
				option.Options = append(option.Options, nestedOption)
			}
		}
		options = append(options, option)
	}

	// Sort the options by Label field in ascending order
	sort.Slice(options, func(i, j int) bool {
		return options[i].Label < options[j].Label
	})

	return options
}

func MapSuffixToLabel(result []Option) []Option {
	var mappedResults []Option

	for _, d := range result {
		labelWithSuffix := d.Label
		if d.Suffix != "" {
			labelWithSuffix = d.Label + " (" + d.Suffix + ")"
		}
		mappedResults = append(mappedResults, Option{
			Label: labelWithSuffix,
			Value: d.Value,
		})
	}

	return mappedResults
}

func AppendInstanceNameToResponse(response []Option, instanceName string) []Option {
	for i := range response {
		response[i].InstanceName = instanceName
	}
	return response
}

func MapToTextValue(result []interface{}) []Option {
	var mappedResults []Option

	for i, d := range result {
		switch item := d.(type) {
		case map[string]interface{}:
			if text, ok := item["text"]; ok {
				if value, ok := item["value"]; ok {
					mappedResults = append(mappedResults, Option{
						Label: fmt.Sprintf("%v", text),
						Value: fmt.Sprintf("%v", value),
					})
					continue
				}
			}
			mappedResults = append(mappedResults, Option{
				Label: fmt.Sprintf("%v", d),
				Value: fmt.Sprintf("%d", i),
			})

		default:
			mappedResults = append(mappedResults, Option{
				Label: fmt.Sprintf("%v", d),
				Value: fmt.Sprintf("%v", d),
			})
		}
	}

	return mappedResults
}

func MapOutageResponseToFrame(result []map[string]interface{}, targetRefID string, showPercent bool) []*data.Frame {
	var frames []*data.Frame

	if showPercent {
		// Create a single table frame for all CIs
		frame := data.NewFrame("Uptime Summary")

		// Add columns
		ciNames := make([]string, 0, len(result))
		uptimePercents := make([]float64, 0, len(result))
		// statusSummaries := make([]string, 0, len(result))

		for _, dataEntry := range result {
			ciName, _ := dataEntry["ci"].(string)
			ciNames = append(ciNames, ciName)

			// Calculate uptime percentage
			uptimePercent := 0.0
			if rawUptime, ok := dataEntry["uptimePercentage"].(float64); ok {
				uptimePercent = rawUptime * 100
			}
			uptimePercents = append(uptimePercents, uptimePercent)
		}

		// Add fields to frame
		frame.Fields = append(frame.Fields,
			data.NewField("CI Name", nil, ciNames),
			data.NewField("Uptime %", nil, uptimePercents).SetConfig(&data.FieldConfig{
				Unit: "percent",
			}),
			// data.NewField("Status", nil, statusSummaries),
		)

		frames = append(frames, frame)
	} else {
		// Iterate over each outage entry in the result
		for _, dataEntry := range result {
			// Extract "ci" (Configuration Item Name)
			ciName, _ := dataEntry["ci"].(string)
			// Extract the "datapoints" field and ensure it's a []interface{}
			if rawDatapoints, ok := dataEntry["datapoints"].([]interface{}); ok {
				// Convert []interface{} to [][]interface{}
				var datapoints [][]interface{}
				for _, point := range rawDatapoints {
					if pointSlice, ok := point.([]interface{}); ok {
						datapoints = append(datapoints, pointSlice)
					} else {
						backend.Logger.Warn("Invalid datapoint format", "ci", ciName)
						continue
					}
				}

				// Prepare columns for the frame
				operationalValues := make([]string, 0)
				timeValues := make([]time.Time, 0)

				// Extract "Operational" and "Time" values
				for _, point := range datapoints {
					// Extract operational status (first value)
					if status, ok := point[0].(string); ok {
						operationalValues = append(operationalValues, status)
					} else {
						backend.Logger.Warn("Missing or invalid operational field", "ci", ciName)
					}

					// Extract timestamp (second value) and convert from milliseconds
					if timestamp, ok := point[1].(float64); ok {
						timeValues = append(timeValues, time.Unix(int64(timestamp/1000), 0))
					} else {
						backend.Logger.Warn("Missing or invalid time field", "ci", ciName)
					}
				}

				// Create a new frame and add the extracted data
				frame := data.NewFrame(ciName)
				frame.Fields = append(frame.Fields, data.NewField(ciName, nil, operationalValues))
				frame.Fields = append(frame.Fields, data.NewField("Time", nil, timeValues))

				frames = append(frames, frame)
			} else {
				backend.Logger.Warn("Missing or invalid datapoints in data entry", "ci", ciName)
			}
		}
	}

	return frames
}

func MapTrendResponseToFrame(result []map[string]interface{}, targetRefID string) []*data.Frame {
	var frames []*data.Frame

	// unpacking the response(result array) and getting dataEntry
	for _, dataEntry := range result {
		// Iterate over each key in the dataEntry map
		for dataKey, dataValue := range dataEntry {
			// Assert that dataValue is a map[string]interface{}
			if dataMap, ok := dataValue.(map[string]interface{}); ok {
				// Extract the "datapoints" field from the nested map
				if dataPoints, ok := dataMap["datapoints"].([]interface{}); ok {
					// Convert []interface{} to [][]interface{}
					var datapoints [][]interface{}
					for _, point := range dataPoints {
						if pointSlice, ok := point.([]interface{}); ok {
							datapoints = append(datapoints, pointSlice)
						} else {
							backend.Logger.Warn("Invalid datapoint format", "dataKey", dataKey)
							continue
						}
					}

					frame := utils.ParseResponse(datapoints, dataKey, targetRefID, data.FieldTypeFloat64)
					frames = append(frames, frame)
				} else {
					backend.Logger.Warn("Missing or invalid datapoints in data entry", "dataKey", dataKey)
				}
			} else {
				backend.Logger.Warn("Unexpected data format in data entry", "dataKey", dataKey)
			}
		}
	}

	return frames
}

func MapMetricsResponseToFrame(result []map[string]interface{}, targetRefID string) []*data.Frame {
	var frames []*data.Frame

	for _, dataEntry := range result {
		// Validate required fields
		source, sourceOk := dataEntry["source"].(string)
		metricName, metricOk := dataEntry["metricName"].(string)
		if !sourceOk || !metricOk {
			fmt.Println("Warning: Missing 'source' or 'metricName' in data entry")
			continue
		}

		// Construct the series name
		seriesName := source + ":" + metricName
		if metricType, ok := dataEntry["type"].(string); ok && len(metricType) > 0 {
			seriesName += ":" + metricType
		}

		// Validate and process datapoints
		datapoints, datapointsOk := dataEntry["datapoints"].([]interface{})
		if !datapointsOk {
			fmt.Println("Warning: Missing or invalid 'datapoints' in data entry")
			continue
		}

		// Convert datapoints to [][]interface{}
		var formattedDatapoints [][]interface{}
		for _, dp := range datapoints {
			if dpSlice, ok := dp.([]interface{}); ok && len(dpSlice) == 2 {
				formattedDatapoints = append(formattedDatapoints, dpSlice)
			} else {
				fmt.Println("Warning: Invalid datapoint format, expected [value, timestamp]")
			}
		}

		if len(formattedDatapoints) == 0 {
			fmt.Println("Warning: No valid datapoints found for series:", seriesName)
			continue
		}

		// Parse the formatted datapoints into a frame
		frame := utils.ParseResponse(formattedDatapoints, seriesName, targetRefID, data.FieldTypeFloat64)
		if frame == nil {
			fmt.Println("Warning: ParseResponse returned nil frame for series:", seriesName)
			continue
		}

		// Append the frame to the result
		frames = append(frames, frame)
	}

	return frames
}

func SanitizeValues(values []string) []string {
	var sanitizedArray []string
	for _, value := range values {
		for strings.Contains(value, "[code]") && strings.Contains(value, "[/code]") {
			strBeforeCode := value[:strings.Index(value, "[code]")]
			strAfterCode := value[strings.Index(value, "[/code]")+7:]

			if strings.Contains(strAfterCode, "<a") && strings.Contains(strAfterCode, "</a>") {
				aElementStart := strings.Index(strAfterCode, "<a")
				aElementEnd := strings.Index(strAfterCode, "</a>") + 4
				aElement := strAfterCode[aElementStart:aElementEnd]

				aValueStart := strings.Index(aElement, ">") + 1
				aValueEnd := strings.LastIndex(aElement, "<")
				aValue := aElement[aValueStart:aValueEnd]

				value = strBeforeCode + aValue + strAfterCode[aElementEnd:]
			} else {
				value = strBeforeCode + strAfterCode
			}
		}
		sanitizedArray = append(sanitizedArray, value)
	}
	return sanitizedArray
}

func MapTextResponseToFrame(records []map[string]interface{}, refID string) *data.Frame {
    frame := data.NewFrame(refID)
    frame.RefID = refID

    if len(records) == 0 {
        return frame
    }

    // Initialize converters and analyzer
    typeAnalyzer := utils.NewTypeAnalyzer()
    timeConv := &utils.TimeConverter{}
    numConv := &utils.NumericConverter{}
    strConv := &utils.StringConverter{}

    // Get and sort field names alphabetically
    fieldNames := make([]string, 0, len(records[0]))
    for key := range records[0] {
        fieldNames = append(fieldNames, key)
    }
    sort.Strings(fieldNames)

    // Process each field
    for _, fieldName := range fieldNames {
        // Determine the most suitable data type
        fieldType := typeAnalyzer.InferType(records, fieldName)
        
        // Create the appropriate field type
        switch fieldType {
        case data.FieldTypeTime:
            values := make([]*time.Time, len(records))
            for i, record := range records {
                if record[fieldName] == nil {
                    values[i] = nil
                    continue
                }
                if t := timeConv.ToTime(record[fieldName]); !t.IsZero() {
                    values[i] = &t
                }
            }
            frame.Fields = append(frame.Fields,
                data.NewField(fieldName, nil, values).
                    SetConfig(&data.FieldConfig{DisplayName: fieldName}))

        case data.FieldTypeFloat64:
            values := make([]*float64, len(records))
            for i, record := range records {
                if record[fieldName] == nil {
                    values[i] = nil
                    continue
                }
                f := numConv.ToFloat(record[fieldName])
                values[i] = &f
            }
            frame.Fields = append(frame.Fields,
                data.NewField(fieldName, nil, values).
                    SetConfig(&data.FieldConfig{DisplayName: fieldName}))

        default: // String
            values := make([]*string, len(records))
            for i, record := range records {
                if record[fieldName] == nil {
                    values[i] = nil
                    continue
                }
                strVal := strConv.ToString(record[fieldName])
                if fieldName == "new" || fieldName == "value:display" {
                    sanitized := SanitizeValues([]string{strVal})
                    values[i] = &sanitized[0]
                } else {
                    values[i] = &strVal
                }
            }
            frame.Fields = append(frame.Fields,
                data.NewField(fieldName, nil, values).
                    SetConfig(&data.FieldConfig{DisplayName: fieldName}))
        }
    }

    return frame
}
