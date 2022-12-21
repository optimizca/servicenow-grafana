import {
    Input,
    InlineField,
    InlineFieldRow,
} from '@grafana/ui';

import React from 'react';

export const InputParentDepth = ({ updateQuery, defaultValue }) => {
    return (
        <>
            <InlineFieldRow>
                <InlineField label="Parent Depth" labelWidth={20}>
                    <Input
                        width={20}
                        name="parent_depth"
                        defaultValue={defaultValue}
                        type={"number"}
                        min={0}
                        max={5}
                        onBlur={(e) => updateQuery('topology_parent_depth', e.target.value)}
                    />
                </InlineField>
            </InlineFieldRow>
        </>
    );
};
