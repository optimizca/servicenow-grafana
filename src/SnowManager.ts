import { APIClient } from 'APIClient';

import * as utils from './Utils';

export class SNOWManager {
  apiClient: APIClient;
  apiPath: string;

  constructor(options) {
    const { basicAuth, withCredentials, url, apiPath, cacheTimeout } = options;
    this.apiPath = apiPath;
    let headers = { 'Content-Type': 'application/json' };
    if (typeof basicAuth === 'string' && basicAuth.length > 0) {
      headers['Authorization'] = basicAuth;
    }
    this.apiClient = new APIClient(headers, withCredentials, url, cacheTimeout);
  }
  // Start of query methods
  getTopology(target, options, cacheOverride) {
    if (utils.debugLevel() === 1) {
      console.log('isnide get Topology');
      console.log('print target');
      console.log(target);
      console.log('print options');
      console.log(options);
    }
    let startingPoint = '';
    if (target.selectedServiceList) {
      if (target.selectedServiceList.value) {
        startingPoint = utils.replaceTargetUsingTemplVarsCSV(target.selectedServiceList.value, options.scopedVars);
      }
    }

    let child_depth = '';
    if (target.topology_child_depth) {
      child_depth = utils.replaceTargetUsingTemplVars(target.topology_child_depth, options.scopedVars);
    }
    let parent_depth = '';
    if (target.topology_parent_depth) {
      parent_depth = utils.replaceTargetUsingTemplVars(target.topology_parent_depth, options.scopedVars);
    }
    let sysparm = '';
    if (target.sysparam_query) {
      sysparm = utils.replaceTargetUsingTemplVarsCSV(target.sysparam_query, options.scopedVars);
    }
    sysparm = this.removeFiltersWithAll(sysparm);

    let bodyData = `{"targets":[{"target":"${startingPoint}","child_depth":"${child_depth}","parent_depth":"${parent_depth}","sysparm_query":"${sysparm}"}]}`;

    if (utils.debugLevel() === 1) {
      console.log('startingPoint after replace');
      console.log(startingPoint);
      console.log(bodyData);
    }
    return this.apiClient
      .request({
        url: this.apiPath + '/v1/query/topology',
        data: bodyData,
        method: 'POST',
        cacheOverride: cacheOverride === '' ? null : cacheOverride,
      })
      .then((response) => {
        utils.printDebug('print topology response from SNOW');
        utils.printDebug(response);
        utils.printDebug('~~~~~~~~~~~~~~~~');
        return this.apiClient.createTopologyFrame(response, target.refId);
      })
      .catch((error) => {
        console.error('topology query error: ', error);
        throw new Error(error.data.error.message);
      });
  }
  getMetrics(target, timeFrom, timeTo, options, cacheOverride) {
    if (utils.debugLevel() === 1) {
      console.log('isnide getMetrics');
      console.log('print target');
      console.log(target);
      console.log('print options scoped Vars');
      console.log(options.scopedVars);
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
      target.selectedSourceList.map((listItem) => {
        sourceArray.push(utils.replaceTargetUsingTemplVars(listItem.value, options.scopedVars));
      });
      sourceTarget = utils.createRegEx(sourceArray);
      console.log('ciIds: ', sourceTarget);
    }
    if (target.selectedMetricTypeList) {
      target.selectedMetricTypeList.map((listItem) => {
        resourceNameArray.push(utils.replaceTargetUsingTemplVars(listItem.value, options.scopedVars));
      });
      resourceName = utils.createRegEx(resourceNameArray);
      console.log('resourceNames: ', resourceName);
    }
    if (target.selectedMetricNameList) {
      target.selectedMetricNameList.map((listItem) => {
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
      sysparam = utils.replaceTargetUsingTemplVarsCSV(target.sysparam_query, options.scopedVars);
    }
    sysparam = this.removeFiltersWithAll(sysparam);
    metricName = utils.trimRegEx(metricName);
    sourceTarget = utils.trimRegEx(sourceTarget);

    let bodyData = `{"targets":[{"target":"${sourceTarget}","resourceName":"${resourceName}","metricName":"${metricName}","sysparm_query":"${sysparam}"}]}`;

    let metricURL = this.apiPath + '/v1/query/single_metric?startTime=' + timeFrom + '&endTime=' + timeTo;
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
          return this.apiClient.mapAnamMetricsResponseToFrame(response, target);
        } else {
          return this.apiClient.mapMetricsResponseToFrame(response, target);
        }
      })
      .catch((error) => {
        console.error('metric query error: ', error);
        throw new Error(error.data.error.message);
      });
  }
  getAlerts(target, timeFrom, timeTo, options, instanceName, cacheOverride) {
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
      target.selectedSourceList.map((listItem) => {
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
      sys_query = utils.replaceTargetUsingTemplVarsCSV(target.sysparam_query, options.scopedVars);
    }
    sys_query = this.removeFiltersWithAll(sys_query);
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
        response = this.apiClient.appendInstanceNameToResponse(response, instanceName);
        utils.printDebug(response);
        return this.apiClient.mapTextResponseToFrame(response, target.refId);
      })
      .catch((error) => {
        console.error('alert query error: ', error);
        throw new Error(error.data.error.message);
      });
  }
  getChanges(target, timeFrom, timeTo, options, cacheOverride) {
    if (utils.debugLevel() === 1) {
      console.log('inside getChanges');
      console.log('print target', target);
    }
    let service = '';
    if (target.selectedServiceList) {
      if (target.selectedServiceList.value) {
        service = utils.replaceTargetUsingTemplVarsCSV(target.selectedServiceList.value, options.scopedVars);
      }
    }
    let ci = '';
    if (target.selectedSourceList) {
      if (target.selectedSourceList.value) {
        ci = utils.replaceTargetUsingTemplVarsCSV(target.selectedSourceList.value, options.scopedVars);
      }
    }
    let bodyTarget = service;
    let changeType = 'none';

    if (target.selectedChangeTypeList) {
      if (target.selectedChangeTypeList.value === 'CI') {
        changeType = 'ci';
        bodyTarget = ci;
      } else if (target.selectedChangeTypeList.value === 'None') {
        changeType = 'none';
        bodyTarget = '';
      }
    }
    let sysparam = '';
    if (target.sysparam_query) {
      sysparam = utils.replaceTargetUsingTemplVarsCSV(target.sysparam_query, options.scopedVars);
    }
    sysparam = this.removeFiltersWithAll(sysparam);

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

    let bodyData = `{"targets":[{"target":"${bodyTarget}","sysparm_query":"${sysparam}","alertType":"${changeType}","sortBy":"${sortBy}","sortDirection":"${sortDirection}","limit":${limit},"page":${page}}]}`;

    if (utils.debugLevel() === 1) {
      console.log('bodyData: ', bodyData);
    }

    let url = this.apiPath + '/v1/query/changes';
    if (target.grafanaTimerange) {
      url += '?startTime=' + timeFrom + '&endTime=' + timeTo + '&timerangeColumn=' + timerangeColumn;
    }

    return this.apiClient
      .request({
        url: url,
        data: bodyData,
        method: 'POST',
        cacheOverride: cacheOverride === '' ? null : cacheOverride,
      })
      .then((response) => {
        utils.printDebug('print changes response from SNOW');
        utils.printDebug(response);
        return this.apiClient.mapTextResponseToFrame(response, target.refId);
      })
      .catch((error) => {
        console.error('changes query error: ', error);
        throw new Error(error.data.error.message);
      });
  }
  getLiveACCData(target, from, to, options, cacheOverride) {
    if (utils.debugLevel() === 1) {
      console.log('isnide getLiveACCData');
      console.log('print target');
      console.log(target);
      console.log('print options scoped Vars');
      console.log(options.scopedVars);
    }
    let osquery = '';
    if (target.live_osquery) {
      osquery = utils.replaceTargetUsingTemplVarsCSV(target.live_osquery, options.scopedVars);
    }
    console.log(osquery);
    /*
      Request will go here
    */
    const response = {
      data: [
        // { name: 'xfsaild/xvda1', percentage: '56.49', pid: '473', uid: '0' },
        // { name: 'systemd', percentage: '26.53', pid: '1', uid: '0' },
        // { name: 'dbus-daemon', percentage: '12.1', pid: '679', uid: '499' },
        // { name: 'systemd-journal', percentage: '11.43', pid: '573', uid: '0' },
        // { name: 'ntpd', percentage: '11.19', pid: '1384', uid: '74' },
        { mem_in_megs: '740.39', name: 'nscd', pid: '689' },
        { mem_in_megs: '333.76', name: 'rsyslogd', pid: '29468' },
        { mem_in_megs: '125.67', name: 'acc', pid: '30448' },
        { mem_in_megs: '109.54', name: 'lvmetad', pid: '13729' },
        { mem_in_megs: '78.15', name: 'xenstore-watch', pid: '707' },
      ],
    };
    return this.apiClient.mapTextResponseToFrame(response, target.refId);
  }
  queryTable(target, timeFrom, timeTo, options, cacheOverride) {
    if (utils.debugLevel() === 1) {
      console.log('query table');
      console.log(target);
    }
    let tableName = '';
    if (target.tableName) {
      if (target.tableName.value) {
        tableName = utils.replaceTargetUsingTemplVars(target.tableName.value, options.scopedVars);
      }
    }
    let tableColumns = '';
    if (target.selectedtableColumns) {
      target.selectedtableColumns.map((listItem) => {
        tableColumns += utils.replaceTargetUsingTemplVars(listItem.value, options.scopedVars) + ',';
      });
      if (tableColumns.charAt(tableColumns.length - 1) === ',') {
        tableColumns = tableColumns.substring(0, tableColumns.length - 1);
      }
    }
    let sysparam = '';
    //Checks if variable is an array
    console.log('sysparam: ', target.basic_sysparam);
    if (target.basic_sysparam.constructor.toString().indexOf('Array') !== -1) {
      for (let i = 0; i < target.basic_sysparam.length; i++) {
        let field = target.basic_sysparam[i];
        let fieldOne = '';
        if (field[1]) {
          fieldOne = utils.replaceTargetUsingTemplVarsCSV(field[1].value, options.scopedVars);
        }
        let fieldTwo = '';
        if (field[2]) {
          fieldTwo = field[2].value;
        }
        let fieldThree = '';
        if (field[3]) {
          fieldThree = utils.replaceTargetUsingTemplVarsCSV(field[3].value, options.scopedVars);
        }
        let fieldFour = '';
        if (field[4]) {
          fieldFour = field[4].value;
        }
        sysparam += fieldFour + fieldOne + fieldTwo + fieldThree;
      }
    }
    sysparam = this.removeFiltersWithAll(sysparam);
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
        return this.apiClient.mapTextResponseToFrame(response, target.refId);
      })
      .catch((error) => {
        console.error('table query error: ', error);
        throw new Error(error.data.error.message);
      });
  }
  getRowCount(target, timeFrom, timeTo, options, cacheOverride) {
    let tableName = '';
    if (target.tableName) {
      if (target.tableName.value) {
        tableName = utils.replaceTargetUsingTemplVars(target.tableName.value, options.scopedVars);
      }
    }
    let sysparam = '';
    if (target.sysparam_query) {
      sysparam = utils.replaceTargetUsingTemplVarsCSV(target.sysparam_query, options.scopedVars);
    }
    sysparam = this.removeFiltersWithAll(sysparam);
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
        return this.apiClient.mapTextResponseToFrame(response, target.refId);
      })
      .catch((error) => {
        console.error('row count query error: ', error);
        throw new Error(error.data.error.message);
      });
  }
  getAggregateQuery(target, timeFrom, timeTo, options, cacheOverride) {
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
      sysparam = utils.replaceTargetUsingTemplVarsCSV(target.sysparam_query, options.scopedVars);
      sysparam = this.removeFiltersWithAll(sysparam);
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
        utils.printDebug('print aggregate query response from SNOW');
        utils.printDebug(response);
        return this.apiClient.mapTextResponseToFrame(response, target.refId);
      })
      .catch((error) => {
        console.error('aggregate query error: ', error);
        throw new Error(error.data.error.message);
      });
  }
  getGeohashMap(target, options, cacheOverride) {
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
      sysparam = utils.replaceTargetUsingTemplVarsCSV(target.sysparam_query, options.scopedVars);
    }
    sysparam = this.removeFiltersWithAll(sysparam);

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
        return this.apiClient.mapTextResponseToFrame(response, target.refId);
      })
      .catch((error) => {
        console.error('geohash_map query error: ', error);
        throw new Error(error.data.error.message);
      });
  }
  queryLogData(target, timeFrom, timeTo, options, cacheOverride) {
    let compressLog = target.compressLogs;
    let sysparam = '';
    //Checks if variable is an array
    if (target.basic_sysparam.constructor.toString().indexOf('Array') !== -1) {
      for (let i = 0; i < target.basic_sysparam.length; i++) {
        let field = target.basic_sysparam[i];
        let fieldOne = '';
        if (field[1]) {
          fieldOne = utils.replaceTargetUsingTemplVarsCSV(field[1].value, options.scopedVars);
        }
        let fieldTwo = '';
        if (field[2]) {
          fieldTwo = field[2].value;
        }
        let fieldThree = '';
        if (field[3]) {
          fieldThree = utils.replaceTargetUsingTemplVarsCSV(field[3].value, options.scopedVars);
        }
        let fieldFour = '';
        if (field[4]) {
          fieldFour = field[4].value;
        }
        sysparam += fieldFour + fieldOne + fieldTwo + fieldThree;
      }
    }
    sysparam = this.removeFiltersWithAll(sysparam);
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
        return this.apiClient.mapTextResponseToFrame(response, target.refId);
      })
      .catch((error) => {
        console.error('log query error: ', error);
        throw new Error(error.data.error.message);
      });
  }
  getTrendData(target, timeFrom, timeTo, options, cacheOverride) {
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
    if (target.basic_sysparam.constructor.toString().indexOf('Array') !== -1) {
      for (let i = 0; i < target.basic_sysparam.length; i++) {
        let field = target.basic_sysparam[i];
        let fieldOne = '';
        if (field[1]) {
          fieldOne = utils.replaceTargetUsingTemplVarsCSV(field[1].value, options.scopedVars);
        }
        let fieldTwo = '';
        if (field[2]) {
          fieldTwo = field[2].value;
        }
        let fieldThree = '';
        if (field[3]) {
          fieldThree = utils.replaceTargetUsingTemplVarsCSV(field[3].value, options.scopedVars);
        }
        let fieldFour = '';
        if (field[4]) {
          fieldFour = field[4].value;
        }
        sysparam += fieldFour + fieldOne + fieldTwo + fieldThree;
      }
    }
    sysparam = this.removeFiltersWithAll(sysparam);

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
        return this.apiClient.mapTrendResponseToFrame(response, target);
      })
      .catch((error) => {
        console.error('trend query error: ', error);
        throw new Error(error.data.error.message);
      });
  }
  getOutageStatus(target, timeFrom, timeTo, options, cacheOverride) {
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
      sysparam = utils.replaceTargetUsingTemplVarsCSV(target.sysparam_query, options.scopedVars);
    }
    sysparam = this.removeFiltersWithAll(sysparam);
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
          return this.apiClient.mapTextResponseToFrame(response, target.refId);
        } else {
          return this.apiClient.mapOutageResponseToFrame(response, target);
        }
      })
      .catch((error) => {
        console.error('outage query error: ', error);
        throw new Error(error.data.error.message);
      });
  }
  getAnomaly(target, timeFrom, timeTo, options, cacheOverride) {
    if (utils.debugLevel() === 1) {
      console.log('query anomaly');
      console.log(target);
    }

    let tableColumns = '';
    if (target.selectedtableColumns) {
      if (target.selectedtableColumns.length > 0) {
        target.selectedtableColumns.map((listItem) => {
          tableColumns += utils.replaceTargetUsingTemplVars(listItem.value, options.scopedVars) + ',';
        });
        if (tableColumns.charAt(tableColumns.length - 1) === ',') {
          tableColumns = tableColumns.substring(0, tableColumns.length - 1);
        }
      }
    }
    let sysparam = '';
    //Checks if variable is an array
    if (target.basic_sysparam.constructor.toString().indexOf('Array') !== -1) {
      for (let i = 0; i < target.basic_sysparam.length; i++) {
        let field = target.basic_sysparam[i];
        let fieldOne = '';
        if (field[1]) {
          fieldOne = utils.replaceTargetUsingTemplVarsCSV(field[1].value, options.scopedVars);
        }
        let fieldTwo = '';
        if (field[2]) {
          fieldTwo = field[2].value;
        }
        let fieldThree = '';
        if (field[3]) {
          fieldThree = utils.replaceTargetUsingTemplVarsCSV(field[3].value, options.scopedVars);
        }
        let fieldFour = '';
        if (field[4]) {
          fieldFour = field[4].value;
        }
        sysparam += fieldFour + fieldOne + fieldTwo + fieldThree;
      }
    }
    sysparam = this.removeFiltersWithAll(sysparam);

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
        return this.apiClient.mapTextResponseToFrame(response, target.refId);
      })
      .catch((error) => {
        console.error('anomaly query error: ', error);
        throw new Error(error.data.error.message);
      });
  }
  // End of query methods
  // Start variable query methods
  getGenericVariable(tableName: string, nameColumn: string, idColumn: string, sysparam: string, limit: string) {
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
        return this.apiClient.mapChecksToValue(response);
      })
      .catch((error) => {
        console.error('generic variable error: ', error);
        throw new Error(error.data.error.message);
      });
  }
  getMetricNamesInCIs(metricCategory, cis) {
    if (utils.debugLevel() === 1) {
      console.log('isnide getMetricsForCI');
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
        return this.apiClient.mapChecksToValue(response);
      })
      .catch((error) => {
        console.error('metric variable error: ', error);
        throw new Error(error.data.error.message);
      });
  }
  getNestedCIS(bodyObj: any) {
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
        return this.apiClient.mapChecksToValue(response);
      })
      .catch((error) => {
        console.error('nested cis variable error: ', error);
        throw new Error(error.data.error.message);
      });
  }
  getNestedClasses(bodyObj: any) {
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
        return this.apiClient.mapChecksToValue(response);
      })
      .catch((error) => {
        console.error('nested classes variable error: ', error);
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
  getChangeTypeOptions() {
    let queryOptions = [
      {
        label: 'CI',
        value: 'CI',
        description: 'Get Changes at the CI level',
      },
      {
        label: 'Service',
        value: 'Service',
        description: 'Get Changes at the Service level',
      },
      {
        label: 'None',
        value: 'None',
        description: 'Ignore CI selection and use sysparam_query',
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
  getSysparamTypeOptions() {
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
  loadServiceOptions(input?) {
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
        utils.printDebug(this.apiClient.mapChecksToValue(response));
        return this.apiClient.mapChecksToValue(response);
      })
      .catch((error) => {
        console.error('loadServiceOptions error: ', error);
        throw new Error(error.data.error.message);
      });
  }
  loadCIOptions(serviceId, input) {
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
        let result = this.apiClient.mapChecksToValuePlusSuffix(response);
        utils.printDebug(result);
        return this.apiClient.mapSuffixToLabel(result);
      })
      .catch((error) => {
        console.error('loadCIOptions error: ', error);
        throw new Error(error.data.error.message);
      });
  }
  loadResourceOptions(selectedCIS?, input?) {
    let bodyData = '';
    let search = input ? input : '';
    if (selectedCIS) {
      let ciArray = selectedCIS.map((option) => {
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
        let options = result.concat(this.apiClient.mapChecksToValue(response));
        //Next line removes duplicate value's from the array
        options = options.filter((option, index, self) => index === self.findIndex((t) => t.value === option.value));
        return options;
      })
      .catch((error) => {
        console.error('loadResourceOptions error: ', error);
        throw new Error(error.data.error.message);
      });
  }
  loadMetricOptions(selectedCIS?, input?) {
    let bodyData = '';
    let search = input ? input : '';
    if (typeof selectedCIS !== 'undefined') {
      let ciArray = selectedCIS.map((option) => {
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
        let options = result.concat(this.apiClient.mapChecksToValue(response));
        //Next line removes duplicate value's from the array
        options = options.filter((option, index, self) => index === self.findIndex((t) => t.value === option.value));
        return options;
      })
      .catch((error) => {
        console.error('loadMetricOptions error: ', error);
        throw new Error(error.data.error.message);
      });
  }
  loadColumnChoices(tableName, tableColumn?, input?) {
    let bodyData = `{"targets":[{"target":"sys_choice","columns":"label,value","sysparm":"name=${tableName}^element!=NULL^elementLIKE${tableColumn}^labelLIKE${input}^language=en","limit":100,"sortBy":"label","sortDirection":"ASC"}]}`;
    if (utils.debugLevel() === 1) {
      console.log(bodyData);
      console.log('loadColumnChoices');
    }
    return this.apiClient
      .request({
        url: this.apiPath + '/v1/query/table',
        data: bodyData,
        method: 'POST',
      })
      .then((response) => {
        utils.printDebug('print loadColumnChoices response from SNOW');
        utils.printDebug(response);
        return this.apiClient.mapChecksToValue(response);
      })
      .catch((error) => {
        console.error('loadColumnChoices error: ', error);
        throw new Error(error.data.error.message);
      });
  }
  getTableColumnOptions(tableName) {
    if (typeof tableName === 'undefined') {
      return;
    }
    let bodyData = `{"targets":[{"table":"${tableName}"}]}`;
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
        return this.apiClient.mapValueAsSuffix(response, true);
      })
      .catch((error) => {
        console.error('getTableColumnOptions error: ', error);
        throw new Error(error.data.error.message);
      });
  }
  loadTableOptions(input?) {
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
        let result = this.apiClient.mapChecksToValue(response);
        utils.printDebug(result);
        return this.apiClient.mapValueAsSuffix(result, false);
      })
      .catch((error) => {
        console.error('loadTableOptions error: ', error);
        throw new Error(error.data.error.message);
      });
  }
  // End option query methods
  // getTopologyCISummary is used by our forked novatec sdg panel
  getTopologyCISummary(ciName) {
    let bodyData = '{"targets":[{"target":"' + ciName + '"}]}';

    if (utils.debugLevel() === 1) {
      console.log('source after replace');
      console.log(bodyData);
    }
    return this.apiClient
      .request({
        url: this.apiPath + '/query/ci_summary',
        data: bodyData,
        method: 'POST',
      })
      .then((response) => {
        utils.printDebug('print alerts response from SNOW');
        utils.printDebug(response);
        return response.data;
      });
  }
  getAlertTags(state, sysparam, limit) {
    if (!limit) {
      limit = 9999;
    }
    if (state === 'Active') {
      sysparam += 'state!=Closed';
    }
    let bodyData = `{"targets":[{"target":"em_alert","columns":"additional_info","sysparm":"${sysparam}","limit":${limit},"sortBy":"","sortDirection":"ASC"}]}`;
    console.log('bodyData: ', bodyData);
    return this.apiClient
      .request({
        url: this.apiPath + '/v1/query/table',
        data: bodyData,
        method: 'POST',
      })
      .then((response) => {
        utils.printDebug('print getAlertTags response from SNOW');
        utils.printDebug(response);
        let tags = this.apiClient.mapAlertTags(response);
        utils.printDebug(tags);
        return tags;
      })
      .catch((error) => {
        console.error('getAlertTags error: ', error);
        throw new Error(error.data.error.message);
      });
  }
  // When a sysparam filter contains a *, remove that filter but leave the rest on place
  // Ex. Input: operational_status=1^clusterIN*
  // Ex. Output: operational_status=1
  removeFiltersWithAll(sysparam) {
    console.log('inside removeFiltersWithAll');
    console.log('starting sysparam: ', sysparam);
    let allIndex = sysparam.indexOf('*');
    while (allIndex !== -1) {
      let afterAll = sysparam.substring(allIndex + 1);
      let beforeAll = sysparam.substring(0, allIndex + 1);
      let lastSeperator = beforeAll.lastIndexOf('^');
      if (lastSeperator === -1) {
        lastSeperator = 0;
      }
      beforeAll = beforeAll.substring(0, lastSeperator);
      sysparam = beforeAll + afterAll;
      allIndex = sysparam.indexOf('*');
    }
    console.log('return sysparam: ', sysparam);
    return sysparam;
  }
}
