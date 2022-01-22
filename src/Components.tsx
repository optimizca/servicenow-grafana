import {
  InlineFieldRow,
  InlineField,
  Select,
  Input,
  AsyncSelect,
  ToolbarButton,
  RadioButtonGroup,
  Icon,
  RefreshPicker,
  InlineSwitch,
} from '@grafana/ui';
import { SelectableValue } from '@grafana/data';
import React, { useState, useEffect } from 'react';
import { isEqual } from 'lodash';

export const SelectService = ({ loadOptions, value, updateQuery }) => {
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
            maxMenuHeight={200}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  );
};

export const SelectCI = ({ loadOptions, value, updateQuery }) => {
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
            maxMenuHeight={200}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  );
};

export const SelectResource = ({ loadOptions, value, updateQuery }) => {
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
            maxMenuHeight={200}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  );
};

export const SelectMetric = ({ loadOptions, value, updateQuery }) => {
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
            maxMenuHeight={200}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  );
};

export const SelectMetricAnomaly = ({ options, value, updateQuery }) => {
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
            maxMenuHeight={200}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  );
};

export const InputSysparam = ({ updateQuery, defaultValue }) => {
  return (
    <>
      <InlineFieldRow>
        <InlineField label="Sysparam Query" labelWidth={20}>
          <Input
            name="sysparam_query"
            width={20}
            defaultValue={defaultValue}
            onBlur={(e) => updateQuery('sysparam_query', e.target.value)}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  );
};

export const SelectAlertType = ({ options, value, updateQuery }) => {
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
            maxMenuHeight={200}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  );
};

export const SelectAlertState = ({ options, value, updateQuery }) => {
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
            maxMenuHeight={200}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  );
};

export const SelectChangeType = ({ options, value, updateQuery }) => {
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
            maxMenuHeight={200}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  );
};

export const SelectStartingPoint = ({ loadOptions, value, updateQuery }) => {
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
            maxMenuHeight={200}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  );
};

export const InputParentDepth = ({ updateQuery, defaultValue }) => {
  return (
    <>
      <InlineFieldRow>
        <InlineField label="Parent Depth" labelWidth={20}>
          <Input
            name="parent_depth"
            width={20}
            defaultValue={defaultValue}
            onBlur={(e) => updateQuery('topology_parent_depth', e.target.value)}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  );
};

export const InputChildDepth = ({ updateQuery, defaultValue }) => {
  return (
    <>
      <InlineFieldRow>
        <InlineField label="Child Depth" labelWidth={20}>
          <Input
            name="child_depth"
            width={20}
            defaultValue={defaultValue}
            onBlur={(e) => updateQuery('topology_child_depth', e.target.value)}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  );
};

export const InputNamespace = ({ updateQuery, defaultValue }) => {
  return (
    <>
      <InlineFieldRow>
        <InlineField label="Included Namespaces" labelWidth={20}>
          <Input
            name="namespaces"
            width={20}
            defaultValue={defaultValue}
            onBlur={(e) => updateQuery('topology_namespaces', e.target.value)}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  );
};

export const InputExcludedClasses = ({ updateQuery, defaultValue }) => {
  return (
    <>
      <InlineFieldRow>
        <InlineField label="Excluded Classes" labelWidth={20}>
          <Input
            name="excluded_classes"
            width={20}
            defaultValue={defaultValue}
            onBlur={(e) => updateQuery('topology_filter', e.target.value)}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  );
};

export const InputOsquery = ({ updateQuery, defaultValue }) => {
  return (
    <>
      <InlineFieldRow>
        <InlineField label="Osquery" labelWidth={20}>
          <Input
            name="osquery"
            width={20}
            defaultValue={defaultValue}
            onBlur={(e) => updateQuery('live_osquery', e.target.value)}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  );
};

