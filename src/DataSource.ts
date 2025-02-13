// import defaults from 'lodash/defaults';
// import { getTemplateSrv, DataSourceWithBackend } from '@grafana/runtime';
// import { Observable, from } from 'rxjs';

import _ from 'lodash';
// import { DataQueryRequest, DataQueryResponse, LoadingState } from '@grafana/data';

// import { PluginQuery, PluginDataSourceOptions, CustomVariableQuery, defaultQuery } from './types';
import {DataSourceWithBackend } from '@grafana/runtime';
import { PluginQuery, PluginDataSourceOptions } from './types';
// import { SNOWManager } from 'SnowManager';

export class DataSource extends DataSourceWithBackend<PluginQuery, PluginDataSourceOptions> {
  // snowConnection: SNOWManager;
  annotations: {};
  instanceName: string;
  globalImage: string;
  apiPath: string;

  constructor(instanceSettings: any) {
    super(instanceSettings);
    const connectionOptions = {
      type: instanceSettings.type,
      url: instanceSettings.url,
      name: instanceSettings.name,
      basicAuth: instanceSettings.basicAuth,
      withCredentials: instanceSettings.withCredentials,
      apiPath: instanceSettings.jsonData.apiPath,
      cacheTimeout: instanceSettings.jsonData.cacheTimeout,
    };
    this.globalImage = instanceSettings.jsonData.imageURL;
    this.instanceName = instanceSettings.jsonData.instanceName;
    this.apiPath = connectionOptions.apiPath;
    // this.snowConnection = new SNOWManager(connectionOptions);
    this.annotations = {};
  }

  // async metricFindQuery(query: CustomVariableQuery, options?: any) {
  //   console.log('inside template variables metricFindQuery');
  //   let asterisk = query.showAsterisk;
  //   let showNull = query.showNull;

  //   if (query.namespace === 'global_image') {
  //     return [{ label: this.globalImage, value: this.globalImage }];
  //   }

  //   if (query.namespace === 'global_instance_name') {
  //     return [{ label: this.instanceName, value: this.instanceName }];
  //   }

  //   if (query.namespace === 'group_by') {
  //     console.log('inside group_by variable query');
  //     if (typeof query.rawQuery !== 'undefined') {
  //       let values = query.rawQuery.split('||');
  //       let tableName =
  //         typeof values[0] === 'undefined' ? '' : getTemplateSrv().replace(values[0], options.scopedVars, 'csv');
  //       let nameColumn =
  //         typeof values[1] === 'undefined' ? '' : getTemplateSrv().replace(values[1], options.scopedVars, 'csv');
  //       let sysparam =
  //         typeof values[2] === 'undefined' ? '' : getTemplateSrv().replace(values[2], options.scopedVars, 'csv');
  //       return this.snowConnection.getGroupByVariable(tableName, nameColumn, sysparam, asterisk, showNull);
  //     } else {
  //       return [];
  //     }
  //   }

  //   if (query.namespace === 'generic') {
  //     console.log('inside generic variable query');
  //     if (typeof query.rawQuery !== 'undefined') {
  //       let values = query.rawQuery.split('||');
  //       let tableName =
  //         typeof values[0] === 'undefined' ? '' : getTemplateSrv().replace(values[0], options.scopedVars, 'csv');
  //       let nameColumn =
  //         typeof values[1] === 'undefined' ? '' : getTemplateSrv().replace(values[1], options.scopedVars, 'csv');
  //       let idColumn =
  //         typeof values[2] === 'undefined' ? '' : getTemplateSrv().replace(values[2], options.scopedVars, 'csv');
  //       let sysparam =
  //         typeof values[3] === 'undefined' ? '' : getTemplateSrv().replace(values[3], options.scopedVars, 'csv');
  //       let limit =
  //         typeof values[4] === 'undefined' ? '9999' : getTemplateSrv().replace(values[4], options.scopedVars, 'csv');

