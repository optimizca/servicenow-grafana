import { defaults, isEqual } from 'lodash';
import { InlineFieldRow, InlineField, Select, HorizontalGroup } from '@grafana/ui';
import React from 'react';
import { PluginQuery, defaultQuery, TextValuePair, MultiValueVariable } from './types';
import { DataSource } from './DataSource';
import {
  SelectService,
  SelectCI,
  SelectResource,
  SelectMetric,
  SelectMetricAnomaly,
  InputSysparam,
  SelectAlertType,
  SelectAlertState,
  SelectChangeType,
  SelectStartingPoint,
  InputParentDepth,
  InputChildDepth,
  InputPage,
  SelectAdminCategory,
  InputMetric,
  SelectAgentFilter,
  InputOsquery,
  SelectTableName,
  InputGroupBy,
  SelectAggregate,
  SelectSortBy,
  InputLimit,
  SelectTableColumn,
  InputElasticSearch,
  SelectTrend,
  ShowPercentSwitch,
  SelectBasicSysparam,
  AlertCountChoice,
  SelectCacheTimeout,
  ToggleLogCompression,
  TimerangeCheckbox,
  SelectTags,
} from 'Components';
import './QueryEditorStyles.css';
import { getTemplateSrv } from '@grafana/runtime';

interface Props {
  onChange: (query: PluginQuery) => void;
  query: PluginQuery;
  datasource: DataSource;
}

