import React, { useState } from 'react';
import { CustomVariableQuery } from './types';
import { InlineFieldRow, InlineField, Select, Input } from '@grafana/ui';

interface VariableQueryProps {
  query: CustomVariableQuery;
  onChange: (query: CustomVariableQuery, definition: string) => void;
}

export const VariableQueryEditor: React.FC<VariableQueryProps> = ({ onChange, query }) => {
  const [state, setState] = useState(query);

  const saveQuery = () => {
    onChange(state, `${state.rawQuery} (${state.namespace})`);
  };

  const handleChange = (key: string, value: string | undefined) => {
    setState({
      ...state,
      [key]: value,
    });
  };

  const namespaceOptions = [
    { label: 'global_image', value: 'global_image' },
    { label: 'global_instance_name', value: 'global_instance_name' },
    { label: 'metric_names', value: 'metric_names' },
    { label: 'golden_metric_names', value: 'golden_metric_names' },
    { label: 'custom_kpis', value: 'custom_kpis' },
    { label: 'generic', value: 'generic' },
    { label: 'nested_cis', value: 'nested_cis' },
    { label: 'nested_classes', value: 'nested_classes' },
    { label: 'tagKeys', value: 'tagKeys' },
    { label: 'tagValues', value: 'tagValues' },
  ];

  return (
    <>
      <InlineFieldRow>
        <InlineField label="Namespace" labelWidth={20}>
          <Select
            options={namespaceOptions}
            value={state.namespace}
            onChange={(v) => handleChange('namespace', v.value)}
            allowCustomValue={false}
            isClearable={false}
            isSearchable={true}
            onBlur={saveQuery}
            width={30}
          />
        </InlineField>
      </InlineFieldRow>
      <InlineFieldRow>
        <InlineField label="Query" labelWidth={20}>
          <Input
            name="rawQuery"
            onChange={(v: any) => handleChange('rawQuery', v.target.value)}
            onBlur={saveQuery}
            value={state.rawQuery}
            width={190}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  );
};
