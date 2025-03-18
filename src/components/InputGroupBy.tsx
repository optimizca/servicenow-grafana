import { getTemplateSrv } from '@grafana/runtime';
import { Select, InlineField, InlineFieldRow } from '@grafana/ui';

import React, { useState, useEffect } from 'react';

export const InputGroupBy = ({ query, updateQuery, datasource }) => {
  const [chosenValue, setChosenValue] = useState(query.groupBy);
  const [options, setOptions] = useState([{ label: 'Loading ...', value: '' }]);

  useEffect(() => {
    let results = [];
    let unmounted = false;

    const processedTableName = getTemplateSrv().replace(query.tableName.value, query.scopedVars, 'csv');
    console.log('processedTableName:', processedTableName);

    async function getTableColumnOptions() {
      if (!query.tableName?.value) {
        return;
      }
      results = await datasource.getResource(`tableColumnOptions?tableName=${processedTableName}`);

      if (!unmounted) {
        if (results && results.length > 0) {
          setOptions(results);
        }
      }
    }

    getTableColumnOptions();

    return () => {
      unmounted = true;
    };
  }, [datasource, query.tableName, query.tableName.value, query.scopedVars]);

  return (
    <>
      <InlineFieldRow>
        <InlineField
          labelWidth={20}
          label="Group By"
          tooltip="Select a column which will be used to group the results by."
        >
          <Select
            width={40}
            isMulti={false}
            options={options}
            isClearable={true}
            value={chosenValue}
            isSearchable={true}
            menuPlacement="top"
            maxMenuHeight={200}
            allowCustomValue={true}
            defaultValue={chosenValue}
            backspaceRemovesValue={true}
            onChange={(v) => {
              setChosenValue(v);
              updateQuery('groupBy', v);
            }}
            onCreateOption={(v) => {
              setChosenValue({ label: v, value: v });
              updateQuery('groupBy', { label: v, value: v });
            }}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  );
};
