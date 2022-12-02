import {
    InlineFieldRow,
    InlineField,
    Input,
  } from '@grafana/ui';
  import React from 'react';

export const InputElasticSearch = ({ updateQuery, defaultValue }) => {
    return (
      <>
        <InlineFieldRow>
          <InlineField label="Elastic Search Query" labelWidth={20}>
            <Input
              name="elasticSearch"
              width={20}
              defaultValue={defaultValue}
              onBlur={(e) => updateQuery('elasticSearch', e.target.value)}
            />
          </InlineField>
        </InlineFieldRow>
      </>
    );
  };