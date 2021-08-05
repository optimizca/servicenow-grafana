import { defaults } from 'lodash';
import { InlineFieldRow, InlineField, Select } from '@grafana/ui';
import React, { useState, useEffect } from 'react';
import { PluginQuery, defaultQuery } from './types'
import { DataSource } from './DataSource';
import { SelectService, SelectCI, SelectResource, SelectMetric, SelectMetricAnomaly, InputSysparam, SelectAlertType,
  SelectAlertState, SelectChangeType, SelectStartingPoint, InputParentDepth, InputChildDepth, InputNamespace, InputExcludedClasses,
  SelectAdminCategory, InputMetric, SelectAgentFilter, InputOsquery, InputTableName, InputColumnName, InputGroupBy, SelectAggregate } from 'Components';

interface Props {
  onChange: (query: PluginQuery) => void;
  query: PluginQuery;
  datasource: DataSource;
}

export const SplitQueryEditor = ({ query, onChange, datasource }: Props) => {
  const q = defaults(query, defaultQuery);

  const [serviceOptions, setServiceOptions]: any = useState([]);
  const [ciOptions, setCiOptions]: any = useState([]);
  const [resourceOptions, setResourceOptions]: any = useState([]);
  const [metricOptions, setMetricOptions]: any = useState([]);

  const metricAnomalyOptions = [
    {
      label: 'true',
      value: 'true',
    },
    {
      label: 'false',
      value: 'false',
    },
  ];
  const alertTypeOptions = [
    {
      label: 'CI',
      value: 'CI',
      description: 'Get Alerts at the CI level',
    },
    {
      label: 'Service',
      value: 'Service',
      description: 'Get Alerts at the Service level',
    },
    {
      label: 'OS',
      value: 'OS',
      description: 'Get Alerts for all Agents in the class',
    },
    {
      label: 'None',
      value: 'None',
      description: 'Ignore CI selection and use sysparam_query',
    },
  ];
  const alertStateOptions = [
    {
      label: 'Active',
      value: 'Active',
      description: 'Get Open and Reopen Alerts',
    },
    {
      label: 'All',
      value: 'All',
      description: 'Get All alerts Open,Reopen, and Closed',
    },
  ];
  const changeTypeOptions = [
    {
      label: 'CI',
      value: 'CI',
      description: 'Get Changes at the CI level',
    },
    {
      label: 'Service',
      value: 'Service',
      description: 'Get Changes at the Service level',
    },
  ];
  const adminOptions = [
    {
      label: 'Metrics Definition',
      value: 'Metrics Definition',
    },
  ];
  const agentFilterTypeOptions = [
    {
      label: 'OS',
      value: 'OS',
      description: 'Get all agents matching the OS',
    },
    {
      label: 'CI',
      value: 'CI',
      description: 'Get all agents matching the CI',
    },
  ];
  const agentMetricOptions = [
    {
      label: 'cpu',
      value: 'cpu',
    },
    {
      label: 'memory',
      value: 'memory',
    },
    {
      label: 'disk',
      value: 'disk',
    },
  ];
  const aggregationTypeOptions = datasource.snowConnection.getAggregateTypeOptions();

  let metricsTable: any;
  //let serviceOptions: { label: string, value: string, text?: string }[] = [];
  //let ciOptions: { label: string, value: string, text?: string }[] = [];

  function compareLabel( a, b ) {
    if ( a.label.toLowerCase() < b.label.toLowerCase() ){
      return -1;
    }
    if ( a.label.toLowerCase() > b.label.toLowerCase() ){
      return 1;
    }
    return 0;
  }

  useEffect(() => {
    const loadOptions = async () => {
      let services: any[] = await datasource.snowConnection.getServices('');
      //var newServiceOptions = cloneDeep(serviceOptions);
      var newServiceOptions: any[] = [];
      services.map(service => {
        if (!newServiceOptions.some(e => e.value === service.value)) {
          newServiceOptions.push({ label: service.text, value: service.value });
        }
      });
      newServiceOptions.sort(compareLabel);
      setServiceOptions(newServiceOptions);

      var newCiOptions: any[] = [];
      var serviceFilter = newServiceOptions[0].value ?? '';
      if (typeof q.selectedServiceList !== 'undefined') {
        if (q.selectedServiceList) {
          serviceFilter = q.selectedServiceList.value;
        }
      }

      var metricTable = await getMetricTable();
      let cis: any[] = await datasource.snowConnection.getCIs('', serviceFilter);
      // var newCiOptions = cloneDeep(ciOptions);
      if (cis.length > 0) {
        cis.map(ci => {
          if (!newCiOptions.some(e => e.value === ci.value)) {
            newCiOptions.push({ label: ci.text, value: ci.value });
          }
        });
      }

      newCiOptions.sort(compareLabel);
      setCiOptions(newCiOptions);

      //I think more can be done to clean up the section where I check if the value is already in the list

      var sourceSelection: any[] = [];
      var newResourceOptions: any[] = [{ label: '*', value: '*' }];
      var alreadyAddedResources: any[] = [];
      var newMetricOptions: any[] = [{ label: '*', value: '*' }];
      var alreadyAddedMetrics: any[] = [];
      if (typeof q.selectedSourceList !== 'undefined' && q.selectedSourceList.length > 0){
        q.selectedSourceList.map(chosenSource => {
          sourceSelection.push(chosenSource.label);
        });
        console.log('metrics table: ', metricTable);
        for (var i = 0; i < metricTable.fields[0].values.buffer.length; i++) {
          if (sourceSelection.includes(metricTable.fields[3].values.buffer[i])) {
            if (!alreadyAddedResources.includes(metricTable.fields[4].values.buffer[i]) && metricTable.fields[4].values.buffer[i] !== '') {
              alreadyAddedResources.push(metricTable.fields[4].values.buffer[i]);
              newResourceOptions.push({ label: metricTable.fields[4].values.buffer[i], value: metricTable.fields[4].values.buffer[i] })
            }
            if (!alreadyAddedMetrics.includes(metricTable.fields[2].values.buffer[i]) && metricTable.fields[2].values.buffer[i] !== '') {
              alreadyAddedMetrics.push(metricTable.fields[2].values.buffer[i]);
              newMetricOptions.push({ label: metricTable.fields[2].values.buffer[i], value: metricTable.fields[2].values.buffer[i]})
            }
          }
        }
      }
      newResourceOptions.sort(compareLabel);
      setResourceOptions(newResourceOptions);
      newMetricOptions.sort(compareLabel);
      setMetricOptions(newMetricOptions);
    };
    loadOptions();
  }, [q]);

  const updateQuery = (key: string, value: any) => {
    onChange({...q, [key]: value});
  };

  const getMetricTable = async () => {
    let table: any;
    if (typeof metricsTable === 'undefined') {
      table = await datasource.snowConnection.getMetricsDefinition('', 0, 0, '');
      return table;
    }
    return metricsTable;
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
            options={serviceOptions}
            value={q.selectedServiceList}
            updateQuery={updateQuery}
          />
          <SelectCI
            options={ciOptions}
            value={q.selectedSourceList}
            updateQuery={updateQuery}
          />
          <SelectResource
            options={resourceOptions}
            value={q.selectedMetricTypeList}
            updateQuery={updateQuery}
          />
          <SelectMetric
            options={metricOptions}
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
            options={serviceOptions}
            value={q.selectedServiceList}
            updateQuery={updateQuery}
          />
          <SelectCI
            options={ciOptions}
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
            options={serviceOptions}
            value={q.selectedServiceList}
            updateQuery={updateQuery}
          />
          <SelectCI
            options={ciOptions}
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
            options={serviceOptions}
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
            options={serviceOptions}
            value={q.selectedServiceList}
            updateQuery={updateQuery}
          />
          <SelectCI
            options={ciOptions}
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
            options={ciOptions}
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
          <InputTableName
            updateQuery={updateQuery}
            defaultValue={q.tableName}
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
          <InputTableName
            updateQuery={updateQuery}
            defaultValue={q.tableName}
          />
          <InputColumnName
            updateQuery={updateQuery}
            defaultValue={q.tableColumns}
          />
          <InputSysparam
            updateQuery={updateQuery}
            defaultValue={q.sysparam_query}
          />
        </>
      ),
    },
    Row_Count: {
      title: 'Row Count',
      description: 'Get row count from query',
      content: (
        <>
          <InputTableName
            updateQuery={updateQuery}
            defaultValue={q.tableName}
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
      description: '',
      content: (
        <>
          <InputTableName
            updateQuery={updateQuery}
            defaultValue={q.tableName}
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
  };

  return (
    <>
      <InlineFieldRow>
        <InlineField label="Query Category" labelWidth={20}>
          <Select
            options={getQueryCategories()}
            value={q.selectedQueryCategory}
            onChange={(e) => {
              console.log(e);
              updateQuery('selectedQueryCategory', e);
            }}
            width={20}
          />
        </InlineField>
      </InlineFieldRow>
      {options[q.selectedQueryCategory.value ?? ''].content}
    </>
  )
};