export const SelectTableName = ({ loadTableOptions, value, updateQuery }) => {
  return (
    <>
      <InlineFieldRow>
        <InlineField label="Table Name" labelWidth={20}>
          <AsyncSelect
            prefix={<Icon name="table" />}
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
  );
};

export const SelectTableColumn = ({ query, updateQuery, datasource }) => {
  const [chosenValue, setChosenValue] = useState(query.selectedtableColumns);
  const [options, setOptions] = useState([{ label: 'Loading ...', value: '' }]);

  useEffect(() => {
    let results = [];
    console.log('SelectTableColumns - UseEffect');
    let unmounted = false;

    async function getTableColumnOptions() {
      results = await datasource.snowConnection.getTableColumnOptions(query.tableName?.value);
      if (!unmounted) {
        if (results.length > 0) {
          console.log('Setting tableColumn options: ', results);
          if (chosenValue) {
            if (chosenValue.length > 0) {
              results = results.concat(chosenValue);
            }
          }

          setOptions(results);
        }
      }
    }
    getTableColumnOptions();
    return () => {
      unmounted = true;
    };
  }, [datasource.snowConnection, query.tableName, chosenValue]);

  return (
    <>
      <InlineFieldRow>
        <InlineField
          label="Table Columns"
          labelWidth={20}
          tooltip="Leave columns blank to return all columns in the dictionary"
        >
          <Select
            prefix={<Icon name="columns" />}
            className="min-width-10 max-width-30"
            options={options}
            value={chosenValue}
            defaultValue={chosenValue}
            isSearchable={true}
            isClearable={true}
            isMulti={true}
            backspaceRemovesValue={true}
            allowCustomValue={true}
            onChange={(v) => {
              updateQuery('selectedtableColumns', v);
              setChosenValue(v);
            }}
            onCreateOption={(v) => {
              var newQuery: any[] = [];
              if (typeof chosenValue !== 'undefined') {
                newQuery = [...chosenValue];
                newQuery[newQuery.length] = { label: v, value: v };
              } else {
                newQuery = [{ label: v, value: v }];
              }
              updateQuery('selectedtableColumns', newQuery);
              setChosenValue(newQuery);
            }}
            menuPlacement="bottom"
            maxMenuHeight={200}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  );
};

export const InputGroupBy = ({ query, updateQuery, datasource }) => {
  const [chosenValue, setChosenValue] = useState(query.groupBy);
  const [options, setOptions] = useState([{ label: 'Loading ...', value: '' }]);

  useEffect(() => {
    let results = [];
    let unmounted = false;

    async function getTableColumnOptions() {
      results = await datasource.snowConnection.getTableColumnOptions(query.tableName?.value);
      if (!unmounted) {
        if (results.length > 0) {
          setOptions(results);
        }
      }
    }
    getTableColumnOptions();
    return () => {
      unmounted = true;
    };
  }, [datasource.snowConnection, query.tableName]);

  return (
    <>
      <InlineFieldRow>
        <InlineField
          label="Group By"
          labelWidth={20}
          tooltip="Select a column which will be used to group the results by."
        >
          <Select
            width={20}
            options={options}
            value={chosenValue}
            defaultValue={chosenValue}
            isSearchable={true}
            isClearable={true}
            isMulti={false}
            backspaceRemovesValue={true}
            allowCustomValue={true}
            onChange={(v) => {
              updateQuery('groupBy', v);
              setChosenValue(v);
            }}
            onCreateOption={(v) => {
              updateQuery('groupBy', { label: v, value: v });
              setChosenValue({ label: v, value: v });
            }}
            menuPlacement="top"
            maxMenuHeight={200}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  );
};

