import {
    InlineFieldRow,
    InlineField,
    Input,
  } from '@grafana/ui';
  import React from 'react';

export const InputPage = ({ defaultValue, updateQuery }) => {
    return (
      <>
        <InlineFieldRow>
          <InlineField label="Page" labelWidth={20} tooltip="Page number used for pagination. Starts at page 0">
            <Input
              name="page"
              type="number"
              max={9999}
              min={0}
              width={20}
              defaultValue={defaultValue}
              onBlur={(e) => updateQuery('page', e.target.valueAsNumber)}
            />
          </InlineField>
        </InlineFieldRow>
      </>
    );
  };