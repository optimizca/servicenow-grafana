import { InlineFieldRow, InlineField, Select } from '@grafana/ui';
import React, { useState, useEffect } from 'react';

export const SelectAggregate = ({ query, updateQuery, datasource }) => {
  const [aggregationTypeOptions, setAggregationTypeOptions] = useState([{ label: 'Loading...', value: '' }]);
  const [options, setOptions] = useState([{ label: 'Loading ...', value: '' }]);

  // Fetch aggregate type options from the backend
  useEffect(() => {
    const fetchAggregateTypeOptions = async () => {
      try {
        const response = await datasource.getResource('aggregateTypeOptions');
        setAggregationTypeOptions(response);
      } catch (error) {
        console.error('Failed to fetch aggregate type options:', error);
        setAggregationTypeOptions([{ label: 'Error loading options', value: '' }]);
      }
    };

    fetchAggregateTypeOptions();
  }, [datasource]);

  // Fetch table column options
  useEffect(() => {
    let results = [];
    let unmounted = false;
    if (!query.tableName?.value) {
      return;
    }

    async function getTableColumnOptions() {
      try {
        results = await datasource.getResource(`tableColumnOptions?tableName=${query.tableName?.value}`);
        if (!unmounted) {
          if (results &&  results.length > 0) {
            console.log('Setting tableColumn options: ', results);
            if (query.aggregateColumn) {
              if (query.aggregateColumn.length > 0) {
                results = results.concat(query.aggregateColumn);
              }
            }
            setOptions(results);
          }
        }
      } catch (error) {
        console.error('Failed to fetch table column options:', error);
        setOptions([{ label: 'Error loading options', value: '' }]);
      }
    }

    getTableColumnOptions();

    return () => {
      unmounted = true;
    };
  }, [datasource, query.tableName, query.aggregateColumn]);

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
            width={40}
            isSearchable={true}
            isClearable={true}
            isMulti={false}
            backspaceRemovesValue={true}
            allowCustomValue={true}
            onChange={(v) => updateQuery('aggregateColumn', v)}
            onCreateOption={(v) => {
              updateQuery('aggregateColumn', { label: v, value: v });
            }}
            maxMenuHeight={200}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  );
};
