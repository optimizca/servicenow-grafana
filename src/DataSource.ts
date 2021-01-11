import defaults from 'lodash/defaults';
import _ from 'lodash';
import { DataQueryRequest, DataQueryResponse, DataSourceApi, LoadingState } from '@grafana/data';

import { PluginQuery, PluginDataSourceOptions, CustomVariableQuery, defaultQuery } from './types';
import { SNOWManager } from 'SnowManager';

export class DataSource extends DataSourceApi<PluginQuery, PluginDataSourceOptions> {
  snowConnection: SNOWManager;

  constructor(instanceSettings) {
    super(instanceSettings);
    const connectionOptions = {
      type: instanceSettings.type,
      url: instanceSettings.url,
      name: instanceSettings.name,
      basicAuth: instanceSettings.basicAuth,
      withCredentials: instanceSettings.withCredentials,
    };
    this.snowConnection = new SNOWManager(connectionOptions);
  }

  async metricFindQuery(query: CustomVariableQuery, options?: any) {
    console.log('inside template variables metricFindQuery');

    if (query.namespace === 'services') {
      return this.snowConnection.getServices('');
    }

    if (query.namespace === 'cis') {
      return this.snowConnection.getCIs('');
    }
    if (query.namespace === 'acc_agents') {
      console.log('isnide cis');
    }

    return [];
  }

  async query(options: DataQueryRequest<PluginQuery>): Promise<DataQueryResponse> {
    const { range } = options;
    const from = range.from.valueOf();
    const to = range.to.valueOf();
    let queryTopologyType: string = options.targets[0].selectedQueryCategory.value as string;
    if (queryTopologyType === 'Topology') {
      return this.snowConnection.getTopologyFrame(options.targets[0], from, to, options);
    }

    const promises = _.map(options.targets, t => {
      if (t.hide) {
        return [];
      }
      let target = _.cloneDeep(t);

      const query = defaults(target, defaultQuery);
      let queryType: string = query.selectedQueryCategory.value as string;
      switch (queryType) {
        case 'Metrics':
          return this.snowConnection.getMetricsFrames(target, from, to, options);
          break;
        case 'Alerts':
          return this.snowConnection.getTextFrames(target, from, to, options, 'Alerts');
          break;
        case 'Topology':
          return this.snowConnection.getTopology(target, from, to, options);
          break;
        case 'Admin':
          return this.snowConnection.getTextFrames(target, from, to, options, 'Admin');
          break;
        default:
          return [];
      }
    }); //end of targets iteration

    // Data for panel (all targets)
    //console.log(promises);
    /*Promise.all(promises).then((values) => {
      console.log("print promises");
      console.log(values);
    });*/
    return Promise.all(_.flatten(promises))
      .then(_.flatten)
      .then(data => {
        return {
          data,
          state: LoadingState.Done,
          key: options.requestId,
        };
      });
  }

  testDatasource() {
    return this.snowConnection.apiClient
      .request({
        url: '/',
        method: 'GET',
      })
      .then(response => {
        if (response.status === 200) {
          return {
            status: 'success',
            message: 'Data source connection is successful',
            title: 'Success',
          };
        }
        return {
          status: 'error',
          message: `Data source connection failed: ${response.message}`,
          title: 'Error',
        };
      });
  }
}
