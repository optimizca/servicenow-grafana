import defaults from 'lodash/defaults';
import { getTemplateSrv } from '@grafana/runtime';

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
      let replacedValue = getTemplateSrv().replace(query.rawQuery, options.scopedVars, 'csv');

      return this.snowConnection.getServices(replacedValue);
    }

    if (query.namespace === 'cis') {
      console.log('inside ci template variables metricFindQuery');
      console.log(options);
      let replacedValue = getTemplateSrv().replace(query.rawQuery, options.scopedVars, 'csv');
      console.log('replacedValue= ' + replacedValue);
      return this.snowConnection.getCIs('', replacedValue);
    }
    if (query.namespace === 'acc_agents') {
      console.log('isnide cis');
    }

    if (query.namespace === 'metric_names') {
      console.log('inside metric name variables metricFindQuery');
      let replacedValue = getTemplateSrv().replace(query.rawQuery, options.scopedVars, 'csv');
      console.log('replacedValue= ' + replacedValue);
      let fullMetrics = await this.snowConnection.getMetricsDefinition('', 0, 0, '');
      let metric_name_array: any = [];
      for(let i = 0; i < fullMetrics.values.ci['buffer'].length; i++) {
        if (fullMetrics.values.ci['buffer'][i] == replacedValue && fullMetrics.values.metric_tiny_name['buffer'][i] != '') {
          metric_name_array.push({
            text: fullMetrics.values.metric_tiny_name['buffer'][i],
            value: fullMetrics.values.metric_tiny_name['buffer'][i]
          });
        }
      }
      console.log(metric_name_array);
      return metric_name_array;
    }

    if (query.namespace === 'resource_ids') {
      console.log('inside resource id variables metricFindQuery');
      let replacedValue = getTemplateSrv().replace(query.rawQuery, options.scopedVars, 'csv');
      console.log('replacedValue= ' + replacedValue);
      let fullMetrics = await this.snowConnection.getMetricsDefinition('', 0, 0, '');
      let resource_id_array: any = [];
      for(let i = 0; i < fullMetrics.values.ci['buffer'].length; i++) {
        if (fullMetrics.values.ci['buffer'][i] == replacedValue && fullMetrics.values.resource_id['buffer'][i] != '') {
          resource_id_array.push({
            text: fullMetrics.values.resource_id['buffer'][i],
            value: fullMetrics.values.resource_id['buffer'][i]
          });
        }
      }
      console.log(resource_id_array);
      return resource_id_array;
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
