import { APIClient } from 'APIClient';

import * as utils from './Utils';
import { SimpleBasicSysParam, SysParamColumnObject } from 'types';

export class SNOWManager {
  apiClient: APIClient;
  apiPath: string;

  constructor(options: any) {
    const { withCredentials, url, apiPath, cacheTimeout } = options;
    this.apiPath = apiPath;
    let headers = { 'Content-Type': 'application/json' };
    this.apiClient = new APIClient(headers, withCredentials, url, cacheTimeout);
  }
  // Start of query methods
  queryNodeGraph(target: any, options: any, cacheOverride: any) {
    console.log('queryNodeGraph');
    console.log('target: ', target);

    let starting_point =
      target.selectedServiceList == null
        ? ''
        : utils.replaceTargetUsingTemplVarsCSV(target.selectedServiceList.value, options.scopedVars);
    let relationshipTypes = target.relationshipTypes.map((rt: any) =>
      utils.replaceTargetUsingTemplVarsCSV(rt.value, options.scopedVars)
    );
    let excludedClasses = target.excludedClasses.map((rt: any) =>
      utils.replaceTargetUsingTemplVarsCSV(rt.value, options.scopedVars)
    );
    let requestBody = {
      starting_point: starting_point,
      parent_limit:
        target.topology_parent_depth === ''
          ? 0
          : parseInt(utils.replaceTargetUsingTemplVarsCSV(target.topology_parent_depth, options.scopedVars), 10),
      child_limit:
        target.topology_child_depth === ''
          ? 0
          : parseInt(utils.replaceTargetUsingTemplVarsCSV(target.topology_child_depth, options.scopedVars), 10),
      relationship_types: relationshipTypes,
      excluded_classes: excludedClasses,
    };
    console.log('requestBody: ', requestBody);
    return this.apiClient
      .request({
        url: this.apiPath + '/v1/query/node-graph',
        data: requestBody,
        method: 'POST',
        cacheOverride: cacheOverride === '' ? null : cacheOverride,
      })
      .then((response) => {
        console.log('print queryNodeGraph response from SNOW');
        console.log(response);
        if (response.data.result.error.length > 0) {
          throw new Error(response.data.result.error);
        }
        return utils.createNodeGraphFrame(response.data, target.refId);
      })
      .catch((error) => {
        console.error('queryNodeGraph query error: ', error);
        throw new Error(error.data.error);
      });
  }
  getMetrics(target: any, timeFrom: any, timeTo: any, options: any, cacheOverride: any) {
    if (utils.debugLevel() === 1) {
      console.log('isnide getMetrics');
      console.log('print target');
      console.log(target);
    }
    let anomaly = false;
    let sourceTarget = '';
    let resourceNameArray: any[] = [];
    let resourceName = '';
    let metricNameArray: any[] = [];
    let metricName = '';
    let metricAnomaly = '';
    let sysparam = '';
    if (target.selectedSourceList) {
      let sourceArray: any[] = [];
      target.selectedSourceList.map((listItem: any) => {
        sourceArray.push(utils.replaceTargetUsingTemplVars(listItem.value, options.scopedVars));
      });
      sourceTarget = utils.createRegEx(sourceArray);
      console.log('ciIds: ', sourceTarget);
    }
    if (target.selectedMetricTypeList) {
      target.selectedMetricTypeList.map((listItem: any) => {
        resourceNameArray.push(utils.replaceTargetUsingTemplVars(listItem.value, options.scopedVars));
      });
      resourceName = utils.createRegEx(resourceNameArray);
      console.log('resourceNames: ', resourceName);
    }
    if (target.selectedMetricNameList) {
      target.selectedMetricNameList.map((listItem: any) => {
        metricNameArray.push(utils.replaceTargetUsingTemplVars(listItem.value, options.scopedVars));
      });
      metricName = utils.createRegEx(metricNameArray);
    }
    if (target.selectedMetricAnomalyList) {
      if (target.selectedMetricAnomalyList.value) {
        metricAnomaly = utils.replaceTargetUsingTemplVars(target.selectedMetricAnomalyList.value, options.scopedVars);
        if (metricAnomaly === 'true') {
          anomaly = true;
        }
      }
    }
    if (target.sysparam_query) {
      let parsedSysParam = this.singleSysParamQuery(target.sysparam_query);
      console.log('NULL SYS PARAM: ', parsedSysParam);

      sysparam = this.parseBasicSysparm(parsedSysParam, options.scopedVars);
      console.log('PARSE BASIC SYSPARM: ', sysparam);
    }
    metricName = utils.trimRegEx(metricName);
    sourceTarget = utils.trimRegEx(sourceTarget);

    let bodyData = `{"targets":[{"target":"${sourceTarget}","resourceName":"${resourceName}","metricName":"${metricName}","sysparm_query":"${sysparam}"}]}`;

    let metricURL = this.apiPath + '/v1/query/single_metric?startTime=' + timeFrom + '&endTime=' + timeTo;
    if (target.metricValueType === 'latest') {
      metricURL = this.apiPath + '/v1/query/latest_single_metric?startTime=' + timeFrom + '&endTime=' + timeTo;
    }
    if (metricName === '*') {
      metricURL = this.apiPath + '/v1/query/all_metrics?startTime=' + timeFrom + '&endTime=' + timeTo;
    }
    if (anomaly === true) {
      metricURL = this.apiPath + '/v1/query/anomaly_metrics?startTime=' + timeFrom + '&endTime=' + timeTo;
    }
    if (utils.debugLevel() === 1) {
      console.log('source after replace');
      console.log(metricURL);
      console.log(sourceTarget);
      console.log(bodyData);
    }
    return this.apiClient
      .request({
        url: metricURL,
        data: bodyData,
        method: 'POST',
        cacheOverride: cacheOverride === '' ? null : cacheOverride,
      })
      .then((response) => {
        console.log('metric response: ', response);
        if (anomaly === true) {
          return this.apiClient.mapAnamMetricsResponseToFrame(response.data.result, target);
        } else {
          return this.apiClient.mapMetricsResponseToFrame(response.data.result, target);
        }
      })
      .catch((error) => {
        console.error('metric query error: ', error);
        throw new Error(error);
      });
  }
  getAlerts(target: any, timeFrom: any, timeTo: any, options: any, instanceName: any, cacheOverride: any) {
    if (utils.debugLevel() === 1) {
      console.log('isnide GetAlerts');
      console.log('print target');
      console.log(target);
      console.log('print options scoped Vars');
      console.log(options.scopedVars);
    }
    let service = '';
    if (target.selectedServiceList) {
      if (target.selectedServiceList.value) {
        service = utils.replaceTargetUsingTemplVarsCSV(target.selectedServiceList.value, options.scopedVars);
      }
    }
    let ci = '';
    if (target.selectedSourceList) {
      let sourceArray: any[] = [];
      target.selectedSourceList.map((listItem: any) => {
        sourceArray.push(utils.replaceTargetUsingTemplVars(listItem.value, options.scopedVars));
      });
      ci = utils.createRegEx(sourceArray);
      console.log('ciIds: ', ci);
    }

    let bodyTarget = service;
    let alertState = 'All';
    let alertType = 'none';
    let sys_query = '';
    if (target.selectedAlertStateList) {
      if (target.selectedAlertStateList.value) {
        alertState = target.selectedAlertStateList.value;
      }
    }
    if (target.selectedAlertTypeList) {
      if (target.selectedAlertTypeList.value === 'CI') {
        alertType = 'ci';
        bodyTarget = ci;
      } else if (target.selectedAlertTypeList.value === 'OS') {
        alertType = 'os';
        bodyTarget = ci;
        if (bodyTarget.indexOf('(') !== -1) {
          bodyTarget = bodyTarget.substring(bodyTarget.indexOf('(') + 1, bodyTarget.indexOf(')'));
        }
      } else if (target.selectedAlertTypeList.value === 'None') {
        alertType = 'none';
      }
    }
    if (target.sysparam_query) {
      let parsedSysParam = this.singleSysParamQuery(target.sysparam_query);
      console.log('NULL SYS PARAM: ', parsedSysParam);

      sys_query = this.parseBasicSysparm(parsedSysParam, options.scopedVars);
      console.log('PARSE BASIC SYSPARM: ', sys_query);
    }
    let tagString = '';
    if (target.tagKeys && target.tagValues) {
      for (let k = 0; k < target.tagKeys.length; k++) {
        if (target.tagKeys[k].value.charAt(0) === '$') {
          let key = utils.replaceTargetUsingTemplVarsCSV(target.tagKeys[k].value, options.scopedVars);
          let splitKeys = key.split(',');
          splitKeys.map((sk) => {
            for (let v = 0; v < target.tagValues.length; v++) {
              if (target.tagValues[v].value.charAt(0) === '$') {
                let value = utils.replaceTargetUsingTemplVarsCSV(target.tagValues[v].value, options.scopedVars);
                let splitValues = value.split(',');
                splitValues.map((sv) => {
                  if (sk !== '' && sv !== '') {
                    console.log('tagString: ', sk + '=' + sv + ',');
                    tagString += sk + '=' + sv + ',';
                  }
                });
              } else {
                let value = target.tagValues[v].value;
                if (sk !== '' && value !== '') {
                  console.log('tagString: ', sk + '=' + value + ',');
                  tagString += sk + '=' + value + ',';
                }
              }
            }
          });
        } else {
          let key = target.tagKeys[k].value;
          for (let v = 0; v < target.tagValues.length; v++) {
            if (target.tagValues[v].value.charAt(0) === '$') {
              let value = utils.replaceTargetUsingTemplVarsCSV(target.tagValues[v].value, options.scopedVars);
              let splitValues = value.split(',');
              splitValues.map((sv) => {
                if (key !== '' && sv !== '') {
                  console.log('tagString: ', key + '=' + sv + ',');
                  tagString += key + '=' + sv + ',';
                }
              });
            } else {
              let value = target.tagValues[v].value;
              if (key !== '' && value !== '') {
                console.log('tagString: ', key + '=' + value + ',');
                tagString += key + '=' + value + ',';
              }
            }
          }
        }
      }
    }
    if (tagString.charAt(tagString.length - 1) === ',') {
      tagString = tagString.substring(0, tagString.length - 1);
    }
    console.log('FINAL tagString: ', tagString);

    let sortBy = '';
    let sortDirection = '';
    if (target.sortBy && target.sortDirection) {
      if (target.sortBy.value) {
        sortBy = utils.replaceTargetUsingTemplVarsCSV(target.sortBy.value, options.scopedVars);
        sortDirection = target.sortDirection;
      }
    }

    let limit = 9999;
    if (target.rowLimit) {
      if (target.rowLimit > 0 && target.rowLimit < 10000) {
        limit = target.rowLimit;
      }
    }
    let page = 0;
    if (target.page) {
      if (target.page >= 0) {
        page = target.page;
      }
    }

    let timerangeColumn = 'sys_updated_on';
    if (target.grafanaTimerangeColumn) {
      if (target.grafanaTimerangeColumn.value) {
        timerangeColumn = utils.replaceTargetUsingTemplVarsCSV(target.grafanaTimerangeColumn.value, options.scopedVars);
      }
    }

    let bodyData = `{"targets":[{"target":"${bodyTarget}","sysparm_query":"${sys_query}","alertType":"${alertType}","alertState":"${alertState}","sortBy":"${sortBy}","sortDirection":"${sortDirection}","limit":${limit},"page":${page},"tagFilters":"${tagString}"}]}`;

    let url = this.apiPath + '/v1/query/alerts';
    if (target.grafanaTimerange) {
      url += '?startTime=' + timeFrom + '&endTime=' + timeTo + '&timerangeColumn=' + timerangeColumn;
    }

    if (utils.debugLevel() === 1) {
      console.log('source after replace');
      console.log(service);
      console.log(bodyData);
      console.log(url);
    }
    return this.apiClient
      .request({
        url: url,
        data: bodyData,
        method: 'POST',
        cacheOverride: cacheOverride === '' ? null : cacheOverride,
      })
      .then((response) => {
        utils.printDebug('print alerts response from SNOW');
        utils.printDebug(response);
        response.data.result = this.apiClient.appendInstanceNameToResponse(response.data.result, instanceName);
        utils.printDebug(response.data.result);
        return this.apiClient.mapTextResponseToFrame(response.data.result, target.refId);
      })
      .catch((error) => {
        console.error('alert query error: ', error);
        throw new Error(error.data.error.message);
      });
  }
  queryTable(target: any, timeFrom: any, timeTo: any, options: any, cacheOverride: any) {
    if (utils.debugLevel() === 1) {
      console.log('queryTable target: ', target);
    }
    let tableName = '';
    if (target.tableName) {
      if (target.tableName.value) {
        tableName = utils.replaceTargetUsingTemplVars(target.tableName.value, options.scopedVars);
      }
    }
    let tableColumns = '';
    if (target.selectedtableColumns) {
      target.selectedtableColumns.map((listItem: any) => {
        tableColumns += utils.replaceTargetUsingTemplVars(listItem.value, options.scopedVars) + ',';
      });
      if (tableColumns.charAt(tableColumns.length - 1) === ',') {
        tableColumns = tableColumns.substring(0, tableColumns.length - 1);
      }
    }
    let sysparam = '';
    //Checks if variable is an array
    if (target.basicSysparm.constructor.toString().indexOf('Array') !== -1) {
      sysparam = this.parseBasicSysparm(target.basicSysparm, options);
      console.log('PARSE BASIC SYSPARM: ', sysparam);
    }
    let limit = 9999;
    if (target.rowLimit) {
      if (target.rowLimit > 0 && target.rowLimit < 10000) {
        limit = target.rowLimit;
      }
    }
    let page = 0;
    if (target.page) {
      if (target.page >= 0) {
        page = target.page;
      }
    }

    let sortBy = '';
    let sortDirection = '';
    if (target.sortBy && target.sortDirection) {
      if (target.sortBy.value) {
        sortBy = utils.replaceTargetUsingTemplVarsCSV(target.sortBy.value, options.scopedVars);
        sortDirection = target.sortDirection;
      }
    }

    let getAlertCount = 'false';
    if (target.getAlertCount) {
      getAlertCount = target.getAlertCount.value;
    }

    let timerangeColumn = 'sys_updated_on';
    if (target.grafanaTimerangeColumn) {
      if (target.grafanaTimerangeColumn.value) {
        timerangeColumn = utils.replaceTargetUsingTemplVarsCSV(target.grafanaTimerangeColumn.value, options.scopedVars);
      }
    }

    let bodyData = `{"targets":[{"target":"${tableName}","columns":"${tableColumns}","sysparm":"${sysparam}","limit":${limit},"page":${page},"sortBy":"${sortBy}","sortDirection":"${sortDirection}","getAlertCount":${getAlertCount}}]}`;
    let url = this.apiPath + '/v1/query/table';
    if (target.grafanaTimerange) {
      url += '?startTime=' + timeFrom + '&endTime=' + timeTo + '&timerangeColumn=' + timerangeColumn;
    }
    if (utils.debugLevel() === 1) {
      console.log(target);
      console.log(bodyData);
    }
    return this.apiClient
      .request({
        url: url,
        data: bodyData,
        method: 'POST',
        cacheOverride: cacheOverride === '' ? null : cacheOverride,
      })
      .then((response) => {
        utils.printDebug('print table query response from SNOW');
        utils.printDebug(response);
        return this.apiClient.mapTextResponseToFrame(response.data.result, target.refId);
      })
      .catch((error) => {
        console.error('table query error: ', error);
        throw new Error(error.data.error.message);
      });
  }
  getRowCount(target: any, timeFrom: any, timeTo: any, options: any, cacheOverride: any) {
    let tableName = '';
    if (target.tableName) {
      if (target.tableName.value) {
        tableName = utils.replaceTargetUsingTemplVars(target.tableName.value, options.scopedVars);
      }
    }
    let sysparam = '';
    if (target.sysparam_query) {
      let parsedSysParam = this.singleSysParamQuery(target.sysparam_query);
      console.log('NULL SYS PARAM: ', parsedSysParam);

      sysparam = this.parseBasicSysparm(parsedSysParam, options.scopedVars);
      console.log('PARSE BASIC SYSPARM: ', sysparam);
    }

    let timerangeColumn = 'sys_updated_on';
    if (target.grafanaTimerangeColumn) {
      if (target.grafanaTimerangeColumn.value) {
        timerangeColumn = utils.replaceTargetUsingTemplVarsCSV(target.grafanaTimerangeColumn.value, options.scopedVars);
      }
    }
    let bodyData = `{"targets":[{"target":"${tableName}","sysparm":"${sysparam}"}]}`;

    let url = this.apiPath + '/v1/query/row_count';
    if (target.grafanaTimerange) {
      url += '?startTime=' + timeFrom + '&endTime=' + timeTo + '&timerangeColumn=' + timerangeColumn;
    }

    if (utils.debugLevel() === 1) {
      console.log(target);
      console.log(bodyData);
    }
    return this.apiClient
      .request({
        url: url,
        data: bodyData,
        method: 'POST',
        cacheOverride: cacheOverride === '' ? null : cacheOverride,
      })
      .then((response) => {
        utils.printDebug('print row count response from SNOW');
        utils.printDebug(response);
        return this.apiClient.mapTextResponseToFrame(response.data.result, target.refId);
      })
      .catch((error) => {
        console.error('row count query error: ', error);
        throw new Error(error.data.error.message);
      });
  }
  getAggregateQuery(target: any, timeFrom: any, timeTo: any, options: any, cacheOverride: any) {
    let tableName = '';
    let groupBy = '';
    let type = '';
    let column = '';
    let sysparam = '';
    if (target.tableName) {
      if (target.tableName.value) {
        tableName = utils.replaceTargetUsingTemplVars(target.tableName.value, options.scopedVars);
      }
    }
    if (typeof target.groupBy === 'string') {
      if (target.groupBy !== '') {
        groupBy = utils.replaceTargetUsingTemplVarsCSV(target.groupBy, options.scopedVars);
      }
    } else if (target.groupBy) {
      if (target.groupBy.value) {
        groupBy = utils.replaceTargetUsingTemplVarsCSV(target.groupBy.value, options.scopedVars);
      }
    }
    if (target.selectedAggregateType) {
      if (target.selectedAggregateType.value) {
        type = target.selectedAggregateType.value;
      }
    }
    if (target.aggregateColumn) {
      if (target.aggregateColumn.value) {
        column = utils.replaceTargetUsingTemplVarsCSV(target.aggregateColumn.value, options.scopedVars);
      }
    }
    if (target.sysparam_query) {
      let parsedSysParam = this.singleSysParamQuery(target.sysparam_query);
      console.log('NULL SYS PARAM: ', parsedSysParam);

      sysparam = this.parseBasicSysparm(parsedSysParam, options.scopedVars);
      console.log('PARSE BASIC SYSPARM: ', sysparam);
    }

    let limit = 9999;
    if (target.rowLimit) {
      if (target.rowLimit > 0 && target.rowLimit < 10000) {
        limit = target.rowLimit;
      }
    }

    let timerangeColumn = 'sys_updated_on';
    if (target.grafanaTimerangeColumn) {
      if (target.grafanaTimerangeColumn.value) {
        timerangeColumn = utils.replaceTargetUsingTemplVarsCSV(target.grafanaTimerangeColumn.value, options.scopedVars);
      }
    }

    let bodyData = `{"targets":[{"target":"${tableName}","type":"${type}","column":"${column}","groupBy":"${groupBy}","sysparm":"${sysparam}","limit":${limit}}]}`;

    let url = this.apiPath + '/v1/query/aggregate';
    if (target.grafanaTimerange) {
      url += '?startTime=' + timeFrom + '&endTime=' + timeTo + '&timerangeColumn=' + timerangeColumn;
    }

    if (utils.debugLevel() === 1) {
      console.log('getAggregate target: ', target);
      console.log('getAggregate bodyData: ', bodyData);
    }
    return this.apiClient
      .request({
        url: url,
        data: bodyData,
        method: 'POST',
        cacheOverride: cacheOverride === '' ? null : cacheOverride,
      })
      .then((response) => {
        console.log('print aggregate query response from SNOW: ', response);
        return this.apiClient.mapTextResponseToFrame(response.data.result, target.refId);
      })
      .catch((error) => {
        console.error('aggregate query error: ', error);
        throw new Error(error.data.error.message);
      });
  }
  getGeohashMap(target: any, options: any, cacheOverride: any) {
    let tableName = '';
    let groupBy = '';
    let sysparam = '';
    if (target.tableName) {
      if (target.tableName.value) {
        tableName = utils.replaceTargetUsingTemplVars(target.tableName.value, options.scopedVars);
      }
    }
    if (typeof target.groupBy === 'string') {
      if (target.groupBy !== '') {
        groupBy = utils.replaceTargetUsingTemplVarsCSV(target.groupBy, options.scopedVars);
      }
    } else if (typeof target.groupBy === 'object') {
      if (target.groupBy !== null && target.groupBy.value !== '') {
        groupBy = utils.replaceTargetUsingTemplVarsCSV(target.groupBy.value, options.scopedVars);
      }
    }
    if (target.sysparam_query) {
      let parsedSysParam = this.singleSysParamQuery(target.sysparam_query);
      console.log('NULL SYS PARAM: ', parsedSysParam);

      sysparam = this.parseBasicSysparm(parsedSysParam, options.scopedVars);
      console.log('PARSE BASIC SYSPARM: ', sysparam);
    }

    let bodyData = `{"targets":[{"target":"${tableName}","column":"${groupBy}","sysparm":"${sysparam}"}]}`;
    if (utils.debugLevel() === 1) {
      console.log(target);
      console.log(bodyData);
    }
    return this.apiClient
      .request({
        url: this.apiPath + '/v1/query/geohash_map',
        data: bodyData,
        method: 'POST',
        cacheOverride: cacheOverride === '' ? null : cacheOverride,
      })
      .then((response) => {
        utils.printDebug('print geohash_map response from SNOW');
        utils.printDebug(response);
        return this.apiClient.mapTextResponseToFrame(response.data.result, target.refId);
      })
      .catch((error) => {
        console.error('geohash_map query error: ', error);
        throw new Error(error.data.error.message);
      });
  }
  queryLogData(target: any, timeFrom: any, timeTo: any, options: any, cacheOverride: any) {
    let compressLog = target.compressLogs;
    let sysparam = '';
    //Checks if variable is an array
    if (target.basicSysparm.constructor.toString().indexOf('Array') !== -1) {
      sysparam = this.parseBasicSysparm(target.basicSysparm, options);
      console.log('PARSE BASIC SYSPARM: ', sysparam);
    }
    let limit = 9999;
    if (target.rowLimit) {
      if (target.rowLimit > 0 && target.rowLimit < 10000) {
        limit = target.rowLimit;
      }
    }
    let page = 0;
    if (target.page) {
      if (target.page >= 0) {
        page = target.page;
      }
    }

    let sortBy = '';
    let sortDirection = '';
    if (target.sortBy && target.sortDirection) {
      if (target.sortBy.value) {
        sortBy = utils.replaceTargetUsingTemplVarsCSV(target.sortBy.value, options.scopedVars);
        sortDirection = target.sortDirection;
      }
    }
    let elasticSearch = '';
    if (target.elasticSearch) {
      elasticSearch = utils.replaceTargetUsingTemplVarsCSV(target.elasticSearch, options.scopedVars);
    }

    let bodyData = `{"targets":[{"sysparm":"${sysparam}","limit":${limit},"page":${page},"sortBy":"${sortBy}","sortDirection":"${sortDirection}","esSearch":"${elasticSearch}","startTime":${timeFrom},"endTime":${timeTo},"compressLog":${compressLog}}]}`;
    if (utils.debugLevel() === 1) {
      console.log(target);
      console.log(bodyData);
    }
    return this.apiClient
      .request({
        url: this.apiPath + '/v1/query/logs',
        data: bodyData,
        method: 'POST',
        cacheOverride: cacheOverride === '' ? null : cacheOverride,
      })
      .then((response) => {
        utils.printDebug('print query log data response from SNOW');
        utils.printDebug(response);
        return this.apiClient.mapTextResponseToFrame(response.data.result, target.refId);
      })
      .catch((error) => {
        console.error('log query error: ', error);
        throw new Error(error.data.error.message);
      });
  }
  getTrendData(target: any, timeFrom: any, timeTo: any, options: any, cacheOverride: any) {
    if (utils.debugLevel() === 1) {
      console.log(target);
    }
    let table = '';
    let sysparam = '';
    let elasticSearch = '';
    let groupBy = '';
    let trendColumn = '';
    let trendBy = '';
    let period = 1;
    if (target.tableName) {
      if (target.tableName.value) {
        table = utils.replaceTargetUsingTemplVars(target.tableName.value, options.scopedVars);
      }
    }
    //Checks if variable is an array
    if (target.basicSysparm.constructor.toString().indexOf('Array') !== -1) {
      sysparam = this.parseBasicSysparm(target.basicSysparm, options);
      console.log('PARSE BASIC SYSPARM: ', sysparam);
    }

    if (target.elasticSearch) {
      elasticSearch = utils.replaceTargetUsingTemplVarsCSV(target.elasticSearch, options.scopedVars);
    }
    if (typeof target.groupBy === 'string') {
      if (target.groupBy !== '') {
        groupBy = utils.replaceTargetUsingTemplVarsCSV(target.groupBy, options.scopedVars);
      }
    } else if (typeof target.groupBy === 'object') {
      if (target.groupBy !== null && target.groupBy.value !== '') {
        groupBy = utils.replaceTargetUsingTemplVarsCSV(target.groupBy.value, options.scopedVars);
      }
    }
    if (target.selectedTrendColumn) {
      if (target.selectedTrendColumn.value) {
        trendColumn = utils.replaceTargetUsingTemplVarsCSV(target.selectedTrendColumn.value, options.scopedVars);
      }
    }
    if (target.selectedTrendBy) {
      if (target.selectedTrendBy.value) {
        trendBy = utils.replaceTargetUsingTemplVarsCSV(target.selectedTrendBy.value, options.scopedVars);
      }
    }
    if (target.trendPeriod) {
      if (target.trendPeriod > 0) {
        period = target.trendPeriod;
      }
    }
    let bodyData = `{"targets":[{"target":"${table}","sysparm":"${sysparam}","esSearch":"${elasticSearch}","trendColumn":"${trendColumn}","trendBy":"${trendBy}","period":${period},"groupBy":"${groupBy}"}]}`;

    if (utils.debugLevel() === 1) {
      console.log(target);
      console.log(bodyData);
    }
    return this.apiClient
      .request({
        url: this.apiPath + '/v1/query/trend?startTime=' + timeFrom + '&endTime=' + timeTo,
        data: bodyData,
        method: 'POST',
        cacheOverride: cacheOverride === '' ? null : cacheOverride,
      })
      .then((response) => {
        utils.printDebug('print trend data response from SNOW');
        utils.printDebug(response);
        return this.apiClient.mapTrendResponseToFrame(response.data.result, target);
      })
      .catch((error) => {
        console.error('trend query error: ', error);
        throw new Error(error.data.error.message);
      });
  }
  getOutageStatus(target: any, timeFrom: any, timeTo: any, options: any, cacheOverride: any) {
    let ciIds = '';
    if (target.selectedServiceList) {
      if (target.selectedServiceList.value) {
        ciIds = utils.replaceTargetUsingTemplVarsCSV(target.selectedServiceList.value, options.scopedVars);
      }
    }
    let showPercent = false;
    if (typeof target.showPercent === 'boolean') {
      showPercent = target.showPercent;
    }
    let sysparam = '';
    if (target.sysparam_query) {
      let parsedSysParam = this.singleSysParamQuery(target.sysparam_query);
      console.log('NULL SYS PARAM: ', parsedSysParam);

      sysparam = this.parseBasicSysparm(parsedSysParam, options.scopedVars);
      console.log('PARSE BASIC SYSPARM: ', sysparam);
    }
    let limit = 9999;
    if (target.rowLimit) {
      if (target.rowLimit > 0 && target.rowLimit < 10000) {
        limit = target.rowLimit;
      }
    }
    let page = 0;
    if (target.page) {
      if (target.page >= 0) {
        page = target.page;
      }
    }

    let bodyData = `{"targets":[{"target":"${ciIds}","showPercent":${showPercent},"sysparm":"${sysparam}","limit":${limit},"page":${page}}]}`;
    if (utils.debugLevel() === 1) {
      console.log(bodyData);
    }
    return this.apiClient
      .request({
        url: this.apiPath + '/v1/query/outage',
        data: bodyData,
        method: 'POST',
        cacheOverride: cacheOverride === '' ? null : cacheOverride,
      })
      .then((response) => {
        utils.printDebug('print outage status response from SNOW');
        utils.printDebug(response);
        if (showPercent) {
          return this.apiClient.mapTextResponseToFrame(response.data.result, target.refId);
        } else {
          return this.apiClient.mapOutageResponseToFrame(response.data.result, target);
        }
      })
      .catch((error) => {
        console.error('outage query error: ', error);
        throw new Error(error.data.error.message);
      });
  }
  getAnomaly(target: any, timeFrom: any, timeTo: any, options: any, cacheOverride: any) {
    if (utils.debugLevel() === 1) {
      console.log('query anomaly');
      console.log(target);
    }

    let tableColumns = '';
    if (target.selectedtableColumns) {
      if (target.selectedtableColumns.length > 0) {
        target.selectedtableColumns.map((listItem: any) => {
          tableColumns += utils.replaceTargetUsingTemplVars(listItem.value, options.scopedVars) + ',';
        });
        if (tableColumns.charAt(tableColumns.length - 1) === ',') {
          tableColumns = tableColumns.substring(0, tableColumns.length - 1);
        }
      }
    }
    let sysparam = '';
    //Checks if variable is an array
    if (target.basicSysparm.constructor.toString().indexOf('Array') !== -1) {
      sysparam = this.parseBasicSysparm(target.basicSysparm, options);
      console.log('PARSE BASIC SYSPARM: ', sysparam);
    }

    let limit = 9999;
    if (target.rowLimit) {
      if (target.rowLimit > 0 && target.rowLimit < 10000) {
        limit = target.rowLimit;
      }
    }
    let page = 0;
    if (target.page) {
      if (target.page >= 0) {
        page = target.page;
      }
    }

    let sortBy = '';
    let sortDirection = '';
    if (target.sortBy && target.sortDirection) {
      if (target.sortBy.value) {
        sortBy = utils.replaceTargetUsingTemplVarsCSV(target.sortBy.value, options.scopedVars);
        sortDirection = target.sortDirection;
      }
    }

    let bodyData = `{"targets":[{"columns":"${tableColumns}","sysparm":"${sysparam}","limit":${limit},"page":${page},"sortBy":"${sortBy}","sortDirection":"${sortDirection}"}]}`;
    if (utils.debugLevel() === 1) {
      console.log(target);
      console.log(bodyData);
    }
    return this.apiClient
      .request({
        url: this.apiPath + '/v1/query/anomaly',
        data: bodyData,
        method: 'POST',
        cacheOverride: cacheOverride === '' ? null : cacheOverride,
      })
      .then((response) => {
        utils.printDebug('print anomaly query response from SNOW');
        utils.printDebug(response);
        return this.apiClient.mapTextResponseToFrame(response.data, target.refId);
      })
      .catch((error) => {
        console.error('anomaly query error: ', error);
        throw new Error(error.data.error.message);
      });
  }
  // End of query methods
  // Start variable query methods
  getGroupByVariable(tableName: string, groupBy: string, sysparam: string, asterisk: boolean, showNull: boolean) {
    let bodyData = {
      tableName: tableName,
      groupBy: groupBy,
      sysparam: sysparam,
    };
    let url = this.apiPath + '/v1/variable/groupby';
    if (utils.debugLevel() === 1) {
      console.log('getGroupByVariable bodyData: ', bodyData);
    }
    return this.apiClient
      .request({
        url: url,
        data: bodyData,
        method: 'POST',
        cacheOverride: null,
      })
      .then((response) => {
        console.log('print getGroupByVariable query response from SNOW: ', response);
        return this.apiClient.mapResponseToVariable(response.data.result, asterisk, showNull);
      })
      .catch((error) => {
        console.error('getGroupByVariable query error: ', error);
        throw new Error(error.data.error.message);
      });
  }
  getGenericVariable(
    tableName: string,
    nameColumn: string,
    idColumn: string,
    sysparam: string,
    limit: string,
    asterisk: boolean,
    showNull: boolean
  ) {
    let bodyData = `{"targets":[{"tableName":"${tableName}","nameColumn":"${nameColumn}","idColumn":"${idColumn}","sysparm":"${sysparam}","limit":${limit}}]}`;
    console.log(bodyData);
    return this.apiClient
      .request({
        url: this.apiPath + '/v1/variable/generic',
        data: bodyData,
        method: 'POST',
      })
      .then((response) => {
        utils.printDebug(response);
        return this.apiClient.mapResponseToVariable(response.data.result, asterisk, showNull);
      })
      .catch((error) => {
        console.error('generic variable error: ', error);
        throw new Error(error.data.error.message);
      });
  }

