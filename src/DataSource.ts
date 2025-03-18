import { getTemplateSrv, DataSourceWithBackend } from '@grafana/runtime';
import _ from 'lodash';
import { PluginQuery, PluginDataSourceOptions, CustomVariableQuery} from './types';
import { ScopedVars } from '@grafana/data';

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

  applyTemplateVariables(query: PluginQuery, scopedVars: ScopedVars): PluginQuery {
    console.log('Scoped Vars:', scopedVars); 
  
    // Interpolate the table name if it exists
    if (query.tableName && query.tableName.value) {
      const tableName = getTemplateSrv().replace(query.tableName.value, scopedVars, 'csv');
      console.log('Interpolated Table Name:', tableName); 
      query.tableName.value = tableName;
    }

    // Interpolate the column names if they exist
    if (query.selectedtableColumns && query.selectedtableColumns.length > 0) {
      const interpolatedColumns = query.selectedtableColumns.map((col) => {
        if (col.value) {
          const interpolatedValue = getTemplateSrv().replace(col.value, scopedVars, 'csv');
          console.log('Interpolated Column Value:', interpolatedValue);
          return { ...col, value: interpolatedValue };
        }
        return col;
      });
      console.log('Interpolated Columns:', interpolatedColumns);
      query.selectedtableColumns = interpolatedColumns;
    }

     // Interpolate the sort by if it exists
     if (query.sortBy && query.sortBy.value) {
      const sortBy = getTemplateSrv().replace(query.sortBy.value, scopedVars, 'csv');
      console.log('Interpolated Sort Direction:', sortBy);
      query.sortBy.value = sortBy;
    }

    // Interpolate the service list if it exists
    if (query.selectedServiceList && query.selectedServiceList.value) {
      const serviceList = getTemplateSrv().replace(query.selectedServiceList.value, scopedVars, 'csv');
      console.log('Interpolated Service List:', serviceList);
      query.selectedServiceList.value = serviceList;
    }

    // Interpolate the group by if it exists
    if (query.groupBy && query.groupBy.value) {
      const groupBy = getTemplateSrv().replace(query.groupBy.value, scopedVars, 'csv');
      console.log('Interpolated Group By:', groupBy);
      query.groupBy.value = groupBy;
    }

    // Interpolate the trend column if it exists
    if (query.selectedTrendColumn && query.selectedTrendColumn.value) {
      const trendColumn = getTemplateSrv().replace(query.selectedTrendColumn.value, scopedVars, 'csv');
      console.log('Interpolated Trend Column:', trendColumn);
      query.selectedTrendColumn.value = trendColumn;
    }

    // Interpolate the basicSysparm array if it exists
    if (query.basicSysparm && query.basicSysparm.length > 0) {
      const basicSysparm = query.basicSysparm.map((row) => {
        const column = row.column ? {
          ...row.column,
          value: getTemplateSrv().replace(row.column.value, scopedVars, 'csv'),
        } : null;

        const operator = row.operator ? {
          ...row.operator,
          value: getTemplateSrv().replace(row.operator.value, scopedVars, 'csv'),
        } : null;

      const value = row.value ? {
        ...row.value,
        value: row?.value?.value ? getTemplateSrv().replace(row.value.value, scopedVars, 'csv') : row.value.value,
      } : null;

        return {
          ...row,
          column,
          operator,
          value,
        };
      });
      console.log('Interpolated Basic Sysparm:', basicSysparm);
      query.basicSysparm = basicSysparm;
    }

    // Interpolate the aggregate column if it exists
    if (query.aggregateColumn && query.aggregateColumn.value) {
      const aggregateColumn = getTemplateSrv().replace(query.aggregateColumn.value, scopedVars, 'csv');   
      console.log('Interpolated Aggregate Column:', aggregateColumn);
      query.aggregateColumn.value = aggregateColumn;
    }

    // Interpolate the Source List (Ci) if it exists
    if (query.selectedSourceList && query.selectedSourceList.length > 0) {
      const interpolatedSourceList = query.selectedSourceList.map((source) => {
          if (source.value) {
              const interpolatedValue = getTemplateSrv().replace(source.value, scopedVars, 'csv');
              console.log('Interpolated Source Value:', interpolatedValue);
              return { ...source, value: interpolatedValue };
          }
          return source; 
      });
      console.log('Interpolated Source List:', interpolatedSourceList);
      query.selectedSourceList = interpolatedSourceList;
    }

    // Interpolate the show percent if it exists
    if (query.showPercent) {
      const showPercent = getTemplateSrv().replace(query.showPercent.toString(), scopedVars, 'csv');
      console.log('Interpolated Show Percent:', showPercent);
      query.showPercent = showPercent === 'true';
    }

    // Interpolate the aggregate type if it exists
    if (query.selectedAggregateType && query.selectedAggregateType.value) {
      const aggregateType = getTemplateSrv().replace(query.selectedAggregateType.value, scopedVars, 'csv');
      console.log('Interpolated Aggregate Type:', aggregateType);
      query.selectedAggregateType.value = aggregateType;
    }

    // Interpolate the parent depth if it exists
    if (query.topology_parent_depth) {
      const parentDepth = getTemplateSrv().replace(query.topology_parent_depth, scopedVars, 'csv');
      console.log('Interpolated Parent Depth:', parentDepth);
      query.topology_parent_depth = parentDepth;
    }

    // Interpolate the child depth if it exists
    if (query.topology_child_depth) {
      const childDepth = getTemplateSrv().replace(query.topology_child_depth, scopedVars, 'csv');
      console.log('Interpolated Child Depth:', childDepth);
      query.topology_child_depth = childDepth;
    }

    // Interpolate the relationship types if it exists
    if (query.relationshipTypes) {
      const relationshipTypes = query.relationshipTypes.map((relationshipType) => {
        return getTemplateSrv().replace(relationshipType.value, scopedVars, 'csv');
      });
      console.log('Interpolated Relationship Types:', relationshipTypes);
      query.relationshipTypes = relationshipTypes.map((type) => ({ value: type, label: type }));
    }
  
    // Interpolate the excluded classes if it exists
    if (query.excludedClasses) {
      const excludedClasses = query.excludedClasses.map((excludedClass) => {
        return getTemplateSrv().replace(excludedClass.value, scopedVars, 'csv');
      });
      console.log('Interpolated Excluded Classes:', excludedClasses);
      query.excludedClasses = excludedClasses.map((type) => ({ value: type, label: type }));
    }


    // Interpolate the elastic search query if it exists
    if (query.elasticSearch) {
      const elasticSearch = getTemplateSrv().replace(query.elasticSearch, scopedVars, 'csv');
      console.log('Interpolated Elastic Search Query:', elasticSearch);
      query.elasticSearch = elasticSearch;
    }

    // Interpolate the metric type list if it exists
    if (query.selectedMetricTypeList && query.selectedMetricTypeList.length > 0) {
      const interpolatedMetricTypeList = query.selectedMetricTypeList.map((metric) => {
        if (metric.value) {
          const interpolatedValue = getTemplateSrv().replace(metric.value, scopedVars, 'csv');
          console.log('Interpolated Metric Type Value:', interpolatedValue);
          return { ...metric, value: interpolatedValue };
        }
    });
    console.log('Interpolated Metric Type List:', interpolatedMetricTypeList);
    query.selectedMetricTypeList = interpolatedMetricTypeList;
  }

    // Interpolate the metric name list if it exists
  if (query.selectedMetricNameList && query.selectedMetricNameList.length > 0) {
    const interpolatedMetricNameList = query.selectedMetricNameList.map((metric) => {
      if (metric.value) {
        const interpolatedValue = getTemplateSrv().replace(metric.value, scopedVars, 'csv');
        console.log('Interpolated Metric Name Value:', interpolatedValue);
        return { ...metric, value: interpolatedValue };
      }
      return metric;
    });
    console.log('Interpolated Metric Name List:', interpolatedMetricNameList);
    query.selectedMetricNameList = interpolatedMetricNameList;
  }

    const interpolatedQuery: PluginQuery = {
      ...query,
      rawQuery: getTemplateSrv().replace(query.rawQuery, scopedVars, 'csv'),
    };
  
    console.log('Interpolated Query:', interpolatedQuery); // Debugging
    return interpolatedQuery;
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
          return await this.postResource('groupBy', requestPayload);
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
        console.log(getTemplateSrv().replace(values[0], options.scopedVars, 'csv'))
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
          return await this.postResource('generic', requestPayload);
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

      let metricType = '';
      if (query.namespace === 'golden_metric_names') {
        metricType = 'GOLDEN';
      } else if (query.namespace === 'custom_kpis') {
        metricType = 'CUSTOM_KPIS';
      }

      let cis = replacedValue.split(',');
      const requestPayload = {
        cis,
        asterisk,
        showNull,
        metricType,
      };
      try {
        return await this.postResource('metricNames', requestPayload);
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
        return await this.postResource('nestedCIs', requestPayload);
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
        return await this.postResource('nestedClasses', requestPayload);
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

      let startingPoint = values[0] || '';
      let relationshipTypes = values[1] || '';
      let excludedClasses = values[2] || '';
      let parentDepth = values[3] || '';
      let childDepth= values[4] || '';
      let type = query.namespace === 'v2_nested_cis' ? 'ci' : 'class';

      console.log('Extracted values:', { startingPoint, relationshipTypes, excludedClasses, parentDepth, childDepth, type });

      // Prepare the request payload
      const requestPayload = {
        startingPoint,
        relationshipTypes,
        excludedClasses,
        parentDepth,
        childDepth,
        type,
        asterisk,
        showNull,
      };

      // Call the backend endpoint using postResource
      try {
        return await this.postResource('v2NestedValues', requestPayload);
      }
      catch (error) {
        console.error('Error calling v2NestedValues:', error);
        throw error;
      }
    }

    return [];
  }
}
