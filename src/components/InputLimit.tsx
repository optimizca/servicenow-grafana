import { InlineFieldRow, InlineField, Input } from '@grafana/ui';
import React from 'react';

export const InputLimit = ({ updateQuery, defaultValue }) => {
  return (
    <>
      <InlineFieldRow>
        <InlineField
          label="Limit"
          labelWidth={20}
          tooltip="Limit the number of results. Expects a number between 1 - 9999"
        >
          <Input
            name="limit"
            type="number"
            max={9999}
            min={1}
            width={20}
            defaultValue={defaultValue}
            onBlur={(e) => updateQuery('rowLimit', e.target.value)}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  );
};
