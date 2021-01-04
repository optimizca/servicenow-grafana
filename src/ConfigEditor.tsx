import React, { PureComponent, ChangeEvent } from "react";
import {
  DataSourcePluginOptionsEditorProps,
  onUpdateDatasourceJsonDataOption,
  onUpdateDatasourceResetOption,
  onUpdateDatasourceSecureJsonDataOption
} from "@grafana/data";
import { ConfigEditOptions, ConfigEditSecureJsonData } from "./types";
import {
  DataSourceHttpSettings,
  InlineFormLabel,
  Input,
  Button
} from "@grafana/ui";

export type Props = DataSourcePluginOptionsEditorProps<
  ConfigEditOptions,
  ConfigEditSecureJsonData
>;

export class ConfigEditor extends PureComponent<Props> {
  render() {
    const { options, onOptionsChange } = this.props;
    const secureJsonData = options.secureJsonData || {};
    const jsonData = options.jsonData || {};
    const tokenConfigured = options?.secureJsonFields?.token === true;

    return (
      <>
        {true && (
          <DataSourceHttpSettings
            defaultUrl={"https://<instance_name>.service-now.com"}
            dataSourceConfig={options}
            showAccessOptions={true}
            onChange={onOptionsChange}
          />
        )}
      </>
    );
  }
}
