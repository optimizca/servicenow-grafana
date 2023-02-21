import { InlineFieldRow, InlineField, Select } from '@grafana/ui';
import { SelectableValue } from '@grafana/data';
import React, { useState, useEffect } from 'react';
import { isEqual } from 'lodash';

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
      let { selectedAlertStateList, sysparam_query, rowLimit } = query;
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
            let newSelectedValues = query.tagValues;
            query.tagValues.map((v, i) => {
              if (v.custom) {
                return;
              }
              let match = false;
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

  let customKeyOptions: any = keyOptions;
  if (typeof query.tagKeys !== 'undefined') {
    customKeyOptions = [...keyOptions, query.tagKeys];
    customKeyOptions = [].concat.apply([], customKeyOptions);
  }
  let customValueOptions: any = valueOptions;
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
              let newValue: any[] = [];
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
              let newValue: any[] = [];
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