export const SelectAggregate = ({ query, updateQuery, datasource }) => {
  const aggregationTypeOptions = datasource.snowConnection.getAggregateTypeOptions();
  const [options, setOptions] = useState([{ label: 'Loading ...', value: '' }]);

  useEffect(() => {
    let results = [];
    console.log('SelectTableColumns - UseEffect');
    let unmounted = false;

    async function getTableColumnOptions() {
      results = await datasource.snowConnection.getTableColumnOptions(query.tableName?.value);
      if (!unmounted) {
        if (results.length > 0) {
          console.log('Setting tableColumn options: ', results);
          if (query.aggregateColumn) {
            if (query.aggregateColumn.length > 0) {
              results = results.concat(query.aggregateColumn);
            }
          }

          setOptions(results);
        }
      }
    }
    getTableColumnOptions();
    return () => {
      unmounted = true;
    };
  }, [datasource.snowConnection, query.tableName, query.aggregateColumn]);

  return (
    <>
      <InlineFieldRow>
        <InlineField
          label="Aggregate Function"
          labelWidth={20}
          tooltip="Choose your aggregation function then the column to run this function on"
        >
          <Select
            width={20}
            options={aggregationTypeOptions}
            value={query.selectedAggregateType}
            defaultValue={query.selectedAggregateType}
            isSearchable={true}
            isClearable={true}
            isMulti={false}
            backspaceRemovesValue={true}
            allowCustomValue={true}
            onCreateOption={(v) => updateQuery('selectedAggregateType', { label: v, value: v })}
            onChange={(v) => updateQuery('selectedAggregateType', v)}
            maxMenuHeight={200}
          />
        </InlineField>
        <InlineField>
          <Select
            options={options}
            value={query.aggregateColumn}
            defaultValue={query.aggregateColumn}
            width={20}
            isSearchable={true}
            isClearable={true}
            isMulti={false}
            backspaceRemovesValue={true}
            allowCustomValue={true}
            onChange={(v) => updateQuery('aggregateColumn', v)}
            onCreateOption={(v) => {
              var newQuery: any[] = [];
              if (typeof query.aggregateColumn !== 'undefined') {
                newQuery = [...query.aggregateColumn];
                newQuery[newQuery.length] = { label: v, value: v };
              } else {
                newQuery = [{ label: v, value: v }];
              }
              updateQuery('aggregateColumn', newQuery);
            }}
            maxMenuHeight={200}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  );
};

export const SysparamQuery = ({ query, updateQuery, datasource }) => {};

