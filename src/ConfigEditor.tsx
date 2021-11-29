import React from 'react';
import { DataSourcePluginOptionsEditorProps } from '@grafana/data';
import { ConfigEditOptions, ConfigEditSecureJsonData } from './types';
import { DataSourceHttpSettings, InlineFieldRow, InlineField, Input, Alert, VerticalGroup, Select } from '@grafana/ui';

export type Props = DataSourcePluginOptionsEditorProps<ConfigEditOptions, ConfigEditSecureJsonData>;

export const ConfigEditor = (props: Props) => {
  const { options, onOptionsChange } = props;

  if (options.url === '') {
    options.url = 'https://<instance_name>.service-now.com/';
  }
  if (typeof options.jsonData.apiPath === 'undefined') {
    options.jsonData.apiPath = '/api/snc/grafana_api';
  }
  if (typeof options.jsonData.cacheTimeout === 'undefined') {
    options.jsonData.cacheTimeout = 60;
  }
  if (typeof options.jsonData.imageURL === 'undefined') {
    options.jsonData.imageURL =
      'https://yiij743y0gi4fteri1asp7p6-wpengine.netdna-ssl.com/wp-content/uploads/2019/03/RegoLink-integration-icons-01.png';
  }

  console.log('config opitons: ', options);
  const customOnChange = (v) => {
    var instanceName = '';
    if (v.url.indexOf('https://') !== -1) {
      instanceName = v.url.substring(8, v.url.indexOf('.service-now', 8));
    } else if (v.url.indexOf('http://') !== -1) {
      instanceName = v.url.substring(7, v.url.indexOf('.service-now', 7));
    }
    v.jsonData.instanceName = instanceName;
    onOptionsChange(v);
  };

  const onChangeJsonData = (key, value) => {
    onOptionsChange({
      ...options,
      jsonData: {
        ...options.jsonData,
        [key]: value,
      },
    });
  };

  const cacheOptions = [
    {
      label: '30m',
      value: 1800,
    },
    {
      label: '15m',
      value: 900,
    },
    {
      label: '5m',
      value: 300,
    },
    {
      label: '2m',
      value: 120,
    },
    {
      label: '60s',
      value: 60,
    },
    {
      label: '30s',
      value: 30,
    },
    {
      label: '5s',
      value: 5,
    },
  ];

  return (
    <>
      <Alert title="Need more information?" severity="info" elevated={true}>
        <VerticalGroup>
          <p>Local documentation can be found in Configuration =&#62; Plugins on this plugin&#39;s page</p>
          <p>
            Or{' '}
            <a href="https://github.com/optimizca/servicenow-grafana/blob/main/README.md">
              Click here to view the documentation on GitHub
            </a>
          </p>
        </VerticalGroup>
      </Alert>
      <InlineFieldRow>
        <InlineField
          labelWidth={20}
          label="Logo URL"
          tooltip="To access this value in each dashboard, create a variable query using namespace: global_image."
        >
          <Input
            defaultValue={typeof options.jsonData['imageURL'] === 'undefined' ? '' : options.jsonData['imageURL']}
            onBlur={(v) => onChangeJsonData('imageURL', v.target.value)}
            width={60}
          />
        </InlineField>
      </InlineFieldRow>
      <InlineFieldRow>
        <InlineField labelWidth={20} label="API Path">
          <Input
            defaultValue={typeof options.jsonData['apiPath'] === 'undefined' ? '' : options.jsonData['apiPath']}
            onBlur={(v) => onChangeJsonData('apiPath', v.target.value)}
            width={40}
          />
        </InlineField>
      </InlineFieldRow>
      <InlineFieldRow>
        <InlineField
          labelWidth={20}
          label="Cache Timeout"
          tooltip="Number of seconds to cache a request for. This can be overridden in the query panel."
        >
          <Select
            value={options.jsonData['cacheTimeout']}
            options={cacheOptions}
            allowCustomValue={false}
            backspaceRemovesValue={false}
            isClearable={false}
            isSearchable={true}
            isMulti={false}
            onChange={(v) => onChangeJsonData('cacheTimeout', v.value)}
          />
        </InlineField>
      </InlineFieldRow>
      <DataSourceHttpSettings
        defaultUrl="https://<instance_name>.service-now.com/"
        dataSourceConfig={options}
        showAccessOptions={true}
        sigV4AuthToggleEnabled={false}
        showForwardOAuthIdentityOption={false}
        onChange={customOnChange}
      />
    </>
  );
};
