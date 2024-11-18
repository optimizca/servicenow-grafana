package models

// LabelValuePair represents the key-value pair structure for multiple fields.
type LabelValuePair struct {
	Label string `json:"label"`
	Value string `json:"value"`
}

// BasicSysparamItem represents the structure of basic_sysparam items.
type BasicSysparamItem struct {
	One   LabelValuePair `json:"1"`
	Two   LabelValuePair `json:"2"`
	Three LabelValuePair `json:"3"`
	Four  LabelValuePair `json:"4"`
}

// PluginQuery represents the main query object in the configuration.
type PluginQuery struct {
	SysparamQuery                   string                 `json:"sysparam_query"`
	MetricAnomaly                   string                 `json:"metricAnomaly"`
	TopologyParentDepth             string                 `json:"topology_parent_depth"`
	TopologyChildDepth              string                 `json:"topology_child_depth"`
	TopologyNamespaces              string                 `json:"topology_namespaces"`
	TopologyFilter                  string                 `json:"topology_filter"`
	LiveOsquery                     string                 `json:"live_osquery"`
	TableName                       LabelValuePair         `json:"tableName"`
	GroupBy                         LabelValuePair         `json:"groupBy"`
	AggregateColumn                 string                 `json:"aggregateColumn"`
	RowLimit                        string                 `json:"rowLimit"`
	ElasticSearch                   string                 `json:"elasticSearch"`
	TrendPeriod                     string                 `json:"trendPeriod"`
	ShowPercent                     bool                   `json:"showPercent"`
	Page                            int                    `json:"page"`
	GetAlertCount                   LabelValuePair         `json:"getAlertCount"`
	CompressLogs                    bool                   `json:"compressLogs"`
	GrafanaTimerange                bool                   `json:"grafanaTimerange"`
	CacheOverride                   string                 `json:"cacheOverride"`
	BasicSysparam                   []BasicSysparamItem    `json:"basic_sysparam"`
	SelectedQueryCategory           LabelValuePair         `json:"selectedQueryCategory"`
	SelectedServiceList             LabelValuePair         `json:"selectedServiceList"`
	SelectedSourceList              LabelValuePair         `json:"selectedSourceList"`
	SelectedMetricTypeList          LabelValuePair         `json:"selectedMetricTypeList"`
	SelectedMetricNameList          LabelValuePair         `json:"selectedMetricNameList"`
	SelectedMetricAnomalyList       LabelValuePair         `json:"selectedMetricAnomalyList"`
	SelectedAlertTypeList           LabelValuePair         `json:"selectedAlertTypeList"`
	SelectedAlertStateList          LabelValuePair         `json:"selectedAlertStateList"`
	SelectedChangeTypeList          LabelValuePair         `json:"selectedChangeTypeList"`
	SelectedTopologyDependsOnFilter LabelValuePair         `json:"selectedTopologyDependsOnFilter"`
	SelectedAgentFilterType         LabelValuePair         `json:"selectedAgentFilterType"`
	SelectedAgentFilter             LabelValuePair         `json:"selectedAgentFilter"`
	SelectedAggregateType           LabelValuePair         `json:"selectedAggregateType"`
	SelectedTableColumns            LabelValuePair         `json:"selectedtableColumns"`
	SortBy                          LabelValuePair         `json:"sortBy"`
	SortDirection                   string                 `json:"sortDirection"`
	MetricValueType                 string                 `json:"metricValueType"`
	SelectedTrendColumn             LabelValuePair         `json:"selectedTrendColumn"`
	SelectedTrendBy                 LabelValuePair         `json:"selectedTrendBy"`
	GrafanaTimerangeColumn          LabelValuePair         `json:"grafanaTimerangeColumn"`
	TagKeys                         LabelValuePair         `json:"tagKeys"`
	TagValues                       LabelValuePair         `json:"tagValues"`
	RelationshipTypes               []LabelValuePair       `json:"relationshipTypes"`
	ExcludedClasses                 []LabelValuePair       `json:"excludedClasses"`
	BasicSysparm                    []SysParamColumnObject `json:"basicSysparm"`
}

// SysParamColumnObject represents columns for basic sysparam.
type SysParamColumnObject struct {
	Column    LabelValuePair `json:"column"`
	Operator  LabelValuePair `json:"operator"`
	Value     LabelValuePair `json:"value"`
	Separator LabelValuePair `json:"separator"`
}

