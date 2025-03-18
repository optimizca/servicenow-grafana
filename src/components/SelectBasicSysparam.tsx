import { getTemplateSrv } from '@grafana/runtime';
import { InlineFieldRow, InlineField, Select, AsyncSelect, ToolbarButton, RadioButtonGroup } from '@grafana/ui';
import React, { useState, useEffect } from 'react';

export const SelectBasicSysparam = ({ query, updateQuery, datasource,  loadChoices, table }) => {
  const [columnOptions, setColumnOptions] = useState([{ label: 'Loading ...', value: '' }]);

  useEffect(() => {
    let results = [];
    let unmounted = false;

    const processedTableName = getTemplateSrv().replace(query.tableName?.value, query.scopedVars, 'csv');

    async function getTableColumnOptions() {
      console.log('SelectBasicSysparam - getTableColumnOptions - testing');
      results = await datasource.getResource(`tableColumnOptions?tableName=${processedTableName}`);
      if (!unmounted) {
        if (results && results.length > 0) {
          setColumnOptions(results);
        }
      }
    }
    getTableColumnOptions();
    return () => {
      unmounted = true;
    };
  }, [datasource, table, query.tableName, query.tableName.value, query.scopedVars]);

  const values = [...query.basic_sysparam];
  const deleteRow = (index) => {
    let newValue = values;
    newValue.splice(index, 1);
    updateQuery('basic_sysparam', newValue);
  };

  const addRow = () => {
    let newValue = values;
    newValue.push({
      1: null,
      2: null,
      3: null,
      4: { label: 'AND', value: '^' },
    });
    updateQuery('basic_sysparam', newValue);
  };

  const updateValue = (index, key, updateValue) => {
    let newValue = values;
    newValue[index][key] = updateValue;
    updateQuery('basic_sysparam', newValue);
  };

  const radioOptions = [
    { label: 'AND', value: '^' },
    { label: 'OR', value: '^OR' },
  ];

  const fields: JSX.Element[] = [];
  let length = values.constructor.toString().indexOf('Array') !== -1 ? query.basic_sysparam.length : 0;
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
              width={40}
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
              // options={sysparamTypeOptions}
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
              width={20}
              loadOptions={(s) => loadChoices(i, s)}
              value={typeof values[i][3] !== 'undefined' ? values[i][3] : null}
              defaultValue={typeof values[i][3] !== 'undefined' ? values[i][3] : null}
              isSearchable={true}
              isClearable={true}
              backspaceRemovesValue={true}
              allowCustomValue={true}
              allowCreateWhileLoading={true}
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
