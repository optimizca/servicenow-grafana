import { DataQuery, DataSourceJsonData } from "@grafana/data";
import { SelectableValue } from "@grafana/data";

export interface PluginQuery extends DataQuery {
  queryFilter: string;
  services: string;
  metricType: string;
  metricSource: string;
  metricName: string;
  selectedQueryCategory: SelectableValue<string>;
  alertCategory: SelectableValue<string>;
  resultCategory: SelectableValue<string>;
  aggregationCriteria: SelectableValue<string>;
  totalAlerts: SelectableValue<string>;
}

export const defaultQuery: Partial<PluginQuery> = {
  queryFilter: "",
  services: "$selectedServices",
  metricType: "cpu_loadavgsec",
  metricSource: "",
  metricName: "",
  selectedQueryCategory: {
    label: "Alerts",
    value: "Alerts",
    description: "Get alerts information."
  },
  alertCategory: {
    label: "Alerts",
    value: "Alerts",
    description: "Get alerts information."
  },
  resultCategory: {
    label: "Aggregate",
    value: "aggregate",
    description: "Get aggregate alerts by source."
  },
  aggregationCriteria: {
    label: "Status",
    value: "status",
    description: "Aggregate incidents by status."
  },
  totalAlerts: { label: "10", value: "10", description: "Top 10 alerts." }
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
}

export interface CustomVariableQuery {
  namespace: string;
  rawQuery: string;
}
