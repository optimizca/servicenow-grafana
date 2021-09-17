import { InlineFieldRow, InlineField, Select, Input, AsyncSelect, ToolbarButton, RadioButtonGroup, AsyncMultiSelect, Icon } from '@grafana/ui';
import React from 'react';

export const SelectService = ({loadOptions, value, updateQuery}) => {
  return (
    <>
      <InlineFieldRow>
        <InlineField label="Service" labelWidth={20}>
          <AsyncSelect
            width={20}
            loadOptions={loadOptions}
            defaultOptions={true}
            value={value}
            defaultValue={value}
            isSearchable={true}
            isClearable={true}
            backspaceRemovesValue={true}
            allowCustomValue={true}
            onCreateOption={(v) => updateQuery('selectedServiceList', { label: v, value: v })}
            onChange={(v) => updateQuery('selectedServiceList', v)}
            menuPlacement="bottom"
          />
        </InlineField>
      </InlineFieldRow>
    </>
  )
}

export const SelectCI = ({loadOptions, value, updateQuery}) => {
  return (
    <>
      <InlineFieldRow>
        <InlineField label="CI" labelWidth={20}>
          <AsyncSelect
            width={20}
            loadOptions={loadOptions}
            value={value}
            defaultValue={value}
            isMulti={true}
            isSearchable={true}
            isClearable={true}
            backspaceRemovesValue={true}
            allowCustomValue={true}
            onCreateOption={(v) => {
              var newQuery: any[] = [];
              if (typeof value !== 'undefined') {
                newQuery = [...value];
                newQuery[newQuery.length] = { label: v, value: v };
              } else {
                newQuery = [{ label: v, value: v }];
              }
              updateQuery('selectedSourceList', newQuery);
            }}
            onChange={(v) => updateQuery('selectedSourceList', v)}
            menuPlacement="bottom"
          />
        </InlineField>
      </InlineFieldRow>
    </>
  )
}

export const SelectResource = ({loadOptions, value, updateQuery}) => {
  return (
    <>
      <InlineFieldRow>
        <InlineField label="Resource ID" labelWidth={20}>
          <AsyncSelect
            width={20}
            loadOptions={loadOptions}
            value={value}
            defaultValue={value}
            isSearchable={true}
            isClearable={true}
            isMulti={true}
            backspaceRemovesValue={true}
            allowCustomValue={true}
            onCreateOption={(v) => {
              var newQuery: any[] = [];
              if (typeof value !== 'undefined') {
                newQuery = [...value];
                newQuery[newQuery.length] = { label: v, value: v };
              } else {
                newQuery = [{ label: v, value: v }];
              }
              updateQuery('selectedMetricTypeList', newQuery);
            }}
            onChange={(v) => updateQuery('selectedMetricTypeList', v)}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  )
}

