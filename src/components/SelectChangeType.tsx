import {
    Select,
    InlineField,
    InlineFieldRow,
} from '@grafana/ui';

import React from 'react';

export const SelectChangeType = ({ options, value, updateQuery }) => {
    return (
        <>
            <InlineFieldRow>
                <InlineField label="Change Type Filter" labelWidth={20}>
                    <Select
                        width={20}
                        value={value}
                        options={options}
                        isClearable={true}
                        isSearchable={true}
                        maxMenuHeight={200}
                        defaultValue={value}
                        onChange={(v) => updateQuery('selectedChangeTypeList', v)}
                    />
                </InlineField>
            </InlineFieldRow>
        </>
    );
};