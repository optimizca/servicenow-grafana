
// import { Observable, from } from 'rxjs';
// import { DataQueryRequest, DataQueryResponse, LoadingState } from '@grafana/data';

import { getTemplateSrv, DataSourceWithBackend } from '@grafana/runtime';
import _ from 'lodash';
import { PluginQuery, PluginDataSourceOptions, CustomVariableQuery} from './types';

export class DataSource extends DataSourceWithBackend<PluginQuery, PluginDataSourceOptions> {
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
    this.annotations = {};
  }

  async metricFindQuery(query: CustomVariableQuery, options?: any) {
    console.log('inside template variables metricFindQuery');
    let asterisk = query.showAsterisk;
    let showNull = query.showNull;
  
    if (query.namespace === 'global_image') {
      console.log('inside global_image variable query');
      console.log('Global Image:', this.globalImage);
      return [{ label: this.globalImage, value: this.globalImage }];
    }
  
    if (query.namespace === 'global_instance_name') {
      console.log('inside global_instance_name variable query');
      console.log('Global Instance Name:', this.instanceName);
      return [{ label: this.instanceName, value: this.instanceName }];
    }
  
    if (query.namespace === 'group_by') {
      console.log('inside group_by variable query');
      if (typeof query.rawQuery !== 'undefined') {
        let values = query.rawQuery.split('||');
        let tableName =
          typeof values[0] === 'undefined' ? '' : getTemplateSrv().replace(values[0], options.scopedVars, 'csv');
        let nameColumn =
          typeof values[1] === 'undefined' ? '' : getTemplateSrv().replace(values[1], options.scopedVars, 'csv');
        let sysparam =
          typeof values[2] === 'undefined' ? '' : getTemplateSrv().replace(values[2], options.scopedVars, 'csv');
  
        // Prepare the request payload
        const requestPayload = {
          tableName,
          groupBy: nameColumn,
          sysparam,
          asterisk,
          showNull,
        };
  
        // Call the backend endpoint using postResource
        try {
          const response = await this.postResource('groupBy', requestPayload);
          console.log('Response from backend:', response);
  
          // Map the response to the expected format
          if (response && response.data) {
            return response.data.map((item: any) => ({
              text: item.label,
              value: item.value,
            }));
          }
        } catch (error) {
          console.error('Error calling variableGroupBy:', error);
          throw error;
        }
      }
    }

    if (query.namespace === 'generic') {
      console.log('inside generic variable query');
      if (typeof query.rawQuery !== 'undefined') {
        let values = query.rawQuery.split('||');
        let tableName =
          typeof values[0] === 'undefined' ? '' : getTemplateSrv().replace(values[0], options.scopedVars, 'csv');
        let nameColumn =
          typeof values[1] === 'undefined' ? '' : getTemplateSrv().replace(values[1], options.scopedVars, 'csv');
        let idColumn =
          typeof values[2] === 'undefined' ? '' : getTemplateSrv().replace(values[2], options.scopedVars, 'csv');
        let sysparam =
          typeof values[3] === 'undefined' ? '' : getTemplateSrv().replace(values[3], options.scopedVars, 'csv');
        let limit =
          typeof values[4] === 'undefined' ? '9999' : getTemplateSrv().replace(values[4], options.scopedVars, 'csv');
  
        // Prepare the request payload
        const requestPayload = {
          tableName,
          nameColumn,
          idColumn,
          sysparam,
          limit,
          asterisk,
          showNull,
        };
  
        // Call the backend endpoint using postResource
        try {
          const response = await this.postResource('generic', requestPayload);
          console.log('Response from backend:', response);
  
          // Map the response to the expected format
          if (response && response.data) {
            return response.data.map((item: any) => ({
              text: item.label,
              value: item.value,
            }));
          }
        } catch (error) {
          console.error('Error calling variableGeneric:', error);
          throw error;
        }
      }
      return [];
    }

    if (query.namespace === 'metric_names' || query.namespace === 'golden_metric_names' || query.namespace === 'custom_kpis') {
      console.log(`inside ${query.namespace} variables metricFindQuery`);
      console.log(options);

      let replacedValue = getTemplateSrv().replace(query.rawQuery, options.scopedVars, 'csv');
      console.log('RawQuery replacedValue= ' + replacedValue);

      let metricCategory = '';
      if (query.namespace === 'golden_metric_names') {
        metricCategory = 'GOLDEN';
      } else if (query.namespace === 'custom_kpis') {
        metricCategory = 'CUSTOM_KPIS';
      }

      let cis = replacedValue.split(',');
      const requestPayload = {
        cis,
        asterisk,
        showNull,
        metricCategory,
      };
      try {
        const response = await this.postResource('metricNames', requestPayload);
        console.log('Response from backend:', response);

        // Map the response to the expected format
        if (response && response.data) {
          return response.data.map((item: any) => ({
            text: item.label,
            value: item.value,
          }));
        }
      } catch (error) {
        console.error('Error calling metric names:', error);
        throw error;
      }
    }

    if (query.namespace === 'nested_cis') {
      console.log('inside nested cis variable query');
      if (typeof query.rawQuery === 'undefined') {
        return [];
      }
      let values = query.rawQuery.split('||');
    
      // Replace template variables in the raw query values
      values = values.map((value) => getTemplateSrv().replace(value, options.scopedVars, 'csv'));
    
      // Extract values for ci, parentDepth, childDepth, and sysparam
      const ci = values[0] || '';
      const parentDepth = values[1] || '';
      const childDepth = values[2] || '';
      const sysparam = values[3] || '';
    
      // Log the extracted values for debugging
      console.log('Extracted values:', { ci, parentDepth, childDepth, sysparam });
    
      // Prepare the request payload
      const requestPayload = {
        ci,
        parentDepth,
        childDepth,
        sysparam,
        asterisk: query.showAsterisk,
        showNull: query.showNull,
      };
    
      // Call the backend endpoint using postResource
      try {
        const response = await this.postResource('nestedCIs', requestPayload);
        console.log('Response from backend:', response);
    
        // Map the response to the expected format
        if (response && response.data) {
          return response.data.map((item: any) => ({
            text: item.label,
            value: item.value,
          }));
        }
      } catch (error) {
        console.error('Error calling nestedCIs:', error);
        throw error;
      }
    }

    if (query.namespace === 'nested_classes') {
      console.log('inside nested cis variable query');

      if (typeof query.rawQuery === 'undefined') {
        return [];
      }

      let values = query.rawQuery.split('||');
  
      // Replace template variables in the raw query values
      values = values.map((value) => getTemplateSrv().replace(value, options.scopedVars, 'csv'));

      let ci = values[0] || '';
      let parentDepth = values[1] || '';
      let childDepth = values[2] || '';
      let sysparam = values[3] || '';

      console.log('Extracted values:', { ci, parentDepth, childDepth, sysparam });

      // prepare the request payload
      const requestPayload = {
        ci,
        parentDepth,
        childDepth,
        sysparam,
        asterisk,
        showNull,
      };

      // Call the backend endpoint using postResource
      try {
        const response = await this.postResource('nestedClasses', requestPayload);
        console.log('Response from backend:', response);

        // Map the response to the expected format
        if (response && response.data) {
          return response.data.map((item: any) => ({
            text: item.label,
            value: item.value,
          }));
        }
      }
      catch (error) {
        console.error('Error calling nestedClasses:', error);
        throw error;
      }
    }

    if (query.namespace === 'v2_nested_cis' || query.namespace === 'v2_nested_classes') {
      console.log('inside v2_nested_values variable query. namespace: ', query.namespace);
      if (typeof query.rawQuery === 'undefined') {
        return [];
      }
      let values = query.rawQuery.split('||');
  
      // Replace template variables in the raw query values
      values = values.map((value) => getTemplateSrv().replace(value, options.scopedVars, 'csv'));

      let starting_point = values[0] || '';
      let relationship_types = values[1] || '';
      let excluded_classes = values[2] || '';
      let parent_limit = values[3] || '';
      let child_limit = values[4] || '';
      let type = query.namespace === 'v2_nested_cis' ? 'ci' : 'class';

      console.log('Extracted values:', { starting_point, relationship_types, excluded_classes, parent_limit, child_limit, type });

      // Prepare the request payload
      const requestPayload = {
        starting_point,
        relationship_types,
        excluded_classes,
        parent_limit,
        child_limit,
        type,
        asterisk,
        showNull,
      };

      // Call the backend endpoint using postResource
      try {
        const response = await this.postResource('v2NestedValues', requestPayload);
        console.log('Response from backend:', response);

        // Map the response to the expected format
        if (response && response.data) {
          return response.data.map((item: any) => ({
            text: item.label,
            value: item.value,
          }));
        }
      }
      catch (error) {
        console.error('Error calling v2NestedValues:', error);
        throw error;
      }
    }

    return [];
  }
