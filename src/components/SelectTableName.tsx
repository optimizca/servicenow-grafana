import { Icon, AsyncSelect, InlineField, InlineFieldRow } from '@grafana/ui';

import React from 'react';

export const SelectTableName = ({ loadTableOptions, value, updateQuery }) => {
  return (
    <>
      <InlineFieldRow>
        <InlineField label="Table Name" labelWidth={20}>
          <AsyncSelect
            value={value}
            isClearable={true}
            maxMenuHeight={200}
            isSearchable={true}
            defaultValue={value}
            defaultOptions={true}
            menuPlacement="bottom"
            allowCustomValue={true}
            backspaceRemovesValue={true}
            prefix={<Icon name="table" />}
            loadOptions={loadTableOptions}
            width={40}
            onChange={(v) => updateQuery('tableName', v)}
            onCreateOption={(v) => updateQuery('tableName', { label: v, value: v })}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  );
};
