import React from 'react';
import { DataSourcePluginOptionsEditorProps } from '@grafana/data';
import { ConfigEditOptions, ConfigEditSecureJsonData } from './types';
import { DataSourceHttpSettings, InlineFieldRow, InlineField, Input, Alert, VerticalGroup } from '@grafana/ui';

export type Props = DataSourcePluginOptionsEditorProps<ConfigEditOptions, ConfigEditSecureJsonData>;

export const ConfigEditor = (props: Props) => {
  const { options, onOptionsChange } = props;
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

  return (
    <>
      <Alert title="How do I set this up for my own instance?" severity="info" elevated={true}>
        <VerticalGroup>
          <div>
            You must install our application in your ServiceNow instance through source control. This will provide you
            with all the required api&apos;s to make the plugin function.
          </div>
          <a href="https://github.com/R2DToo/Grafana-Plugin-ServiceNow" target="_blank" rel="noreferrer noopener">
            ServiceNow Application GitHub Repo Here
          </a>
        </VerticalGroup>
      </Alert>
      <Alert title="What fields do I need to enter?" severity="info">
        <VerticalGroup>
          <ul>
            <li>Logo URL: &lt;link_to_logo_image&gt;</li>
            <li>API Path: /api/snc/grafana_api</li>
            <li>URL: https://&lt;your_instance_name&gt;.service-now.com/</li>
            <li>Basic Auth: True</li>
            <li>With Credentials: True</li>
            <li>User: &lt;service-now_username&gt;</li>
            <li>Password: &lt;service-now_password&gt;</li>
          </ul>
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
            placeholder="/api/snc/grafana_api"
            width={40}
          />
        </InlineField>
      </InlineFieldRow>
      <DataSourceHttpSettings
        defaultUrl="https://<instance_name>.service-now.com/"
        dataSourceConfig={options}
        showAccessOptions={true}
        onChange={customOnChange}
      />
    </>
  );
};
