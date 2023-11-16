import React, { useState } from 'react';
import { CustomVariableQuery } from './types';
import { InlineFieldRow, InlineField, Select, Input, Alert, VerticalGroup, InlineSwitch } from '@grafana/ui';

interface VariableQueryProps {
  query: CustomVariableQuery;
  onChange: (query: CustomVariableQuery, definition: string | boolean) => void;
}

export const VariableQueryEditor: React.FC<VariableQueryProps> = ({ onChange, query }) => {
  const [state, setState] = useState(query);

  const saveQuery = () => {
    onChange(state, `${state.rawQuery} (${state.namespace}) ${state.showAsterisk}`);
  };

  const handleChange = (key: string, value: string | boolean | undefined) => {
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
    { label: 'group_by', value: 'group_by' },
    { label: 'nested_cis', value: 'nested_cis' },
    { label: 'v2_nested_cis', value: 'v2_nested_cis' },
    { label: 'nested_classes', value: 'nested_classes' },
    { label: 'v2_nested_classes', value: 'v2_nested_classes' },
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
        <InlineField label="Query" labelWidth={20} grow={true}>
          <Input
            name="rawQuery"
            onChange={(v: any) => handleChange('rawQuery', v.target.value)}
            onBlur={saveQuery}
            value={state.rawQuery}
          />
        </InlineField>
      </InlineFieldRow>
      <InlineFieldRow>
        <InlineField
          labelWidth={20}
          label="Add Asterisk"
          tooltip='The "ALL" option represents all the available choices in the variable list, while the "*" option represents any value.'
        >
          <InlineSwitch
            disabled={false}
            onBlur={saveQuery}
            transparent={false}
            value={state.showAsterisk}
            onChange={(v: any) => handleChange('showAsterisk', v.target.checked)}
          />
        </InlineField>
      </InlineFieldRow>
      <InlineFieldRow>
        <InlineField labelWidth={20} label="Add NULL" tooltip='The "NULL" option represents an empty value'>
          <InlineSwitch
            disabled={false}
            onBlur={saveQuery}
            transparent={false}
            value={state.showNull}
            onChange={(v: any) => handleChange('showNull', v.target.checked)}
          />
        </InlineField>
      </InlineFieldRow>
      <Alert title={''} severity="info">
        <VerticalGroup>
          <p>
            Documentation for variables can be found{' '}
            <a
              href="https://github.com/optimizca/servicenow-grafana#variables"
              rel="noopener noreferrer"
              target="_blank"
            >
              (Here)
            </a>
          </p>
        </VerticalGroup>
      </Alert>
    </>
  );
};
