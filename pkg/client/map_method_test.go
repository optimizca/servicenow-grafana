package client

import (
	"fmt"
	"reflect"
	"testing"
	"time"

	"github.com/grafana/grafana-plugin-sdk-go/data"
	"github.com/optimizca/servicenow-grafana/pkg/utils"
	"github.com/stretchr/testify/require"
)

// Unit Tests for all the mapping methods found in APIClient.go
func TestMapResponseToVariable(t *testing.T) {
	tests := []struct {
		name     string
		result   []map[string]interface{}
		asterisk bool
		showNull bool
		expected []Option
	}{
		{
			name: "Simple case with name and id",
			result: []map[string]interface{}{
				{"name": "example", "id": "123"},
			},
			asterisk: false,
			showNull: false,
			expected: []Option{
				{Label: "example", Value: "123"},
			},
		},
		{
			name: "Case with null name and id",
			result: []map[string]interface{}{
				{"name": nil, "id": "456"},
			},
			asterisk: false,
			showNull: false,
			expected: []Option{
				{Label: "NULL", Value: "456"},
			},
		},
		{
			name: "Case with dynamic key",
			result: []map[string]interface{}{
				{"otherKey": "someValue"},
			},
			asterisk: false,
			showNull: false,
			expected: []Option{
				{Label: "someValue", Value: "someValue"},
			},
		},
		{
			name: "Add asterisk",
			result: []map[string]interface{}{
				{"name": "example", "id": "123"},
			},
			asterisk: true,
			showNull: false,
			expected: []Option{
				{Label: "example", Value: "123"},
				{Label: "*", Value: "*"},
			},
		},
		{
			name: "Show NULL",
			result: []map[string]interface{}{
				{"name": "example", "id": "123"},
			},
			asterisk: false,
			showNull: true,
			expected: []Option{
				{Label: "example", Value: "123"},
				{Label: "NULL", Value: "NULL"},
			},
		},
		{
			name: "Both asterisk and showNull",
			result: []map[string]interface{}{
				{"name": "example", "id": "123"},
			},
			asterisk: true,
			showNull: true,
			expected: []Option{
				{Label: "example", Value: "123"},
				{Label: "NULL", Value: "NULL"},
				{Label: "*", Value: "*"},
			},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := MapResponseToVariable(tt.result, tt.asterisk, tt.showNull)
			if !reflect.DeepEqual(got, tt.expected) {
				t.Errorf("MapResponseToVariable() = %v, want %v", got, tt.expected)
			}
		})
	}
}

func TestMapToLabelValue(t *testing.T) {
	tests := []struct {
		name     string
		result   []map[string]interface{}
		expected []Option
	}{
		{
			name: "Simple case with label and value",
			result: []map[string]interface{}{
				{"label": "example", "value": "123", "type": "Type1"},
			},
			expected: []Option{
				{Label: "example (Type1)", Value: "123", Description: "123"},
			},
		},
		{
			name: "Case with label as slice and value as string",
			result: []map[string]interface{}{
				{"label": []interface{}{"example1", "example2"}, "value": "123", "type": "Type1"},
			},
			expected: []Option{
				{Label: "example1 (Type1)", Value: "123", Description: "123"},
			},
		},
		{
			name: "Case with missing type",
			result: []map[string]interface{}{
				{"label": "example", "value": "123"},
			},
			expected: []Option{
				{Label: "example", Value: "123", Description: "123"},
			},
		},
		{
			name: "Case with missing label",
			result: []map[string]interface{}{
				{"value": "123", "type": "Type1"},
			},
			expected: []Option{
				{Label: "", Value: "123", Description: "123"},
			},
		},
		{
			name: "Case with missing value",
			result: []map[string]interface{}{
				{"label": "example", "type": "Type1"},
			},
			expected: []Option{
				{Label: "example (Type1)", Value: "", Description: ""},
			},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := MapToLabelValue(tt.result)
			if !reflect.DeepEqual(got, tt.expected) {
				t.Errorf("MapToLabelValue() = %v, want %v", got, tt.expected)
			}
		})
	}
}

