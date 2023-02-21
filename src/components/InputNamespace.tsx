import { Input, InlineField, InlineFieldRow } from '@grafana/ui';

import React from 'react';

export const InputNamespace = ({ updateQuery, defaultValue }) => {
  return (
    <>
      <InlineFieldRow>
        <InlineField label="Included Namespaces" labelWidth={20}>
          <Input
            width={20}
            name="namespaces"
            defaultValue={defaultValue}
            onBlur={(e) => updateQuery('topology_namespaces', e.target.value)}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  );
};
