import { Select, InlineField, InlineFieldRow } from '@grafana/ui';

import React from 'react';

export const SelectMetricAnomaly = ({ options, value, updateQuery }) => {
  return (
    <>
      <InlineFieldRow>
        <InlineField label="Anomaly" labelWidth={20}>
          <Select
            width={20}
            value={value}
            options={options}
            isClearable={true}
            maxMenuHeight={200}
            defaultValue={value}
            onChange={(v) => updateQuery('selectedMetricAnomalyList', v)}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  );
};