  getMetricNamesInCIs(metricCategory: any, cis: any, asterisk: any, showNull: any) {
    if (utils.debugLevel() === 1) {
      console.log('inside getMetricNamesInCIs');
      console.log('print target');
      console.log(metricCategory);
    }

    let ciTarget = utils.createRegEx(cis);
    ciTarget = utils.trimRegEx(ciTarget);

    let bodyData = '{"targets":[{"target":"' + ciTarget + '","metricType":"' + metricCategory + '"}]}';
    let cisURL = this.apiPath + '/v1/variable/metrics';

    if (utils.debugLevel() === 1) {
      console.log('source after replace');
      console.log(ciTarget);
      console.log(bodyData);
    }

    return this.apiClient
      .request({
        url: cisURL,
        data: bodyData,
        method: 'POST',
      })
      .then((response) => {
        utils.printDebug(response);
        return this.apiClient.mapResponseToVariable(response.data.result, asterisk, showNull);
      })
      .catch((error) => {
        console.error('metric variable error: ', error);
        throw new Error(error.data.error.message);
      });
  }
  getNestedCIS(bodyObj: any, asterisk: any, showNull: any) {
    let bodyData = `{"targets":[{"ci": "${bodyObj.ci}",
      "parentDepth":"${bodyObj.parentDepth}",
      "childDepth":"${bodyObj.childDepth}",
      "sysparm":"${bodyObj.sysparam}",
      "type":"ci"}]}`;
    if (utils.debugLevel() === 1) {
      console.log('get nested cis');
      console.log(bodyData);
    }
    return this.apiClient
      .request({
        url: this.apiPath + '/v1/variable/nested_value',
        data: bodyData,
        method: 'POST',
      })
      .then((response) => {
        utils.printDebug(response);
        return this.apiClient.mapResponseToVariable(response.data, asterisk, showNull);
      })
      .catch((error) => {
        console.error('nested cis variable error: ', error);
        throw new Error(error.data.error.message);
      });
  }
  getNestedClasses(bodyObj: any, asterisk: any, showNull: any) {
    let bodyData = `{"targets":[{"ci": "${bodyObj.ci}",
      "parentDepth":"${bodyObj.parentDepth}",
      "childDepth":"${bodyObj.childDepth}",
      "sysparm":"${bodyObj.sysparam}",
      "type":"class"}]}`;
    if (utils.debugLevel() === 1) {
      console.log('get nested classes');
      console.log(bodyData);
    }
    return this.apiClient
      .request({
        url: this.apiPath + '/v1/variable/nested_value',
        data: bodyData,
        method: 'POST',
      })
      .then((response) => {
        utils.printDebug(response);
        return this.apiClient.mapResponseToVariable(response.data, asterisk, showNull);
      })
      .catch((error) => {
        console.error('nested classes variable error: ', error);
        throw new Error(error.data.error.message);
      });
  }
  getV2NestedValues(bodyObj: any, asterisk: any, showNull: any) {
    if (utils.debugLevel() === 1) {
      console.log('getV2NestedValues bodyObj: ', bodyObj);
    }
    return this.apiClient
      .request({
        url: this.apiPath + '/v2/variable/nested_value',
        data: bodyObj,
        method: 'POST',
      })
      .then((response) => {
        console.log('getV2NestedValues response: ', response);
        return this.apiClient.mapResponseToVariable(response.data.result, asterisk, showNull);
      })
      .catch((error) => {
        console.error('getV2NestedValues error: ', error);
        throw new Error(error.data.error.message);
      });
  }
  // End variable query methods
  // Start option query methods
  getMetricAnomalyOptions() {
    let queryOptions = [
      {
        label: 'true',
        value: 'true',
      },
      {
        label: 'false',
        value: 'false',
      },
    ];
    return queryOptions;
  }
  getAlertTypeOptions() {
    let queryOptions = [
      {
        label: 'CI',
        value: 'CI',
        description: 'Get Alerts at the CI level',
      },
      {
        label: 'Service',
        value: 'Service',
        description: 'Get Alerts at the Service level',
      },
      {
        label: 'None',
        value: 'None',
        description: 'Ignore CI selection and use sysparam_query',
      },
    ];
    return queryOptions;
  }
  getAlertStateOptions() {
    let queryOptions = [
      {
        label: 'Active',
        value: 'Active',
        description: 'Get Open and Reopen Alerts',
      },
      {
        label: 'All',
        value: 'All',
        description: 'Get All alerts Open,Reopen, and Closed',
      },
    ];
    return queryOptions;
  }
  getAggregateTypeOptions() {
    let queryOptions = [
      {
        label: 'AVG',
        value: 'AVG',
      },
      {
        label: 'COUNT',
        value: 'COUNT',
      },
      {
        label: 'MIN',
        value: 'MIN',
      },
      {
        label: 'MAX',
        value: 'MAX',
      },
      {
        label: 'STDDEV',
        value: 'STDDEV',
      },
      {
        label: 'SUM',
        value: 'SUM',
      },
    ];
    return queryOptions;
  }
  getOperatorOptions(type: string) {
    if (type === 'True/False') {
      return [
        {
          label: 'is',
          value: '=',
          description: '=',
        },
        {
          label: 'is not',
          value: '!=',
          description: '!=',
        },
        {
          label: 'is empty',
          value: 'ISEMPTY',
          description: 'ISEMPTY',
        },
        {
          label: 'is not empty',
          value: 'ISNOTEMPTY',
          description: 'ISNOTEMPTY',
        },
        {
          label: 'is anything',
          value: 'ANYTHING',
          description: 'ANYTHING',
        },
        {
          label: 'is same',
          value: 'SAMEAS',
          description: 'SAMEAS',
        },
        {
          label: 'is different',
          value: 'NSAMEAS',
          description: 'NSAMEAS',
        },
      ];
    } else if (type === 'Integer' || type === 'Long' || type === 'Decimal' || type === 'Floating Point Number') {
      return [
        {
          label: 'is',
          value: '=',
          description: '=',
        },
        {
          label: 'is not',
          value: '!=',
          description: '!=',
        },
        {
          label: 'is empty',
          value: 'ISEMPTY',
          description: 'ISEMPTY',
        },
        {
          label: 'is not empty',
          value: 'ISNOTEMPTY',
          description: 'ISNOTEMPTY',
        },
        {
          label: 'less than',
          value: '<',
          description: '<',
        },
        {
          label: 'greater than',
          value: '>',
          description: '>',
        },
        {
          label: 'less than or is',
          value: '<=',
          description: '<=',
        },
        {
          label: 'greater than or is',
          value: '>=',
          description: '>=',
        },
        {
          label: 'between',
          value: 'BETWEEN',
          description: 'BETWEEN',
        },
        {
          label: 'is anything',
          value: 'ANYTHING',
          description: 'ANYTHING',
        },
        {
          label: 'is same',
          value: 'SAMEAS',
          description: 'SAMEAS',
        },
        {
          label: 'is different',
          value: 'NSAMEAS',
          description: 'NSAMEAS',
        },
        {
          label: 'greater than field',
          value: 'GT_FIELD',
          description: 'GT_FIELD',
        },
        {
          label: 'less than field',
          value: 'LT_FIELD',
          description: 'LT_FIELD',
        },
        {
          label: 'greater than or is field',
          value: 'GT_OR_EQUALS_FIELD',
          description: 'GT_OR_EQUALS_FIELD',
        },
        {
          label: 'less than or is field',
          value: 'LT_OR_EQUALS_FIELD',
          description: 'LT_OR_EQUALS_FIELD',
        },
      ];
    } else if (type === 'Date/Time' || type === 'Date' || type === 'Time') {
      return [
        {
          label: 'on',
          value: 'ON',
          description: 'ON',
        },
        {
          label: 'not on',
          value: 'NOTON',
          description: 'NOTON',
        },
        {
          label: 'before',
          value: '<',
          description: '<',
        },
        {
          label: 'at or before',
          value: '<=',
          description: '<=',
        },
        {
          label: 'after',
          value: '>',
          description: '>',
        },
        {
          label: 'at or after',
          value: '>=',
          description: '>=',
        },
        {
          label: 'between',
          value: 'BETWEEN',
          description: 'BETWEEN',
        },
        {
          label: 'relative (on or after)',
          value: 'RELATIVEGE',
          description: 'RELATIVEGE',
        },
        {
          label: 'relative (on or before)',
          value: 'RELATIVELE',
          description: 'RELATIVELE',
        },
        {
          label: 'relative (after)',
          value: 'RELATIVEGT',
          description: 'RELATIVEGT',
        },
        {
          label: 'relative (before)',
          value: 'RELATIVELT',
          description: 'RELATIVELT',
        },
        {
          label: 'relative (on)',
          value: 'RELATIVEEE',
          description: 'RELATIVEEE',
        },
        {
          label: 'is empty',
          value: 'ISEMPTY',
          description: 'ISEMPTY',
        },
        {
          label: 'is not empty',
          value: 'ISNOTEMPTY',
          description: 'ISNOTEMPTY',
        },
        {
          label: 'is anything',
          value: 'ANYTHING',
          description: 'ANYTHING',
        },
        {
          label: 'is same',
          value: 'SAMEAS',
          description: 'SAMEAS',
        },
        {
          label: 'is different',
          value: 'NSAMEAS',
          description: 'NSAMEAS',
        },
        {
          label: 'is more than',
          value: 'MORETHAN',
          description: 'MORETHAN',
        },
        {
          label: 'is less than',
          value: 'LESSTHAN',
          description: 'LESSTHAN',
        },
      ];
    } else if (type === 'Choice') {
      return [
        {
          label: 'is',
          value: '=',
          description: '=',
        },
        {
          label: 'is not',
          value: '!=',
          description: '!=',
        },
        {
          label: 'is one of',
          value: 'IN',
          description: 'IN',
        },
        {
          label: 'is not one of',
          value: 'NOT IN',
          description: 'NOT IN',
        },
        {
          label: 'contains',
          value: 'LIKE',
          description: 'LIKE',
        },
        {
          label: 'does not contain',
          value: 'NOT LIKE',
          description: 'NOT LIKE',
        },
        {
          label: 'starts with',
          value: 'STARTSWITH',
          description: 'STARTSWITH',
        },
        {
          label: 'ends with',
          value: 'ENDSWITH',
          description: 'ENDSWITH',
        },
        {
          label: 'is anything',
          value: 'ANYTHING',
          description: 'ANYTHING',
        },
        {
          label: 'is same',
          value: 'SAMEAS',
          description: 'SAMEAS',
        },
        {
          label: 'is different',
          value: 'NSAMEAS',
          description: 'NSAMEAS',
        },
        {
          label: 'less than',
          value: '<',
          description: '<',
        },
        {
          label: 'greater than',
          value: '>',
          description: '>',
        },
        {
          label: 'less than or is',
          value: '<=',
          description: '<=',
        },
        {
          label: 'greater than or is',
          value: '>=',
          description: '>=',
        },
        {
          label: 'between',
          value: 'BETWEEN',
          description: 'BETWEEN',
        },
      ];
    } else if (type === 'Reference') {
      return [
        {
          label: 'is',
          value: '=',
          description: '=',
        },
        {
          label: 'is not',
          value: '!=',
          description: '!=',
        },
        {
          label: 'is empty',
          value: 'ISEMPTY',
          description: 'ISEMPTY',
        },
        {
          label: 'is not empty',
          value: 'ISNOTEMPTY',
          description: 'ISNOTEMPTY',
        },
        {
          label: 'starts with',
          value: 'STARTSWITH',
          description: 'STARTSWITH',
        },
        {
          label: 'ends with',
          value: 'ENDSWITH',
          description: 'ENDSWITH',
        },
        {
          label: 'contains',
          value: 'LIKE',
          description: 'LIKE',
        },
        {
          label: 'does not contain',
          value: 'NOT LIKE',
          description: 'NOT LIKE',
        },
        {
          label: 'is one of',
          value: 'IN',
          description: 'IN',
        },
        {
          label: 'is not one of',
          value: 'NOT IN',
          description: 'NOT IN',
        },
        {
          label: 'is anything',
          value: 'ANYTHING',
          description: 'ANYTHING',
        },
        {
          label: 'is same',
          value: 'SAMEAS',
          description: 'SAMEAS',
        },
        {
          label: 'is different',
          value: 'NSAMEAS',
          description: 'NSAMEAS',
        },
        {
          label: 'is empty string',
          value: 'EMPTYSTRING',
          description: 'EMPTYSTRING',
        },
        {
          label: 'is (dynamic)',
          value: 'DYNAMIC',
          description: 'DYNAMIC',
        },
      ];
    } else {
      return [
        {
          label: 'is',
          value: '=',
          description: '=',
        },
        {
          label: 'is not',
          value: '!=',
          description: '!=',
        },
        {
          label: 'is empty',
          value: 'ISEMPTY',
          description: 'ISEMPTY',
        },
        {
          label: 'is not empty',
          value: 'ISNOTEMPTY',
          description: 'ISNOTEMPTY',
        },
        {
          label: 'starts with',
          value: 'STARTSWITH',
          description: 'STARTSWITH',
        },
        {
          label: 'ends with',
          value: 'ENDSWITH',
          description: 'ENDSWITH',
        },
        {
          label: 'contains',
          value: 'LIKE',
          description: 'LIKE',
        },
        {
          label: 'does not contain',
          value: 'NOT LIKE',
          description: 'NOT LIKE',
        },
        {
          label: 'is one of',
          value: 'IN',
          description: 'IN',
        },
        {
          label: 'is not one of',
          value: 'NOT IN',
          description: 'NOT IN',
        },
        {
          label: 'is empty',
          value: 'ISEMPTY',
          description: 'ISEMPTY',
        },
        {
          label: 'is not empty',
          value: 'ISNOTEMPTY',
          description: 'ISNOTEMPTY',
        },
        {
          label: 'is empty string',
          value: 'EMPTYSTRING',
          description: 'EMPTYSTRING',
        },
        {
          label: 'is anything',
          value: 'ANYTHING',
          description: 'ANYTHING',
        },
        {
          label: 'less than or is',
          value: '<=',
          description: '<=',
        },
        {
          label: 'greater than or is',
          value: '>=',
          description: '>=',
        },
        {
          label: 'between',
          value: 'BETWEEN',
          description: 'BETWEEN',
        },
        {
          label: 'is same',
          value: 'SAMEAS',
          description: 'SAMEAS',
        },
        {
          label: 'is different',
          value: 'NSAMEAS',
          description: 'NSAMEAS',
        },
      ];
    }
  }
  getSysparmTypeOptions() {
    let queryOptions = [
      {
        label: 'is',
        value: '=',
        description: '=',
      },
      {
        label: 'is not',
        value: '!=',
        description: '!=',
      },
      {
        label: 'starts with',
        value: 'STARTSWITH',
        description: 'STARTSWITH',
      },
      {
        label: 'ends with',
        value: 'ENDSWITH',
        description: 'ENDSWITH',
      },
      {
        label: 'contains',
        value: 'LIKE',
        description: 'LIKE',
      },
      {
        label: 'does not contain',
        value: 'NOT LIKE',
        description: 'NOT LIKE',
      },
      {
        label: 'is empty',
        value: 'ISEMPTY',
        description: 'ISEMPTY',
      },
      {
        label: 'is not empty',
        value: 'ISNOTEMPTY',
        description: 'ISNOTEMPTY',
      },
      {
        label: 'is anything',
        value: 'ANYTHING',
        description: 'ANYTHING',
      },
      {
        label: 'is one of',
        value: 'IN',
        description: 'IN',
      },
      {
        label: 'is not one of',
        value: 'NOT IN',
        description: 'NOT IN',
      },
      {
        label: 'is empty string',
        value: 'EMPTYSTRING',
        description: 'EMPTYSTRING',
      },
      {
        label: 'less than or is',
        value: '<=',
        description: '<=',
      },
      {
        label: 'greater than or is',
        value: '>=',
        description: '>=',
      },
      {
        label: 'between',
        value: 'BETWEEN',
        description: 'BETWEEN',
      },
      {
        label: 'instance of',
        value: 'INSTANCEOF',
        description: 'INSTANCEOF',
      },
    ];
    return queryOptions;
  }
  getTrendByOptions() {
    let queryOptions = [
      {
        label: 'Minute',
        value: 'minute',
      },
      {
        label: 'Week',
        value: 'week',
      },
    ];
    return queryOptions;
  }
  loadServiceOptions(input?: any) {
    let search = input ? input : '';
    let bodyData = `{"targets":[{"target":"cmdb_ci_service","columns":"name:d,sys_id:v","sysparm":"operational_status=1^name!=All^nameLIKE${search}","limit":100,"sortBy":"name","sortDirection":"ASC"}]}`;
    if (utils.debugLevel() === 1) {
      console.log(bodyData);
      console.log('loadServiceOptions');
    }
    return this.apiClient
      .request({
        url: this.apiPath + '/v1/query/table',
        data: bodyData,
        method: 'POST',
      })
      .then((response) => {
        utils.printDebug('print loadServiceOptions response from SNOW');
        utils.printDebug(response);
        return this.apiClient.mapChecksToValue(response.data.result);
      })
      .catch((error) => {
        console.error('loadServiceOptions error: ', error);
        throw new Error(error.data.error.message);
      });
  }
  loadCIOptions(serviceId: any, input: any) {
    let search = input ? input : '';
    let bodyData = '';
    if (serviceId) {
      bodyData = `{"targets":[{"target":"em_impact_graph","columns":"child_name:d,child_id:v,child_id:d","sysparm":"business_service=${serviceId}^child_nameLIKE${search}","limit":100,"sortBy":"ci_name","sortDirection":"ASC"}]}`;
    } else {
      bodyData = `{"targets":[{"target":"cmdb_ci","columns":"name:d,sys_id:v,sys_class_name:d","sysparm":"nameLIKE${search}^name!=NULL","limit":100,"sortBy":"cmdb_ci.name","sortDirection":"ASC"}]}`;
    }
    if (utils.debugLevel() === 1) {
      console.log(bodyData);
      console.log('loadCIOptions');
    }
    return this.apiClient
      .request({
        url: this.apiPath + '/v1/query/table',
        data: bodyData,
        method: 'POST',
      })
      .then((response) => {
        utils.printDebug('print loadCIOptions response from SNOW');
        utils.printDebug(response);
        let result = this.apiClient.mapChecksToValuePlusSuffix(response.data.result);
        utils.printDebug(result);
        return this.apiClient.mapSuffixToLabel(result);
      })
      .catch((error) => {
        console.error('loadCIOptions error: ', error);
        throw new Error(error.data.error.message);
      });
  }
  loadResourceOptions(selectedCIS?: any, input?: any) {
    let bodyData = '';
    let search = input ? input : '';
    if (selectedCIS) {
      let ciArray = selectedCIS.map((option: any) => {
        return option.value;
      });
      console.log(ciArray);
      bodyData = `{"targets":[{"target":"sa_metric_map","columns":"resource_id:d,resource_id:v","sysparm":"cmdb_ciIN${ciArray}^resource_idLIKE${search}^resource_id!=NULL","limit":100,"sortBy":"resource_id","sortDirection":"ASC"}]}`;
    }
    return this.apiClient
      .request({
        url: this.apiPath + '/v1/query/table',
        data: bodyData,
        method: 'POST',
      })
      .then((response) => {
        utils.printDebug('print loadResourceOptions response from SNOW');
        utils.printDebug(response);
        let result = [{ label: '*', value: '*' }];
        let options = result.concat(this.apiClient.mapChecksToValue(response.data.result));
        //Next line removes duplicate value's from the array
        options = options.filter((option, index, self) => index === self.findIndex((t) => t.value === option.value));
        return options;
      })
      .catch((error) => {
        console.error('loadResourceOptions error: ', error);
        throw new Error(error.data.error.message);
      });
  }
  loadMetricOptions(selectedCIS?: any, input?: any) {
    let bodyData = '';
    let search = input ? input : '';
    if (typeof selectedCIS !== 'undefined') {
      let ciArray = selectedCIS.map((option: any) => {
        return option.value;
      });
      console.log(ciArray);
      bodyData = `{"targets":[{"target":"sa_metric_map","columns":"metric_type_id.metric_type_tiny_name:d,metric_type_id:v","sysparm":"cmdb_ciIN${ciArray}^metric_type_id.metric_type_tiny_nameLIKE${search}","limit":100,"sortBy":"","sortDirection":"ASC"}]}`;
    }
    return this.apiClient
      .request({
        url: this.apiPath + '/v1/query/table',
        data: bodyData,
        method: 'POST',
      })
      .then((response) => {
        utils.printDebug('print loadMetricOptions response from SNOW');
        utils.printDebug(response);
        let result = [{ label: '*', value: '*' }];
        let options = result.concat(this.apiClient.mapChecksToValue(response.data.result));
        //Next line removes duplicate value's from the array
        options = options.filter((option, index, self) => index === self.findIndex((t) => t.value === option.value));
        return options;
      })
      .catch((error) => {
        console.error('loadMetricOptions error: ', error);
        throw new Error(error.data.error.message);
      });
  }
  loadColumnChoices(tableName: any, tableColumn?: any, input?: any, type?: any) {
    if (!tableColumn) {
      return [];
    }
    // console.log('loadColumnChoices tableName: ', tableName);
    // console.log('loadColumnChoices tableColumn: ', tableColumn);
    // console.log('loadColumnChoices input: ', input);
    // console.log('loadColumnChoices type: ', type);
    if (type === 'True/False') {
      return [
        {
          label: 'True',
          value: 'true',
        },
        {
          label: 'False',
          value: 'false',
        },
      ];
    } else if (type === 'Date/Time') {
      //return getDateTimePresetChoices();
    }
    let bodyData = `{"targets":[{"target":"sys_choice","columns":"label,value","sysparm":"name=${tableName}^element!=NULL^elementLIKE${tableColumn}^labelLIKE${input}^language=en","limit":100,"sortBy":"label","sortDirection":"ASC"}]}`;
    if (utils.debugLevel() === 1) {
      console.log('loadColumnChoices bodyData: ', bodyData);
    }
    return this.apiClient
      .request({
        url: this.apiPath + '/v1/query/table',
        data: bodyData,
        method: 'POST',
      })
      .then((response) => {
        console.log('loadColumnChoices response: ', response);
        return this.apiClient.mapChecksToValue(response.data.result);
      })
      .catch((error) => {
        console.error('loadColumnChoices error: ', error);
        throw new Error(error.data.error.message);
      });
  }
  getDateTimePresetChoices() {
    return [
      {
        label: 'Today',
        value: 'Today@javascript:gs.beginningOfToday()@javascript:gs.endOfToday()',
      },
      {
        label: 'Yesterday',
        value: 'Yesterday@javascript:gs.beginningOfYesterday()@javascript:gs.endOfYesterday()',
      },
      {
        label: 'Tomorrow',
        value: 'Tomorrow@javascript:gs.beginningOfTomorrow()@javascript:gs.endOfTomorrow()',
      },
      {
        label: 'This Week',
        value: 'This week@javascript:gs.beginningOfThisWeek()@javascript:gs.endOfThisWeek()',
      },
      {
        label: 'Last Week',
        value: 'Last week@javascript:gs.beginningOfLastWeek()@javascript:gs.endOfLastWeek()',
      },
      {
        label: 'Next Week',
        value: 'Next week@javascript:gs.beginningOfNextWeek()@javascript:gs.endOfNextWeek()',
      },
      {
        label: 'This Month',
        value: 'This month@javascript:gs.beginningOfThisMonth()@javascript:gs.endOfThisMonth()',
      },
      {
        label: 'Last Week',
        value: 'Last month@javascript:gs.beginningOfLastMonth()@javascript:gs.endOfLastMonth()',
      },
      {
        label: 'Next Month',
        value: 'Next month@javascript:gs.beginningOfNextMonth()@javascript:gs.endOfNextMonth()',
      },
      {
        label: 'Last 3 Months',
        value: 'Last 3 months@javascript:gs.beginningOfLast3Months()@javascript:gs.endOfLast3Months()',
      },
      {
        label: 'Last 6 Months',
        value: 'Last 6 months@javascript:gs.beginningOfLast6Months()@javascript:gs.endOfLast6Months()',
      },
      {
        label: 'Last 9 Months',
        value: 'Last 9 months@javascript:gs.beginningOfLast9Months()@javascript:gs.endOfLast9Months()',
      },
      {
        label: 'Last 12 Months',
        value: 'Last 12 months@javascript:gs.beginningOfLast12Months()@javascript:gs.endOfLast12Months()',
      },
      {
        label: 'This Quarter',
        value: 'This quarter@javascript:gs.beginningOfThisQuarter()@javascript:gs.endOfThisQuarter()',
      },
      {
        label: 'Last Quarter',
        value: 'Last quarter@javascript:gs.beginningOfLastQuarter()@javascript:gs.endOfLastQuarter()',
      },
      {
        label: 'Last 2 Quarters',
        value: 'Last 2 quarters@javascript:gs.beginningOfLast2Quarters()@javascript:gs.endOfLast2Quarters()',
      },
      {
        label: 'Next Quarter',
        value: 'Next quarter@javascript:gs.beginningOfNextQuarter()@javascript:gs.endOfNextQuarter()',
      },
      {
        label: 'Next 2 Quarter',
        value: 'Next 2 quarters@javascript:gs.beginningOfNext2Quarters()@javascript:gs.endOfNext2Quarters()',
      },
      {
        label: 'This Year',
        value: 'This year@javascript:gs.beginningOfThisYear()@javascript:gs.endOfThisYear()',
      },
      {
        label: 'Next Year',
        value: 'Next year@javascript:gs.beginningOfNextYear()@javascript:gs.endOfNextYear()',
      },
      {
        label: 'Last Year',
        value: 'Last year@javascript:gs.beginningOfLastYear()@javascript:gs.endOfLastYear()',
      },
      {
        label: 'Last 2 Years',
        value: 'Last 2 years@javascript:gs.beginningOfLast2Years()@javascript:gs.endOfLast2Years()',
      },
      {
        label: 'Last 7 Days',
        value: 'Last 7 days@javascript:gs.beginningOfLast7Days()@javascript:gs.endOfLast7Days()',
      },
      {
        label: 'Last 30 Days',
        value: 'Last 30 days@javascript:gs.beginningOfLast30Days()@javascript:gs.endOfLast30Days()',
      },
      {
        label: 'Last 60 Days',
        value: 'Last 60 days@javascript:gs.beginningOfLast60Days()@javascript:gs.endOfLast60Days()',
      },
      {
        label: 'Last 90 Days',
        value: 'Last 90 days@javascript:gs.beginningOfLast90Days()@javascript:gs.endOfLast90Days()',
      },
      {
        label: 'Last 30 Days',
        value: 'Last 30 days@javascript:gs.beginningOfLast30Days()@javascript:gs.endOfLast30Days()',
      },
      {
        label: 'Last 30 Days',
        value: 'Last 30 days@javascript:gs.beginningOfLast30Days()@javascript:gs.endOfLast30Days()',
      },
      {
        label: 'Last 30 Days',
        value: 'Last 30 days@javascript:gs.beginningOfLast30Days()@javascript:gs.endOfLast30Days()',
      },
      {
        label: 'Last 30 Days',
        value: 'Last 30 days@javascript:gs.beginningOfLast30Days()@javascript:gs.endOfLast30Days()',
      },
      {
        label: 'Last 30 Days',
        value: 'Last 30 days@javascript:gs.beginningOfLast30Days()@javascript:gs.endOfLast30Days()',
      },
      {
        label: 'Last 30 Days',
        value: 'Last 30 days@javascript:gs.beginningOfLast30Days()@javascript:gs.endOfLast30Days()',
      },
      {
        label: 'Last 30 Days',
        value: 'Last 30 days@javascript:gs.beginningOfLast30Days()@javascript:gs.endOfLast30Days()',
      },
    ];
  }
  getTableColumnOptions(tableName: any, typeFilter = '') {
    if (typeof tableName === 'undefined') {
      return [];
    }
    let bodyData = `{"targets":[{"table":"${tableName}", "typeFilter":"${typeFilter}"}]}`;
    if (utils.debugLevel() === 1) {
      console.log(bodyData);
    }
    return this.apiClient
      .request({
        url: this.apiPath + '/v1/select/table_columns',
        data: bodyData,
        method: 'POST',
      })
      .then((response) => {
        utils.printDebug('print getTableColumnOptions response from SNOW');
        utils.printDebug(response);
        return this.apiClient.mapValueAsSuffix(response.data.result, true);
      })
      .catch((error) => {
        console.error('getTableColumnOptions error: ', error);
        throw new Error(error.data.error.message);
      });
  }
  loadTableOptions(input?: any) {
    let bodyData = `{"targets":[{"target":"sys_db_object","columns":"label,name","sysparm":"nameLIKE${input}^ORlabelLIKE${input}","limit":100}]}`;
    if (utils.debugLevel() === 1) {
      console.log(bodyData);
      console.log('loadTableOptions');
    }
    return this.apiClient
      .request({
        url: this.apiPath + '/v1/query/table',
        data: bodyData,
        method: 'POST',
      })
      .then((response) => {
        utils.printDebug('print loadTableOptions response from SNOW');
        utils.printDebug(response);
        let result = this.apiClient.mapChecksToValue(response.data.result);
        utils.printDebug(result);
        return this.apiClient.mapValueAsSuffix(result, false);
      })
      .catch((error) => {
        console.error('loadTableOptions error: ', error);
        throw new Error(error.data.error.message);
      });
  }
  getRelationshipTypeOptions() {
    let bodyData = `{"targets":[{"tableName":"cmdb_rel_type","nameColumn":"name","idColumn":"sys_id","sysparm":"","limit":500}]}`;
    console.log(bodyData);
    return this.apiClient
      .request({
        url: this.apiPath + '/v1/variable/generic',
        data: bodyData,
        method: 'POST',
      })
      .then((response) => {
        console.log('getRelationshipTypeOptions response: ', response);
        //utils.printDebug(response);
        return this.apiClient.mapChecksToValue(response.data.result);
      })
      .catch((error) => {
        console.error('generic variable error: ', error);
        throw new Error(error.data.error.message);
      });
  }
  loadStartingPointOptions(search: any) {
    console.log('loadStartingPointOptions search: ', search);
    let bodyData = `{"targets":[{"tableName":"cmdb_ci","nameColumn":"name","idColumn":"sys_id","sysparm":"nameLIKE${search}","limit":50}]}`;
    console.log(bodyData);
    return this.apiClient
      .request({
        url: this.apiPath + '/v1/variable/generic',
        data: bodyData,
        method: 'POST',
      })
      .then((response) => {
        console.log('loadStartingPointOptions response: ', response);
        //utils.printDebug(response);
        return this.apiClient.mapChecksToValue(response.data.result);
      })
      .catch((error) => {
        console.error('loadStartingPointOptions error: ', error);
        throw new Error(error.data.error.message);
      });
  }
  loadClassOptions(search: any) {
    let bodyData = `{"targets":[{"tableName":"sys_db_object","nameColumn":"label","idColumn":"name","sysparm":"nameSTARTSWITHcmdb_ci^labelLIKE${search}","limit":50}]}`;
    console.log(bodyData);
    return this.apiClient
      .request({
        url: this.apiPath + '/v1/variable/generic',
        data: bodyData,
        method: 'POST',
      })
      .then((response) => {
        console.log('loadClassOptions response: ', response);
        //utils.printDebug(response);
        return this.apiClient.mapChecksToValue(response.data.result);
      })
      .catch((error) => {
        console.error('loadClassOptions error: ', error);
        throw new Error(error.data.error.message);
      });
  }
  // End option query methods