export const SplitQueryEditor = ({ query, onChange, datasource }: Props) => {
  const q = defaults(query, defaultQuery);

  const metricAnomalyOptions = datasource.snowConnection.getMetricAnomalyOptions();
  const alertTypeOptions = datasource.snowConnection.getAlertTypeOptions();
  const alertStateOptions = datasource.snowConnection.getAlertStateOptions();
  const changeTypeOptions = datasource.snowConnection.getChangeTypeOptions();
  const adminOptions = datasource.snowConnection.getAdminQueryOptions();
  const agentFilterTypeOptions = datasource.snowConnection.getAgentFilterTypeOptions();
  const agentMetricOptions = datasource.snowConnection.getAgentMetricOptions();
  const aggregationTypeOptions = datasource.snowConnection.getAggregateTypeOptions();
  const sysparamTypeOptions = datasource.snowConnection.getSysparamTypeOptions();
  const trendByOptions = datasource.snowConnection.getTrendByOptions();

  const loadServiceOptions = (input?) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(datasource.snowConnection.loadServiceOptions(input));
      }, 500);
    });
  };

  const loadCIOptions = (input?) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(datasource.snowConnection.loadCIOptions(q.selectedServiceList?.value, input));
      }, 500);
    });
  };

  const loadResourceOptions = (input?) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(datasource.snowConnection.loadResourceOptions(q.selectedSourceList, input));
      }, 500);
    });
  };

  const loadMetricOptions = (input?) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(datasource.snowConnection.loadMetricOptions(q.selectedSourceList, input));
      }, 500);
    });
  };

  const loadTableColumnOptions = (addSuffix: boolean, input?) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(datasource.snowConnection.loadTableColumns(q.tableName?.value, addSuffix, input));
      }, 500);
    });
  };

  const loadColumnChoices = (index, input?) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          datasource.snowConnection.loadColumnChoices(q.tableName?.value, q.basic_sysparam[index][1]?.value, input)
        );
      }, 500);
    });
  };

  const loadTableOptions = (input?) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(datasource.snowConnection.loadTableOptions(input));
      }, 500);
    });
  };

  const updateQuery = (key: string, value: any) => {
    onChange({ ...q, [key]: value });
  };

  const updateTwoQueries = (values: Array<{ key: string; value: any }>) => {
    console.log('values: ', values);
    var newQuery = q;
    console.log('oldQuery: ', newQuery);
    for (var i = 0; i < values.length; i++) {
      newQuery[values[i].key] = values[i].value;
    }
    console.log('newQuery: ', newQuery);
    onChange(newQuery);
  };

  const getQueryCategories = () => {
    var categoryOptions: Array<{ label: string; value: string; description: string }> = [];
    for (var key in options) {
      var value = options[key];
      categoryOptions.push({ label: value.title, value: key, description: value.description });
    }
    return categoryOptions;
  };

  const getVariables = () => {
    const variables: { [id: string]: TextValuePair } = {};
    Object.values(getTemplateSrv().getVariables()).forEach((variable) => {
      if (variable.type === 'adhoc' || variable.type === 'interval') {
        // These are being added to request.adhocFilters
        console.warn(`Variable of type "${variable.type}" is not currently supported by this plugin`);
        return;
      }

      const supportedVariable = variable as MultiValueVariable;

      let variableValue = supportedVariable.current.value;
      if (variableValue === '$__all' || isEqual(variableValue, ['$__all'])) {
        if (supportedVariable.allValue === null || supportedVariable.allValue === '') {
          var allValues = '';
          for (let i = 1; i < supportedVariable.options.length; i++) {
            allValues += supportedVariable.options[i].value + ',';
          }
          if (allValues.charAt(allValues.length - 1) === ',') {
            allValues = allValues.substring(0, allValues.length - 1);
          }
          variableValue = allValues;
        } else {
          variableValue = supportedVariable.allValue;
        }
      }

      variables[supportedVariable.id] = {
        text: supportedVariable.current.text,
        value: variableValue,
      };
    });

    return variables;
  };

  const stripVariableString = (variableString: string) => {
    if (variableString.charAt(0) === '$') {
      variableString = variableString.substring(1);
      if (variableString.charAt(0) === '{' && variableString.charAt(variableString.length - 1) === '}') {
        variableString = variableString.substring(1, variableString.length - 1);
      }
    }
    return variableString;
  };

  // const replaceVariable = (replace: string) => {
  //   replace = stripVariableString(replace);
  //   var returnValue: string = replace;
  //   var variables = getVariables();
  //   console.log('variables: ', variables);
  //   if (typeof variables[replace] !== 'undefined') {
  //     returnValue = variables[replace].value;
  //   }
  //   return returnValue;
  // };

  const replaceMultipleVariables = (string: string) => {
    var dollarIndex = string.indexOf('$');
    var variables = getVariables();
    while (dollarIndex !== -1) {
      let endIndex = string.indexOf('^', dollarIndex) === -1 ? string.length : string.indexOf('^', dollarIndex);
      var variable = string.substring(dollarIndex, endIndex);
      var variableValue = variable;
      var varId = stripVariableString(variable);
      if (typeof variables[varId] !== 'undefined') {
        variableValue = variables[varId].value;
      }
      string = string.replace(variable, variableValue);
      dollarIndex = string.indexOf('$');
    }
    return string;
  };

  const options: { [key: string]: { title: string; description: string; content: object } } = {
    Metrics: {
      title: 'Metrics',
      description: 'Get Timeseries metrics',
      content: (
        <>
          <SelectService loadOptions={loadServiceOptions} value={q.selectedServiceList} updateQuery={updateQuery} />
          <SelectCI loadOptions={loadCIOptions} value={q.selectedSourceList} updateQuery={updateQuery} />
          <SelectResource
            loadOptions={loadResourceOptions}
            value={q.selectedMetricTypeList}
            updateQuery={updateQuery}
          />
          <SelectMetric loadOptions={loadMetricOptions} value={q.selectedMetricNameList} updateQuery={updateQuery} />
          <SelectMetricAnomaly
            options={metricAnomalyOptions}
            value={q.selectedMetricAnomalyList}
            updateQuery={updateQuery}
          />
          <InputSysparam updateQuery={updateQuery} defaultValue={q.sysparam_query} />
        </>
      ),
    },
    Alerts: {
      title: 'Alerts',
      description: 'Get Alerts',
      content: (
        <>
          <SelectService loadOptions={loadServiceOptions} value={q.selectedServiceList} updateQuery={updateQuery} />
          <SelectCI loadOptions={loadCIOptions} value={q.selectedSourceList} updateQuery={updateQuery} />
          <SelectAlertType options={alertTypeOptions} value={q.selectedAlertTypeList} updateQuery={updateQuery} />
          <SelectAlertState options={alertStateOptions} value={q.selectedAlertStateList} updateQuery={updateQuery} />
          <InputSysparam updateQuery={updateQuery} defaultValue={q.sysparam_query} />
          <SelectTags
            query={q}
            updateQuery={updateQuery}
            datasource={datasource}
            replaceMultipleVariables={replaceMultipleVariables}
          />
          <InputLimit defaultValue={q.rowLimit} updateQuery={updateQuery} />
          <InputPage defaultValue={q.page} updateQuery={updateQuery} />
          <TimerangeCheckbox value={q.grafanaTimerange} updateQuery={updateQuery} />
        </>
      ),
    },
    Changes: {
      title: 'Changes',
      description: 'Get Changes',
      content: (
        <>
          <SelectService loadOptions={loadServiceOptions} value={q.selectedServiceList} updateQuery={updateQuery} />
          <SelectCI loadOptions={loadCIOptions} value={q.selectedSourceList} updateQuery={updateQuery} />
          <SelectChangeType options={changeTypeOptions} value={q.selectedChangeTypeList} updateQuery={updateQuery} />
          <InputSysparam updateQuery={updateQuery} defaultValue={q.sysparam_query} />
          <InputLimit defaultValue={q.rowLimit} updateQuery={updateQuery} />
          <InputPage defaultValue={q.page} updateQuery={updateQuery} />
          <TimerangeCheckbox value={q.grafanaTimerange} updateQuery={updateQuery} />
        </>
      ),
    },
    Topology: {
      title: 'Topology',
      description: 'Get Topology',
      content: (
        <>
          <SelectStartingPoint
            loadOptions={loadServiceOptions}
            value={q.selectedServiceList}
            updateQuery={updateQuery}
          />
          <InputParentDepth updateQuery={updateQuery} defaultValue={q.topology_parent_depth} />
          <InputChildDepth updateQuery={updateQuery} defaultValue={q.topology_child_depth} />
          <InputSysparam updateQuery={updateQuery} defaultValue={q.sysparam_query} />
        </>
      ),
    },
    Admin: {
      title: 'Admin',
      description: 'Definitions and Admin Queries',
      content: (
        <>
          <SelectAdminCategory options={adminOptions} value={q.selectedAdminCategoryList} updateQuery={updateQuery} />
          <InputSysparam updateQuery={updateQuery} defaultValue={q.sysparam_query} />
        </>
      ),
    },
    CI_Summary: {
      title: 'CI Summary',
      description: 'CI Summary',
      content: (
        <>
          <SelectService loadOptions={loadServiceOptions} value={q.selectedServiceList} updateQuery={updateQuery} />
          <SelectCI loadOptions={loadCIOptions} value={q.selectedSourceList} updateQuery={updateQuery} />
          <InputSysparam updateQuery={updateQuery} defaultValue={q.sysparam_query} />
        </>
      ),
    },
    Agents: {
      title: 'Agents',
      description: 'Get Agent information',
      content: (
        <>
          <InputMetric updateQuery={updateQuery} value={q.selectedMetricNameList} options={agentMetricOptions} />
          <SelectAgentFilter
            typeOptions={agentFilterTypeOptions}
            typeValue={q.selectedAgentFilterType}
            updateQuery={updateQuery}
            loadOptions={loadCIOptions}
            value={q.selectedAgentFilter}
          />
          <InputSysparam updateQuery={updateQuery} defaultValue={q.sysparam_query} />
          <InputLimit defaultValue={q.rowLimit} updateQuery={updateQuery} />
          <InputPage defaultValue={q.page} updateQuery={updateQuery} />
        </>
      ),
    },
    Live_Agent_Data: {
      title: 'Live Agent Data',
      description: 'Get Live Data from your ACC Agents',
      content: (
        <>
          <InputOsquery updateQuery={updateQuery} defaultValue={q.live_osquery} />
        </>
      ),
    },
    Table: {
      title: 'Table',
      description: 'Choose your own table to gather data from',
      content: (
        <>
          <SelectTableName updateQuery={updateQuery} loadTableOptions={loadTableOptions} value={q.tableName} />
          <SelectTableColumn
            updateQuery={updateQuery}
            loadOptions={loadTableColumnOptions}
            value={q.selectedtableColumns}
          />
          <SelectBasicSysparam
            value={q.basic_sysparam}
            updateQuery={updateQuery}
            loadColumns={loadTableColumnOptions}
            sysparamTypeOptions={sysparamTypeOptions}
            loadChoices={loadColumnChoices}
          />
          <AlertCountChoice value={q.getAlertCount} updateQuery={updateQuery} />
          <SelectSortBy loadOptions={loadTableColumnOptions} value={q.sortBy} updateQuery={updateQuery} />
          <InputLimit defaultValue={q.rowLimit} updateQuery={updateQuery} />
          <InputPage defaultValue={q.page} updateQuery={updateQuery} />
        </>
      ),
    },
    Row_Count: {
      title: 'Row Count',
      description: 'Get row count from query',
      content: (
        <>
          <SelectTableName updateQuery={updateQuery} loadTableOptions={loadTableOptions} value={q.tableName} />
          <InputSysparam updateQuery={updateQuery} defaultValue={q.sysparam_query} />
        </>
      ),
    },
    Aggregate: {
      title: 'Aggregate',
      description: 'Group by and apply aggregate functions to table data',
      content: (
        <>
          <SelectTableName updateQuery={updateQuery} loadTableOptions={loadTableOptions} value={q.tableName} />
          <InputGroupBy updateQuery={updateQuery} defaultValue={q.groupBy} />
          <SelectAggregate
            options={aggregationTypeOptions}
            value={q.selectedAggregateType}
            updateQuery={updateQuery}
            defaultColumnValue={q.aggregateColumn}
          />
          <InputSysparam updateQuery={updateQuery} defaultValue={q.sysparam_query} />
          <InputLimit defaultValue={q.rowLimit} updateQuery={updateQuery} />
        </>
      ),
    },
    Geohash_Map: {
      title: 'GeoHash Map',
      description: 'Get map data from AWS or Azure',
      content: (
        <>
          <SelectTableName updateQuery={updateQuery} loadTableOptions={loadTableOptions} value={q.tableName} />
          <InputGroupBy updateQuery={updateQuery} defaultValue={q.groupBy} />
          <InputSysparam updateQuery={updateQuery} defaultValue={q.sysparam_query} />
        </>
      ),
    },
    Log_Data: {
      title: 'Log Data',
      description: 'Get log data',
      content: (
        <>
          <ToggleLogCompression value={q.compressLogs} updateQuery={updateQuery} />
          <SelectBasicSysparam
            value={q.basic_sysparam}
            updateQuery={updateQuery}
            loadColumns={loadTableColumnOptions}
            sysparamTypeOptions={sysparamTypeOptions}
            loadChoices={loadColumnChoices}
          />
          <InputElasticSearch updateQuery={updateQuery} defaultValue={q.elasticSearch} />
          <SelectSortBy loadOptions={loadTableColumnOptions} value={q.sortBy} updateQuery={updateQuery} />
          <InputLimit defaultValue={q.rowLimit} updateQuery={updateQuery} />
          <InputPage defaultValue={q.page} updateQuery={updateQuery} />
        </>
      ),
    },
    Trend_Data: {
      title: 'Trend Data',
      description: 'Get timeseries data based on a time trend',
      content: (
        <>
          <SelectTableName updateQuery={updateQuery} loadTableOptions={loadTableOptions} value={q.tableName} />
          <SelectBasicSysparam
            value={q.basic_sysparam}
            updateQuery={updateQuery}
            loadColumns={loadTableColumnOptions}
            sysparamTypeOptions={sysparamTypeOptions}
            loadChoices={loadColumnChoices}
          />
          <InputElasticSearch updateQuery={updateQuery} defaultValue={q.elasticSearch} />
          <SelectTrend
            columnLoadOptions={loadTableColumnOptions}
            columnValue={q.selectedTrendColumn}
            updateQuery={updateQuery}
            trendByOptions={trendByOptions}
            trendByValue={q.selectedTrendBy}
            periodValue={q.trendPeriod}
          />
        </>
      ),
    },
    Outage_Status: {
      title: 'Outage Status',
      description: 'Gathers business service status over the last 90 days',
      content: (
        <>
          <SelectService loadOptions={loadServiceOptions} value={q.selectedServiceList} updateQuery={updateQuery} />
          <ShowPercentSwitch value={q.showPercent} updateQuery={updateQuery} />
          <InputSysparam updateQuery={updateQuery} defaultValue={q.sysparam_query} />
          <InputLimit defaultValue={q.rowLimit} updateQuery={updateQuery} />
          <InputPage defaultValue={q.page} updateQuery={updateQuery} />
          <TimerangeCheckbox value={q.grafanaTimerange} updateQuery={updateQuery} />
        </>
      ),
    },
    Anomaly: {
      title: 'Anomaly',
      description: 'Parse values out of Alert Anomalies table',
      content: (
        <>
          <SelectTableName updateQuery={updateQuery} loadTableOptions={loadTableOptions} value={q.tableName} />
          <SelectTableColumn
            updateQuery={updateQuery}
            loadOptions={loadTableColumnOptions}
            value={q.selectedtableColumns}
          />
          <SelectBasicSysparam
            value={q.basic_sysparam}
            updateQuery={updateQuery}
            loadColumns={loadTableColumnOptions}
            sysparamTypeOptions={sysparamTypeOptions}
            loadChoices={loadColumnChoices}
          />
          <SelectSortBy loadOptions={loadTableColumnOptions} value={q.sortBy} updateQuery={updateQuery} />
          <InputLimit defaultValue={q.rowLimit} updateQuery={updateQuery} />
          <InputPage defaultValue={q.page} updateQuery={updateQuery} />
        </>
      ),
    },
  };

  return (
    <>
      <HorizontalGroup justify="space-between">
        <InlineFieldRow style={{ paddingTop: '8px' }}>
          <InlineField label="Query Category" labelWidth={20}>
            <Select
              className="min-width-10 max-width-30"
              options={getQueryCategories()}
              value={q.selectedQueryCategory}
              onChange={(e) => {
                if (e.label === 'Anomaly') {
                  updateTwoQueries([
                    {
                      key: 'tableName',
                      value: { label: 'Alert Anomaly', value: 'em_alert_anomaly', description: 'em_alert_anomaly' },
                    },
                    { key: 'selectedQueryCategory', value: e },
                  ]);
                } else {
                  updateQuery('selectedQueryCategory', e);
                }
              }}
              menuPlacement="bottom"
            />
          </InlineField>
        </InlineFieldRow>
        <SelectCacheTimeout value={q.cacheOverride} updateQuery={updateQuery} />
      </HorizontalGroup>
      {options[q.selectedQueryCategory.value ?? ''].content}
    </>
  );
};