export const SelectBasicSysparam = ({ query, updateQuery, datasource, sysparamTypeOptions, loadChoices }) => {
  const [columnOptions, setColumnOptions] = useState([{ label: 'Loading ...', value: '' }]);

  useEffect(() => {
    let results = [];
    let unmounted = false;

    async function getTableColumnOptions() {
      results = await datasource.snowConnection.getTableColumnOptions(query.tableName?.value);
      if (!unmounted) {
        if (results.length > 0) {
          setColumnOptions(results);
        }
      }
    }
    getTableColumnOptions();
    return () => {
      unmounted = true;
    };
  }, [datasource.snowConnection, query.tableName]);

  const values = [...query.basic_sysparam];
  const deleteRow = (index) => {
    var newValue = values;
    newValue.splice(index, 1);
    updateQuery('basic_sysparam', newValue);
  };

  const addRow = () => {
    var newValue = values;
    newValue.push({
      1: null,
      2: null,
      3: null,
      4: { label: 'AND', value: '^' },
    });
    updateQuery('basic_sysparam', newValue);
  };

  const updateValue = (index, key, updateValue) => {
    var newValue = values;
    newValue[index][key] = updateValue;
    updateQuery('basic_sysparam', newValue);
  };

  const radioOptions = [
    { label: 'AND', value: '^' },
    { label: 'OR', value: '^OR' },
  ];

  const fields: JSX.Element[] = [];
  var length = values.constructor.toString().indexOf('Array') !== -1 ? query.basic_sysparam.length : 0;
  for (let i = 0; i < length; i++) {
    fields.push(
      <>
        <InlineFieldRow>
          {i !== 0 && (
            <InlineField>
              <RadioButtonGroup
                options={radioOptions}
                value={typeof values[i][4] !== 'undefined' ? values[i][4].value : null}
                onChange={(v) => updateValue(i, 4, { label: v, value: v })}
              />
            </InlineField>
          )}
          <InlineField label={i === 0 ? 'Sysparam Query' : undefined} labelWidth={i === 0 ? 20 : undefined}>
            <Select
              className="min-width-10"
              options={columnOptions}
              value={typeof values[i][1] !== 'undefined' ? values[i][1] : null}
              defaultValue={typeof values[i][1] !== 'undefined' ? values[i][1] : null}
              isSearchable={true}
              isClearable={true}
              isMulti={false}
              backspaceRemovesValue={true}
              allowCustomValue={true}
              onChange={(v) => updateValue(i, 1, v)}
              onCreateOption={(v) => updateValue(i, 1, { label: v, value: v })}
              maxMenuHeight={200}
            />
          </InlineField>
          <InlineField>
            <Select
              width={20}
              options={sysparamTypeOptions}
              value={typeof values[i][2] !== 'undefined' ? values[i][2] : null}
              defaultValue={typeof values[i][2] !== 'undefined' ? values[i][2] : null}
              isClearable={true}
              backspaceRemovesValue={true}
              allowCustomValue={true}
              onChange={(v) => updateValue(i, 2, v)}
              onCreateOption={(v) => updateValue(i, 2, { label: v, value: v })}
              maxMenuHeight={200}
            />
          </InlineField>
          <InlineField>
            <AsyncSelect
              className="min-width-10"
              loadOptions={(s) => loadChoices(i, s)}
              value={typeof values[i][3] !== 'undefined' ? values[i][3] : null}
              defaultValue={typeof values[i][3] !== 'undefined' ? values[i][3] : null}
              isSearchable={true}
              isClearable={true}
              backspaceRemovesValue={true}
              allowCustomValue={true}
              onChange={(v) => updateValue(i, 3, v)}
              onCreateOption={(v) => updateValue(i, 3, { label: v, value: v })}
              maxMenuHeight={200}
            />
          </InlineField>
          {i > 0 && (
            <InlineField>
              <ToolbarButton icon="trash-alt" variant="destructive" iconOnly={true} onClick={() => deleteRow(i)} />
            </InlineField>
          )}
        </InlineFieldRow>
        {i === length - 1 && (
          <InlineFieldRow>
            <InlineField>
              <ToolbarButton icon="plus" variant="primary" onClick={() => addRow()} />
            </InlineField>
          </InlineFieldRow>
        )}
      </>
    );
  }
  return <>{fields}</>;
};

export const SelectSortBy = ({ query, updateQuery, datasource }) => {
  var sortDirectionOptions = [
    { label: 'ASC', value: 'ASC', icon: 'arrow-up' },
    { label: 'DESC', value: 'DESC', icon: 'arrow-down' },
  ];
  const [options, setOptions] = useState([{ label: 'Loading ...', value: '' }]);

  useEffect(() => {
    let results = [];
    console.log('SelectTableColumns - UseEffect');
    let unmounted = false;

    async function getTableColumnOptions() {
      results = await datasource.snowConnection.getTableColumnOptions(query.tableName?.value);
      if (!unmounted) {
        if (results.length > 0) {
          console.log('Setting tableColumn options: ', results);
          if (query.sortBy) {
            if (query.sortBy.length > 0) {
              results = results.concat(query.sortBy);
            }
          }

          setOptions(results);
        }
      }
    }
    getTableColumnOptions();
    return () => {
      unmounted = true;
    };
  }, [datasource.snowConnection, query.tableName, query.sortBy]);

  return (
    <>
      <InlineFieldRow>
        <InlineField label="Sort By" labelWidth={20}>
          <Select
            width={20}
            options={options}
            value={query.sortBy}
            defaultValue={query.sortBy}
            isSearchable={true}
            isClearable={true}
            isMulti={false}
            backspaceRemovesValue={true}
            allowCustomValue={true}
            onChange={(v) => updateQuery('sortBy', v)}
            onCreateOption={(v) => updateQuery('sortBy', { label: v, value: v })}
            maxMenuHeight={200}
            menuPlacement="top"
          />
        </InlineField>
        <InlineField>
          <RadioButtonGroup
            value={query.sortDirection}
            options={sortDirectionOptions}
            onChange={(v) => updateQuery('sortDirection', v)}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  );
};

