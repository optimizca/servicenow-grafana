import React, { PureComponent } from "react";
import { DataSourcePluginOptionsEditorProps } from "@grafana/data";
import { ConfigEditOptions, ConfigEditSecureJsonData } from "./types";
import { DataSourceHttpSettings } from "@grafana/ui";

export type Props = DataSourcePluginOptionsEditorProps<
  ConfigEditOptions,
  ConfigEditSecureJsonData
>;

export class ConfigEditor extends PureComponent<Props> {
  render() {
    const { options, onOptionsChange } = this.props;

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
