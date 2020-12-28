import React, { ChangeEvent, PureComponent } from "react";
import { LegacyForms } from "@grafana/ui";
import { DataSourcePluginOptionsEditorProps } from "@grafana/data";
import { PluginDataSourceOptions } from "./types";

const { FormField } = LegacyForms;

interface Props
  extends DataSourcePluginOptionsEditorProps<PluginDataSourceOptions> {}

interface State {}

export class ConfigEditor extends PureComponent<Props, State> {
  onPathChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onOptionsChange, options } = this.props;
    const jsonData = {
      ...options.jsonData,
      path: event.target.value
    };
    onOptionsChange({ ...options, jsonData });
  };

  onResolutionChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onOptionsChange, options } = this.props;
    const jsonData = {
      ...options.jsonData,
      resolution: parseFloat(event.target.value)
    };
    onOptionsChange({ ...options, jsonData });
  };

  onKeyChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onOptionsChange, options } = this.props;
    const jsonData = {
      ...options.jsonData,
      authInfo: event.target.value
    };
    onOptionsChange({ ...options, jsonData });
  };

  // Secure field (only sent to the backend)
  onAuthInfoChange = (event: ChangeEvent<HTMLInputElement>) => {
    /*const { onOptionsChange, options } = this.props;
    onOptionsChange({
      ...options,
      secureJsonData: {
        apiKey: event.target.value,
      },
    });
    */
    const { onOptionsChange, options } = this.props;
    const jsonData = {
      ...options.jsonData,
      authInfo: event.target.value
    };
    onOptionsChange({ ...options, jsonData });
  };

  onResetAuthInfo = () => {
    const { onOptionsChange, options } = this.props;
    onOptionsChange({
      ...options,
      secureJsonFields: {
        ...options.secureJsonFields,
        apiKey: false
      },
      secureJsonData: {
        ...options.secureJsonData,
        apiKey: ""
      }
    });
  };

  onInstanceNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onOptionsChange, options } = this.props;
    const jsonData = {
      ...options.jsonData,
      instanceName: event.target.value
    };
    onOptionsChange({ ...options, jsonData });
  };

  onCorsProxyChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onOptionsChange, options } = this.props;
    const jsonData = {
      ...options.jsonData,
      corsProxy: event.target.value
    };
    onOptionsChange({ ...options, jsonData });
  };

  render() {
    const { options } = this.props;
    const { jsonData } = options;

    return (
      <div className="gf-form-group">
        <div className="gf-form">
          <FormField
            label="Moogsoft Instance"
            labelWidth={10}
            inputWidth={20}
            onChange={this.onInstanceNameChange}
            value={jsonData.instanceName || ""}
            placeholder="Enter Moogsoft instance URL"
          />
        </div>

        <div className="gf-form">
          <FormField
            label="API Key"
            labelWidth={10}
            inputWidth={20}
            onChange={this.onKeyChange}
            value={jsonData.authInfo || ""}
            placeholder="Enter moogsoft api key"
          />
        </div>

        <div className="gf-form">
          <FormField
            label="Cors Proxy"
            labelWidth={10}
            inputWidth={20}
            onChange={this.onCorsProxyChange}
            value={jsonData.corsProxy || ""}
            placeholder="Enter moogsoft proxy URL"
          />
        </div>
      </div>
    );
  }
}