func TestMapTableToLabelValue(t *testing.T) {
	tests := []struct {
		name     string
		result   []map[string]interface{}
		expected []Option
	}{
		{
			name: "Simple case with label and name",
			result: []map[string]interface{}{
				{"label": "example", "name": "123"},
			},
			expected: []Option{
				{Label: "example", Value: "123"},
			},
		},
		{
			name: "Case with missing label",
			result: []map[string]interface{}{
				{"name": "123"},
			},
			expected: []Option{
				{Label: "123", Value: "123"},
			},
		},
		{
			name: "Case with missing name",
			result: []map[string]interface{}{
				{"label": "example"},
			},
			expected: []Option{
				{Label: "example", Value: "example"},
			},
		},
		{
			name: "Case with both label and name missing",
			result: []map[string]interface{}{
				{"otherKey": "value"},
			},
			expected: []Option{},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := MapTableToLabelValue(tt.result)
			if !reflect.DeepEqual(got, tt.expected) {
				t.Errorf("MapTableToLabelValue() = %v, want %v", got, tt.expected)
			}
		})
	}
}

func TestMapGenericToLabelValue(t *testing.T) {
	tests := []struct {
		name     string
		result   []map[string]interface{}
		expected []Option
	}{
		{
			name: "Simple case with name and id",
			result: []map[string]interface{}{
				{"name": "example", "id": "123"},
			},
			expected: []Option{
				{Label: "example", Value: "123"},
			},
		},
		{
			name: "Case with null name and id",
			result: []map[string]interface{}{
				{"name": nil, "id": "456"},
			},
			expected: []Option{
				{Label: "NULL", Value: "456"},
			},
		},
		{
			name: "Case with dynamic key",
			result: []map[string]interface{}{
				{"otherKey": "someValue"},
			},
			expected: []Option{
				{Label: "someValue", Value: "someValue"},
			},
		},
		{
			name: "Case with multiple dynamic keys",
			result: []map[string]interface{}{
				{"key1": "value1", "key2": "value2"},
			},
			expected: []Option{
				{Label: "value1", Value: "value2"},
			},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := MapGenericToLabelValue(tt.result)
			if !reflect.DeepEqual(got, tt.expected) {
				t.Errorf("MapChecksToValue() = %v, want %v", got, tt.expected)
			}
		})
	}
}

func TestMapChecksToValuePlusSuffix(t *testing.T) {
	tests := []struct {
		name     string
		result   []map[string]interface{}
		expected []Option
	}{
		{
			name: "Case with label, value, and suffix",
			result: []map[string]interface{}{
				{"name": "example", "id": "123", "suffix": "suffix1"},
			},
			expected: []Option{
				{Label: "example", Value: "123", Suffix: "suffix1"},
			},
		},
		{
			name: "Case with only label and value",
			result: []map[string]interface{}{
				{"name": "example2", "id": "456"},
			},
			expected: []Option{
				{Label: "example2", Value: "456", Suffix: ""},
			},
		},
		{
			name: "Case with label only",
			result: []map[string]interface{}{
				{"name": "example3"},
			},
			expected: []Option{
				{Label: "example3", Value: "example3", Suffix: ""},
			},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := MapChecksToValuePlusSuffix(tt.result)
			if !reflect.DeepEqual(got, tt.expected) {
				t.Errorf("MapChecksToValuePlusSuffix() = %v, want %v", got, tt.expected)
			}
		})
	}
}

