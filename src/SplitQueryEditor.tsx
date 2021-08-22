import { defaults } from 'lodash';
import { InlineFieldRow, InlineField, Select } from '@grafana/ui';
import React from 'react';
import { PluginQuery, defaultQuery } from './types'
import { DataSource } from './DataSource';
import { SelectService, SelectCI, SelectResource, SelectMetric, SelectMetricAnomaly, InputSysparam, SelectAlertType,
  SelectAlertState, SelectChangeType, SelectStartingPoint, InputParentDepth, InputChildDepth, InputNamespace, InputExcludedClasses,
  SelectAdminCategory, InputMetric, SelectAgentFilter, InputOsquery, SelectTableName, InputGroupBy, SelectAggregate,
  SelectSysparam, SelectSortBy, InputLimit, SelectTableColumn } from 'Components';

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

  const loadServiceOptions = (input?) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(datasource.snowConnection.loadServiceOptions(input));
      }, 500);
    });
  }

  const loadCIOptions = (input?) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(datasource.snowConnection.loadCIOptions(q.selectedServiceList?.value, input));
      }, 500);
    });
  }

  const loadResourceOptions = (input?) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(datasource.snowConnection.loadResourceOptions(q.selectedSourceList, input));
      }, 500);
    });
  }

  const loadMetricOptions = (input?) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(datasource.snowConnection.loadMetricOptions(q.selectedSourceList, input));
      }, 500);
    });
  }

  const loadTableColumnOptions = (addSuffix: boolean, input?) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(datasource.snowConnection.loadTableColumns(q.tableName?.value, addSuffix, input));
      }, 500);
    })
  }

  const loadColumnChoices = (index, input?) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(datasource.snowConnection.loadColumnChoices(q.tableName?.value, q.sysparam_option1[index]?.value, input));
      }, 500);
    })
  }

  const loadTableOptions = (input?) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(datasource.snowConnection.loadTableOptions(input));
      }, 500);
    })
  }

  const updateQuery = (key: string, value: any) => {
    onChange({...q, [key]: value});
  };

  const updateSysparam = (key: string, index: number, value: any) => {
    var newValue = [...q[key]];
    newValue[index] = value;
    console.log('new: ', newValue[index]);
    onChange({...q, [key]: newValue});
  };

  const getQueryCategories = () => {
    var categoryOptions: { label: string, value: string, description: string }[] = [];
    for (var key in options) {
      var value = options[key];
      categoryOptions.push({ label: value.title, value: key, description: value.description });
    }
    return categoryOptions;
  };

  const options = {
    Metrics: {
      title: 'Metrics',
      description: 'Get Timeseries metrics',
      content: (
        <>
          <SelectService
            loadOptions={loadServiceOptions}
            value={q.selectedServiceList}
            updateQuery={updateQuery}
          />
          <SelectCI
            loadOptions={loadCIOptions}
            value={q.selectedSourceList}
            updateQuery={updateQuery}
          />
          <SelectResource
            loadOptions={loadResourceOptions}
            value={q.selectedMetricTypeList}
            updateQuery={updateQuery}
          />
          <SelectMetric
            loadOptions={loadMetricOptions}
            value={q.selectedMetricNameList}
            updateQuery={updateQuery}
          />
          <SelectMetricAnomaly
            options={metricAnomalyOptions}
            value={q.selectedMetricAnomalyList}
            updateQuery={updateQuery}
          />
          <InputSysparam
            updateQuery={updateQuery}
            defaultValue={q.sysparam_query}
          />
        </>
      ),
    },
    Alerts: {
      title: 'Alerts',
      description: 'Get Alerts',
      content: (
        <>
          <SelectService
            loadOptions={loadServiceOptions}
            value={q.selectedServiceList}
            updateQuery={updateQuery}
          />
          <SelectCI
            loadOptions={loadCIOptions}
            value={q.selectedSourceList}
            updateQuery={updateQuery}
          />
          <SelectAlertType
            options={alertTypeOptions}
            value={q.selectedAlertTypeList}
            updateQuery={updateQuery}
          />
          <SelectAlertState
            options={alertStateOptions}
            value={q.selectedAlertStateList}
            updateQuery={updateQuery}
          />
          <InputSysparam
            updateQuery={updateQuery}
            defaultValue={q.sysparam_query}
          />
        </>
      ),
    },
    Changes: {
      title: 'Changes',
      description: 'Get Changes',
      content: (
        <>
          <SelectService
            loadOptions={loadServiceOptions}
            value={q.selectedServiceList}
            updateQuery={updateQuery}
          />
          <SelectCI
            loadOptions={loadCIOptions}
            value={q.selectedSourceList}
            updateQuery={updateQuery}
          />
          <SelectChangeType
            options={changeTypeOptions}
            value={q.selectedChangeTypeList}
            updateQuery={updateQuery}
          />
          <InputSysparam
            updateQuery={updateQuery}
            defaultValue={q.sysparam_query}
          />
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
            dependsOptions={metricAnomalyOptions}
            dependsValue={q.selectedTopologyDependsOnFilter}
          />
          <InputParentDepth
            updateQuery={updateQuery}
            defaultValue={q.topology_parent_depth}
          />
          <InputChildDepth
            updateQuery={updateQuery}
            defaultValue={q.topology_child_depth}
          />
          <InputNamespace
            updateQuery={updateQuery}
            defaultValue={q.topology_namespaces}
          />
          <InputExcludedClasses
            updateQuery={updateQuery}
            defaultValue={q.topology_filter}
          />
          <InputSysparam
            updateQuery={updateQuery}
            defaultValue={q.sysparam_query}
          />
        </>
      ),
    },
    Admin: {
      title: 'Admin',
      description: 'Definitions and Admin Queries',
      content: (
        <>
          <SelectAdminCategory
            options={adminOptions}
            value={q.selectedAdminCategoryList}
            updateQuery={updateQuery}
          />
          <InputSysparam
            updateQuery={updateQuery}
            defaultValue={q.sysparam_query}
          />
        </>
      ),
    },
    CI_Summary: {
      title: 'CI Summary',
      description: 'CI Summary',
      content: (
        <>
          <SelectService
            loadOptions={loadServiceOptions}
            value={q.selectedServiceList}
            updateQuery={updateQuery}
          />
          <SelectCI
            loadOptions={loadCIOptions}
            value={q.selectedSourceList}
            updateQuery={updateQuery}
          />
          <InputSysparam
            updateQuery={updateQuery}
            defaultValue={q.sysparam_query}
          />
        </>
      ),
    },
    Agents: {
      title: 'Agents',
      description: 'Get Agent information',
      content: (
        <>
          <InputMetric
            updateQuery={updateQuery}
            value={q.selectedMetricNameList}
            options={agentMetricOptions}
          />
          <SelectAgentFilter
            typeOptions={agentFilterTypeOptions}
            typeValue={q.selectedAgentFilterType}
            updateQuery={updateQuery}
            loadOptions={loadCIOptions}
            value={q.selectedAgentFilter}
          />
          <InputSysparam
            updateQuery={updateQuery}
            defaultValue={q.sysparam_query}
          />
        </>
      ),
    },
    Live_Agent_Data: {
      title: 'Live Agent Data',
      description: 'Get Live Data from your ACC Agents',
      content: (
        <>
          <InputOsquery
            updateQuery={updateQuery}
            defaultValue={q.live_osquery}
          />
        </>
      ),
    },
    Generic: {
      title: 'Generic',
      description: 'Get data from any table',
      content: (
        <>
          <SelectTableName
            updateQuery={updateQuery}
            loadTableOptions={loadTableOptions}
            value={q.tableName}
          />
          <InputSysparam
            updateQuery={updateQuery}
            defaultValue={q.sysparam_query}
          />
        </>
      ),
    },
    Database_Views: {
      title: 'Database Views',
      description: 'Get data from Database View tables',
      content: (
        <>
          <SelectTableName
            updateQuery={updateQuery}
            loadTableOptions={loadTableOptions}
            value={q.tableName}
          />
          <SelectTableColumn
            updateQuery={updateQuery}
            loadOptions={loadTableColumnOptions}
            value={q.selectedtableColumns}
          />
          <SelectSysparam
            value={q.sysparam_option1}
            loadColumns={loadTableColumnOptions}
            updateQuery={updateQuery}
            sysparamTypeOptions={sysparamTypeOptions}
            sysparamTypeValue={q.sysparam_option2}
            loadChoices={loadColumnChoices}
            choiceValue={q.sysparam_option3}
            sysparamCount={q.sysparam_count}
            updateSysparam={updateSysparam}
            seperatorValue={q.sysparam_option4}
          />
          <SelectSortBy
            loadOptions={loadTableColumnOptions}
            value={q.sortBy}
            updateQuery={updateQuery}
          />
          <InputLimit
            defaultValue={q.rowLimit}
            updateQuery={updateQuery}
          />
        </>
      ),
    },
    Row_Count: {
      title: 'Row Count',
      description: 'Get row count from query',
      content: (
        <>
          <SelectTableName
            updateQuery={updateQuery}
            loadTableOptions={loadTableOptions}
            value={q.tableName}
          />
          <InputSysparam
            updateQuery={updateQuery}
            defaultValue={q.sysparam_query}
          />
        </>
      ),
    },
    Aggregate: {
      title: 'Aggregate',
      description: 'Group by and apply aggregate functions to table data',
      content: (
        <>
          <SelectTableName
            updateQuery={updateQuery}
            loadTableOptions={loadTableOptions}
            value={q.tableName}
          />
          <InputGroupBy
            updateQuery={updateQuery}
            defaultValue={q.groupBy}
          />
          <SelectAggregate
            options={aggregationTypeOptions}
            value={q.selectedAggregateType}
            updateQuery={updateQuery}
            defaultColumnValue={q.aggregateColumn}
          />
          <InputSysparam
            updateQuery={updateQuery}
            defaultValue={q.sysparam_query}
          />
        </>
      ),
    },
    Geohash_Map: {
      title: 'GeoHash Map',
      description: 'Get map data from AWS or Azure',
      content: (
        <>
          <SelectTableName
            updateQuery={updateQuery}
            loadTableOptions={loadTableOptions}
            value={q.tableName}
          />
          <InputGroupBy
            updateQuery={updateQuery}
            defaultValue={q.groupBy}
          />
          <InputSysparam
            updateQuery={updateQuery}
            defaultValue={q.sysparam_query}
          />
        </>
      )
    }
  };

  return (
    <>
      <InlineFieldRow style={{ paddingTop: '8px' }}>
        <InlineField label="Query Category" labelWidth={20}>
          <Select
            options={getQueryCategories()}
            value={q.selectedQueryCategory}
            onChange={(e) => {
              console.log(e);
              updateQuery('selectedQueryCategory', e);
            }}
            width={20}
            menuPlacement="bottom"
          />
        </InlineField>
      </InlineFieldRow>
      {options[q.selectedQueryCategory.value ?? ''].content}
    </>
  )
};