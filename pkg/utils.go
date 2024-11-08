package main

import (
	"fmt"
	"reflect"
	"time"

	"github.com/grafana/grafana-plugin-sdk-go/data"
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