func TestMapValueAsSuffix(t *testing.T) {
	tests := []struct {
		name     string
		result   []Option
		addType  bool
		expected []Option
	}{
		{
			name: "Single option without type",
			result: []Option{
				{Label: "Option1", Value: "Value1"},
			},
			addType: false,
			expected: []Option{
				{Label: "Option1", Value: "Value1", Description: "Value1"},
			},
		},
		{
			name: "Single option with type",
			result: []Option{
				{Label: "Option1", Value: "Value1", Type: "Type1"},
			},
			addType: true,
			expected: []Option{
				{Label: "Option1 (Type1)", Value: "Value1", Description: "Value1"},
			},
		},
		{
			name: "Nested options without type",
			result: []Option{
				{
					Label: "Option1", Value: "Value1", Options: []Option{
						{Label: "Nested1", Value: "NestedValue1"},
						{Label: "Nested2", Value: "NestedValue2"},
					},
				},
			},
			addType: false,
			expected: []Option{
				{
					Label:       "Option1",
					Value:       "Value1",
					Description: "Value1",
					Options: []Option{
						{Label: "Nested1", Value: "NestedValue1", Description: "NestedValue1"},
						{Label: "Nested2", Value: "NestedValue2", Description: "NestedValue2"},
					},
				},
			},
		},
		{
			name: "Nested options with type",
			result: []Option{
				{
					Label: "Option1", Value: "Value1", Type: "Type1", Options: []Option{
						{Label: "Nested1", Value: "NestedValue1", Type: "Type2"},
						{Label: "Nested2", Value: "NestedValue2"},
					},
				},
			},
			addType: true,
			expected: []Option{
				{
					Label:       "Option1 (Type1)",
					Value:       "Value1",
					Description: "Value1",
					Options: []Option{
						{Label: "Nested1 (Type2)", Value: "NestedValue1", Description: "NestedValue1"},
						{Label: "Nested2", Value: "NestedValue2", Description: "NestedValue2"},
					},
				},
			},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := MapValueAsSuffix(tt.result, tt.addType)
			if !reflect.DeepEqual(got, tt.expected) {
				t.Errorf("MapValueAsSuffix() = %v, want %v", got, tt.expected)
			}
		})
	}
}

func TestMapValueSuffixToColumns(t *testing.T) {
	tests := []struct {
		name   string
		result []Option
		want   []Option
	}{
		{
			name: "Basic test case",
			result: []Option{
				{Label: "example1", Value: "123"},
				{Label: "example2", Value: "456"},
			},
			want: []Option{
				{Label: "example1:display", Value: "123:d"},
				{Label: "example1:value", Value: "123:v"},
				{Label: "example2:display", Value: "456:d"},
				{Label: "example2:value", Value: "456:v"},
			},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := MapValueSuffixToColumns(tt.result); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("MapValueSuffixToColumns() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestMapSuffixToLabel(t *testing.T) {
	tests := []struct {
		name     string
		result   []Option
		expected []Option
	}{
		{
			name: "Simple case with suffix",
			result: []Option{
				{Label: "example", Value: "123", Suffix: "suffix1"},
			},
			expected: []Option{
				{Label: "example (suffix1)", Value: "123"},
			},
		},
		{
			name: "Case with empty suffix",
			result: []Option{
				{Label: "example", Value: "123", Suffix: ""},
			},
			expected: []Option{
				{Label: "example", Value: "123"},
			},
		},
		{
			name: "Multiple options with and without suffix",
			result: []Option{
				{Label: "example1", Value: "123", Suffix: "suffix1"},
				{Label: "example2", Value: "456", Suffix: ""},
				{Label: "example3", Value: "789", Suffix: "suffix3"},
			},
			expected: []Option{
				{Label: "example1 (suffix1)", Value: "123"},
				{Label: "example2", Value: "456"},
				{Label: "example3 (suffix3)", Value: "789"},
			},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := MapSuffixToLabel(tt.result)
			if !reflect.DeepEqual(got, tt.expected) {
				t.Errorf("MapSuffixToLabel() = %v, want %v", got, tt.expected)
			}
		})
	}
}

func TestAppendInstanceNameToResponse(t *testing.T) {
	tests := []struct {
		name         string
		response     []Option
		instanceName string
		expected     []Option
	}{
		{
			name: "Simple case with instanceName",
			response: []Option{
				{Label: "example1", Value: "123"},
				{Label: "example2", Value: "456"},
			},
			instanceName: "InstanceA",
			expected: []Option{
				{Label: "example1", Value: "123", InstanceName: "InstanceA"},
				{Label: "example2", Value: "456", InstanceName: "InstanceA"},
			},
		},
		{
			name:         "Empty response list",
			response:     []Option{},
			instanceName: "InstanceA",
			expected:     []Option{},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := AppendInstanceNameToResponse(tt.response, tt.instanceName)
			if !reflect.DeepEqual(got, tt.expected) {
				t.Errorf("AppendInstanceNameToResponse() = %v, want %v", got, tt.expected)
			}
		})
	}
}

func TestMapToTextValue(t *testing.T) {
	tests := []struct {
		name     string
		result   []interface{}
		expected []Option
	}{
		{
			name: "Simple case with text and value",
			result: []interface{}{
				map[string]interface{}{"text": "example", "value": "123"},
			},
			expected: []Option{
				{Label: "example", Value: "123"},
			},
		},
		{
			name:   "Case with non-map object",
			result: []interface{}{"example"},
			expected: []Option{
				{Label: "example", Value: "example"},
			},
		},
		{
			name: "Case with map lacking text and value",
			result: []interface{}{
				map[string]interface{}{"key1": "value1"},
			},
			expected: []Option{
				{Label: "map[key1:value1]", Value: "0"},
			},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := MapToTextValue(tt.result)
			if !reflect.DeepEqual(got, tt.expected) {
				t.Errorf("MapToTextValue() = %v, want %v", got, tt.expected)
			}
		})
	}
}

