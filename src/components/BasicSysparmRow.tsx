import { InlineFieldRow, InlineField, Select, ToolbarButton, RadioButtonGroup } from '@grafana/ui';
import React, { useState, useEffect } from 'react';

export const BasicSysparmRow = ({
  index,
  value,
  datasource,
  updateValue,
  addRow,
  deleteRow,
  columnOptions,
  table,
  showAddRow,
}) => {
  const [choiceOptions, setChoiceOptions] = useState([{ label: 'Loading ...', value: '' }]);
  const [operatorOptions, setOperatorOptions] = useState([{ label: 'Loading ...', value: '' }]);

  useEffect(() => {
    console.log('BasicSysparmRow useEffect');
  }, [value.column]);

  useEffect(() => {
    let choiceOptionResults = [];
    let operatorOptionResults = [];
    let unmounted = false;

    const getOperatorOptions = async () => {
      let type = '';
      if (value.column) {
        type = value.column.label.substring(value.column.label.indexOf('(') + 1, value.column.label.indexOf(')'));
      }
      operatorOptionResults = await datasource.snowConnection.getOperatorOptions(type);
      if (!unmounted) {
        setOperatorOptions(operatorOptionResults);
      }
    };
    const getChoiceOptions = async () => {
      let type = '';
      if (value.column) {
        type = value.column.label.substring(value.column.label.indexOf('(') + 1, value.column.label.indexOf(')'));
      }
      choiceOptionResults = await datasource.snowConnection.loadColumnChoices(
        table?.value,
        value.column?.value,
        '',
        type
      );
      if (choiceOptionResults.length > 0) {
        setChoiceOptions(choiceOptionResults);
      }
    };
    getChoiceOptions();
    getOperatorOptions();
    return () => {
      unmounted = true;
    };
  }, [datasource.snowConnection, value.column, table]);

  const radioOptions = [
    { label: 'AND', value: '^' },
    { label: 'OR', value: '^OR' },
  ];

  return (
    <>
      <InlineFieldRow>
        {index !== 0 && (
          <InlineField>
            <RadioButtonGroup
              options={radioOptions}
              value={value.separator?.value || '^'}
              onChange={(v) => updateValue(index, 'separator', { label: v, value: v })}
            />
          </InlineField>
        )}
        <InlineField label={index === 0 ? 'Sysparam Query' : undefined} labelWidth={index === 0 ? 20 : undefined}>
          <Select
            width={40}
            options={columnOptions}
            value={value.column}
            defaultValue={value.column}
            isSearchable={true}
            isClearable={true}
            isMulti={false}
            backspaceRemovesValue={true}
            allowCustomValue={true}
            onChange={(v) => updateValue(index, 'column', v)}
            onCreateOption={(v) => updateValue(index, 'column', { label: v, value: v })}
          />
        </InlineField>
        <InlineField>
          <Select
            width={20}
            options={operatorOptions}
            value={value.operator}
            defaultValue={value.operator}
            isClearable={true}
            backspaceRemovesValue={true}
            allowCustomValue={true}
            onChange={(v) => updateValue(index, 'operator', v)}
            onCreateOption={(v) => updateValue(index, 'operator', { label: v, value: v })}
          />
        </InlineField>
        <InlineField>
          <Select
            width={20}
            options={choiceOptions}
            value={value.value}
            defaultValue={value.value}
            isSearchable={true}
            isClearable={true}
            isMulti={false}
            backspaceRemovesValue={true}
            allowCustomValue={true}
            onChange={(v) => updateValue(index, 'value', v)}
            onCreateOption={(v) => updateValue(index, 'value', { label: v, value: v })}
          />
        </InlineField>
        {index > 0 && (
          <InlineField>
            <ToolbarButton icon="trash-alt" variant="destructive" iconOnly={true} onClick={() => deleteRow(index)} />
          </InlineField>
        )}
      </InlineFieldRow>
      {showAddRow && (
        <InlineFieldRow>
          <InlineField>
            <ToolbarButton icon="plus" variant="primary" onClick={() => addRow()} />
          </InlineField>
        </InlineFieldRow>
      )}
    </>
  );
};
