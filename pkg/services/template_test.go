package services

import (
	"regexp"
	"testing"
	"time"
)

// TestNewTemplateService verifies the initialization of a new TemplateService
func TestNewTemplateService(t *testing.T) {
	service := NewTemplateService()
	if service == nil {
		t.Fatal("expected TemplateService to be non-nil")
	}
	if len(service.GetVariables()) != 0 {
		t.Error("expected no variables initially")
	}
	if !service.timeRange.From.IsZero() || !service.timeRange.To.IsZero() {
		t.Error("expected initial time range to be zero")
	}
}

// TestReplace checks the Replace method for various interpolation cases
func TestReplace(t *testing.T) {
	service := NewTemplateService()
	scopedVars := map[string]string{
		"var1": "value1",
		"var2": "value2",
	}

	tests := []struct {
		name     string
		target   string
		expected string
	}{
		{"Single variable", "${var1}", "value1"},
		{"Multiple variables", "${var1} and ${var2}", "value1 and value2"},
		{"Missing variable", "${var3}", "${var3}"},
		{"Empty string", "", ""},
		{"No variables", "plain text", "plain text"},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			result := service.Replace(test.target, scopedVars, "csv")
			if result != test.expected {
				t.Errorf("expected %q but got %q", test.expected, result)
			}
		})
	}
}

// TestContainsTemplate checks if ContainsTemplate correctly identifies template variables
func TestContainsTemplate(t *testing.T) {
	service := NewTemplateService()

	tests := []struct {
		name     string
		target   string
		expected bool
	}{
		{"Contains template variable", "Hello ${var1}", true},
		{"No template variable", "Hello World", false},
		{"Empty string", "", false},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			result := service.ContainsTemplate(test.target)
			if result != test.expected {
				t.Errorf("expected %v but got %v", test.expected, result)
			}
		})
	}
}

// TestUpdateTimeRange verifies that UpdateTimeRange correctly updates the time range
func TestUpdateTimeRange(t *testing.T) {
	service := NewTemplateService()

	from := time.Now().Add(-1 * time.Hour)
	to := time.Now()
	timeRange := TimeRange{From: from, To: to}
	service.UpdateTimeRange(timeRange)

	if service.timeRange.From != from || service.timeRange.To != to {
		t.Errorf("expected time range to be updated to %+v but got %+v", timeRange, service.timeRange)
	}
}

// TestGetVariables ensures GetVariables returns the correct set of variables
func TestGetVariables(t *testing.T) {
	service := NewTemplateService()
	service.variables = []*TypedVariableModel{
		{Name: "var1", Value: "value1"},
		{Name: "var2", Value: "value2"},
	}

	variables := service.GetVariables()
	if len(variables) != 2 {
		t.Fatalf("expected 2 variables, got %d", len(variables))
	}
	if variables[0].Name != "var1" || variables[0].Value != "value1" {
		t.Errorf("unexpected first variable: %+v", variables[0])
	}
	if variables[1].Name != "var2" || variables[1].Value != "value2" {
		t.Errorf("unexpected second variable: %+v", variables[1])
	}
}

// TestRegexReplacePattern verifies that the Replace method uses the correct regex pattern
func TestRegexReplacePattern(t *testing.T) {
	re := regexp.MustCompile(`\$\{([^}]+)\}`)
	tests := []struct {
		name       string
		input      string
		wantMatch  bool
		wantResult []string
	}{
		{
			name:       "Single match",
			input:      "${variable}",
			wantMatch:  true,
			wantResult: []string{"variable"},
		},
		{
			name:       "No match",
			input:      "no variable here",
			wantMatch:  false,
			wantResult: nil,
		},
		{
			name:       "Multiple matches",
			input:      "Hello ${var1} and ${var2}",
			wantMatch:  true,
			wantResult: []string{"var1", "var2"},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			matches := re.FindAllStringSubmatch(tt.input, -1)
			if (len(matches) > 0) != tt.wantMatch {
				t.Errorf("expected match: %v, got: %v", tt.wantMatch, len(matches) > 0)
			}
			if tt.wantMatch && tt.wantResult != nil {
				var gotResult []string
				for _, match := range matches {
					gotResult = append(gotResult, match[1])
				}
				if len(gotResult) != len(tt.wantResult) {
					t.Errorf("expected %v matches but got %v", len(tt.wantResult), len(gotResult))
				}
				for i := range gotResult {
					if gotResult[i] != tt.wantResult[i] {
						t.Errorf("expected match: %v but got: %v", tt.wantResult[i], gotResult[i])
					}
				}
			}
		})
	}
}