func TestParseResponse(t *testing.T) {
	tests := []struct {
		name          string
		timeseries    [][]interface{}
		seriesName    string
		targetRefID   string
		fieldType     data.FieldType
		expectedTimes []time.Time
		expectedVals  interface{}
	}{
		{
			name:        "Numeric values",
			timeseries:  [][]interface{}{{1.1, float64(1632153782000)}, {2.2, float64(1632153783000)}},
			seriesName:  "Series 1",
			targetRefID: "A",
			fieldType:   data.FieldTypeFloat64,
			expectedTimes: []time.Time{
				time.Unix(1632153782, 0),
				time.Unix(1632153783, 0),
			},
			expectedVals: []float64{1.1, 2.2},
		},
		{
			name:        "String values",
			timeseries:  [][]interface{}{{"active", float64(1632153782000)}, {"inactive", float64(1632153783000)}},
			seriesName:  "Status Series",
			targetRefID: "B",
			fieldType:   data.FieldTypeString,
			expectedTimes: []time.Time{
				time.Unix(1632153782, 0),
				time.Unix(1632153783, 0),
			},
			expectedVals: []string{"active", "inactive"},
		},
		{
			name:        "Mixed value types - falls back to default",
			timeseries:  [][]interface{}{{3.3, float64(1632153782000)}, {"offline", float64(1632153783000)}},
			seriesName:  "Mixed Series",
			targetRefID: "C",
			fieldType:   data.FieldTypeFloat64,
			expectedTimes: []time.Time{
				time.Unix(1632153782, 0),
				time.Unix(1632153783, 0),
			},
			expectedVals: []float64{3.3, 0},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			frame := utils.ParseResponse(tt.timeseries, tt.seriesName, tt.targetRefID, tt.fieldType)

			require.Equal(t, tt.seriesName, frame.Name)
			require.Equal(t, tt.targetRefID, frame.RefID)
			require.Equal(t, 2, frame.Rows())

			timeField := frame.Fields[0].At(0).(time.Time)
			require.Equal(t, tt.expectedTimes[0], timeField)

			if tt.fieldType == data.FieldTypeString {
				for i, v := range tt.expectedVals.([]string) {
					require.Equal(t, v, frame.Fields[1].At(i).(string))
				}
			} else {
				for i, v := range tt.expectedVals.([]float64) {
					require.Equal(t, v, frame.Fields[1].At(i).(float64))
				}
			}
		})
	}
}

