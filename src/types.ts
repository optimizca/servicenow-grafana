import {DataSourceJsonData, SelectableValue, VariableModel } from '@grafana/data';
import type { DataQuery } from '@grafana/schema';

export interface PluginQuery extends DataQuery {
  rawQuery: string;
  sysparam_query: string;
  metricAnomaly: string;
  topology_parent_depth: string;
  topology_child_depth: string;
  topology_namespaces: string;
  topology_filter: string;
  live_osquery: string;
  tableName: SelectableValue<string>;
  groupBy: SelectableValue<string>;
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
  selectedAgentFilterType: SelectableValue<string>;
  selectedAgentFilter: SelectableValue<string>;
  selectedAggregateType: SelectableValue<string>;
  selectedtableColumns: SelectableValue<string>;
  sortBy: SelectableValue<string>;
  sortDirection: string;
  metricValueType: string;
  selectedTrendColumn: SelectableValue<string>;
  selectedTrendBy: SelectableValue<string>;
  grafanaTimerangeColumn: SelectableValue<string>;

  tagKeys: SelectableValue<string>;
  tagValues: SelectableValue<string>;
  relationshipTypes: Array<SelectableValue<string>>;
  excludedClasses: Array<SelectableValue<string>>;
  basicSysparm: Array<{
    column: SelectableValue<string> | null;
    operator: SelectableValue<string> | null;
    value: SelectableValue<string> | null;
    separator: SelectableValue<string> | null;
  }>;
  multiplier: number;
}

export const defaultQuery: Partial<PluginQuery> = {
  selectedQueryCategory: {
    label: 'Metrics',
    value: 'Metrics',
    description: 'Get Timeseries metrics.',
  },
  basic_sysparam: [],
  getAlertCount: { label: 'No', value: 'false' },
  cacheOverride: '',
  compressLogs: false,
  grafanaTimerange: false,
  sortDirection: 'ASC',
  metricValueType: 'timeseries',
  page: 0,
  rowLimit: '2000',
  topology_child_depth: '3',
  topology_parent_depth: '3',
  relationshipTypes: [],
  excludedClasses: [],
  basicSysparm: [
    {
      column: null,
      operator: null,
      value: null,
      separator: null,
    },
  ],
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
  showAsterisk: boolean;
  showNull: boolean;
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

export interface SimpleBasicSysParam {
  column: string;
  operator: string;
  value: string;
}

export interface SysParamColumnObject {
  column: { value: string };
  operator: { value: string };
  value: { value: string };
  separator: { value: string };
}