  //       let parsedSysParam = this.snowConnection.singleSysParamQuery(sysparam);
  //       sysparam = this.snowConnection.parseBasicSysparm(parsedSysParam, options);

  //       return this.snowConnection.getGenericVariable(
  //         tableName,
  //         nameColumn,
  //         idColumn,
  //         sysparam,
  //         limit,
  //         asterisk,
  //         showNull
  //       );
  //     } else {
  //       return [];
  //     }
  //   }

  //   if (query.namespace === 'metric_names') {
  //     console.log('inside metric name variables metricFindQuery');
  //     console.log(options);

  //     let replacedValue = getTemplateSrv().replace(query.rawQuery, options.scopedVars, 'csv');
  //     console.log('RawQuery replacedValue= ' + replacedValue);

  //     let cis = replacedValue.split(',');
  //     return this.snowConnection.getMetricNamesInCIs('', cis, asterisk, showNull);
  //   }

  //   if (query.namespace === 'golden_metric_names') {
  //     console.log('inside metric name variables metricFindQuery');
  //     console.log(options);
  //     let replacedValue = getTemplateSrv().replace(query.rawQuery, options.scopedVars, 'csv');
  //     console.log('RawQuery replacedValue= ' + replacedValue);
  //     let cis = replacedValue.split(',');
  //     return this.snowConnection.getMetricNamesInCIs('GOLDEN', cis, asterisk, showNull);
  //   }

  //   if (query.namespace === 'custom_kpis') {
  //     console.log('inside metric name variables metricFindQuery');
  //     console.log(options);
  //     let replacedValue = getTemplateSrv().replace(query.rawQuery, options.scopedVars, 'csv');
  //     console.log('RawQuery replacedValue= ' + replacedValue);
  //     let cis = replacedValue.split(',');
  //     return this.snowConnection.getMetricNamesInCIs('CUSTOM_KPIS', cis, asterisk, showNull);
  //   }

  //   if (query.namespace === 'nested_cis') {
  //     console.log('inside nested cis variable query');
  //     let values = query.rawQuery.split('||');

  //     values.map((value, i) => {
  //       values[i] = getTemplateSrv().replace(value, options.scopedVars, 'csv');
  //       if (values[i].indexOf('$') === 0) {
  //         values = values.splice(i);
  //       }
  //     });

  //     let sysparam =
  //       typeof values[3] === 'undefined' ? '' : getTemplateSrv().replace(values[3], options.scopedVars, 'csv');

  //     let parsedSysParam = this.snowConnection.singleSysParamQuery(sysparam);
  //     sysparam = this.snowConnection.parseBasicSysparm(parsedSysParam, options);

  //     let valuesObj = {
  //       ci: typeof values[0] === 'undefined' ? '' : values[0],
  //       parentDepth: typeof values[1] === 'undefined' ? '' : values[1],
  //       childDepth: typeof values[2] === 'undefined' ? '' : values[2],
  //       sysparam: sysparam,
  //     };

  //     console.log(valuesObj);
  //     let nested_cis = this.snowConnection.getNestedCIS(valuesObj, asterisk, showNull);
  //     console.log('nested cis return: ', nested_cis);
  //     return nested_cis;
  //   }

  //   if (query.namespace === 'nested_classes') {
  //     console.log('inside nested cis variable query');
  //     let values = query.rawQuery.split('||');
  //     values.map((value, i) => {
  //       values[i] = getTemplateSrv().replace(value, options.scopedVars, 'csv');
  //       if (values[i].indexOf('$') === 0) {
  //         values = values.splice(i);
  //       }
  //     });

  //     let sysparam =
  //       typeof values[3] === 'undefined' ? '' : getTemplateSrv().replace(values[3], options.scopedVars, 'csv');

  //     let parsedSysParam = this.snowConnection.singleSysParamQuery(sysparam);
  //     sysparam = this.snowConnection.parseBasicSysparm(parsedSysParam, options);

