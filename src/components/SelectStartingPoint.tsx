import {
    AsyncSelect,
    InlineField,
    InlineFieldRow,
} from '@grafana/ui';

import React from 'react';

export const SelectStartingPoint = ({ loadOptions, value, updateQuery }) => {
    return (
        <>
            <InlineFieldRow>
                <InlineField label="Starting Point" labelWidth={20}>
                    <AsyncSelect
                        width={40}
                        value={value}
                        isClearable={true}
                        isSearchable={true}
                        maxMenuHeight={200}
                        defaultValue={value}
                        defaultOptions={true}
                        menuPlacement="bottom"
                        allowCustomValue={true}
                        loadOptions={loadOptions}
                        backspaceRemovesValue={true}
                        onCreateOption={(v) => updateQuery('selectedServiceList', { label: v, value: v })}
                        onChange={(v) => updateQuery('selectedServiceList', v)}
                    />
                </InlineField>
            </InlineFieldRow>
        </>
    );
};