export const SelectMetric = ({loadOptions, value, updateQuery}) => {
  return (
    <>
      <InlineFieldRow>
        <InlineField label="Metric Name" labelWidth={20}>
          <AsyncSelect
            width={20}
            loadOptions={loadOptions}
            value={value}
            defaultValue={value}
            isSearchable={true}
            isClearable={true}
            isMulti={true}
            backspaceRemovesValue={true}
            allowCustomValue={true}
            onCreateOption={(v) => {
              var newQuery: any[] = [];
              if (typeof value !== 'undefined') {
                newQuery = [...value];
                newQuery[newQuery.length] = { label: v, value: v };
              } else {
                newQuery = [{ label: v, value: v }];
              }
              updateQuery('selectedMetricNameList', newQuery);
            }}
            onChange={(v) => updateQuery('selectedMetricNameList', v)}
            className="coloredSelect"
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

export const SelectStartingPoint = ({loadOptions, value, updateQuery, dependsOptions, dependsValue}) => {
  return (
    <>
      <InlineFieldRow>
        <InlineField label="Starting Point" labelWidth={20}>
          <AsyncSelect
            width={20}
            loadOptions={loadOptions}
            defaultOptions={true}
            value={value}
            defaultValue={value}
            isSearchable={true}
            isClearable={true}
            backspaceRemovesValue={true}
            allowCustomValue={true}
            onCreateOption={(v) => updateQuery('selectedServiceList', { label: v, value: v })}
            onChange={(v) => updateQuery('selectedServiceList', v)}
            menuPlacement="bottom"
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


export const SelectAgentFilter = ({typeOptions, typeValue, updateQuery, loadOptions, value}) => {
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
          <AsyncSelect
            width={20}
            loadOptions={loadOptions}
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

export const SelectTableName = ({loadTableOptions, value, updateQuery}) => {
  return (
    <>
      <InlineFieldRow>
        <InlineField label="Table Name" labelWidth={20}>
          <AsyncSelect
            prefix={<Icon name="table"/>}
            loadOptions={loadTableOptions}
            className="min-width-10 max-width-30"
            value={value}
            defaultValue={value}
            defaultOptions={true}
            isSearchable={true}
            isClearable={true}
            backspaceRemovesValue={true}
            allowCustomValue={true}
            onChange={(v) => updateQuery('tableName', v)}
            onCreateOption={(v) => updateQuery('tableName', { label: v, value: v })}
            menuPlacement="bottom"
            maxMenuHeight={200}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  )
}

export const SelectTableColumn = ({loadOptions, value, updateQuery}) => {
  return (
    <>
      <InlineFieldRow>
        <InlineField label="Table Columns" labelWidth={20} tooltip="Leave columns blank to return all columns in the dictionary">
          <AsyncMultiSelect
            prefix={<Icon name="columns"/>}
            className="min-width-10 max-width-30"
            loadOptions={(v) => loadOptions(false, v)}
            value={value}
            defaultValue={value}
            isSearchable={true}
            isClearable={true}
            backspaceRemovesValue={true}
            allowCustomValue={true}
            onChange={(v) => updateQuery('selectedtableColumns', v)}
            onCreateOption={(v) => {
              var newQuery: any[] = [];
              if (typeof value !== 'undefined') {
                newQuery = [...value];
                newQuery[newQuery.length] = { label: v, value: v };
              } else {
                newQuery = [{ label: v, value: v }];
              }
              updateQuery('selectedtableColumns', newQuery);
            }}
            menuPlacement="bottom"
            maxMenuHeight={200}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  )
}

export const InputGroupBy = ({updateQuery, defaultValue}) => {
  return (
    <>
      <InlineFieldRow>
        <InlineField label="Group By" labelWidth={20}>
          <Input
            name="group_by"
            css={null}
            width={20}
            defaultValue={defaultValue}
            onBlur={(e) => updateQuery('groupBy', e.target.value)}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  )
}

export const SelectAggregate = ({options, value, updateQuery, defaultColumnValue}) => {
  return (
    <>
      <InlineFieldRow>
        <InlineField label="Aggregate Function" labelWidth={20} tooltip="Choose your aggregation function then the column to run this function on">
          <Select
            width={20}
            options={options}
            value={value}
            defaultValue={value}
            isSearchable={true}
            isClearable={true}
            backspaceRemovesValue={true}
            allowCustomValue={true}
            onCreateOption={(v) => updateQuery('selectedAggregateType', { label: v, value: v })}
            onChange={(v) => updateQuery('selectedAggregateType', v)}
          />
        </InlineField>
        <InlineField>
          <Input
            name="aggregate_column"
            css={null}
            width={20}
            defaultValue={defaultColumnValue}
            onBlur={(e) => updateQuery('aggregateColumn', e.target.value)}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  )
}

export const SelectSysparam = ({value, loadColumns, updateQuery, sysparamTypeOptions, sysparamTypeValue, loadChoices, choiceValue, sysparamCount, updateSysparam, seperatorValue}) => {
  const deleteRow = (index) => {
    updateQuery('sysparam_count', sysparamCount - 1);
    // console.log('delete: ' + index);
    // updateSysparam('sysparam_option1', index, undefined!);
    // updateSysparam('sysparam_option2', index, undefined);
    // updateSysparam('sysparam_option3', index, undefined);
    // updateSysparam('sysparam_option4', index, undefined);
  };

  const radioOptions = [
    { label: 'AND', value: '^' },
    { label: 'OR', value: '^OR' },
  ];
  const fields: JSX.Element[] = [];
  for (let i = 0; i <= sysparamCount; i++) {
    fields.push(
      <>
        <InlineFieldRow>
          {i !== 0 && <InlineField>
            <RadioButtonGroup
              options={radioOptions}
              value={typeof seperatorValue !== 'undefined'&& typeof seperatorValue[i] !== 'undefined'?seperatorValue[i].value:'^'}
              // This line will take the value selected, match it to the correct option, then return the correct option to the updateSysparam function
              onChange={(v) => { radioOptions.map(o => { if (o.value === v) updateSysparam('sysparam_option4', i, o) }) }}
            />
          </InlineField>}
          <InlineField label={i === 0?"Filter":undefined} labelWidth={i === 0?20:undefined}>
            <AsyncSelect
              className="min-width-10"
              loadOptions={(s) => loadColumns(false, s)}
              value={typeof value !== 'undefined'?value[i]:null}
              defaultValue={typeof value !== 'undefined'?value[i]:null}
              isSearchable={true}
              isClearable={true}
              backspaceRemovesValue={true}
              allowCustomValue={true}
              onChange={(v) => updateSysparam('sysparam_option1', i, v)}
              onCreateOption={(v) => updateSysparam('sysparam_option1', i, { label: v, value: v })}
            />
          </InlineField>
          <InlineField>
            <Select
              width={20}
              options={sysparamTypeOptions}
              value={typeof sysparamTypeValue !== 'undefined'?sysparamTypeValue[i]:null}
              defaultValue={typeof sysparamTypeValue !== 'undefined'?sysparamTypeValue[i]:null}
              isClearable={true}
              backspaceRemovesValue={true}
              allowCustomValue={true}
              onChange={(v) => updateSysparam('sysparam_option2', i, v)}
              onCreateOption={(v) => updateSysparam('sysparam_option2', i, { label: v, value: v })}
              maxMenuHeight={200}
            />
          </InlineField>
          <InlineField>
            <AsyncSelect
              className="min-width-10"
              loadOptions={(s) => loadChoices(i, s)}
              value={typeof choiceValue !== 'undefined'?choiceValue[i]:null}
              defaultValue={typeof choiceValue !== 'undefined'?choiceValue[i]:null}
              isSearchable={true}
              isClearable={true}
              backspaceRemovesValue={true}
              allowCustomValue={true}
              onChange={(v) => updateSysparam('sysparam_option3', i, v)}
              onCreateOption={(v) => updateSysparam('sysparam_option3', i, { label: v, value: v })}
            />
          </InlineField>
          {i > 0 && <InlineField>
            <ToolbarButton
              icon="trash-alt"
              variant="destructive"
              iconOnly={true}
              onClick={() => deleteRow(i)}
            />
          </InlineField>}
        </InlineFieldRow>
        <InlineFieldRow>
          <InlineField>
            <ToolbarButton
              icon="plus"
              variant="primary"
              onClick={() => updateQuery('sysparam_count', sysparamCount + 1)}
            />
          </InlineField>
        </InlineFieldRow>
      </>
    )
  }

  return (
    <>
      {fields}
    </>
  )
}

export const SelectSortBy = ({loadOptions, value, updateQuery}) => {
  return (
    <>
      <InlineFieldRow>
        <InlineField label="Sort By" labelWidth={20}>
          <AsyncSelect
            className="min-width-10"
            loadOptions={(s) => loadOptions(false, s)}
            value={value}
            defaultValue={value}
            isSearchable={true}
            isClearable={true}
            backspaceRemovesValue={true}
            allowCustomValue={true}
            onChange={(v) => updateQuery('sortBy', v)}
            onCreateOption={(v) => updateQuery('sortBy', { label: v, value: v })}
            maxMenuHeight={200}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  )
}

export const InputLimit = ({updateQuery, defaultValue}) => {
  return (
    <>
      <InlineFieldRow>
        <InlineField label="Limit" labelWidth={20}>
          <Input
            name="limit"
            css={null}
            type="number"
            max={9999}
            min={1}
            width={20}
            defaultValue={defaultValue}
            onBlur={(e) => updateQuery('rowLimit', e.target.value)}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  )
}

export const InputElasticSearch = ({updateQuery, defaultValue}) => {
  return (
    <>
      <InlineFieldRow>
        <InlineField label="Elastic Search Query" labelWidth={20}>
          <Input
            name="elasticSearch"
            css={null}
            width={20}
            defaultValue={defaultValue}
            onBlur={(e) => updateQuery('elasticSearch', e.target.value)}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  )
}

export const SelectTrend = ({columnLoadOptions, columnValue, updateQuery, trendByValue, trendByOptions, periodValue}) => {
  return (
    <>
      <InlineFieldRow>
        <InlineField label="Trend" labelWidth={20}>
          <AsyncSelect
            className="min-width-10 max-width-30"
            loadOptions={(v) => columnLoadOptions(false, v)}
            value={columnValue}
            defaultValue={columnValue}
            isSearchable={true}
            isClearable={true}
            backspaceRemovesValue={true}
            allowCustomValue={true}
            onChange={(v) => updateQuery('selectedTrendColumn', v)}
            onCreateOption={(v) => updateQuery('selectedTrendColumn', { label: v, value: v })}
            maxMenuHeight={200}
          />
        </InlineField>
        <InlineField>
          <Select
            className="min-width-10 max-width-30"
            options={trendByOptions}
            value={trendByValue}
            defaultValue={trendByValue}
            isSearchable={true}
            isClearable={true}
            backspaceRemovesValue={true}
            allowCustomValue={true}
            onChange={(v) => updateQuery('selectedTrendBy', v)}
            onCreateOption={(v) => updateQuery('selectedTrendBy', { label: v, value: v })}
          />
        </InlineField>
        <InlineField>
          <Input
            name="period"
            css={null}
            type="number"
            max={300}
            min={1}
            width={20}
            defaultValue={periodValue}
            onBlur={(e) => updateQuery('trendPeriod', e.target.value)}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  )
}

export const ShowPercentSwitch = ({value, updateQuery}) => {
  const switchOptions = [
    {
      label: "False",
      value: false
    },
    {
      label: "True",
      value: true
    }
  ];
  return (
    <>
      <InlineFieldRow>
        <InlineField label="Show Uptime %" labelWidth={20}>
          <RadioButtonGroup
            options={switchOptions}
            value={value || false}
            onChange={(v) => updateQuery("showPercent", v)}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  )
}