  //     let classesObj = {
  //       ci: typeof values[0] === 'undefined' ? '' : values[0],
  //       parentDepth: typeof values[1] === 'undefined' ? '' : values[1],
  //       childDepth: typeof values[2] === 'undefined' ? '' : values[2],
  //       sysparam: sysparam,
  //     };
  //     console.log(classesObj);
  //     return this.snowConnection.getNestedClasses(classesObj, asterisk, showNull);
  //   }

  //   if (query.namespace === 'v2_nested_cis' || query.namespace === 'v2_nested_classes') {
  //     console.log('inside v2_nested_values variable query. namespace: ', query.namespace);
  //     let values = query.rawQuery.split('||');
  //     values.map((value, i) => {
  //       values[i] = getTemplateSrv().replace(value, options.scopedVars, 'csv');
  //       if (values[i].indexOf('$') === 0) {
  //         values = values.splice(i);
  //       }
  //     });

  //     let sysparam =
  //       typeof values[3] === 'undefined' ? '' : getTemplateSrv().replace(values[3], options.scopedVars, 'csv');

  //     let parsedSysParam = this.snowConnection.singleSysParamQuery(sysparam);
  //     sysparam = this.snowConnection.parseBasicSysparm(parsedSysParam, options);

  //     let valuesObj = {
  //       starting_point: typeof values[0] === 'undefined' ? '' : values[0],
  //       relationship_types: typeof values[1] === 'undefined' ? '' : values[1],
  //       excluded_classes: typeof values[2] === 'undefined' ? '' : values[2],
  //       parent_limit: sysparam,
  //       child_limit: typeof values[4] === 'undefined' ? '' : values[4],
  //       type: query.namespace === 'v2_nested_cis' ? 'ci' : 'class',
  //     };
  //     let nested_values = await this.snowConnection.getV2NestedValues(valuesObj, asterisk, showNull);
  //     console.log('nested_values final value: ', nested_values);
  //     return nested_values;
  //   }

  //   // if (query.namespace === 'tagKeys') {
  //   //   console.log('inside tagKeys variable query');
  //   //   if (typeof query.rawQuery !== 'undefined') {
  //   //     let values = query.rawQuery.split('||');
  //   //     values.map((value, i) => {
  //   //       values[i] = getTemplateSrv().replace(value, options.scopedVars, 'csv');
  //   //       if (values[i].indexOf('$') === 0) {
  //   //         values = values.splice(i);
  //   //       }
  //   //     });
  //   //     let state = typeof values[0] === 'undefined' ? 'All' : values[0];
  //   //     let sysparam = typeof values[1] === 'undefined' ? '' : values[1];
  //   //     let limit = typeof values[2] === 'undefined' ? '9999' : values[2];
  //   //     let tags = await this.snowConnection.getAlertTags(state, sysparam, limit);
  //   //     let returnVariables = tags.map((t) => {
  //   //       return { text: t.key, value: t.key };
  //   //     });
  //   //     returnVariables.unshift({ text: 'None', value: '' });
  //   //     console.log('tagKeys variable: ', returnVariables);
  //   //     return returnVariables;
  //   //   }
  //   //   return [];
  //   // }
  //   // if (query.namespace === 'tagValues') {
  //   //   console.log('inside tagKeys variable query');
  //   //   if (typeof query.rawQuery !== 'undefined') {
  //   //     let values = query.rawQuery.split('||');
  //   //     values.map((value, i) => {
  //   //       values[i] = getTemplateSrv().replace(value, options.scopedVars, 'csv');
  //   //       if (values[i].indexOf('$') === 0) {
  //   //         values = values.splice(i);
  //   //       }
  //   //     });
  //   //     let keys = typeof values[0] === 'undefined' ? '' : values[0];
  //   //     let state = typeof values[1] === 'undefined' ? 'All' : values[1];
  //   //     let sysparam = typeof values[2] === 'undefined' ? '' : values[2];
  //   //     let limit = typeof values[3] === 'undefined' ? '9999' : values[3];
  //   //     let tags = await this.snowConnection.getAlertTags(state, sysparam, limit);
  //   //     tags = tags.filter((t) => {
  //   //       if (keys.includes(t.key)) {
  //   //         return t;
  //   //       }
  //   //     });
  //   //     let returnVariables = tags.map((t) => {
  //   //       return { text: t.value, value: t.value };
  //   //     });
  //   //     returnVariables.unshift({ text: 'None', value: '' });
  //   //     console.log('tagValues variable: ', returnVariables);
  //   //     return returnVariables;
  //   //   }
  //   //   return [];
  //   // }
  // }

