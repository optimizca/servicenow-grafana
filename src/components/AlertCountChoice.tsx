import { InlineFieldRow, InlineField, RadioButtonGroup } from '@grafana/ui';
import React from 'react';

export const AlertCountChoice = ({ value, updateQuery }) => {
  const options = [
    { label: 'No', value: 'false' },
    { label: 'Yes', value: 'true' },
  ];

  return (
    <>
      <InlineFieldRow>
        <InlineField
          label="Query Alert Count"
          labelWidth={20}
          tooltip="Extra query per row to get the number of alerts on a ci. Adds extra processing, use wisely!"
        >
          <RadioButtonGroup
            value={value.value}
            options={options}
            onChange={(v) => updateQuery('getAlertCount', { label: v, value: v })}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  );
};
