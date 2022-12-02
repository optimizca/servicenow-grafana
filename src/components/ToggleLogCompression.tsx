import {
    InlineFieldRow,
    InlineField,
    InlineSwitch,
  } from '@grafana/ui';
  import React from 'react';

export const ToggleLogCompression = ({ value, updateQuery }) => {
    return (
      <>
        <InlineFieldRow>
          <InlineField label="Compress Logs" labelWidth={20}>
            <InlineSwitch value={value} onChange={(v: any) => updateQuery('compressLogs', v.target.checked)} />
          </InlineField>
        </InlineFieldRow>
      </>
    );
  };