  // When a sysparam filter contains a *, remove that filter but leave the rest on place
  // Ex. Input: operational_status=1^clusterIN*
  // Ex. Output: operational_status=1
  removeFiltersWithAll(sysparam: any) {
    console.log('inside removeFiltersWithAll');
    console.log('starting sysparam: ', sysparam);

    const inputArray = sysparam.split('^');
    const parsedInput = inputArray.filter((instance: any) => !instance.includes('*'));
    sysparam = parsedInput.length > 1 ? parsedInput.join('^') : parsedInput[0] || '';

    console.log('return sysparam: ', sysparam);
    return sysparam;
  }

  parseBasicSysparm(basicSysparm: any, options: any) {
    console.log('START OF PARSE BASIC SYSPARM: ', basicSysparm);
    let sysparm: string[] = [];

    basicSysparm.forEach((sysparmRow: any, index: any) => {
      if (sysparmRow.column === null) {
        return;
      }

      let columnValue = '';
      let columnObject = sysparmRow.column;
      if (columnObject?.value) {
        columnValue = utils.replaceTargetUsingTemplVarsCSV(columnObject.value, options.scopedVars);
      }

      let operatorValue = '';
      let operatorObject = sysparmRow.operator;
      if (operatorObject?.value) {
        operatorValue = utils.replaceTargetUsingTemplVarsCSV(operatorObject.value, options.scopedVars);
      }

      let valueValue = '';
      let valueObject = sysparmRow.value;
      if (valueObject?.value) {
        valueValue = utils.replaceTargetUsingTemplVarsCSV(valueObject.value, options.scopedVars);
      }

      let queryInstance = this.queryInstanceFormatter(columnValue, operatorValue, valueValue);
      if (queryInstance.trim() !== '') {
        sysparm.push(queryInstance);
      }
    });

    const result = sysparm.join('^');
    console.log('END OF PARSE BASIC SYSPARM: ', result);
    return result;
  }

