import { InlineFieldRow, InlineField, Select, Input } from '@grafana/ui';
import React, { useState, useEffect } from 'react';

export const SelectTrend = ({ updateQuery, trendByOptions, query, datasource }) => {
  const [options, setOptions] = useState([{ label: 'Loading ...', value: '' }]);

  useEffect(() => {
    let results = [];
    let unmounted = false;

    async function getTableColumnOptions() {
      results = await datasource.getResource(`tableColumnOptions?tableName=${query.tableName?.value}, 'glide_date_time'`);
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
  }, [datasource, query.tableName]);

  return (
    <>
      <InlineFieldRow>
        <InlineField label="Trend" labelWidth={20}>
          <Select
            width={40}
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
            width={20}
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
