import React, { useState, useEffect } from 'react';
import { DataSourcePluginOptionsEditorProps } from '@grafana/data';
import { ConfigEditOptions, ConfigEditSecureJsonData } from './types';
import { DataSourceHttpSettings, InlineFieldRow, InlineField, Input, Alert, VerticalGroup } from '@grafana/ui';

export type Props = DataSourcePluginOptionsEditorProps<ConfigEditOptions, ConfigEditSecureJsonData>;

export const ConfigEditor = (props: Props) => {
  const { options, onOptionsChange } = props;
  const [configValues, setConfigValues]: any = useState(options);

  useEffect(() => {
    onOptionsChange(configValues);
  }, [configValues, onOptionsChange]);

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
    setConfigValues((prev) => ({
      ...prev,
      jsonData: {
        ...prev.jsonData,
        [key]: value,
      },
    }));
  };

  return (
    <>
      <Alert title="How do I set this up for my own instance?" severity="warning" elevated={true}>
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
      <Alert title="What URL do I enter?" severity="info">
        <VerticalGroup>
          <div>https://&lt;your_instance_name&gt;.service-now.com/api/snc/grafana_api</div>
        </VerticalGroup>
      </Alert>
      <DataSourceHttpSettings
        defaultUrl="https://<instance_name>.service-now.com/api/snc/grafana_api"
        dataSourceConfig={options}
        showAccessOptions={true}
        onChange={customOnChange}
      />
      <InlineFieldRow>
        <InlineField
          labelWidth={20}
          label="Global Image URL"
          tooltip="To access this value in each dashboard, create a variable query using namespace: global_image."
        >
          <Input
            defaultValue={typeof options.jsonData['imageURL'] === 'undefined' ? '' : options.jsonData['imageURL']}
            onBlur={(v) => onChangeJsonData('imageURL', v.target.value)}
            width={60}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  );
};
