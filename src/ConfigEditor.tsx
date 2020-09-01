import React, { ChangeEvent, PureComponent } from 'react';
import { LegacyForms } from '@grafana/ui';
import { DataSourcePluginOptionsEditorProps } from '@grafana/data';
//import { MyDataSourceOptions, MySecureJsonData } from './types';
import { MyDataSourceOptions} from './types';

//const { SecretFormField, FormField } = LegacyForms;
const { FormField } = LegacyForms;

interface Props extends DataSourcePluginOptionsEditorProps<MyDataSourceOptions> { }

interface State { }

export class ConfigEditor extends PureComponent<Props, State> {
  onPathChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onOptionsChange, options } = this.props;
    const jsonData = {
      ...options.jsonData,
      path: event.target.value,
    };
    onOptionsChange({ ...options, jsonData });
  };

  onResolutionChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onOptionsChange, options } = this.props;
    const jsonData = {
      ...options.jsonData,
      resolution: parseFloat(event.target.value),
    };
    onOptionsChange({ ...options, jsonData });
  };

  onKeyChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onOptionsChange, options } = this.props;
    const jsonData = {
      ...options.jsonData,
      moogApiKey: event.target.value,
    };
    onOptionsChange({ ...options, jsonData });
  };


  // Secure field (only sent to the backend)
  onAPIKeyChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onOptionsChange, options } = this.props;
    onOptionsChange({
      ...options,
      secureJsonData: {
        apiKey: event.target.value,
      },
    });
    
    /*const jsonData = {
      ...options.jsonData,
      moogApiKey: event.target.value,
    };
    console.log("event.target.value : " + event.target.value);
    console.log("moogApiKey : " + JSON.stringify(jsonData));
    onOptionsChange({ ...options, jsonData });
    */
  };

  onResetAPIKey = () => {
    const { onOptionsChange, options } = this.props;
    onOptionsChange({
      ...options,
      secureJsonFields: {
        ...options.secureJsonFields,
        apiKey: false,
      },
      secureJsonData: {
        ...options.secureJsonData,
        apiKey: '',
      },
    });
  };

  onInstanceNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onOptionsChange, options } = this.props;
    const jsonData = {
      ...options.jsonData,
      instanceName: event.target.value,
    };
    onOptionsChange({ ...options, jsonData });
  };

  render() {
    const { options } = this.props;
    //const { jsonData, secureJsonFields } = options;
    const { jsonData } = options;
    //const secureJsonData = (options.secureJsonData || {}) as MySecureJsonData;

    return (
      <div className="gf-form-group">
        <div className="gf-form">
          <FormField
            label="Resolution"
            labelWidth={10}
            inputWidth={20}
            onChange={this.onResolutionChange}
            value={jsonData.resolution || ''}
            placeholder="Enter a number for resolution"
          />
        </div>

        <div className="gf-form">
          <FormField
            label="Moogsoft Instance"
            labelWidth={10}
            inputWidth={20}
            onChange={this.onInstanceNameChange}
            value={jsonData.instanceName || ''}
            placeholder="Enter Moogsoft Instance details"
          />
        </div>

      </div>
    );
  }
}
