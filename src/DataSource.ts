import defaults from 'lodash/defaults';
import { getTemplateSrv } from '@grafana/runtime';

import _ from 'lodash';
import { DataQueryRequest, DataQueryResponse, DataSourceApi, LoadingState } from '@grafana/data';

import { PluginQuery, PluginDataSourceOptions, CustomVariableQuery, defaultQuery } from './types';
import { SNOWManager } from 'SnowManager';

export class DataSource extends DataSourceApi<PluginQuery, PluginDataSourceOptions> {
  snowConnection: SNOWManager;
  annotations: {};

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
    this.annotations = {};
  }

  async metricFindQuery(query: CustomVariableQuery, options?: any) {
    console.log('inside template variables metricFindQuery');

    if (query.namespace === 'services') {
      let replacedValue = getTemplateSrv().replace(query.rawQuery, options.scopedVars, 'csv');

      return this.snowConnection.getServices(replacedValue);
    }
    if (query.namespace === 'application_services') {
      let replacedValue = '';
      if (query.rawQuery) {
        replacedValue = getTemplateSrv().replace(query.rawQuery, options.scopedVars, 'csv');
      }

      return this.snowConnection.getApplicationServices(replacedValue);
    }
    if (query.namespace === 'cis') {
      console.log('inside ci template variables metricFindQuery');
      console.log(options);
      console.log(query);
      let replacedValue = getTemplateSrv().replace(query.rawQuery, options.scopedVars, 'csv');
      console.log('replacedValue= ' + replacedValue);
      return this.snowConnection.getCIs('', replacedValue);
    }
    if (query.namespace === 'cis_sysquery') {
      console.log('inside cis_sysquery');
      let sysparm_query = getTemplateSrv().replace(query.rawQuery, options.scopedVars, 'csv');

      return this.snowConnection.getCIs(sysparm_query, '');
    }

    if (query.namespace === 'classes') {
      let replacedValue = '';
      if (query.rawQuery) {
        replacedValue = getTemplateSrv().replace(query.rawQuery, options.scopedVars, 'csv');
      }
      return this.snowConnection.getMonitoredCIsClasses(replacedValue);
    }
    if (query.namespace === 'acc_agents') {
      console.log('isnide cis');
    }

    if (query.namespace === 'metric_names') {
      console.log('inside metric name variables metricFindQuery');
      console.log(options);
      let replacedValue = getTemplateSrv().replace(query.rawQuery, options.scopedVars, 'csv');
      console.log('RawQuery replacedValue= ' + replacedValue);
      let cis = replacedValue.split(',');
      return this.snowConnection.getMetricNamesInCIs('', cis);
      //
      //return this.snowConnection.getMetricsColumnForCI('', 0, 0, '', cis, 'metric_tiny_name');
    }
    if (query.namespace === 'golden_metric_names') {
      console.log('inside metric name variables metricFindQuery');
      console.log(options);
      let replacedValue = getTemplateSrv().replace(query.rawQuery, options.scopedVars, 'csv');
      console.log('RawQuery replacedValue= ' + replacedValue);
      let cis = replacedValue.split(',');
      return this.snowConnection.getMetricNamesInCIs('GOLDEN', cis);
      //
      //return this.snowConnection.getMetricsColumnForCI('', 0, 0, '', cis, 'metric_tiny_name');
    }
    if (query.namespace === 'custom_kpis') {
      console.log('inside metric name variables metricFindQuery');
      console.log(options);
      let replacedValue = getTemplateSrv().replace(query.rawQuery, options.scopedVars, 'csv');
      console.log('RawQuery replacedValue= ' + replacedValue);
      let cis = replacedValue.split(',');
      return this.snowConnection.getMetricNamesInCIs('CUSTOM_KPIS', cis);
    }
    if (query.namespace === 'nested_cis') {
      console.log('inside nested cis variable query');
      let values = query.rawQuery.split('||');
      values.map((value, i) => {
        values[i] = getTemplateSrv().replace(value, options.scopedVars, 'csv');
        if (values[i].indexOf('$') === 0) values = values.splice(i);
      });
      var valuesObj = {
        ci: values[0],
        parentDepth: values[1],
        childDepth: values[2],
        namespaces: values[3],
        excludeClasses: values[4],
        dependsOn: values[5],
      };
      console.log(valuesObj);
      var nested_cis = this.snowConnection.getNestedCIS(valuesObj);
      console.log('nested cis return: ', nested_cis);
      return nested_cis;
    }
    if (query.namespace === 'nested_classes') {
      console.log('inside nested cis variable query');
      let values = query.rawQuery.split('||');
      values.map((value, i) => {
        values[i] = getTemplateSrv().replace(value, options.scopedVars, 'csv');
        if (values[i].indexOf('$') === 0) values = values.splice(i);
      });
      var classesObj = {
        ci: values[0],
        parentDepth: values[1],
        childDepth: values[2],
        namespaces: values[3],
        excludeClasses: '',
        dependsOn: values[4],
      };
      console.log(classesObj);
      return this.snowConnection.getNestedClasses(classesObj);
    }
    if (query.namespace === 'kubernetes_namespaces') {
      console.log('inside kubernetes namespaces query');
      return this.snowConnection.getKubernetesNamespaces();
    }
    if (query.namespace === 'aws_regions') {
      console.log('inside aws region variable query');
      return this.snowConnection.getAWSRegions();
    }
    if (query.namespace === 'generic') {
      console.log('inside generic variable query');
      let values = query.rawQuery.split('||');
      var tableName = getTemplateSrv().replace(values[0], options.scopedVars, 'csv');
      var nameColumn = getTemplateSrv().replace(values[1], options.scopedVars, 'csv');
      var idColumn = getTemplateSrv().replace(values[2], options.scopedVars, 'csv');
      var sysparam = getTemplateSrv().replace(values[3], options.scopedVars, 'csv') || '';
      return this.snowConnection.getGenericVariable(tableName, nameColumn, idColumn, sysparam);
    }
  }

  async query(options: DataQueryRequest<PluginQuery>): Promise<DataQueryResponse> {
    const { range } = options;
    const from = range.from.valueOf();
    const to = range.to.valueOf();
    let queryTopologyType: string = options.targets[0].selectedQueryCategory.value as string;
    if (queryTopologyType === 'Topology') {
      return this.snowConnection.getTopologyFrame(options.targets[0], from, to, options);
    }

    const promises = _.map(options.targets, (t) => {
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
        case 'CI_Summary':
          return this.snowConnection.getTextFrames(target, from, to, options, 'CI_Summary');
          break;
        case 'Changes':
          return this.snowConnection.getTextFrames(target, from, to, options, 'Changes');
          break;
        case 'Agents':
          return this.snowConnection.getTextFrames(target, from, to, options, 'Agents');
        case 'Live_Agent_Data':
          return this.snowConnection.getLiveACCData(target, options);
        case 'Generic':
          return this.snowConnection.getTextFrames(target, from, to, options, 'Generic');
        case 'Database_Views':
          return this.snowConnection.getTextFrames(target, from, to, options, 'Database_Views');
        case 'Row_Count':
          return this.snowConnection.getRowCount(target, options);
        case 'Aggregate':
          return this.snowConnection.getAggregateQuery(target, options);
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
      .then((data) => {
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
      .then((response) => {
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