export const InputLimit = ({ updateQuery, defaultValue }) => {
  return (
    <>
      <InlineFieldRow>
        <InlineField
          label="Limit"
          labelWidth={20}
          tooltip="Limit the number of results. Expects a number between 1 - 9999"
        >
          <Input
            name="limit"
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
  );
};

export const InputElasticSearch = ({ updateQuery, defaultValue }) => {
  return (
    <>
      <InlineFieldRow>
        <InlineField label="Elastic Search Query" labelWidth={20}>
          <Input
            name="elasticSearch"
            width={20}
            defaultValue={defaultValue}
            onBlur={(e) => updateQuery('elasticSearch', e.target.value)}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  );
};

export const SelectTrend = ({ updateQuery, trendByOptions, query, datasource }) => {
  const [options, setOptions] = useState([{ label: 'Loading ...', value: '' }]);

  useEffect(() => {
    let results = [];
    let unmounted = false;

    async function getTableColumnOptions() {
      results = await datasource.snowConnection.getTableColumnOptions(query.tableName?.value);
      if (!unmounted) {
        if (results.length > 0) {
          setOptions(results);
        }
      }
    }
    getTableColumnOptions();
    return () => {
      unmounted = true;
    };
  }, [datasource.snowConnection, query.tableName]);

  return (
    <>
      <InlineFieldRow>
        <InlineField label="Trend" labelWidth={20}>
          <Select
            className="min-width-10 max-width-30"
            options={options}
            value={query.selectedTrendColumn}
            defaultValue={query.selectedTrendColumn}
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
            value={query.selectedTrendBy}
            defaultValue={query.selectedTrendBy}
            isSearchable={true}
            isClearable={true}
            backspaceRemovesValue={true}
            allowCustomValue={true}
            onChange={(v) => updateQuery('selectedTrendBy', v)}
            onCreateOption={(v) => updateQuery('selectedTrendBy', { label: v, value: v })}
            maxMenuHeight={200}
          />
        </InlineField>
        <InlineField>
          <Input
            name="period"
            type="number"
            max={300}
            min={1}
            width={20}
            defaultValue={query.trendPeriod}
            onBlur={(e) => updateQuery('trendPeriod', e.target.value)}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  );
};

export const ShowPercentSwitch = ({ value, updateQuery }) => {
  const switchOptions = [
    {
      label: 'False',
      value: false,
    },
    {
      label: 'True',
      value: true,
    },
  ];
  return (
    <>
      <InlineFieldRow>
        <InlineField label="Show Uptime %" labelWidth={20}>
          <RadioButtonGroup
            options={switchOptions}
            value={value || false}
            onChange={(v) => updateQuery('showPercent', v)}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  );
};

export const InputPage = ({ defaultValue, updateQuery }) => {
  return (
    <>
      <InlineFieldRow>
        <InlineField label="Page" labelWidth={20} tooltip="Page number used for pagination. Starts at page 0">
          <Input
            name="page"
            type="number"
            max={9999}
            min={0}
            width={20}
            defaultValue={defaultValue}
            onBlur={(e) => updateQuery('page', e.target.valueAsNumber)}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  );
};

