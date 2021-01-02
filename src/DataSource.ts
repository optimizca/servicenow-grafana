import { BackendSrv } from '@grafana/runtime';
import defaults from "lodash/defaults";
import { getTemplateSrv } from '@grafana/runtime'

import {
  DataQueryRequest,
  DataQueryResponse,
  DataSourceApi,
  DataSourceInstanceSettings,
  MutableDataFrame,
} from '@grafana/data';

import { PluginQuery, PluginDataSourceOptions, CustomVariableQuery, defaultQuery } from './types';
import { SNOWManager } from 'SNOWManager';

export class DataSource extends DataSourceApi<PluginQuery, PluginDataSourceOptions> {
  instanceName: string;
  authInfo: string;
  corsProxy: string;
  backendSrv: BackendSrv;
  snowConnection: SNOWManager;

  constructor(
    instanceSettings: DataSourceInstanceSettings<PluginDataSourceOptions>,
    backendSrv: BackendSrv
  ) {
    super(instanceSettings);
    this.instanceName = instanceSettings.jsonData.instanceName as string;
    //TODO: this auth info is hardcoded as of now as the browser is still
    //picking jsonData.moogApiKey and not authinfo
    this.authInfo = instanceSettings.jsonData.authInfo as string;
    this.authInfo = "Basic b3B0aW1pejpvcHRpbWl6";
    this.corsProxy = instanceSettings.jsonData.corsProxy as string;
    this.backendSrv = backendSrv;
    this.snowConnection = new SNOWManager(this.backendSrv);
  }

  async metricFindQuery(query: CustomVariableQuery, options?: any) {
    console.log('inside metricFindQuery');
    let values = this.snowConnection.getServers(this.corsProxy + "/" + "https://kpparis2demo.service-now.com/api/488905/oimetrics/search",
      'POST',
      this.authInfo,
      '{\"targets\":[{\"target\":\"EC2AMAZ-8AMDGC0\"}]}'
    );
    return values;
  }

  async query(options: DataQueryRequest<PluginQuery>): Promise<DataQueryResponse> {
    // Return a constant for each query.
    const data = await Promise.all(options.targets.map(async target => {
      const query = defaults(target, defaultQuery);
      let queryType: string = query.selectedQueryCategory.value as string;
      console.log('queryType : ' + queryType);
      console.log('Selected value for query variable : ' + target.services);
      //e.g. if the query variable is server and the value in the query editor is like $server
      //then it will be replaced at runtime by the actual value of the variable selected in
      //the dropdown
      const replacedValue = getTemplateSrv().replace(target.services, options.scopedVars);
      console.log('replacedValue for query variable : ' + replacedValue);

      let queryResults: MutableDataFrame;
      //Here we will get and return results based on the query type e.g. Alerts, Events etc
      switch (queryType) {
        case 'Alerts':
          queryResults = await this.snowConnection.getAPIResults(this.corsProxy + "/" + 'https://kpparis2demo.service-now.com/api/488905/oimetrics/query',
            this.corsProxy,
            this.authInfo,
            'cpu_loadavgsec',
            '{\"targets\":[{\"target\":\"EC2AMAZ-8AMDGC0\"}]}');
          break;
      }

      return queryResults;
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
