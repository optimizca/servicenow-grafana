import { Icon, Select, InlineField, InlineFieldRow } from '@grafana/ui';

import React, { useState, useEffect } from 'react';

export const SelectTableColumn = ({ query, updateQuery, datasource, table }) => {
  const [chosenValue, setChosenValue] = useState(query.selectedtableColumns);
  const [options, setOptions] = useState([{ label: 'Loading ...', value: '' }]);

  useEffect(() => {
    let results = [];
    console.log('SelectTableColumns - UseEffect');
    let unmounted = false;

    async function getTableColumnOptions() {
      results = await datasource.snowConnection.getTableColumnOptions(table?.value);
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
  }, [datasource.snowConnection, table, chosenValue]);

  return (
    <>
      <InlineFieldRow>
        <InlineField
          labelWidth={20}
          label="Table Columns"
          tooltip="Leave columns blank to return all columns in the dictionary"
        >
          <Select
            isMulti={true}
            options={options}
            isClearable={true}
            maxMenuHeight={200}
            value={chosenValue}
            isSearchable={true}
            menuPlacement="bottom"
            allowCustomValue={true}
            defaultValue={chosenValue}
            backspaceRemovesValue={true}
            prefix={<Icon name="columns" />}
            width={40}
            onChange={(v) => {
              setChosenValue(v);
              updateQuery('selectedtableColumns', v);
            }}
            onCreateOption={(v) => {
              let newQuery: any[] = [];

              if (typeof chosenValue !== 'undefined') {
                newQuery = [...chosenValue];
                newQuery[newQuery.length] = { label: v, value: v };
              } else {
                newQuery = [{ label: v, value: v }];
              }

              setChosenValue(newQuery);
              updateQuery('selectedtableColumns', newQuery);
            }}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  );
};