export const AlertCountChoice = ({ value, updateQuery }) => {
  const options = [
    { label: 'No', value: 'false' },
    { label: 'Yes', value: 'true' },
  ];

  return (
    <>
      <InlineFieldRow>
        <InlineField
          label="Query Alert Count"
          labelWidth={20}
          tooltip="Extra query per row to get the number of alerts on a ci. Adds extra processing, use wisely!"
        >
          <RadioButtonGroup
            value={value.value}
            options={options}
            onChange={(v) => updateQuery('getAlertCount', { label: v, value: v })}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  );
};

export const SelectCacheTimeout = ({ value, updateQuery }) => {
  const cacheOptions = ['5s', '30s', '60s', '2m', '5m', '15m', '30m'];

  return (
    <>
      <InlineFieldRow>
        <InlineField>
          <RefreshPicker
            value={value}
            text="Cache Override"
            intervals={cacheOptions}
            onIntervalChanged={(v) => updateQuery('cacheOverride', v)}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  );
};

export const ToggleLogCompression = ({ value, updateQuery }) => {
  return (
    <>
      <InlineFieldRow>
        <InlineField label="Compress Logs" labelWidth={20}>
          <InlineSwitch value={value} onChange={(v: any) => updateQuery('compressLogs', v.target.checked)} />
        </InlineField>
      </InlineFieldRow>
    </>
  );
};

export const TimerangeCheckbox = ({ query, updateQuery, datasource }) => {
  const [options, setOptions] = useState([{ label: 'Loading ...', value: '' }]);

  useEffect(() => {
    let results = [];
    console.log('SelectTableColumns - UseEffect');
    let unmounted = false;

    async function getTableColumnOptions() {
      results = await datasource.snowConnection.getTableColumnOptions(query.tableName?.value);
      if (!unmounted) {
        if (results.length > 0) {
          console.log('Setting tableColumn options: ', results);
          if (query.grafanaTimerangeColumn) {
            if (query.grafanaTimerangeColumn.length > 0) {
              results = results.concat(query.grafanaTimerangeColumn);
            }
          }

          setOptions(results);
        }
      }
    }
    getTableColumnOptions();
    return () => {
      unmounted = true;
    };
  }, [datasource.snowConnection, query.tableName, query.grafanaTimerangeColumn]);

  return (
    <>
      <InlineFieldRow>
        <InlineField
          label="Grafana Timerange"
          labelWidth={20}
          tooltip="If selected, only results that fit inbetween your Grafana Timerange will be returned"
        >
          <InlineSwitch
            value={query.grafanaTimerange}
            onChange={(v: any) => updateQuery('grafanaTimerange', v.target.checked)}
          />
        </InlineField>
        {query.grafanaTimerange && (
          <InlineField>
            <Select
              options={options}
              value={query.grafanaTimerangeColumn}
              defaultValue={query.grafanaTimerangeColumn}
              width={20}
              isSearchable={true}
              isClearable={true}
              isMulti={false}
              backspaceRemovesValue={true}
              allowCustomValue={true}
              onChange={(v) => updateQuery('grafanaTimerangeColumn', v)}
              onCreateOption={(v) => updateQuery('grafanaTimerangeColumn', { label: v, value: v })}
              maxMenuHeight={200}
            />
          </InlineField>
        )}
      </InlineFieldRow>
    </>
  );
};

