import {
    Input,
    InlineField,
    InlineFieldRow,
} from '@grafana/ui';

import React from 'react';

export const InputExcludedClasses = ({ updateQuery, defaultValue }) => {
    return (
        <>
            <InlineFieldRow>
                <InlineField label="Excluded Classes" labelWidth={20}>
                    <Input
                        width={20}
                        name="excluded_classes"
                        defaultValue={defaultValue}
                        onBlur={(e) => updateQuery('topology_filter', e.target.value)}
                    />
                </InlineField>
            </InlineFieldRow>
        </>
    );
};