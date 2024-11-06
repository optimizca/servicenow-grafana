package services

import (
	"regexp"
	"strings"
	"time"
)

// Go conversion from grafana-runtime/src/services/templateSrv.ts
// Templating: Optionally save interpolated expressions when replacing variables in a string
// https://github.com/grafana/grafana/blob/main/packages/grafana-runtime/src/services/templateSrv.ts

// TemplateSrv interface replicates the behavior of TemplateSrv in TS
type TemplateSrv interface {
	GetVariables() []*TypedVariableModel
	Replace(target string, scopedVars map[string]string, format string) string
	ContainsTemplate(target string) bool
	UpdateTimeRange(timeRange TimeRange)
}

// VariableInterpolation represents the variable interpolation details
type VariableInterpolation struct {
	Match        string
	VariableName string
	FieldPath    string
	Format       string
	Value        string
	Found        bool
}

// TypedVariableModel represents a variable
type TypedVariableModel struct {
	Name  string
	Value string
}

// TimeRange represents the range of time used in Grafana queries
type TimeRange struct {
	From time.Time
	To   time.Time
}

// TemplateService implements the TemplateSrv interface
type TemplateService struct {
	variables []*TypedVariableModel
	timeRange TimeRange
}

// NewTemplateService initializes a new TemplateService
func NewTemplateService() *TemplateService {
	return &TemplateService{
		variables: []*TypedVariableModel{},
		timeRange: TimeRange{},
	}
}

// GetVariables returns the available variables in the current template scope
func (t *TemplateService) GetVariables() []*TypedVariableModel {
	return t.variables
}

// Replace performs variable interpolation in the given target string
func (t *TemplateService) Replace(target string, scopedVars map[string]string, format string) string {
	if target == "" {
		return ""
	}

	// Regular expression to find variables like ${varName}
	re := regexp.MustCompile(`\$\{([^}]+)\}`)
	return re.ReplaceAllStringFunc(target, func(match string) string {
		varName := match[2 : len(match)-1]
		if value, ok := scopedVars[varName]; ok {
			// Perform the replacement
			return value
		}
		// If variable is not found, return the original match
		return match
	})
}

// ContainsTemplate checks if a target contains any template variables
func (t *TemplateService) ContainsTemplate(target string) bool {
	return strings.Contains(target, "${")
}

// UpdateTimeRange updates the time range used in the template service
func (t *TemplateService) UpdateTimeRange(timeRange TimeRange) {
	t.timeRange = timeRange
}