  /**
   * Returns the reformated array of objects for parseBasicSysparm to use for Query Categories
   * that uses the InputSysparam rather than the BasicSysparmContainer component.
   *
   * @param queryParam String value of the Sysparam Query string.
   * @returns The reformated array of objects for parseBasicSysparm to use.
   */
  singleSysParamQuery(queryParam: any) {
    const instances = queryParam.split('^');
    const operators = [
      '=',
      '!=',
      'ISEMPTY',
      'ISNOTEMPTY',
      'ANYTHING',
      'SAMEAS',
      'NSAMEAS',
      '<',
      '>',
      '<=',
      '>=',
      'BETWEEN',
      'GT_FIELD',
      'LT_FIELD',
      'GT_OR_EQUALS_FIELD',
      'LT_OR_EQUALS_FIELD',
      'ON',
      'NOTON',
      'RELATIVEGE',
      'RELATIVELE',
      'RELATIVEGT',
      'RELATIVELT',
      'RELATIVEEE',
      'MORETHAN',
      'LESSTHAN',
      'IN',
      'NOT IN',
      'LIKE',
      'NOT LIKE',
      'STARTSWITH',
      'ENDSWITH',
      'EMPTYSTRING',
      'DYNAMIC',
    ];

    operators.sort((a, b) => b.length - a.length);
    const result: SimpleBasicSysParam[] = [];
    const parsedResult: SysParamColumnObject[] = [];

    // Extracts the column, operator, and value from the query
    for (const instance of instances) {
      for (const operator of operators) {
        const index = instance.indexOf(operator);

        if (index !== -1) {
          const column = instance.slice(0, index).trim();
          const value = instance.slice(index + operator.length).trim();
          result.push({ column, operator, value });
          break;
        }
      }
    }

    // Reformats the data into the format parseBasicSysparm takes in
    for (const instance of result) {
      const { column, operator, value } = instance;
      const objectData: SysParamColumnObject = {
        column: { value: column },
        operator: { value: operator },
        value: { value: value },
        separator: { value: '^' },
      };

      parsedResult.push(objectData);
    }

    return parsedResult;
  }

