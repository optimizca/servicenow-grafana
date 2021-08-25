import { DataQuery, DataSourceJsonData, SelectableValue } from '@grafana/data';

export interface PluginQuery extends DataQuery {
  sysparam_query: string;
  metricAnomaly: string;
  topology_parent_depth: string;
  topology_child_depth: string;
  topology_namespaces: string;
  topology_filter: string;
  live_osquery: string;
  tableName: SelectableValue<string>;
  groupBy: string;
  aggregateColumn: string;
  rowLimit: string;
  elasticSearch: string;
  trendPeriod: string;

  sysparam_option1: SelectableValue<string>[];
  sysparam_option2: SelectableValue<string>[];
  sysparam_option3: SelectableValue<string>[];
  sysparam_option4: SelectableValue<string>[];
  sysparam_count: number;

  selectedQueryCategory: SelectableValue<string>;
  selectedServiceList: SelectableValue<string>;
  selectedSourceList: SelectableValue<string>;
  selectedMetricTypeList: SelectableValue<string>;
  selectedMetricNameList: SelectableValue<string>;
  selectedMetricAnomalyList: SelectableValue<string>;
  selectedAlertTypeList: SelectableValue<string>;
  selectedAlertStateList: SelectableValue<string>;
  selectedChangeTypeList: SelectableValue<string>;
  selectedTopologyDependsOnFilter: SelectableValue<string>;
  selectedAdminCategoryList: SelectableValue<string>;
  selectedAgentFilterType: SelectableValue<string>;
  selectedAgentFilter: SelectableValue<string>;
  selectedAggregateType: SelectableValue<string>;
  selectedtableColumns: SelectableValue<string>;
  sortBy: SelectableValue<string>;
  selectedTrendColumn: SelectableValue<string>;
  selectedTrendBy: SelectableValue<string>;
}

export const defaultQuery: Partial<PluginQuery> = {
  selectedQueryCategory: {
    label: 'Metrics',
    value: 'Metrics',
    description: 'Get Timeseries metrics.',
  },
  sysparam_count: 0,
  sysparam_option1: [],
  sysparam_option2: [],
  sysparam_option3: [],
  sysparam_option4: [{ label: '', value: '' }],
};

/**
 * These are options configured for each DataSource instance
 */
export interface PluginDataSourceOptions extends DataSourceJsonData {
  path?: string;
  resolution?: number;
  authInfo?: string;
  corsProxy?: string;
  username?: string;
  password?: string;
}

export interface CustomVariableQuery {
  namespace: string;
  rawQuery: string;
}

export interface ConfigEditOptions extends DataSourceJsonData {
  instanceName?: string;
}

export interface ConfigEditSecureJsonData {
  token?: string;
}

export interface QueryResponseColumn {
  type?: string;
  text: string;
}

export interface QueryResponse {
  columns: QueryResponseColumn[];
  refId?: string;
  meta?: string;
  rows: any[];
}

export type Pair<T, K> = [T, K];
