import {
    InlineField,
    AsyncSelect,
    InlineFieldRow,
} from '@grafana/ui';

import React from 'react';

export const SelectService = ({ loadOptions, value, updateQuery }) => {
    return (
        <>
            <InlineFieldRow>
                <InlineField label="Service" labelWidth={20}>

                <AsyncSelect
                    width={20}
                    value={value}
                    isClearable={true}
                    maxMenuHeight={200}
                    isSearchable={true}
                    defaultValue={value}
                    defaultOptions={true}
                    menuPlacement="bottom"
                    allowCustomValue={true}
                    loadOptions={loadOptions}
                    backspaceRemovesValue={true}
                    onChange={(v) => updateQuery('selectedServiceList', v)}
                    onCreateOption={(v) => updateQuery('selectedServiceList', { label: v, value: v })}
                />

                </InlineField>
            </InlineFieldRow>
        </>
    );
  };