import {
    Input,
    InlineField,
    InlineFieldRow,
} from '@grafana/ui';

import React from 'react';

export const InputChildDepth = ({ updateQuery, defaultValue }) => {
    return (
        <>
            <InlineFieldRow>
                <InlineField label="Child Depth" labelWidth={20}>
                    <Input
                        width={20}
                        name="child_depth"
                        defaultValue={defaultValue}
                        type={"number"}
                        min={0}
                        max={5}
                        onBlur={(e) => updateQuery('topology_child_depth', e.target.value)}
                    />
                </InlineField>
            </InlineFieldRow>
        </>
    );
  };
