import { InlineField, InlineFieldRow, RadioButtonGroup } from '@grafana/ui';

import React from 'react';

export const SelectMetricValueType = ({ query, updateQuery }) => {
  const options = [
    { label: 'Timeseries', value: 'timeseries' },
    { label: 'Latest Value', value: 'latest' },
  ];
  return (
    <>
      <InlineFieldRow>
        <InlineField label="Value Type" labelWidth={20}>
          <RadioButtonGroup
            options={options}
            value={query.metricValueType}
            onChange={(v) => updateQuery('metricValueType', v)}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  );
};

{
  /* <Select
  width={20}
  value={value}
  options={options}
  isClearable={true}
  maxMenuHeight={200}
  defaultValue={value}
  onChange={(v) => updateQuery('selectedMetricAnomalyList', v)}
/>; */
}
