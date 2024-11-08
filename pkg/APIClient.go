package main

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

	"github.com/grafana/grafana-plugin-sdk-go/data"
)

type RequestOptions struct {
	Headers         map[string]string
	WithCredentials bool
	URL             string
}

type APIClient struct {
	RequestOptions RequestOptions
	CacheTimeout   time.Duration
}

type Option struct {
	Label        string   `json:"label"`
	Value        string   `json:"value"`
	Suffix       string   `json:"suffix,omitempty"`
	Type         string   `json:"type,omitempty"`
	Description  string   `json:"description,omitempty"`
	InstanceName string   `json:"instanceName,omitempty"`
	Options      []Option `json:"options,omitempty"`
}

// Constructor function to initialize the APIClient
func Initialize(headers map[string]string, withCredentials bool, url string, cacheTimeout time.Duration) *APIClient {
	return &APIClient{
		RequestOptions: RequestOptions{
			Headers:         headers,
			WithCredentials: withCredentials,
			URL:             url,
		},
		CacheTimeout: cacheTimeout,
	}
}

// Performs an HTTP Request
func (client *APIClient) Request(method string, endpoint string, body interface{}) ([]byte, error) {
	fullURL := client.RequestOptions.URL + endpoint
	jsonBody, err := json.Marshal(body)
	if err != nil {
		return nil, err
	}

	req, err := http.NewRequest(method, fullURL, bytes.NewBuffer(jsonBody))
	if err != nil {
		return nil, err
	}

	for key, value := range client.RequestOptions.Headers {
		req.Header.Set(key, value)
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

func MapChecksToValue(result []map[string]interface{}) []Option {
	var mappedResults []Option

	for _, d := range result {
		if name, ok := d["name"]; ok && d["id"] != nil {
			if name == "" || name == nil {
				name = "NULL"
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

func MapChecksToValuePlusSuffix(result []map[string]interface{}) []Option {
	var mappedResults []Option

	for _, d := range result {
		label := fmt.Sprintf("%v", d["name"])
		value := label
		suffix := ""

		if v, ok := d["id"]; ok {
			value = fmt.Sprintf("%v", v)
		}
		if s, ok := d["suffix"]; ok {
			suffix = fmt.Sprintf("%v", s)
		}

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

func MapOutageResponseToFrame(result []map[string]interface{}, target string) []*data.Frame {
	frames := make([]*data.Frame, len(result))

	for i, dataPoint := range result {
		// Retrieve the ciName from the data map if present
		ciName, _ := dataPoint["ci"].(string)
		// Retrieve timeseries data (datapoints)
		timeseries, ok := dataPoint["datapoints"].([][]interface{})
		if !ok {
			continue
		}

		frame := ParseResponse(timeseries, ciName, target, data.FieldTypeString)
		frames[i] = frame
	}

	return frames
}

func MapTrendResponseToFrame(result map[string]map[string]interface{}, targetRefID string) []*data.Frame {
	var frames []*data.Frame

	for dataKey, dataValue := range result {
		// Access datapoints within each key and assert its type
		if dataPoints, ok := dataValue["datapoints"].([][]interface{}); ok {
			frame := ParseResponse(dataPoints, dataKey, targetRefID, data.FieldTypeFloat64)
			frames = append(frames, frame)
		}
	}
	return frames
}

func MapMetricsResponseToFrame(result []map[string]interface{}, targetRefID string) []*data.Frame {
	var frames []*data.Frame

	for _, dataEntry := range result {
		seriesName := dataEntry["source"].(string) + ":" + dataEntry["metricName"].(string)
		if metricType, ok := dataEntry["type"].(string); ok && len(metricType) > 0 {
			seriesName += ":" + metricType
		}

		if datapoints, ok := dataEntry["datapoints"].([][]interface{}); ok {
			frame := ParseResponse(datapoints, seriesName, targetRefID, data.FieldTypeFloat64)
			frames = append(frames, frame)
		} else {
			fmt.Println("Warning: Missing or invalid datapoints in data entry")
		}
	}

	return frames
}

func MapAnamMetricsResponseToFrame(result []map[string]interface{}, targetRefID string) []*data.Frame {
	var frames []*data.Frame

	for _, r := range result {
		// Retrieve ci_name and metric_name
		ciName, ciOk := r["ci_name"].(string)
		metricName, metricOk := r["metric_name"].(string)
		if !ciOk || !metricOk {
			fmt.Println("Warning: Missing ci_name or metric_name in result entry")
			continue
		}

		// Process each series in the 'data.series' field
		if seriesData, ok := r["data"].(map[string]interface{}); ok {
			if seriesArray, ok := seriesData["series"].([]interface{}); ok {
				for _, seriesItem := range seriesArray {
					if seriesMap, ok := seriesItem.(map[string]interface{}); ok {
						// Construct the series name
						seriesType, typeOk := seriesMap["type"].(string)
						if !typeOk {
							fmt.Println("Warning: Missing type in series")
							continue
						}
						seriesName := ciName + ":" + metricName + ":" + seriesType

						if seriesPoints, ok := seriesMap["data"].([][]interface{}); ok {
							frame := ParseAnomResponse(seriesPoints, seriesName, targetRefID, data.FieldTypeFloat64)
							frames = append(frames, frame)
						} else {
							fmt.Println("Warning: Missing or invalid data in series")
						}
					}
				}
			}
		}
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

func MapTextResponseToFrame(result []map[string]interface{}, refID string) *data.Frame {
	// Initialize the DataFrame with the reference ID
	frame := data.NewFrame(refID)
	frame.RefID = refID

	// Check if result is empty
	if len(result) == 0 {
		return frame
	}

	// Retrieve the field names from the first entry in result
	fieldNames := make([]string, 0, len(result[0]))
	for key := range result[0] {
		fieldNames = append(fieldNames, key)
	}

	for _, fieldName := range fieldNames {
		// Extract values for each field across all result entries
		var fieldValues interface{}

		switch result[0][fieldName].(type) {
		case int, int8, int16, int32, int64, float32, float64:
			values := make([]float64, len(result))
			for i, entry := range result {
				values[i] = entry[fieldName].(float64)
			}
			fieldValues = values

		case string:
			values := make([]string, len(result))
			for i, entry := range result {
				// Sanitize specific field values if needed
				if fieldName == "new" || fieldName == "value:display" {
					values[i] = SanitizeValues([]string{fmt.Sprintf("%v", entry[fieldName])})[0]
				} else {
					values[i] = entry[fieldName].(string)
				}
			}
			fieldValues = values

		case time.Time:
			values := make([]time.Time, len(result))
			for i, entry := range result {
				values[i] = entry[fieldName].(time.Time)
			}
			fieldValues = values

		default:
			// If type is unknown, default to string
			values := make([]string, len(result))
			for i, entry := range result {
				values[i] = fmt.Sprintf("%v", entry[fieldName])
			}
			fieldValues = values
		}

		// Create a new field and add it to the frame
		frame.Fields = append(frame.Fields, data.NewField(fieldName, nil, fieldValues).SetConfig(&data.FieldConfig{DisplayName: fieldName}))
	}

	if DebugLevel() == 1 {
		PrintDebug("You are Inside mapTextResponseToFrame")
		PrintDebug(frame)
	}

	return frame
}
