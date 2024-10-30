package main

import (
	"reflect"
	"testing"
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

func TestMapChecksToValue(t *testing.T) {
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
			got := MapChecksToValue(tt.result)
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