export const SelectTags = ({ query, updateQuery, datasource, replaceMultipleVariables }) => {
  const [keyOptions, setKeyOptions] = useState([{ label: 'Loading...', value: '' }]);
  const [valueOptions, setValueOptions] = useState([{ label: 'Loading...', value: '' }]);

  useEffect(() => {
    let keys: Array<{ label: string; value: any }> = [];
    let values: Array<{ label: string; value: any }> = [];
    let tags: any = [];
    console.log('Use Effect: SelectTags Component');
    console.log('query', query);

    async function getKeyOptions() {
      var { selectedAlertStateList, sysparam_query, rowLimit } = query;
      sysparam_query = replaceMultipleVariables(sysparam_query);
      console.log('replaced sysparam: ', sysparam_query);

      tags = await datasource.snowConnection.getAlertTags(selectedAlertStateList, sysparam_query, rowLimit);
      console.log('Tags: ', tags);
      for (let i = 0; i < tags.length; i++) {
        keys.push({ label: tags[i].key, value: tags[i].key });
        if (typeof query.tagKeys !== 'undefined') {
          if (typeof query.tagKeys[0] !== 'undefined') {
            if (query.tagKeys[0].value.charAt(0) !== '$') {
              query.tagKeys.map((k) => {
                if (tags[i].key === k.value) {
                  values.push({ label: tags[i].value, value: tags[i].value });
                }
              });
            }
          }
        }
      }
      keys = keys.filter((option, index, self) => index === self.findIndex((t) => t.value === option.value));
      values = values.filter((option, index, self) => index === self.findIndex((t) => t.value === option.value));

      // Removes any tagValues that are not currently in the list
      if (query.tagValues) {
        if (query.tagValues[0]) {
          if (query.tagValues[0].value.charAt(0) !== '$') {
            var newSelectedValues = query.tagValues;
            query.tagValues.map((v, i) => {
              if (v.custom) {
                return;
              }
              var match = false;
              values.map((valueOptions) => {
                if (v.value === valueOptions.value && !v.custom) {
                  match = true;
                }
              });
              if (!match) {
                newSelectedValues.splice(i, 1);
              }
            });
            if (!isEqual(newSelectedValues, query.tagValues)) {
              updateQuery('tagValues', newSelectedValues);
            }
          }
        }
      }

      setKeyOptions(keys);
      setValueOptions(values);
    }
    getKeyOptions();
  }, [datasource.snowConnection, query, updateQuery, replaceMultipleVariables]);

  var customKeyOptions: any = keyOptions;
  if (typeof query.tagKeys !== 'undefined') {
    customKeyOptions = [...keyOptions, query.tagKeys];
    customKeyOptions = [].concat.apply([], customKeyOptions);
  }
  var customValueOptions: any = valueOptions;
  if (typeof query.tagValues !== 'undefined') {
    customValueOptions = [...valueOptions, query.tagValues];
    customValueOptions = [].concat.apply([], customValueOptions);
  }

  return (
    <>
      <InlineFieldRow>
        <InlineField label="Tag Keys" labelWidth={20} tooltip="Filter by tags located in additional info">
          <Select
            className="min-width-10 max-width-20"
            options={customKeyOptions}
            value={query.tagKeys}
            defaultValue={query.tagKeys}
            isSearchable={true}
            isClearable={true}
            isMulti={true}
            backspaceRemovesValue={true}
            allowCustomValue={true}
            onChange={(v) => updateQuery('tagKeys', v)}
            onCreateOption={(v) => {
              const customValue: SelectableValue<string> = { label: v, value: v };
              var newValue: any[] = [];
              if (query.tagKeys) {
                newValue = [...query.tagKeys];
                newValue.push(customValue);
              } else {
                newValue = [customValue];
              }
              updateQuery('tagKeys', newValue);
            }}
            maxMenuHeight={200}
          />
        </InlineField>
        <InlineField label="Tag Values" labelWidth={20}>
          <Select
            className="min-width-10 max-width-20"
            options={customValueOptions}
            value={query.tagValues}
            defaultValue={query.tagValues}
            isSearchable={true}
            isClearable={true}
            isMulti={true}
            backspaceRemovesValue={true}
            allowCustomValue={true}
            onChange={(v) => updateQuery('tagValues', v)}
            onCreateOption={(v) => {
              const customValue: SelectableValue<string> = { label: v, value: v, custom: true };
              var newValue: any[] = [];
              if (query.tagValues) {
                newValue = [...query.tagValues];
                newValue.push(customValue);
              } else {
                newValue = [customValue];
              }
              updateQuery('tagValues', newValue);
            }}
            maxMenuHeight={200}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  );
};
