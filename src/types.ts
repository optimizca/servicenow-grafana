import { DataQuery, DataSourceJsonData, SelectableValue } from '@grafana/data';

export interface PluginQuery extends DataQuery {
  sysparam_query: string;
  metricAnomaly: string;
  topology_parent_depth: string;
  topology_child_depth: string;
  topology_namespaces: string;
  topology_filter: string;
  live_osquery: string;
  tableName: string;
  tableColumns: string;
  groupBy: string;
  aggregateColumn: string;

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
}

export const defaultQuery: Partial<PluginQuery> = {
  selectedQueryCategory: {
    label: 'Metrics',
    value: 'Metrics',
    description: 'Get Timeseries metrics.',
  },
};

/**
 * These are options configured for each DataSource instance
 */
export interface PluginDataSourceOptions extends DataSourceJsonData {
  path?: string;
  resolution?: number;
  instanceName?: string;
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
  organization?: string;
  defaultBucket?: string;
  maxSeries?: number;
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
