import React from 'react';
import { DataSourcePluginOptionsEditorProps } from '@grafana/data';
import { ConfigEditOptions, ConfigEditSecureJsonData } from './types';
import { DataSourceHttpSettings } from '@grafana/ui';

export type Props = DataSourcePluginOptionsEditorProps<ConfigEditOptions, ConfigEditSecureJsonData>;

export const ConfigEditor = (props: Props) => {
  const { options, onOptionsChange } = props;

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

  return (
    <>
      <DataSourceHttpSettings
        defaultUrl={'https://<instance_name>.service-now.com/api/snc/grafana_api'}
        dataSourceConfig={options}
        showAccessOptions={true}
        onChange={customOnChange}
      />
    </>
  );
};