// }

    // if (query.namespace === 'tagKeys') {
    //   console.log('inside tagKeys variable query');
    //   if (typeof query.rawQuery !== 'undefined') {
    //     let values = query.rawQuery.split('||');
    //     values.map((value, i) => {
    //       values[i] = getTemplateSrv().replace(value, options.scopedVars, 'csv');
    //       if (values[i].indexOf('$') === 0) {
    //         values = values.splice(i);
    //       }
    //     });
    //     let state = typeof values[0] === 'undefined' ? 'All' : values[0];
    //     let sysparam = typeof values[1] === 'undefined' ? '' : values[1];
    //     let limit = typeof values[2] === 'undefined' ? '9999' : values[2];
    //     let tags = await this.snowConnection.getAlertTags(state, sysparam, limit);
    //     let returnVariables = tags.map((t) => {
    //       return { text: t.key, value: t.key };
    //     });
    //     returnVariables.unshift({ text: 'None', value: '' });
    //     console.log('tagKeys variable: ', returnVariables);
    //     return returnVariables;
    //   }
    //   return [];
    // }
    // if (query.namespace === 'tagValues') {
    //   console.log('inside tagKeys variable query');
    //   if (typeof query.rawQuery !== 'undefined') {
    //     let values = query.rawQuery.split('||');
    //     values.map((value, i) => {
    //       values[i] = getTemplateSrv().replace(value, options.scopedVars, 'csv');
    //       if (values[i].indexOf('$') === 0) {
    //         values = values.splice(i);
    //       }
    //     });
    //     let keys = typeof values[0] === 'undefined' ? '' : values[0];
    //     let state = typeof values[1] === 'undefined' ? 'All' : values[1];
    //     let sysparam = typeof values[2] === 'undefined' ? '' : values[2];
    //     let limit = typeof values[3] === 'undefined' ? '9999' : values[3];
    //     let tags = await this.snowConnection.getAlertTags(state, sysparam, limit);
    //     tags = tags.filter((t) => {
    //       if (keys.includes(t.key)) {
    //         return t;
    //       }
    //     });
    //     let returnVariables = tags.map((t) => {
    //       return { text: t.value, value: t.value };
    //     });
    //     returnVariables.unshift({ text: 'None', value: '' });
    //     console.log('tagValues variable: ', returnVariables);
    //     return returnVariables;
    //   }
    //   return [];
    // }

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
//     return [];
//   }
}
