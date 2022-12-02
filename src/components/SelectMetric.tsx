import {
    InlineField,
    AsyncSelect,
    InlineFieldRow,
} from '@grafana/ui';

import React from 'react';

export const SelectMetric = ({ loadOptions, value, updateQuery }) => {
    return (
        <>
            <InlineFieldRow>
                <InlineField label="Metric Name" labelWidth={20}>
                    <AsyncSelect
                        width={20}
                        value={value}
                        isMulti={true}
                        isClearable={true}
                        maxMenuHeight={200}
                        isSearchable={true}
                        defaultValue={value}
                        allowCustomValue={true}
                        className="coloredSelect"
                        loadOptions={loadOptions}
                        backspaceRemovesValue={true}
                        onChange={(v) => updateQuery('selectedMetricNameList', v)}
                        onCreateOption={(v) => {
                            var newQuery: any[] = [];
                            if (typeof value !== 'undefined') {
                                newQuery = [...value];
                                newQuery[newQuery.length] = { label: v, value: v };
                            } else {
                                newQuery = [{ label: v, value: v }];
                            }
                            
                            updateQuery('selectedMetricNameList', newQuery);
                        }}
                    />
                </InlineField>
            </InlineFieldRow>
        </>
    );
};