import { DataQuery, DataSourceJsonData, SelectableValue, VariableModel } from '@grafana/data';

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
  showPercent: boolean;
  page: number;
  getAlertCount: SelectableValue<string>;
  compressLogs: boolean;
  grafanaTimerange: boolean;

  cacheOverride: string;

  basic_sysparam: Array<{
    1: SelectableValue<string> | null;
    2: SelectableValue<string> | null;
    3: SelectableValue<string> | null;
    4: SelectableValue<string> | null;
  }>;

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

  tagKeys: SelectableValue<string>;
  tagValues: SelectableValue<string>;
}

export const defaultQuery: Partial<PluginQuery> = {
  selectedQueryCategory: {
    label: 'Metrics',
    value: 'Metrics',
    description: 'Get Timeseries metrics.',
  },
  basic_sysparam: [
    {
      1: null,
      2: null,
      3: null,
      4: null,
    },
  ],
  getAlertCount: { label: 'No', value: 'false' },
  cacheOverride: '',
  compressLogs: false,
  grafanaTimerange: false,
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
  apiPath?: string;
  imageURL?: string;
  instanceName?: string;
  cacheTimeout?: number;
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

export interface TextValuePair {
  text: string;
  value: any;
}

export interface MultiValueVariable extends VariableModel {
  allValue: string | null;
  id: string;
  current: TextValuePair;
  options: TextValuePair[];
}