func TestMapOutageResponseToFrame(t *testing.T) {
	// Sample input data simulating the result from ServiceNow
	result := []map[string]interface{}{
		{
			"ci": "Test_CI",
			"datapoints": [][]interface{}{
				{1.23, float64(time.Now().UnixNano() / int64(time.Millisecond))},
				{4.56, float64(time.Now().Add(time.Minute*-5).UnixNano() / int64(time.Millisecond))},
			},
		},
		{
			"ci": "Another_CI",
			"datapoints": [][]interface{}{
				{7.89, float64(time.Now().UnixNano() / int64(time.Millisecond))},
				{0.12, float64(time.Now().Add(time.Minute*-10).UnixNano() / int64(time.Millisecond))},
			},
		},
	}

	target := "Test_Target"

	frames := MapOutageResponseToFrame(result, target, false)

	if len(frames) != len(result) {
		t.Errorf("Expected %d frames, got %d", len(result), len(frames))
	}

	// Verify the structure and content of each frame
	for i, frame := range frames {

		expectedName := result[i]["ci"].(string)
		if frame.Name != expectedName {
			t.Errorf("Frame name = %v, expected %v", frame.Name, expectedName)
		}

		if frame.RefID != target {
			t.Errorf("Frame RefID = %v, expected %v", frame.RefID, target)
		}

		if len(frame.Fields) != 2 {
			t.Errorf("Expected 2 fields in frame, got %d", len(frame.Fields))
		}

		timeField := frame.Fields[0]
		if timeField.Type() != data.FieldTypeTime {
			t.Errorf("Expected time field type, got %v", timeField.Type())
		}

		valueField := frame.Fields[1]
		if valueField.Type() != data.FieldTypeString && valueField.Type() != data.FieldTypeFloat64 {
			t.Errorf("Expected value field type, got %v", valueField.Type())
		}

		timeValues := timeField.Len()
		valueValues := valueField.Len()
		if timeValues != valueValues || timeValues != len(result[i]["datapoints"].([][]interface{})) {
			t.Errorf("Expected %d data points, got %d", len(result[i]["datapoints"].([][]interface{})), timeValues)
		}

	}
}

func TestMapTrendResponseToFrame(t *testing.T) {
	result := map[string]map[string]interface{}{
		"trend1": {
			"datapoints": [][]interface{}{
				{3.14, float64(time.Now().UnixNano() / int64(time.Millisecond))},
				{2.71, float64(time.Now().Add(time.Minute*-5).UnixNano() / int64(time.Millisecond))},
			},
		},
		"trend2": {
			"datapoints": [][]interface{}{
				{1.41, float64(time.Now().UnixNano() / int64(time.Millisecond))},
				{1.73, float64(time.Now().Add(time.Minute*-10).UnixNano() / int64(time.Millisecond))},
			},
		},
	}

	targetRefID := "Test_Target_Trend"

	// Convert result to the expected type
	var resultList []map[string]interface{}
	for key, value := range result {
		value["trend"] = key
		resultList = append(resultList, value)
	}
	frames := MapTrendResponseToFrame(resultList, targetRefID)

	expectedFrameCount := len(result)
	if len(frames) != expectedFrameCount {
		t.Errorf("Expected %d frames, got %d", expectedFrameCount, len(frames))
	}

	for _, frame := range frames {
		if frame.RefID != targetRefID {
			t.Errorf("Expected RefID %v, got %v", targetRefID, frame.RefID)
		}

		if len(frame.Fields) != 2 {
			t.Errorf("Expected 2 fields in frame, got %d", len(frame.Fields))
		}

		timeField := frame.Fields[0]
		if timeField.Type() != data.FieldTypeTime {
			t.Errorf("Expected time field type, got %v", timeField.Type())
		}

		valueField := frame.Fields[1]
		if valueField.Type() != data.FieldTypeFloat64 {
			t.Errorf("Expected value field type, got %v", valueField.Type())
		}
	}
}

