import React from 'react';
import { defaults, isEqual } from 'lodash';
import { QueryEditorProps } from '@grafana/data';
import { getTemplateSrv } from '@grafana/runtime';
import { InlineFieldRow, InlineField, Select, HorizontalGroup } from '@grafana/ui';
import { DataSource } from './DataSource';
import { PluginQuery, defaultQuery, TextValuePair, MultiValueVariable, PluginDataSourceOptions } from './types';

import { SelectTags } from 'components/SelectTags';
import { AlertCountChoice } from 'components/AlertCountChoice';
import { InputElasticSearch } from 'components/InputElasticSearch';
import { InputGroupBy } from 'components/InputGroupBy';
import { InputLimit } from 'components/InputLimit';
import { InputPage } from 'components/InputPage';
import { SelectAggregate } from 'components/SelectAggregate';
import { SelectBasicSysparam } from 'components/SelectBasicSysparam';
import { SelectCacheTimeout } from 'components/SelectCacheTimeout';
import { SelectSortBy } from 'components/SelectSortBy';
import { SelectTrend } from 'components/SelectTrend';
import { ShowPercentSwitch } from 'components/ShowPercentSwitch';
import { TimerangeCheckbox } from 'components/TimeRangeCheckBox';
import { ToggleLogCompression } from 'components/ToggleLogCompression';
import { SelectCI } from 'components/SelectCI';
import { SelectMetric } from 'components/SelectMetric';
import { InputSysparam } from 'components/InputSysparam';
import { SelectService } from 'components/SelectService';
import { SelectResource } from 'components/SelectResource';
import { SelectAlertType } from 'components/SelectAlertType';
import { InputChildDepth } from 'components/InputChildDepth';
import { SelectTableName } from 'components/SelectTableName';
import { SelectAlertState } from 'components/SelectAlertState';
import { InputParentDepth } from 'components/InputParentDepth';
import { SelectTableColumn } from 'components/SelectTableColumn';
import { SelectMetricAnomaly } from 'components/SelectMetricAnomaly';
import { SelectStartingPoint } from 'components/SelectStartingPoint';

type Props = QueryEditorProps<DataSource, PluginQuery, PluginDataSourceOptions>;

