import { AsyncSelect, InlineField, InlineFieldRow } from '@grafana/ui';

import React from 'react';

export const SelectExcludeClasses = ({ loadOptions, value, updateQuery }) => {
  // const [chosenValue, setChosenValue] = useState(value);

  return (
    <>
      <InlineFieldRow>
        <InlineField label="Filter Classes" labelWidth={20} tooltip={'exclude'}>
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
            allowCustomValue={true}
            onChange={(v) => updateQuery('excludedClasses', v)}
            onCreateOption={(v) => updateQuery('excludedClasses', [...value, { label: v, value: v }])}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  );
};