  /**
   * Returns the sysparam query with the combined function for the
   * removeFiltersWithAll and NULL functionality of the Sysparam Query string.
   *
   * @param column String value of the table column attribute
   * @param operator String value of the symbol representing action(s) between the column value and the value value
   * @param value String value of the value value used with the operator value against the column value
   * @returns The formatted sysparam query containing * and NULL values.
   */
  queryInstanceFormatter(column: any, operator: any, value: any) {
    let sysparam = '';
    let nullSysparm = '';

    console.log('INSIDE QueryInstanceFormatter');
    console.log('STARTING SYSPARAM QUERY INSTANCE: ', column + operator + value);

    // CHECK IF IT CONTAINS *
    if (value.includes('*')) {
      return '';
    } else if (value.includes('NULL')) {
      // CHECK IF IT CONTAINS NULLS
      let separator = ',';
      let items = value.split(separator);
      let filteredItems = items.filter((item: any) => item !== 'NULL');

      value = filteredItems.join(separator);

      let nullOperatorValue =
        operator === 'IN' || operator === 'LIKE'
          ? '='
          : operator === 'NOT IN' || operator === 'NOT LIKE'
          ? '!='
          : operator;

      nullSysparm = '^OR' + column + nullOperatorValue + 'NULL';
      sysparam = column + operator + value + nullSysparm;
    } else {
      sysparam = column + operator + value;
    }

    console.log('RETURNING SYSPARAM QUERY INSTANCE: ', sysparam);
    return sysparam;
  }
}
