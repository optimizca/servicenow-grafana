import {
  AsyncSelect,
  InlineField,
  InlineFieldRow,
} from '@grafana/ui';

import React from 'react';

export const SelectExcludeClasses = ({ loadOptions, value, updateQuery }) => {
  return (
      <>
          <InlineFieldRow>
              <InlineField label="Exclude by Class" labelWidth={20}>
                  <AsyncSelect
                      width={40}
                      value={value}
                      defaultValue={value}
                      isClearable={true}
                      isSearchable={true}
                      isMulti={true}
                      backspaceRemovesValue={true}
                      defaultOptions={true}
                      loadOptions={loadOptions}
                      onChange={(v) => updateQuery('excludedClasses', v)}
                  />
              </InlineField>
          </InlineFieldRow>
      </>
  );
};
