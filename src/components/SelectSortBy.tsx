import { InlineFieldRow, InlineField, Select, RadioButtonGroup } from '@grafana/ui';
import React, { useState, useEffect } from 'react';

export const SelectSortBy = ({ query, updateQuery, datasource, table }) => {
  let sortDirectionOptions = [
    { label: 'ASC', value: 'ASC', icon: 'arrow-up' },
    { label: 'DESC', value: 'DESC', icon: 'arrow-down' },
  ];
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
  }, [datasource.snowConnection, table, query.sortBy]);

  return (
    <>
      <InlineFieldRow>
        <InlineField label="Sort By" labelWidth={20}>
          <Select
            width={40}
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
