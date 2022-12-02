import {
    InlineFieldRow,
    InlineField,
    RadioButtonGroup,
  } from '@grafana/ui';
  import React from 'react';

export const ShowPercentSwitch = ({ value, updateQuery }) => {
    const switchOptions = [
      {
        label: 'False',
        value: false,
      },
      {
        label: 'True',
        value: true,
      },
    ];
    return (
      <>
        <InlineFieldRow>
          <InlineField label="Show Uptime %" labelWidth={20}>
            <RadioButtonGroup
              options={switchOptions}
              value={value || false}
              onChange={(v) => updateQuery('showPercent', v)}
            />
          </InlineField>
        </InlineFieldRow>
      </>
    );
  };