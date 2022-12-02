import {
    Input,
    InlineField,
    InlineFieldRow,
} from '@grafana/ui';

import React from 'react';

export const InputOsquery = ({ updateQuery, defaultValue }) => {
    return (
        <>
            <InlineFieldRow>
                <InlineField label="Osquery" labelWidth={20}>
                    <Input
                        width={20}
                        name="osquery"
                        defaultValue={defaultValue}
                        onBlur={(e) => updateQuery('live_osquery', e.target.value)}
                    />
                </InlineField>
            </InlineFieldRow>
        </>
    );
};
