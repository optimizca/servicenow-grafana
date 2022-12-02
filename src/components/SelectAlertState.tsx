import {
    Select,
    InlineField,
    InlineFieldRow,
} from '@grafana/ui';

import React from 'react';

export const SelectAlertState = ({ options, value, updateQuery }) => {
    return (
        <>
            <InlineFieldRow>
                <InlineField label="Alert State Filter" labelWidth={20}>
                    <Select
                        width={20}
                        value={value}
                        options={options}
                        isClearable={true}
                        maxMenuHeight={200}
                        isSearchable={true}
                        defaultValue={value}
                        onChange={(v) => updateQuery('selectedAlertStateList', v)}
                    />
                </InlineField>
            </InlineFieldRow>
        </>
    );
};