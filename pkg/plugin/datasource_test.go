package plugin

// import (
// 	// "context"
// 	// "encoding/json"
// 	// "testing"
// 	// "time"

// 	// "github.com/grafana/grafana-plugin-sdk-go/backend"
// 	// // "github.com/optimizca/servicenow-grafana/pkg/models"
// 	// // "github.com/optimizca/servicenow-grafana/pkg/services"
// 	// "github.com/stretchr/testify/assert"
// 	// "github.com/stretchr/testify/require"
// )

// // Mock SNOWManager connection for tests
// type MockSNOWManager struct{}

// func NewMockSNOWManager(options models.ConnectionOptions) *MockSNOWManager {
// 	return &MockSNOWManager{}
// }

// func (m *MockSNOWManager) Close() error {
// 	return nil
// }

// func (m *MockSNOWManager) TestConnection(ctx context.Context, apiPath string) error {
// 	return nil
// }

// // TestDispose tests the Dispose function
// func TestDispose(t *testing.T) {
// 	datasource := &Datasource{
// 		Connection:  NewMockSNOWManager(models.ConnectionOptions{}),
// 		Annotations: make(map[string]interface{}),
// 	}

// 	datasource.Dispose()
// 	assert.Nil(t, datasource.Annotations)
// 	assert.Nil(t, datasource.TemplateSrv)
// }

// // TestbasicSysparmBackwardsCompatFix tests the basicSysparmBackwardsCompatFix function
// func TestBasicSysparmBackwardsCompatFix(t *testing.T) {
// 	datasource := &Datasource{}
// 	defaultSeparator := models.LabelValuePair{Label: "AND", Value: "^"}

// 	basicSysparam := []models.SysParamColumnObject{
// 		{
// 			Column:    models.LabelValuePair{Label: "Column1", Value: "Val1"},
// 			Operator:  models.LabelValuePair{Label: "Operator1", Value: "="},
// 			Value:     models.LabelValuePair{Label: "Value1", Value: "100"},
// 			Separator: models.LabelValuePair{},
// 		},
// 		{
// 			Column:    models.LabelValuePair{Label: "Column2", Value: "Val2"},
// 			Operator:  models.LabelValuePair{Label: "Operator2", Value: ">"},
// 			Value:     models.LabelValuePair{Label: "Value2", Value: "200"},
// 			Separator: defaultSeparator,
// 		},
// 	}

// 	result := datasource.basicSysparmBackwardsCompatFix(basicSysparam)

// 	require.Len(t, result, 2)
// 	assert.Equal(t, models.BasicSysparamItem{
// 		One:   basicSysparam[0].Column,
// 		Two:   basicSysparam[0].Operator,
// 		Three: basicSysparam[0].Value,
// 		Four:  defaultSeparator,
// 	}, result[0])
// 	assert.Equal(t, models.BasicSysparamItem{
// 		One:   basicSysparam[1].Column,
// 		Two:   basicSysparam[1].Operator,
// 		Three: basicSysparam[1].Value,
// 		Four:  defaultSeparator,
// 	}, result[1])
// }

// // TestMetricFindQuery tests the MetricFindQuery function for different namespaces
// func TestMetricFindQuery(t *testing.T) {
// 	datasource := &Datasource{
// 		Connection:   NewMockSNOWManager(models.ConnectionOptions{}),
// 		GlobalImage:  "http://example.com/image",
// 		InstanceName: "TestInstance",
// 		TemplateSrv:  services.NewTemplateService(),
// 	}

// 	tests := []struct {
// 		name      string
// 		namespace string
// 		rawQuery  string
// 		expected  []models.LabelValuePair
// 	}{
// 		{
// 			name:      "Global image query",
// 			namespace: "global_image",
// 			expected:  []models.LabelValuePair{{Label: "http://example.com/image", Value: "http://example.com/image"}},
// 		},
// 		{
// 			name:      "Global instance name query",
// 			namespace: "global_instance_name",
// 			expected:  []models.LabelValuePair{{Label: "TestInstance", Value: "TestInstance"}},
// 		},
// 	}

