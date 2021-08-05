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
            defaultValue={value}
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
            defaultValue={value}
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
            defaultValue={value}
            isSearchable={true}
            isClearable={true}
            isMulti={true}
            backspaceRemovesValue={true}
            allowCustomValue={true}
            onCreateOption={(v) => updateQuery('selectedMetricTypeList', { label: v, value: v })}
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
            defaultValue={value}
            isSearchable={true}
            isClearable={true}
            isMulti={true}
            backspaceRemovesValue={true}
            allowCustomValue={true}
            onCreateOption={(v) => updateQuery('selectedMetricNameList', { label: v, value: v })}
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
            defaultValue={value}
            isClearable={true}
            onChange={(v) => updateQuery('selectedMetricAnomalyList', v)}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  )
}

export const InputSysparam = ({updateQuery, defaultValue}) => {
  return (
    <>
      <InlineFieldRow>
        <InlineField label="Sysparam Query" labelWidth={20}>
          <Input
            name="sysparam_query"
            css={null}
            width={20}
            defaultValue={defaultValue}
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
            defaultValue={value}
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
            defaultValue={value}
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
            defaultValue={value}
            isSearchable={true}
            isClearable={true}
            onChange={(v) => updateQuery('selectedChangeTypeList', v)}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  )
}

export const SelectStartingPoint = ({options, value, updateQuery, dependsOptions, dependsValue}) => {
  return (
    <>
      <InlineFieldRow>
        <InlineField label="Starting Point" labelWidth={20}>
          <Select
            width={20}
            options={options}
            value={value}
            defaultValue={value}
            isSearchable={true}
            isClearable={true}
            backspaceRemovesValue={true}
            allowCustomValue={true}
            onCreateOption={(v) => updateQuery('selectedServiceList', { label: v, value: v })}
            onChange={(v) => updateQuery('selectedServiceList', v)}
          />
        </InlineField>
        <InlineField label="Depends On Filter" labelWidth={20}>
          <Select
            width={20}
            options={dependsOptions}
            value={dependsValue}
            defaultValue={dependsValue}
            isClearable={true}
            backspaceRemovesValue={true}
            allowCustomValue={true}
            onCreateOption={(v) => updateQuery('selectedTopologyDependsOnFilter', { label: v, value: v })}
            onChange={(v) => updateQuery('selectedTopologyDependsOnFilter', v)}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  )
}

export const InputParentDepth = ({updateQuery, defaultValue}) => {
  return (
    <>
      <InlineFieldRow>
        <InlineField label="Parent Depth" labelWidth={20}>
          <Input
            name="parent_depth"
            css={null}
            width={20}
            defaultValue={defaultValue}
            onBlur={(e) => updateQuery('topology_parent_depth', e.target.value)}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  )
}

export const InputChildDepth = ({updateQuery, defaultValue}) => {
  return (
    <>
      <InlineFieldRow>
        <InlineField label="Child Depth" labelWidth={20}>
          <Input
            name="child_depth"
            css={null}
            width={20}
            defaultValue={defaultValue}
            onBlur={(e) => updateQuery('topology_child_depth', e.target.value)}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  )
}

export const InputNamespace = ({updateQuery, defaultValue}) => {
  return (
    <>
      <InlineFieldRow>
        <InlineField label="Included Namespaces" labelWidth={20}>
          <Input
            name="namespaces"
            css={null}
            width={20}
            defaultValue={defaultValue}
            onBlur={(e) => updateQuery('topology_namespaces', e.target.value)}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  )
}

export const InputExcludedClasses = ({updateQuery, defaultValue}) => {
  return (
    <>
      <InlineFieldRow>
        <InlineField label="Excluded Classes" labelWidth={20}>
          <Input
            name="excluded_classes"
            css={null}
            width={20}
            defaultValue={defaultValue}
            onBlur={(e) => updateQuery('topology_filter', e.target.value)}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  )
}

export const SelectAdminCategory = ({options, value, updateQuery}) => {
  return (
    <>
      <InlineFieldRow>
        <InlineField label="Category Option" labelWidth={20}>
          <Select
            width={20}
            options={options}
            value={value}
            defaultValue={value}
            allowCustomValue={true}
            onCreateOption={(v) => updateQuery('selectedAdminCategoryList', { label: v, value: v })}
            onChange={(v) => updateQuery('selectedAdminCategoryList', v)}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  )
}

export const InputMetric = ({options, value, updateQuery}) => {
  return (
    <>
      <InlineFieldRow>
        <InlineField label="Generalized Agent Metric" labelWidth={20}>
          <Select
            width={20}
            options={options}
            value={value}
            defaultValue={value}
            isSearchable={true}
            isClearable={true}
            isMulti={true}
            backspaceRemovesValue={true}
            allowCustomValue={true}
            onCreateOption={(v) => updateQuery('selectedMetricNameList', { label: v, value: v })}
            onChange={(v) => updateQuery('selectedMetricNameList', v)}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  )
}


export const SelectAgentFilter = ({typeOptions, typeValue, updateQuery, options, value}) => {
  return (
    <>
      <InlineFieldRow>
        <InlineField label="Agent Filter" labelWidth={20}>
          <Select
            width={20}
            options={typeOptions}
            value={typeValue}
            defaultValue={typeValue}
            allowCustomValue={true}
            onCreateOption={(v) => updateQuery('selectedAgentFilterType', { label: v, value: v })}
            onChange={(v) => updateQuery('selectedAgentFilterType', v)}
          />
        </InlineField>
        <InlineField>
          <Select
            width={20}
            options={options}
            value={value}
            defaultValue={value}
            isSearchable={true}
            isClearable={true}
            backspaceRemovesValue={true}
            allowCustomValue={true}
            onCreateOption={(v) => updateQuery('selectedAgentFilter', { label: v, value: v })}
            onChange={(v) => updateQuery('selectedAgentFilter', v)}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  )
}

export const InputOsquery = ({updateQuery, defaultValue}) => {
  return (
    <>
      <InlineFieldRow>
        <InlineField label="Osquery" labelWidth={20}>
          <Input
            name="osquery"
            css={null}
            width={20}
            defaultValue={defaultValue}
            onBlur={(e) => updateQuery('live_osquery', e.target.value)}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  )
}

export const InputTableName = ({updateQuery, defaultValue}) => {
  return (
    <>
      <InlineFieldRow>
        <InlineField label="Table Name" labelWidth={20}>
          <Input
            name="table_name"
            css={null}
            width={20}
            defaultValue={defaultValue}
            onBlur={(e) => updateQuery('tableName', e.target.value)}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  )
}

export const InputColumnName = ({updateQuery, defaultValue}) => {
  return (
    <>
      <InlineFieldRow>
        <InlineField label="Table Columns" labelWidth={20}>
          <Input
            name="table_columns"
            css={null}
            width={20}
            defaultValue={defaultValue}
            onBlur={(e) => updateQuery('tableColumns', e.target.value)}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  )
}