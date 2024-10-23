// map_response_to_variable_test.go
package main

import (
	"reflect"
	"testing"
)

// TestMapResponseToVariable tests the MapResponseToVariable function
func TestMapResponseToVariable(t *testing.T) {
	tests := []struct {
		name     string
		result   []map[string]interface{}
		asterisk bool
		showNull bool
		expected []TextValue
	}{
		{
			name: "Simple case with name and id",
			result: []map[string]interface{}{
				{"name": "example", "id": "123"},
			},
			asterisk: false,
			showNull: false,
			expected: []TextValue{
				{Text: "example", Value: "123"},
			},
		},
		{
			name: "Case with null name and id",
			result: []map[string]interface{}{
				{"name": nil, "id": "456"},
			},
			asterisk: false,
			showNull: false,
			expected: []TextValue{
				{Text: "NULL", Value: "456"},
			},
		},
		{
			name: "Case with dynamic key",
			result: []map[string]interface{}{
				{"otherKey": "someValue"},
			},
			asterisk: false,
			showNull: false,
			expected: []TextValue{
				{Text: "someValue", Value: "someValue"},
			},
		},
		{
			name: "Add asterisk",
			result: []map[string]interface{}{
				{"name": "example", "id": "123"},
			},
			asterisk: true,
			showNull: false,
			expected: []TextValue{
				{Text: "example", Value: "123"},
				{Text: "*", Value: "*"},
			},
		},
		{
			name: "Show NULL",
			result: []map[string]interface{}{
				{"name": "example", "id": "123"},
			},
			asterisk: false,
			showNull: true,
			expected: []TextValue{
				{Text: "example", Value: "123"},
				{Text: "NULL", Value: "NULL"},
			},
		},
		{
			name: "Both asterisk and showNull",
			result: []map[string]interface{}{
				{"name": "example", "id": "123"},
			},
			asterisk: true,
			showNull: true,
			expected: []TextValue{
				{Text: "example", Value: "123"},
				{Text: "NULL", Value: "NULL"},
				{Text: "*", Value: "*"},
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
