import { InlineFieldRow, InlineField, Select, Input } from '@grafana/ui';
import React from 'react';

export const SelectService = ({options, value, updateQuery}) => {
  return (
    <>
      <InlineFieldRow>
        <InlineField label="Service" labelWidth={20}>
          <Select
            width={20}
            options={options}
            value={value}
            isSearchable={true}
            isClearable={true}
            backspaceRemovesValue={true}
            allowCustomValue={true}
            onCreateOption={(v) => updateQuery('selectedServiceList', { label: v, value: v })}
            onChange={(v) => updateQuery('selectedServiceList', v)}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  )
}

export const SelectCI = ({options, value, updateQuery}) => {
  return (
    <>
      <InlineFieldRow>
        <InlineField label="CI" labelWidth={20}>
          <Select
            width={20}
            options={options}
            value={value}
            isMulti={true}
            isSearchable={true}
            isClearable={true}
            backspaceRemovesValue={true}
            allowCustomValue={true}
            onCreateOption={(v) => updateQuery('selectedSourceList', { label: v, value: v })}
            onChange={(v) => updateQuery('selectedSourceList', v)}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  )
}

export const SelectResource = ({options, value, updateQuery}) => {
  return (
    <>
      <InlineFieldRow>
        <InlineField label="Resource ID" labelWidth={20}>
          <Select
            width={20}
            options={options}
            value={value}
            isSearchable={true}
            isClearable={true}
            isMulti={true}
            onChange={(v) => updateQuery('selectedMetricTypeList', v)}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  )
}

export const SelectMetric = ({options, value, updateQuery}) => {
  return (
    <>
      <InlineFieldRow>
        <InlineField label="Metric Name" labelWidth={20}>
          <Select
            width={20}
            options={options}
            value={value}
            isSearchable={true}
            isClearable={true}
            isMulti={true}
            onChange={(v) => updateQuery('selectedMetricNameList', v)}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  )
}

export const SelectMetricAnomaly = ({options, value, updateQuery}) => {
  return (
    <>
      <InlineFieldRow>
        <InlineField label="Anomaly" labelWidth={20}>
          <Select
            width={20}
            options={options}
            value={value}
            isClearable={true}
            onChange={(v) => updateQuery('selectedMetricAnomalyList', v)}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  )
}

export const InputSysparam = ({updateQuery}) => {
  return (
    <>
      <InlineFieldRow>
        <InlineField label="Sysparam Query" labelWidth={20}>
          <Input
            name="sysparam_query"
            css={null}
            width={20}
            onBlur={(e) => updateQuery('sysparam_query', e.target.value)}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  )
}

export const SelectAlertType = ({options, value, updateQuery}) => {
  return (
    <>
      <InlineFieldRow>
        <InlineField label="Alert Type Filter" labelWidth={20}>
          <Select
            width={20}
            options={options}
            value={value}
            isSearchable={true}
            isClearable={true}
            onChange={(v) => updateQuery('selectedAlertTypeList', v)}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  )
}

export const SelectAlertState = ({options, value, updateQuery}) => {
  return (
    <>
      <InlineFieldRow>
        <InlineField label="Alert State Filter" labelWidth={20}>
          <Select
            width={20}
            options={options}
            value={value}
            isSearchable={true}
            isClearable={true}
            onChange={(v) => updateQuery('selectedAlertStateList', v)}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  )
}

export const SelectChangeType = ({options, value, updateQuery}) => {
  return (
    <>
      <InlineFieldRow>
        <InlineField label="Change Type Filter" labelWidth={20}>
          <Select
            width={20}
            options={options}
            value={value}
            isSearchable={true}
            isClearable={true}
            onChange={(v) => updateQuery('selectedChangeTypeList', v)}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  )
}