// DefaultQuery represents default values for PluginQuery.
type DefaultQuery struct {
	SelectedQueryCategory LabelValuePair         `json:"selectedQueryCategory"`
	BasicSysparam         []BasicSysparamItem    `json:"basic_sysparam"`
	GetAlertCount         LabelValuePair         `json:"getAlertCount"`
	CacheOverride         string                 `json:"cacheOverride"`
	CompressLogs          bool                   `json:"compressLogs"`
	GrafanaTimerange      bool                   `json:"grafanaTimerange"`
	SortDirection         string                 `json:"sortDirection"`
	MetricValueType       string                 `json:"metricValueType"`
	Page                  int                    `json:"page"`
	RowLimit              string                 `json:"rowLimit"`
	TopologyChildDepth    string                 `json:"topology_child_depth"`
	TopologyParentDepth   string                 `json:"topology_parent_depth"`
	RelationshipTypes     []LabelValuePair       `json:"relationshipTypes"`
	ExcludedClasses       []LabelValuePair       `json:"excludedClasses"`
	BasicSysparm          []SysParamColumnObject `json:"basicSysparm"`
}

// PluginDataSourceOptions represents the options configured for each DataSource instance.
type PluginDataSourceOptions struct {
	Path       string `json:"path"`
	Resolution int    `json:"resolution"`
	AuthInfo   string `json:"authInfo"`
	CorsProxy  string `json:"corsProxy"`
	Username   string `json:"username"`
	Password   string `json:"password"`
}

// CustomVariableQuery represents custom variable queries.
type CustomVariableQuery struct {
	Namespace    string `json:"namespace"`
	RawQuery     string `json:"rawQuery"`
	ShowAsterisk bool   `json:"showAsterisk"`
	ShowNull     bool   `json:"showNull"`
}

// ConfigEditOptions represents the configuration options for editing.
type ConfigEditOptions struct {
	APIPath      string `json:"apiPath"`
	ImageURL     string `json:"imageURL"`
	InstanceName string `json:"instanceName"`
	CacheTimeout int    `json:"cacheTimeout"`
}

// ConfigEditSecureJsonData represents secure JSON data for configuration.
type ConfigEditSecureJsonData struct {
	Token string `json:"token"`
}

// QueryResponseColumn represents individual columns in a query response.
type QueryResponseColumn struct {
	Type string `json:"type"`
	Text string `json:"text"`
}

// QueryResponse represents a response to a query.
type QueryResponse struct {
	Columns []QueryResponseColumn `json:"columns"`
	RefID   string                `json:"refId"`
	Meta    string                `json:"meta"`
	Rows    []interface{}         `json:"rows"`
}

// Pair represents a generic key-value pair.
type Pair[T any, K any] struct {
	T T `json:"T"`
	K K `json:"K"`
}

// TextValuePair represents a pair of text and value.
type TextValuePair struct {
	Text  string      `json:"text"`
	Value interface{} `json:"value"`
}

// MultiValueVariable represents a variable with multiple possible values.
type MultiValueVariable struct {
	AllValue string          `json:"allValue"`
	ID       string          `json:"id"`
	Current  TextValuePair   `json:"current"`
	Options  []TextValuePair `json:"options"`
}

// SimpleBasicSysParam represents a simple basic sysparam.
type SimpleBasicSysParam struct {
	Column   string `json:"column"`
	Operator string `json:"operator"`
	Value    string `json:"value"`
}

// NestedObject represents the structure used for `nested_cis` and `nested_classes` queries
type NestedObject struct {
	CI          string `json:"ci"`
	ParentDepth string `json:"parentDepth"`
	ChildDepth  string `json:"childDepth"`
	SysParam    string `json:"sysparam"`
}

// V2NestedObject represents the structure used for `v2_nested_cis` and `v2_nested_classes` queries
type V2NestedObject struct {
	StartingPoint    string `json:"starting_point"`
	RelationshipType string `json:"relationship_types"`
	ExcludedClasses  string `json:"excluded_classes"`
	ParentLimit      string `json:"parent_limit"`
	ChildLimit       string `json:"child_limit"`
	Type             string `json:"type"`
}