export const QueryEditor = (props: Props) => {
const { query, onChange, datasource } = props;
  const q = defaults(query, defaultQuery);

  const metricAnomalyOptions = datasource.snowConnection.getMetricAnomalyOptions();
  const alertTypeOptions = datasource.snowConnection.getAlertTypeOptions();
  const alertStateOptions = datasource.snowConnection.getAlertStateOptions();
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
    let newQuery = q;
    console.log('oldQuery: ', newQuery);
    for (let i = 0; i < values.length; i++) {
      newQuery[values[i].key] = values[i].value;
    }
    console.log('newQuery: ', newQuery);
    onChange(newQuery);
  };

  const getQueryCategories = () => {
    let categoryOptions: Array<{ label: string; value: string; description: string }> = [];
    for (let key in options) {
      let value = options[key];
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
          let allValues = '';
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
    if (!string) {
      return '';
    }
    let dollarIndex = string.indexOf('$');
    let variables = getVariables();
    while (dollarIndex !== -1) {
      let endIndex = string.indexOf('^', dollarIndex) === -1 ? string.length : string.indexOf('^', dollarIndex);
      let variable = string.substring(dollarIndex, endIndex);
      let variableValue = variable;
      let varId = stripVariableString(variable);
      if (typeof variables[varId] !== 'undefined') {
        variableValue = variables[varId].value;
      }
      string = string.replace(variable, variableValue);
      dollarIndex = string.indexOf('$');
    }
    return string;
  };

  const options: { [key: string]: { title: string; description: string; content: object } } = {
    Table: {
      title: 'Table',
      description: 'Choose your own table to gather data from',
      content: (
        <>
          <SelectTableName updateQuery={updateQuery} loadTableOptions={loadTableOptions} value={q.tableName} />
          <SelectTableColumn query={q} updateQuery={updateQuery} datasource={datasource} />
          <SelectBasicSysparam
            query={q}
            updateQuery={updateQuery}
            datasource={datasource}
            sysparamTypeOptions={sysparamTypeOptions}
            loadChoices={loadColumnChoices}
          />
          <SelectSortBy query={q} updateQuery={updateQuery} datasource={datasource} />
          <InputLimit defaultValue={q.rowLimit} updateQuery={updateQuery} />
          <InputPage defaultValue={q.page} updateQuery={updateQuery} />
          <AlertCountChoice value={q.getAlertCount} updateQuery={updateQuery} />
          <TimerangeCheckbox query={q} updateQuery={updateQuery} datasource={datasource} table={q.tableName} />
        </>
      ),
    },
    Aggregate: {
      title: 'Aggregate',
      description: 'Group by and apply aggregate functions to table data',
      content: (
        <>
          <SelectTableName updateQuery={updateQuery} loadTableOptions={loadTableOptions} value={q.tableName} />
          <InputGroupBy query={q} updateQuery={updateQuery} datasource={datasource} />
          <SelectAggregate query={q} updateQuery={updateQuery} datasource={datasource} />
          <InputSysparam updateQuery={updateQuery} defaultValue={q.sysparam_query} />
          <InputLimit defaultValue={q.rowLimit} updateQuery={updateQuery} />
          <TimerangeCheckbox query={q} updateQuery={updateQuery} datasource={datasource} table={q.tableName} />
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
          <SelectSortBy query={q} updateQuery={updateQuery} datasource={datasource} />
          <InputLimit defaultValue={q.rowLimit} updateQuery={updateQuery} />
          <InputPage defaultValue={q.page} updateQuery={updateQuery} />
          <TimerangeCheckbox query={q} updateQuery={updateQuery} datasource={datasource} table={"em_alert"} />
        </>
      ),
    },
    Anomaly: {
      title: 'Anomaly',
      description: 'Parse values out of Alert Anomalies table',
      content: (
        <>
          <SelectTableName updateQuery={updateQuery} loadTableOptions={loadTableOptions} value={q.tableName} />
          <SelectTableColumn query={q} updateQuery={updateQuery} datasource={datasource} />
          <SelectBasicSysparam
            query={q}
            updateQuery={updateQuery}
            datasource={datasource}
            sysparamTypeOptions={sysparamTypeOptions}
            loadChoices={loadColumnChoices}
          />
          <SelectSortBy query={q} updateQuery={updateQuery} datasource={datasource} />
          <InputLimit defaultValue={q.rowLimit} updateQuery={updateQuery} />
          <InputPage defaultValue={q.page} updateQuery={updateQuery} />
        </>
      ),
    },
    Geohash_Map: {
      title: 'GeoHash Map',
      description: 'Get map data from AWS or Azure',
      content: (
        <>
          <SelectTableName updateQuery={updateQuery} loadTableOptions={loadTableOptions} value={q.tableName} />
          <InputGroupBy query={q} updateQuery={updateQuery} datasource={datasource} />
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
            query={q}
            updateQuery={updateQuery}
            datasource={datasource}
            sysparamTypeOptions={sysparamTypeOptions}
            loadChoices={loadColumnChoices}
          />
          <InputElasticSearch updateQuery={updateQuery} defaultValue={q.elasticSearch} />
          <SelectSortBy query={q} updateQuery={updateQuery} datasource={datasource} />
          <InputLimit defaultValue={q.rowLimit} updateQuery={updateQuery} />
          <InputPage defaultValue={q.page} updateQuery={updateQuery} />
        </>
      ),
    },
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
          <TimerangeCheckbox query={q} updateQuery={updateQuery} datasource={datasource} table={q.tableName} />
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
    Trend_Data: {
      title: 'Trend Data',
      description: 'Get timeseries data based on a time trend',
      content: (
        <>
          <SelectTableName updateQuery={updateQuery} loadTableOptions={loadTableOptions} value={q.tableName} />
          <SelectBasicSysparam
            query={q}
            updateQuery={updateQuery}
            datasource={datasource}
            sysparamTypeOptions={sysparamTypeOptions}
            loadChoices={loadColumnChoices}
          />
          <InputElasticSearch updateQuery={updateQuery} defaultValue={q.elasticSearch} />
          <InputGroupBy query={q} updateQuery={updateQuery} datasource={datasource} />
          <SelectTrend query={q} updateQuery={updateQuery} trendByOptions={trendByOptions} datasource={datasource} />
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
              width={40}
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
              maxMenuHeight={220}
            />
          </InlineField>
        </InlineFieldRow>
        <SelectCacheTimeout value={q.cacheOverride} updateQuery={updateQuery} />
      </HorizontalGroup>
      {options[q.selectedQueryCategory.value ?? ''].content}
    </>
  );
};