  // query(options: DataQueryRequest<PluginQuery>): Observable<DataQueryResponse> {
  //   const { range } = options;
  //   const fromTime = range.from.valueOf();
  //   const to = range.to.valueOf();

  //   const promises = _.map(options.targets, (t) => {
  //     if (t.hide) {
  //       return [];
  //     }
  //     let target = _.cloneDeep(t);

  //     const query = defaults(target, defaultQuery);
  //     let queryType: string = query.selectedQueryCategory.value as string;
  //     let cacheOverride = query.cacheOverride;
  //     // Translate deprecated basic_sysparam key into current basicSysparm key.
  //     // The deprecated key will be auto updated once the user edits a panel containing it.
  //     if (
  //       typeof query.basic_sysparam !== 'undefined' &&
  //       query.basic_sysparam !== null &&
  //       query.basic_sysparam.length > 0
  //     ) {
  //       query.basicSysparm = this.basicSysparmBackwardsCompatFix(query.basic_sysparam);
  //     }
  //     switch (queryType) {
  //       case 'Node_Graph':
  //         return this.snowConnection.queryNodeGraph(target, options, cacheOverride);
  //       case 'Metrics':
  //         return this.snowConnection.getMetrics(target, fromTime, to, options, cacheOverride);
  //       case 'Alerts':
  //         return this.snowConnection.getAlerts(target, fromTime, to, options, this.instanceName, cacheOverride);
  //       case 'Table':
  //         return this.snowConnection.queryTable(target, fromTime, to, options, cacheOverride);
  //       case 'Row_Count':
  //         return this.snowConnection.getRowCount(target, fromTime, to, options, cacheOverride);
  //       case 'Aggregate':
  //         return this.snowConnection.getAggregateQuery(target, fromTime, to, options, cacheOverride);
  //       case 'Geohash_Map':
  //         return this.snowConnection.getGeohashMap(target, options, cacheOverride);
  //       case 'Log_Data':
  //         return this.snowConnection.queryLogData(target, fromTime, to, options, cacheOverride);
  //       case 'Trend_Data':
  //         return this.snowConnection.getTrendData(target, fromTime, to, options, cacheOverride);
  //       case 'Outage_Status':
  //         return this.snowConnection.getOutageStatus(target, fromTime, to, options, cacheOverride);
  //       case 'Anomaly':
  //         return this.snowConnection.getAnomaly(target, fromTime, to, options, cacheOverride);
  //       default:
  //         return [];
  //     }
  //   });
  //   return from(Promise.all(_.flatten(promises))
  //     .then(_.flatten)
  //     .then((data) => ({
  //       data,
  //       state: LoadingState.Done,
  //       key: options.requestId,
  //     })));
  // }

  // basicSysparmBackwardsCompatFix(basic_sysparam: any) {
  //   let newBasicSysparm = basic_sysparam.map((old_row: any) => {
  //     return {
  //       column: old_row[1] || null,
  //       operator: old_row[2] || null,
  //       value: old_row[3] || null,
  //       separator: old_row[4] || {
  //         label: 'AND',
  //         value: '^',
  //       },
  //     };
  //   });
  //   return newBasicSysparm;
  // }
}
