import {
    InlineFieldRow,
    InlineField,
    RefreshPicker,
  } from '@grafana/ui';
  import React from 'react';


export const SelectCacheTimeout = ({ value, updateQuery }) => {
    const cacheOptions = ['5s', '30s', '60s', '2m', '5m', '15m', '30m'];
  
    return (
      <>
        <InlineFieldRow>
          <InlineField>
            <RefreshPicker
              value={value}
              text="Cache Override"
              intervals={cacheOptions}
              onIntervalChanged={(v) => updateQuery('cacheOverride', v)}
            />
          </InlineField>
        </InlineFieldRow>
      </>
    );
  };