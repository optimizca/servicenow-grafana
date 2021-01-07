import { DataQuery, DataSourceJsonData } from "@grafana/data";
import { SelectableValue } from "@grafana/data";

export interface PluginQuery extends DataQuery {
  queryFilter: string;

  service: string;
  metricSource: string;
  metricType: string;
  metricName: string;

  selectedServiceList: SelectableValue<string>;
  selectedMetricSourceList: SelectableValue<string>;
  selectedMetricNameList: SelectableValue<string>;
  selectedMetricTypeList: SelectableValue<string>;

  selectedQueryCategory: SelectableValue<string>;
}

export const defaultQuery: Partial<PluginQuery> = {
  service: "$service",
  metricSource: "$source",
  metricName: "$metricName",
  metricType: "$metricType",
  selectedQueryCategory: {
    label: "Metrics",
    value: "Metrics",
    description: "Get Timeseries metrics."
  }
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
