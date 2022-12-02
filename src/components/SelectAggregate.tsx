import {
    InlineFieldRow,
    InlineField,
    Select,
  } from '@grafana/ui';
  import React, { useState, useEffect } from 'react';

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
                let newQuery: any[] = [];
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