func TestMapMetricsResponseToFrame(t *testing.T) {
	sampleResult := []map[string]interface{}{
		{
			"source":     "source1",
			"metricName": "cpu_usage",
			"type":       "average",
			"datapoints": [][]interface{}{
				{20.5, float64(time.Now().Add(-5*time.Minute).Unix() * 1000)},
				{22.0, float64(time.Now().Add(-4*time.Minute).Unix() * 1000)},
				{19.0, float64(time.Now().Add(-3*time.Minute).Unix() * 1000)},
			},
		},
		{
			"source":     "source2",
			"metricName": "memory_usage",
			"type":       "",
			"datapoints": [][]interface{}{
				{512, float64(time.Now().Add(-5*time.Minute).Unix() * 1000)},
				{620, float64(time.Now().Add(-4*time.Minute).Unix() * 1000)},
				{590, float64(time.Now().Add(-3*time.Minute).Unix() * 1000)},
			},
		},
	}

	frames := MapMetricsResponseToFrame(sampleResult, "A")

	if len(frames) != 2 {
		t.Fatalf("Expected 2 frames, got %d", len(frames))
	}

	// Inspect each frame
	for _, frame := range frames {
		fmt.Printf("Frame Name: %s, RefID: %s\n", frame.Name, frame.RefID)

		if frame.RefID != "A" {
			t.Errorf("Expected RefID 'A', got %s", frame.RefID)
		}

		if len(frame.Fields) != 2 {
			t.Errorf("Expected 2 fields, got %d", len(frame.Fields))
		}

		for _, field := range frame.Fields {
			if field.Name == "time" {
				if field.Type() != data.FieldTypeTime {
					t.Errorf("Expected FieldTypeTime for time field, got %s", field.Type().String())
				}
			}
			if field.Name == "value" {
				if field.Type() != data.FieldTypeFloat64 {
					t.Errorf("Expected FieldTypeFloat64 for value field, got %s", field.Type().String())
				}
			}
		}
	}

	fmt.Println("Test completed successfully")
}

func TestParseAnomResponse(t *testing.T) {
	// Define input timeseries data
	timeseries := [][]interface{}{
		{float64(1634567890123), float64(100.5)},
		{float64(1634567900123), float64(200.5)},
		{float64(1634567910123), float64(300.5)},
	}

	// Define expected series name, targetRefID, and field type
	seriesName := "example_series"
	targetRefID := "A"
	fieldType := data.FieldTypeFloat64

	frame := utils.ParseAnomResponse(timeseries, seriesName, targetRefID, fieldType)

	// Check the RefID and Name of the frame
	if frame.RefID != targetRefID {
		t.Errorf("Expected RefID %s, but got %s", targetRefID, frame.RefID)
	}
	if frame.Name != seriesName {
		t.Errorf("Expected seriesName %s, but got %s", seriesName, frame.Name)
	}

	timeField := frame.Fields[0]
	if timeField.Type() != data.FieldTypeTime {
		t.Errorf("Expected time field type %v, but got %v", data.FieldTypeTime, timeField.Type())
	}
	for i := 0; i < int(timeField.Len()); i++ {
		val := timeField.At(i)
		expectedTime := time.Unix(0, int64(timeseries[i][0].(float64))*int64(time.Millisecond))
		if !val.(time.Time).Equal(expectedTime) {
			t.Errorf("Expected time %v, but got %v at index %d", expectedTime, val, i)
		}
	}

	valueField := frame.Fields[1]
	if valueField.Type() != fieldType {
		t.Errorf("Expected value field type %v, but got %v", fieldType, valueField.Type())
	}
	for i := 0; i < int(valueField.Len()); i++ {
		val := valueField.At(i)
		expectedValue := timeseries[i][1].(float64)
		if val != expectedValue {
			t.Errorf("Expected value %v, but got %v at index %d", expectedValue, val, i)
		}
	}
}