// 	for _, test := range tests {
// 		t.Run(test.name, func(t *testing.T) {
// 			query := models.CustomVariableQuery{
// 				Namespace: test.namespace,
// 				RawQuery:  test.rawQuery,
// 			}
// 			res, err := datasource.MetricFindQuery(query, map[string]string{})
// 			require.NoError(t, err)
// 			assert.Equal(t, test.expected, res)
// 		})
// 	}
// }

// // TestHandleNestedQuery tests the handleNestedQuery function
// func TestHandleNestedQuery(t *testing.T) {
// 	datasource := &Datasource{
// 		Connection:  NewMockSNOWManager(models.ConnectionOptions{}),
// 		TemplateSrv: services.NewTemplateService(),
// 	}

// 	query := models.CustomVariableQuery{
// 		Namespace: "nested_cis",
// 		RawQuery:  "ci||parentDepth||childDepth||sysparam",
// 	}

// 	expected := []models.LabelValuePair{{Label: "Nested CI Test", Value: "Nested Value"}}
// 	res, err := datasource.handleNestedQuery(query, map[string]string{}, "nested_cis")
// 	require.NoError(t, err)
// 	assert.Equal(t, expected, res)
// }

// // TestQueryData tests the QueryData function
// func TestQueryData(t *testing.T) {
// 	datasource := &Datasource{
// 		Connection: NewMockSNOWManager(models.ConnectionOptions{}),
// 	}

// 	req := &backend.QueryDataRequest{
// 		Queries: []backend.DataQuery{
// 			{
// 				RefID: "A",
// 				JSON:  json.RawMessage(`{"selectedQueryCategory":{"value":"Metrics"}}`),
// 				TimeRange: backend.TimeRange{
// 					From: time.Now().Add(-time.Hour),
// 					To:   time.Now(),
// 				},
// 			},
// 		},
// 	}

// 	resp, err := datasource.QueryData(context.Background(), req)
// 	require.NoError(t, err)
// 	require.Contains(t, resp.Responses, "A")
// 	assert.NotNil(t, resp.Responses["A"])
// }

// // TestProcessQuery tests the processQuery function
// func TestProcessQuery(t *testing.T) {
// 	datasource := &Datasource{
// 		Connection:   NewMockSNOWManager(models.ConnectionOptions{}),
// 		InstanceName: "TestInstance",
// 	}

// 	tests := []struct {
// 		name      string
// 		queryType string
// 		queryJSON string
// 	}{
// 		{"Metrics query", "Metrics", `{"selectedQueryCategory":{"value":"Metrics"},"cacheOverride":"true"}`},
// 		{"Alerts query", "Alerts", `{"selectedQueryCategory":{"value":"Alerts"},"cacheOverride":"true"}`},
// 	}

// 	for _, test := range tests {
// 		t.Run(test.name, func(t *testing.T) {
// 			dataQuery := backend.DataQuery{
// 				JSON:      json.RawMessage(test.queryJSON),
// 				TimeRange: backend.TimeRange{From: time.Now().Add(-time.Hour), To: time.Now()},
// 				RefID:     "A",
// 			}

// 			resp := datasource.processQuery(context.Background(), backend.PluginContext{}, dataQuery)
// 			assert.Nil(t, resp.Error)
// 			assert.NotNil(t, resp.Frames)
// 		})
// 	}
// }

// // TestCheckHealth tests the CheckHealth function
// func TestCheckHealth(t *testing.T) {
// 	datasource := &Datasource{
// 		Connection: NewMockSNOWManager(models.ConnectionOptions{}),
// 		APIPath:    "/api",
// 	}

// 	req := &backend.CheckHealthRequest{}
// 	res, err := datasource.CheckHealth(context.Background(), req)
// 	require.NoError(t, err)
// 	assert.Equal(t, backend.HealthStatusOk, res.Status)
// 	assert.Equal(t, "Data source is working", res.Message)
// }
