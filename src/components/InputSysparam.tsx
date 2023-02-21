import { Input, InlineField, InlineFieldRow } from '@grafana/ui';

import React from 'react';

export const InputSysparam = ({ updateQuery, defaultValue }) => {
  return (
    <>
      <InlineFieldRow>
        <InlineField label="Sysparam Query" labelWidth={20}>
          <Input
            width={60}
            name="sysparam_query"
            defaultValue={defaultValue}
            onBlur={(e) => updateQuery('sysparam_query', e.target.value)}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  );
};
