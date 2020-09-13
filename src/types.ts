import { DataQuery, DataSourceJsonData } from '@grafana/data';
import { SelectableValue } from '@grafana/data';

export interface MyQuery extends DataQuery {
  queryFilter: string;
  selectedQueryCategory: SelectableValue<string>;
  alertCategory: SelectableValue<string>;
  resultCategory: SelectableValue<string>;
  aggregationCriteria: SelectableValue<string>;
  constant: number;
  frequency: number;
  application: string;
  metric: string;
  businessTransaction: string;
}

export const defaultQuery: Partial<MyQuery> = {
  queryFilter: "",
  constant: 6.5,
  frequency: 1.0,
  selectedQueryCategory: { label: "Alerts", value: 'Alerts', description: "Get alerts information."},
  alertCategory: { label: "Alerts", value: 'Alerts', description: "Get alerts information."} ,
  resultCategory: { label: "Aggregate", value: 'aggregate', description: "Get aggregate alerts by source."},
  aggregationCriteria: { label: "Status", value: 'status', description: "Aggregate incidents by status."},
  application: "Test Application",
  metric: "Overall Application Performance",
  businessTransaction: "Average Response Time",
};

/**
 * These are options configured for each DataSource instance
 */
export interface MyDataSourceOptions extends DataSourceJsonData {
  path?: string;
  resolution?: number;
  instanceName?: string;
  moogApiKey?: string;
}

/**
 * Value that is used in the backend, but never sent over HTTP to the frontend
 */
export interface MySecureJsonData {
  apiKey?: string;
}

export interface Result {
  value?: string;
}

