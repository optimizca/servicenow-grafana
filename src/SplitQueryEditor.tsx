import { defaults, cloneDeep } from 'lodash';
import { InlineFieldRow, InlineField, RadioButtonGroup, InlineFormLabel, Select, AsyncSelect, TabsBar, Tab, TabContent, Input } from '@grafana/ui';
import React, { useState, useEffect } from 'react';
import { PluginQuery, defaultQuery } from './types'
import { DataSource } from './DataSource';
import { SelectableValue } from '@grafana/data';

interface Props {
  onChange: (query: PluginQuery) => void;
  onRunQuery: () => void;
  query: PluginQuery;
  datasource: DataSource;
}

export const SplitQueryEditor = ({ query, onChange, onRunQuery, datasource }: Props) => {
  const q = defaults(query, defaultQuery);

  const [optionIndex, setOptionIndex] = useState(0);
  const [serviceOptions, setServiceOptions]: any = useState([]);
  const [ciOptions, setCiOptions]: any = useState([]);

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

  let metricsTable: any;
  //let serviceOptions: { label: string, value: string, text?: string }[] = [];
  //let ciOptions: { label: string, value: string, text?: string }[] = [];

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
      setServiceOptions(newServiceOptions);

      var serviceFilter = newServiceOptions[0].value;
      if (typeof q.selectedServiceList !== 'undefined') {
        if (q.selectedServiceList) {
          serviceFilter = q.selectedServiceList.value;
        }
      }
      let cis: any[] = await datasource.snowConnection.getCIs('', serviceFilter);
      // var newCiOptions = cloneDeep(ciOptions);
      var newCiOptions: any[] = [];
      cis.map(ci => {
        if (!newCiOptions.some(e => e.value === ci.value)) {
          newCiOptions.push({ label: ci.text, value: ci.value });
        }
      });
      setCiOptions(newCiOptions);
    };
    loadOptions();
  }, [q]);

  const updateQuery = (key: string, value: any) => {
    onChange({...q, [key]: value});
    onRunQuery();
  };

  const getMetricTable = async () => {
    let table: any;
    if (typeof metricsTable === 'undefined') {
      table = await datasource.snowConnection.getMetricsDefinition('', 0, 0, '');
      return table;
    }
    return metricsTable;
  };

  const splitOptions = [
    {
      title: 'Metrics',
      content: (
        <>
          <InlineFieldRow>
            <InlineField label="Service" labelWidth={20}>
              <Select
                width={20}
                options={serviceOptions}
                value={q.selectedServiceList}
                isSearchable={true}
                isClearable={true}
                onChange={(v) => updateQuery('selectedServiceList', v)}
              />
            </InlineField>
          </InlineFieldRow>
          <InlineFieldRow>
            <InlineField label="CI" labelWidth={20}>
              <Select
                width={20}
                options={ciOptions}
                value={q.selectedSourceList}
                isSearchable={true}
                isClearable={true}
                isMulti={true}
                onChange={(v) => updateQuery('selectedSourceList', v)}
              />
            </InlineField>
          </InlineFieldRow>
          <InlineFieldRow>
            <InlineField label="Resource ID" labelWidth={20}>
              <Select
                width={20}
                options={ciOptions}
                value={q.selectedSourceList}
                isSearchable={true}
                isClearable={true}
                isMulti={true}
                onChange={(v) => updateQuery('selectedSourceList', v)}
              />
            </InlineField>
          </InlineFieldRow>
          <InlineFieldRow>
            <InlineField label="Metric Name" labelWidth={20}>
              <Select
                width={20}
                options={ciOptions}
                value={q.selectedSourceList}
                isSearchable={true}
                isClearable={true}
                isMulti={true}
                onChange={(v) => updateQuery('selectedSourceList', v)}
              />
            </InlineField>
          </InlineFieldRow>
          <InlineFieldRow>
            <InlineField label="Anomaly" labelWidth={20}>
              <Select
                width={20}
                options={metricAnomalyOptions}
                value={q.selectedSourceList}
                isClearable={true}
                onChange={(v) => updateQuery('selectedSourceList', v)}
              />
            </InlineField>
          </InlineFieldRow>
          <InlineFieldRow>
            <InlineField label="Sysparam Query" labelWidth={20}>
              <Input name="sysparam_query" css={null} width={20}/>
            </InlineField>
          </InlineFieldRow>
        </>
      ),
    },
    {
      title: 'Alerts',
      content: (
        <p>Testing alerts</p>
      ),
    },
    {
      title: 'Changes',
    },
    {
      title: 'Topology',
    },
    {
      title: 'CI Summary',
    },
    {
      title: 'Agents',
    },
    {
      title: 'Admin',
    },
  ];

  return (
    <>
      <TabsBar>
        {splitOptions.map((option, i) => {
          return (
            <Tab
              key={i}
              label={option.title}
              active={i==optionIndex}
              onChangeTab={(e: any) => {
                setOptionIndex(i ?? 0);
                console.log(e.target.text ?? '');
                updateQuery('selectedQueryCategory', e.target.text ?? '');
              }}
              css={null}
            />
          )
        })}
      </TabsBar>
      <TabContent>
        {splitOptions[optionIndex].content}
      </TabContent>
      {/* <InlineFieldRow>
        <InlineField>
          <RadioButtonGroup
            onChange={(e) => setOptionIndex(e ?? 0)}
            value={optionIndex}
            options={splitOptions.map((option, i) => ({ label: option.title, value: i }))}
          />
        </InlineField>
      </InlineFieldRow>
      {splitOptions[optionIndex].content} */}
    </>
  )
};