func TestSanitizeValues(t *testing.T) {
	tests := []struct {
		input    []string
		expected []string
	}{
		{
			input:    []string{"Example [code]text with code[/code] and <a href='link'>anchor</a>"},
			expected: []string{"Example anchor"},
		},
		{
			input:    []string{"Another [code]sample[/code] with no anchor tag"},
			expected: []string{"Another  with no anchor tag"},
		},
		{
			input:    []string{"No code tags here"},
			expected: []string{"No code tags here"},
		},
	}

	for _, test := range tests {
		result := SanitizeValues(test.input)
		if !reflect.DeepEqual(result, test.expected) {
			t.Errorf("For input %v, expected %v, but got %v", test.input, test.expected, result)
		}
	}
}

func TestMapTextResponseToFrame(t *testing.T) {
	// Prepare test data
	testTime := time.Now()
	testData := []map[string]interface{}{
		{
			"metric_name": "CPU Usage",
			"value":       0.75,
			"timestamp":   testTime,
			"new":         "Some [code]sensitive[/code] <a href='link'>data</a>",
		},
		{
			"metric_name": "Memory Usage",
			"value":       0.65,
			"timestamp":   testTime.Add(time.Minute),
			"new":         "Another [code]hidden[/code] <a href='link2'>info</a>",
		},
	}

	// Expected sanitized values
	expectedSanitized := []string{"Some data", "Another info"}

	frame := MapTextResponseToFrame(testData, "testRefID")

	// Verify frame properties
	if frame.RefID != "testRefID" {
		t.Errorf("Expected frame RefID to be 'testRefID', got %v", frame.RefID)
	}

	if len(frame.Fields) != 4 {
		t.Fatalf("Expected 4 fields in the frame, got %d", len(frame.Fields))
	}

	// Verify each field
	for _, field := range frame.Fields {
		switch field.Name {
		case "metric_name":
			expected := []string{"CPU Usage", "Memory Usage"}
			if !reflect.DeepEqual(field.CopyAt(0), expected[0]) || !reflect.DeepEqual(field.CopyAt(1), expected[1]) {
				t.Errorf("Expected 'metric_name' field values %v, got %v and %v", expected, field.CopyAt(0), field.CopyAt(1))
			}

		case "value":
			expected := []float64{0.75, 0.65}
			if !reflect.DeepEqual(field.CopyAt(0), expected[0]) || !reflect.DeepEqual(field.CopyAt(1), expected[1]) {
				t.Errorf("Expected 'value' field values %v, got %v and %v", expected, field.CopyAt(0), field.CopyAt(1))
			}

		case "timestamp":
			expected := []time.Time{testTime, testTime.Add(time.Minute)}
			if !reflect.DeepEqual(field.CopyAt(0), expected[0]) || !reflect.DeepEqual(field.CopyAt(1), expected[1]) {
				t.Errorf("Expected 'timestamp' field values %v, got %v and %v", expected, field.CopyAt(0), field.CopyAt(1))
			}

		case "new":
			if !reflect.DeepEqual(field.CopyAt(0), expectedSanitized[0]) || !reflect.DeepEqual(field.CopyAt(1), expectedSanitized[1]) {
				t.Errorf("Expected 'new' field values %v, got %v and %v", expectedSanitized, field.CopyAt(0), field.CopyAt(1))
			}

		default:
			t.Errorf("Unexpected field name: %s", field.Name)
		}
	}
}
