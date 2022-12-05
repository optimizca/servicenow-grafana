import {
    InlineField,
    AsyncSelect,
    InlineFieldRow,
} from '@grafana/ui';

import React from 'react';

export const SelectCI = ({ loadOptions, value, updateQuery }) => {
    return (
        <>
            <InlineFieldRow>
                <InlineField label="CI" labelWidth={20}>
                    <AsyncSelect
                        width={40}
                        value={value}
                        isMulti={true}
                        isClearable={true}
                        maxMenuHeight={200}
                        isSearchable={true}
                        defaultValue={value}
                        menuPlacement="bottom"
                        allowCustomValue={true}
                        loadOptions={loadOptions}
                        backspaceRemovesValue={true}
                        onChange={(v) => updateQuery('selectedSourceList', v)}
                        onCreateOption={(v) => {
                            let newQuery: any[] = [];

                            if (typeof value !== 'undefined') {
                                newQuery = [...value];
                                newQuery[newQuery.length] = { label: v, value: v };
                            } else {
                                newQuery = [{ label: v, value: v }];
                            }

                            updateQuery('selectedSourceList', newQuery);
                        }}
                    />
                </InlineField>
            </InlineFieldRow>
        </>
    );
  };
