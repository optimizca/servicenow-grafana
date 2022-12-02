import {
    InlineField,
    AsyncSelect,
    InlineFieldRow,
} from '@grafana/ui';

import React from 'react';

export const SelectResource = ({ loadOptions, value, updateQuery }) => {
    return (
        <>
            <InlineFieldRow>
                <InlineField label="Resource ID" labelWidth={20}>
                    <AsyncSelect
                        width={20}
                        value={value}
                        isMulti={true}
                        isClearable={true}
                        isSearchable={true}
                        maxMenuHeight={200}
                        defaultValue={value}
                        allowCustomValue={true}
                        loadOptions={loadOptions}
                        backspaceRemovesValue={true}
                        onChange={(v) => updateQuery('selectedMetricTypeList', v)}
                        onCreateOption={(v) => {
                            let newQuery: any[] = [];

                            if (typeof value !== 'undefined') {
                                newQuery = [...value];
                                newQuery[newQuery.length] = { label: v, value: v };
                            } else {
                                newQuery = [{ label: v, value: v }];
                            }
                            
                            updateQuery('selectedMetricTypeList', newQuery);
                        }}
                    />
                </InlineField>
            </InlineFieldRow>
        </>
    );
};
