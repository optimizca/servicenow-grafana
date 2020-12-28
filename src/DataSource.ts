import { BackendSrv } from '@grafana/runtime';

import {
  DataQueryRequest,
  DataQueryResponse,
  DataSourceApi,
  DataSourceInstanceSettings,
} from '@grafana/data';

import { PluginQuery, PluginDataSourceOptions, CustomVariableQuery } from './types';
import { SNOWManager } from 'SNOWManager';

export class DataSource extends DataSourceApi<PluginQuery, PluginDataSourceOptions> {
  instanceName: string;
  authInfo: string;
  corsProxy: string;
  backendSrv: BackendSrv;

  constructor(
    instanceSettings: DataSourceInstanceSettings<PluginDataSourceOptions>,
    backendSrv:BackendSrv
  ) {
    super(instanceSettings);
    this.instanceName = instanceSettings.jsonData.instanceName as string;
    //TODO: this auth info is hardcoded as of now as the browser is still
    //picking jsonData.moogApiKey and not authinfo
    //this.authInfo = instanceSettings.jsonData.authInfo as string;
    this.authInfo = "Basic b3B0aW1pejpvcHRpbWl6";
    this.corsProxy = instanceSettings.jsonData.corsProxy as string;
    this.backendSrv = backendSrv;
  }

  async metricFindQuery(query: CustomVariableQuery, options?: any) {
    console.log('inside metricFindQuery...');
    let response = await this.backendSrv.datasourceRequest({
      url: this.corsProxy + "/" + "https://kpparis2demo.service-now.com/api/488905/oimetrics/search",
      method: 'POST',
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": this.authInfo
      }),
      body: "{\"targets\":[{\"target\":\"EC2AMAZ-8AMDGC0\"}]}",
      });
    console.log('Got search results : ' + response);
    const values = response.data.map(frame => ({ 
      text: frame 
    }));
    return values;
  }

  async query(options: DataQueryRequest<PluginQuery>): Promise<DataQueryResponse> {
    // Return a constant for each query.
    const data = await Promise.all(options.targets.map(async target => {
    let snowManager = new SNOWManager();
    console.log('returning from dagtasource..');
    // if matric -> call metric api else geoLoc API
    return await snowManager.getAPIResults('https://kpparis2demo.service-now.com/api/488905/oimetrics/query', 
      this.corsProxy,
      this.authInfo,
      'cpu_loadavgsec');
    }));

    return { data };
  }

  async testDatasource() {
    //TODO: Implement a health check for the data source here.
    return {
      status: 'success',
      message: 'Success',
    };
  }
}
