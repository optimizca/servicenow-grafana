import { APIClient } from 'APIClient';

import { QueryResponse } from './types';

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
  getTopologyFrame(target, options, cacheOverride) {
    return this.getTopology(target, options, cacheOverride).then((response) => {
      console.log(response);
      const data: QueryResponse[] = [
        {
          columns: [
            { text: 'type' },
            { type: 'time', text: 'Time' },
            { text: 'app' },
            { text: 'target_app' },
            { text: 'req_rate' },
            { text: 'error_rate' },
          ],

          rows: response,
          refId: target.refId || undefined,
          meta: undefined,
        },
      ];
      utils.printDebug(data);
      return { data };
    });
  }
  getTopology(target, options, cacheOverride) {
    if (utils.debugLevel() === 1) {
      console.log('isnide get Topology');
      console.log('print target');
      console.log(target);
      console.log('print options');
      console.log(options);
    }
    var serviceTarget = utils.replaceTargetUsingTemplVars(target.service, options.scopedVars);
    if (typeof target.selectedServiceList !== 'undefined') {
      serviceTarget = utils.replaceTargetUsingTemplVarsCSV(target.selectedServiceList.value, options.scopedVars);
    }

    var child_depth = '';
    if (typeof target.topology_child_depth !== 'undefined') {
      child_depth = utils.replaceTargetUsingTemplVars(target.topology_child_depth, options.scopedVars);
    }
    var parent_depth = '';
    if (typeof target.topology_parent_depth !== 'undefined') {
      parent_depth = utils.replaceTargetUsingTemplVars(target.topology_parent_depth, options.scopedVars);
    }
    var excluded_classes = '';
    if (typeof target.topology_filter !== 'undefined') {
      if (target.topology_filter) {
        excluded_classes = utils.replaceTargetUsingTemplVarsCSV(target.topology_filter, options.scopedVars);
      }
    }
    var namespaces = '';
    if (typeof target.topology_namespaces !== 'undefined') {
      if (target.topology_namespaces) {
        namespaces = utils.replaceTargetUsingTemplVarsCSV(target.topology_namespaces, options.scopedVars);
      }
    }
    var sysparm = '';
    if (typeof target.sysparam_query !== 'undefined') {
      if (target.sysparam_query !== '') {
        sysparm = utils.replaceTargetUsingTemplVarsCSV(target.sysparam_query, options.scopedVars);
      }
    }
    var dependsOn = '';
    if (typeof target.selectedTopologyDependsOnFilter !== 'undefined') {
      dependsOn = utils.replaceTargetUsingTemplVars(target.selectedTopologyDependsOnFilter.value, options.scopedVars);
    }

    let bodyData =
      '{"targets":[{"target":"' +
      serviceTarget +
      '","child_depth":"' +
      child_depth +
      '","parent_depth":"' +
      parent_depth +
      '","exclude_classes":"' +
      excluded_classes +
      '","sysparm_query":"' +
      sysparm +
      '","namespaces":"' +
      namespaces +
      '","dependsOn":"' +
      dependsOn +
      '"}]}';

    if (utils.debugLevel() === 1) {
      console.log('source after replace');
      console.log(serviceTarget);
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

        utils.printDebug(response);
        utils.printDebug('~~~~~~~~~~~~~~~~');
        return response.rows;
      })
      .catch((error) => {
        console.error('topology query error: ', error);
        throw new Error(error.statusText);
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
    var sysparam = '';
    if (typeof target.selectedSourceList !== 'undefined') {
      var sourceArray: any[] = [];
      target.selectedSourceList.map((listItem) => {
        sourceArray.push(utils.replaceTargetUsingTemplVars(listItem.value, options.scopedVars));
      });
      sourceTarget = utils.createRegEx(sourceArray);
      console.log('ciIds: ', sourceTarget);
    }
    if (typeof target.selectedMetricTypeList !== 'undefined') {
      target.selectedMetricTypeList.map((listItem) => {
        resourceNameArray.push(utils.replaceTargetUsingTemplVars(listItem.value, options.scopedVars));
      });
      resourceName = utils.createRegEx(resourceNameArray);
      console.log('resourceNames: ', resourceName);
    }
    if (typeof target.selectedMetricNameList !== 'undefined') {
      if (target.selectedMetricNameList.length > 0) {
        target.selectedMetricNameList.map((listItem) => {
          metricNameArray.push(utils.replaceTargetUsingTemplVars(listItem.value, options.scopedVars));
        });
        metricName = utils.createRegEx(metricNameArray);
      } else {
        metricName = utils.replaceTargetUsingTemplVars(target.selectedMetricNameList.value, options.scopedVars);
      }
    }
    if (typeof target.selectedMetricAnomalyList !== 'undefined') {
      metricAnomaly = utils.replaceTargetUsingTemplVars(target.selectedMetricAnomalyList.value, options.scopedVars);
      if (metricAnomaly === 'true') {
        anomaly = true;
      }
    }
    if (typeof target.sysparam_query !== 'undefined') {
      sysparam = utils.replaceTargetUsingTemplVarsCSV(target.sysparam_query, options.scopedVars);
    }
    //let queryTarget = "EC2AMAZ-8AMDGC0";
    //let queryMetricName = "api_response_time_ms_2";
    metricName = utils.trimRegEx(metricName);
    sourceTarget = utils.trimRegEx(sourceTarget);
    let bodyData =
      '{"targets":[{"target":"' +
      sourceTarget +
      '","resourceName":"' +
      resourceName +
      '","metricName":"' +
      metricName +
      '","sysparm_query":"' +
      sysparam +
      '"}]}';
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
        throw new Error(error.statusText);
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
    var service = '';
    if (typeof target.selectedServiceList !== 'undefined') {
      service = utils.replaceTargetUsingTemplVarsCSV(target.selectedServiceList.value, options.scopedVars);
    }
    var ci = '';
    if (typeof target.selectedSourceList !== 'undefined') {
      ci = utils.replaceTargetUsingTemplVarsCSV(target.selectedSourceList.value, options.scopedVars);
    }

    let bodyTarget = service;
    let alertState = 'Active';
    let alertType = 'service';
    let sys_query = '';
    if (typeof target.selectedAlertStateList !== 'undefined') {
      alertState = target.selectedAlertStateList.value;
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
    if (typeof target.sysparam_query !== 'undefined') {
      if (target.sysparam_query) {
        sys_query = utils.replaceTargetUsingTemplVarsCSV(target.sysparam_query, options.scopedVars);
      }
    }
    var tagString = '';
    if (typeof target.tagKeys !== 'undefined' && typeof target.tagValues !== 'undefined') {
      for (let k = 0; k < target.tagKeys.length; k++) {
        if (target.tagKeys[k].value.charAt(0) === '$') {
          let key = utils.replaceTargetUsingTemplVarsCSV(target.tagKeys[k].value, options.scopedVars);
          var splitKeys = key.split(',');
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
    var limit = 9999;
    if (typeof target.rowLimit !== 'undefined') {
      if (target.rowLimit > 0 && target.rowLimit < 10000) {
        limit = target.rowLimit;
      }
    }
    var page = 0;
    console.log('typeof page: ' + typeof target.page);
    if (typeof target.page === 'number') {
      if (target.page >= 0) {
        page = target.page;
      }
    }

    let bodyData = `{"targets":[{"target":"${bodyTarget}","sysparm_query":"${sys_query}","alertType":"${alertType}","alertState":"${alertState}","limit":${limit},"page":${page},"tagFilters":"${tagString}"}]}`;

    let url = this.apiPath + '/v1/query/alerts';
    if (target.grafanaTimerange) {
      url += '?startTime=' + timeFrom + '&endTime=' + timeTo;
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
        return this.apiClient.mapTextResponseToFrame(response);
      })
      .catch((error) => {
        console.error('alert query error: ', error);
        throw new Error(error.statusText);
      });
  }
  getMetricsDefinition(target, options, cacheOverride) {
    if (utils.debugLevel() === 1) {
      console.log('isnide getMetricsDefinition');
      console.log('print target');
      console.log(target);
      console.log('print options scoped Vars');
      console.log(options.scopedVars);
    }

    const sysparam_query = utils.replaceTargetUsingTemplVarsCSV(target.sysparam_query, options.scopedVars);

    let bodyData = '{"targets":[{"target":"' + sysparam_query + '"}]}';

    if (utils.debugLevel() === 1) {
      console.log('source after replace');
      console.log(sysparam_query);
      console.log(bodyData);
    }
    return this.apiClient
      .request({
        url: this.apiPath + '/v1/query/metric_mapping',
        data: bodyData,
        method: 'POST',
        cacheOverride: cacheOverride === '' ? null : cacheOverride,
      })
      .then((response) => {
        utils.printDebug('print getMetricsDefinition response from SNOW');
        utils.printDebug(response);
        return this.apiClient.mapTextResponseToFrame(response);
      })
      .catch((error) => {
        console.error('admin query error: ', error);
        throw new Error(error.statusText);
      });
  }
  //this function support single CI or multiple CIs using regex
  getCISummary(target, options, cacheOverride) {
    var ci = '';
    if (typeof target.selectedSourceList !== 'undefined') {
      ci = utils.replaceTargetUsingTemplVarsCSV(target.selectedSourceList.value, options.scopedVars);
    }
    var sysparam = '';
    if (typeof target.sysparam_query !== 'undefined') {
      if (target.sysparam_query) {
        sysparam = utils.replaceTargetUsingTemplVarsCSV(target.sysparam_query, options.scopedVars);
      }
    }
    let bodyData = '{"targets":[{"target":"' + ci + '","sysparm_query":"' + sysparam + '"}]}';

    if (utils.debugLevel() === 1) {
      console.log('source after replace');
      console.log(bodyData);
    }

    return this.apiClient
      .request({
        url: this.apiPath + '/v1/query/ci_summary',
        data: bodyData,
        method: 'POST',
        cacheOverride: cacheOverride === '' ? null : cacheOverride,
      })
      .then((response) => {
        utils.printDebug('print ci summary response from SNOW');
        utils.printDebug(response);
        return this.apiClient.mapTextResponseToFrame(response);
      })
      .catch((error) => {
        console.error('ci summary query error: ', error);
        throw new Error(error.statusText);
      });
  }
  getChanges(target, timeFrom, timeTo, options, cacheOverride) {
    if (utils.debugLevel() === 1) {
      console.log('inside getChanges');
      console.log('print target', target);
    }
    var service = '';
    if (typeof target.selectedServiceList !== 'undefined') {
      if (target.selectedServiceList !== null && target.selectedServiceList.length > 0) {
        service = utils.replaceTargetUsingTemplVarsCSV(target.selectedServiceList.value, options.scopedVars);
      }
    }
    var ci = '';
    if (typeof target.selectedSourceList !== 'undefined') {
      if (target.selectedSourceList !== null && target.selectedSourceList.length > 0) {
        ci = utils.replaceTargetUsingTemplVarsCSV(target.selectedSourceList.value, options.scopedVars);
      }
    }
    let bodyTarget = service;
    let changeType = 'service';

    if (typeof target.selectedChangeTypeList !== 'undefined') {
      if (target.selectedChangeTypeList.value === 'CI') {
        changeType = 'ci';
        bodyTarget = ci;
      } else if (target.selectedChangeTypeList.value === 'None') {
        changeType = 'none';
        bodyTarget = '';
      }
    }
    let sysparam = '';
    if (typeof target.sysparam_query !== 'undefined') {
      if (target.sysparam_query) {
        sysparam = utils.replaceTargetUsingTemplVarsCSV(target.sysparam_query, options.scopedVars);
      }
    }

    var limit = 9999;
    if (typeof target.rowLimit !== 'undefined') {
      if (target.rowLimit > 0 && target.rowLimit < 10000) {
        limit = target.rowLimit;
      }
    }
    var page = 0;
    console.log('typeof page: ' + typeof target.page);
    if (typeof target.page === 'number') {
      if (target.page >= 0) {
        page = target.page;
      }
    }

    let bodyData = `{"targets":[{"target":"${bodyTarget}","sysparm_query":"${sysparam}","alertType":"${changeType}","limit":${limit},"page":${page}}]}`;

    if (utils.debugLevel() === 1) {
      console.log('bodyData: ', bodyData);
    }

    let url = this.apiPath + '/v1/query/changes';
    if (target.grafanaTimerange === true) {
      console.log('addingGrafanaTimerange');
      url += '?startTime=' + timeFrom + '&endTime=' + timeTo;
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
        return this.apiClient.mapTextResponseToFrame(response);
      })
      .catch((error) => {
        console.error('changes query error: ', error);
        throw new Error(error.statusText);
      });
  }
  getAllACCAgents(target, timeFrom, timeTo, options, cacheOverride) {
    if (utils.debugLevel() === 1) {
      console.log('inside getAllACCAgents');
      console.log('print target', target);
    }
    var agentFilter = '';
    var metricNamesArray: any[] = [];
    var metricNames = '';
    var sysparam_query = '';
    var filterType = '';
    if (typeof target.selectedAgentFilter !== 'undefined') {
      if (target.selectedAgentFilter.value) {
        agentFilter = utils.replaceTargetUsingTemplVars(target.selectedAgentFilter.value, options.scopedVars);
      }
    }
    if (typeof target.selectedMetricNameList !== 'undefined') {
      target.selectedMetricNameList.map((listItem) => {
        metricNamesArray.push(utils.replaceTargetUsingTemplVars(listItem.value, options.scopedVars));
      });
      metricNames = utils.createRegEx(metricNamesArray);
    }
    if (typeof target.sysparam_query) {
      if (target.sysparam_query) {
        sysparam_query = utils.replaceTargetUsingTemplVarsCSV(target.sysparam_query, options.scopedVars);
      }
    }
    if (typeof target.selectedAgentFilterType !== 'undefined') {
      if (target.selectedAgentFilterType) {
        filterType = target.selectedAgentFilterType.value.toLowerCase();
      }
    }

    var limit = 9999;
    if (typeof target.rowLimit !== 'undefined') {
      if (target.rowLimit > 0 && target.rowLimit < 10000) {
        limit = target.rowLimit;
      }
    }
    var page = 0;
    console.log('typeof page: ' + typeof target.page);
    if (typeof target.page === 'number') {
      if (target.page >= 0) {
        page = target.page;
      }
    }

    let bodyData = `{"targets":[{"target":"${agentFilter}","metricName":"${metricNames}","sysparm_query":"${sysparam_query}","filterType":"${filterType}","limit":${limit},"page":${page}}]}`;
    console.log('Body data: ', bodyData);
    return this.apiClient
      .request({
        url: this.apiPath + '/v1/query/acc_agents',
        data: bodyData,
        method: 'POST',
        cacheOverride: cacheOverride === '' ? null : cacheOverride,
      })
      .then((response) => {
        console.log('ACC response: ', response);
        return this.apiClient.mapTextResponseToFrame(response);
      })
      .catch((error) => {
        console.error('agent query error: ', error);
        throw new Error(error.statusText);
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
    var osquery = '';
    if (typeof target.live_osquery !== 'undefined') {
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
    return this.apiClient.mapTextResponseToFrame(response);
  }
  queryTable(target, timeFrom, timeTo, options, cacheOverride) {
    if (utils.debugLevel() === 1) {
      console.log('query table');
      console.log(target);
    }
    var tableName = '';
    if (typeof target.tableName !== 'undefined') {
      if (target.tableName.value !== '') {
        tableName = utils.replaceTargetUsingTemplVars(target.tableName.value, options.scopedVars);
      }
    }
    var tableColumns = '';
    if (typeof target.selectedtableColumns !== 'undefined') {
      console.log('columns: ', target.selectedtableColumns);
      if (target.selectedtableColumns.length > 0) {
        target.selectedtableColumns.map((listItem) => {
          tableColumns += utils.replaceTargetUsingTemplVars(listItem.value, options.scopedVars) + ',';
        });
        if (tableColumns.charAt(tableColumns.length - 1) === ',') {
          tableColumns = tableColumns.substring(0, tableColumns.length - 1);
        }
      }
    }
    var sysparam = '';
    //Checks if variable is an array
    console.log('sysparam: ', target.basic_sysparam);
    if (target.basic_sysparam.constructor.toString().indexOf('Array') !== -1) {
      for (var i = 0; i < target.basic_sysparam.length; i++) {
        var field = target.basic_sysparam[i];
        var fieldOne = '';
        if (field[1]) {
          fieldOne = utils.replaceTargetUsingTemplVarsCSV(field[1].value, options.scopedVars);
        }
        var fieldTwo = '';
        if (field[2]) {
          fieldTwo = field[2].value;
        }
        var fieldThree = '';
        if (field[3]) {
          fieldThree = utils.replaceTargetUsingTemplVarsCSV(field[3].value, options.scopedVars);
        }
        var fieldFour = '';
        if (field[4]) {
          fieldFour = field[4].value;
        }
        sysparam += fieldFour + fieldOne + fieldTwo + fieldThree;
      }
    }

    var limit = 9999;
    if (typeof target.rowLimit !== 'undefined') {
      if (target.rowLimit > 0 && target.rowLimit < 10000) {
        limit = target.rowLimit;
      }
    }
    var page = 0;
    console.log('typeof page: ' + typeof target.page);
    if (typeof target.page === 'number') {
      if (target.page >= 0) {
        page = target.page;
      }
    }

    var sortBy = '';
    if (typeof target.sortBy !== 'undefined' && target.sortBy !== null) {
      sortBy = utils.replaceTargetUsingTemplVarsCSV(target.sortBy.value, options.scopedVars);
    }

    var getAlertCount = 'false';
    if (typeof target.getAlertCount !== 'undefined') {
      getAlertCount = target.getAlertCount.value;
    }

    let bodyData = `{"targets":[{"target":"${tableName}","columns":"${tableColumns}","sysparm":"${sysparam}","limit":${limit},"page":${page},"sortBy":"${sortBy}","getAlertCount":${getAlertCount}}]}`;
    if (utils.debugLevel() === 1) {
      console.log(target);
      console.log(bodyData);
    }
    return this.apiClient
      .request({
        url: this.apiPath + '/v1/query/table',
        data: bodyData,
        method: 'POST',
        cacheOverride: cacheOverride === '' ? null : cacheOverride,
      })
      .then((response) => {
        utils.printDebug('print table query response from SNOW');
        utils.printDebug(response);
        return this.apiClient.mapTextResponseToFrame(response);
      })
      .catch((error) => {
        console.error('table query error: ', error);
        throw new Error(error.statusText);
      });
  }
  getRowCount(target, options, cacheOverride) {
    var tableName = '';
    if (typeof target.tableName !== 'undefined') {
      if (target.tableName.value !== '') {
        tableName = utils.replaceTargetUsingTemplVars(target.tableName.value, options.scopedVars);
      }
    }
    var sysparam = '';
    if (typeof target.sysparam_query !== 'undefined') {
      if (target.sysparam_query !== '') {
        sysparam = utils.replaceTargetUsingTemplVarsCSV(target.sysparam_query, options.scopedVars);
      }
    }
    let bodyData = `{"targets":[{"target":"${tableName}","sysparm":"${sysparam}"}]}`;
    if (utils.debugLevel() === 1) {
      console.log(target);
      console.log(bodyData);
    }
    return this.apiClient
      .request({
        url: this.apiPath + '/v1/query/row_count',
        data: bodyData,
        method: 'POST',
        cacheOverride: cacheOverride === '' ? null : cacheOverride,
      })
      .then((response) => {
        utils.printDebug('print row count response from SNOW');
        utils.printDebug(response);
        return this.apiClient.mapTextResponseToFrame(response);
      })
      .catch((error) => {
        console.error('row count query error: ', error);
        throw new Error(error.statusText);
      });
  }
  getAggregateQuery(target, options, cacheOverride) {
    var tableName = '';
    var groupBy = '';
    var type = '';
    var column = '';
    var sysparam = '';
    if (typeof target.tableName !== 'undefined') {
      if (target.tableName.value !== '') {
        tableName = utils.replaceTargetUsingTemplVars(target.tableName.value, options.scopedVars);
      }
    }
    if (typeof target.groupBy !== 'undefined') {
      if (target.groupBy !== '') {
        groupBy = target.groupBy;
      }
    }
    if (typeof target.selectedAggregateType !== 'undefined') {
      if (target.selectedAggregateType.value !== '') {
        type = target.selectedAggregateType.value;
      }
    }
    if (typeof target.aggregateColumn !== 'undefined') {
      if (target.aggregateColumn !== '') {
        column = target.aggregateColumn;
      }
    }
    if (typeof target.sysparam_query !== 'undefined') {
      if (target.sysparam_query !== '') {
        sysparam = utils.replaceTargetUsingTemplVarsCSV(target.sysparam_query, options.scopedVars);
      }
    }
    var limit = 9999;
    if (typeof target.rowLimit !== 'undefined') {
      if (target.rowLimit > 0 && target.rowLimit < 10000) {
        limit = target.rowLimit;
      }
    }

    let bodyData = `{"targets":[{"target":"${tableName}","type":"${type}","column":"${column}","groupBy":"${groupBy}","sysparm":"${sysparam}","limit":${limit}}]}`;
    if (utils.debugLevel() === 1) {
      console.log(target);
      console.log(bodyData);
    }
    return this.apiClient
      .request({
        url: this.apiPath + '/v1/query/aggregate',
        data: bodyData,
        method: 'POST',
        cacheOverride: cacheOverride === '' ? null : cacheOverride,
      })
      .then((response) => {
        utils.printDebug('print aggregate query response from SNOW');
        utils.printDebug(response);
        return this.apiClient.mapTextResponseToFrame(response);
      })
      .catch((error) => {
        console.error('aggregate query error: ', error);
        throw new Error(error.statusText);
      });
  }
  getGeohashMap(target, options, cacheOverride) {
    var tableName = '';
    var groupBy = '';
    var sysparam = '';
    if (typeof target.tableName !== 'undefined') {
      if (target.tableName.value !== '') {
        tableName = utils.replaceTargetUsingTemplVars(target.tableName.value, options.scopedVars);
      }
    }
    if (typeof target.groupBy !== 'undefined') {
      if (target.groupBy !== '') {
        groupBy = target.groupBy;
      }
    }
    if (typeof target.sysparam_query !== 'undefined') {
      if (target.sysparam_query !== '') {
        sysparam = utils.replaceTargetUsingTemplVarsCSV(target.sysparam_query, options.scopedVars);
      }
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
        return this.apiClient.mapTextResponseToFrame(response);
      })
      .catch((error) => {
        console.error('geohash_map query error: ', error);
        throw new Error(error.statusText);
      });
  }
  queryLogData(target, timeFrom, timeTo, options, cacheOverride) {
    var compressLog = target.compressLogs;
    var sysparam = '';
    //Checks if variable is an array
    if (target.basic_sysparam.constructor.toString().indexOf('Array') !== -1) {
      for (var i = 0; i < target.basic_sysparam.length; i++) {
        var field = target.basic_sysparam[i];
        var fieldOne = '';
        if (field[1]) {
          fieldOne = utils.replaceTargetUsingTemplVarsCSV(field[1].value, options.scopedVars);
        }
        var fieldTwo = '';
        if (field[2]) {
          fieldTwo = field[2].value;
        }
        var fieldThree = '';
        if (field[3]) {
          fieldThree = utils.replaceTargetUsingTemplVarsCSV(field[3].value, options.scopedVars);
        }
        var fieldFour = '';
        if (field[4]) {
          fieldFour = field[4].value;
        }
        sysparam += fieldFour + fieldOne + fieldTwo + fieldThree;
      }
    }

    var limit = 9999;
    if (typeof target.rowLimit !== 'undefined') {
      if (target.rowLimit > 0 && target.rowLimit < 10000) {
        limit = target.rowLimit;
      }
    }
    var page = 0;
    console.log('typeof page: ' + typeof target.page);
    if (typeof target.page === 'number') {
      if (target.page >= 0) {
        page = target.page;
      }
    }

    var sortBy = '';
    if (typeof target.sortBy !== 'undefined' && target.sortBy !== null) {
      sortBy = utils.replaceTargetUsingTemplVarsCSV(target.sortBy.value, options.scopedVars);
    }
    var elasticSearch = '';
    if (typeof target.elasticSearch !== 'undefined') {
      elasticSearch = utils.replaceTargetUsingTemplVarsCSV(target.elasticSearch, options.scopedVars);
    }
    var bodyData = `{"targets":[{"sysparm":"${sysparam}","limit":${limit},"page":${page},"sortBy":"${sortBy}","esSearch":"${elasticSearch}","startTime":${timeFrom},"endTime":${timeTo},"compressLog":${compressLog}}]}`;
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
        return this.apiClient.mapTextResponseToFrame(response);
      })
      .catch((error) => {
        console.error('log query error: ', error);
        throw new Error(error.statusText);
      });
  }
  getTrendData(target, timeFrom, timeTo, options, cacheOverride) {
    if (utils.debugLevel() === 1) {
      console.log(target);
    }
    var table = '';
    var sysparam = '';
    var elasticSearch = '';
    var trendColumn = '';
    var trendBy = '';
    var period = 1;
    if (typeof target.tableName !== 'undefined') {
      if (target.tableName.value !== '') {
        table = utils.replaceTargetUsingTemplVars(target.tableName.value, options.scopedVars);
      }
    }
    //Checks if variable is an array
    if (target.basic_sysparam.constructor.toString().indexOf('Array') !== -1) {
      for (var i = 0; i < target.basic_sysparam.length; i++) {
        var field = target.basic_sysparam[i];
        var fieldOne = '';
        if (field[1]) {
          fieldOne = utils.replaceTargetUsingTemplVarsCSV(field[1].value, options.scopedVars);
        }
        var fieldTwo = '';
        if (field[2]) {
          fieldTwo = field[2].value;
        }
        var fieldThree = '';
        if (field[3]) {
          fieldThree = utils.replaceTargetUsingTemplVarsCSV(field[3].value, options.scopedVars);
        }
        var fieldFour = '';
        if (field[4]) {
          fieldFour = field[4].value;
        }
        sysparam += fieldFour + fieldOne + fieldTwo + fieldThree;
      }
    }
    if (typeof target.elasticSearch !== 'undefined') {
      elasticSearch = utils.replaceTargetUsingTemplVarsCSV(target.elasticSearch, options.scopedVars);
    }
    if (typeof target.selectedTrendColumn !== 'undefined') {
      if (target.selectedTrendColumn !== null) {
        trendColumn = utils.replaceTargetUsingTemplVarsCSV(target.selectedTrendColumn.value, options.scopedVars);
      }
    }
    if (typeof target.selectedTrendBy !== 'undefined') {
      if (target.selectedTrendBy !== null) {
        trendBy = utils.replaceTargetUsingTemplVarsCSV(target.selectedTrendBy.value, options.scopedVars);
      }
    }
    if (typeof target.trendPeriod !== 'undefined') {
      if (target.trendPeriod > 0) {
        period = target.trendPeriod;
      }
    }
    var bodyData = `{"targets":[{"target":"${table}","sysparm":"${sysparam}","esSearch":"${elasticSearch}","trendColumn":"${trendColumn}","trendBy":"${trendBy}","period":${period}}]}`;
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
        throw new Error(error.statusText);
      });
  }
  getOutageStatus(target, timeFrom, timeTo, options, cacheOverride) {
    var ciIds = '';
    if (typeof target.selectedServiceList !== 'undefined') {
      if (target.selectedServiceList.value !== null) {
        ciIds = utils.replaceTargetUsingTemplVarsCSV(target.selectedServiceList.value, options.scopedVars);
      }
    }
    var showPercent = false;
    if (typeof target.showPercent === 'boolean') {
      showPercent = target.showPercent;
    }
    var sysparam = '';
    if (typeof target.sysparam_query !== 'undefined') {
      sysparam = utils.replaceTargetUsingTemplVarsCSV(target.sysparam_query, options.scopedVars);
    }

    var limit = 9999;
    if (typeof target.rowLimit !== 'undefined') {
      if (target.rowLimit > 0 && target.rowLimit < 10000) {
        limit = target.rowLimit;
      }
    }
    var page = 0;
    console.log('typeof page: ' + typeof target.page);
    if (typeof target.page === 'number') {
      if (target.page >= 0) {
        page = target.page;
      }
    }

    var bodyData = `{"targets":[{"target":"${ciIds}","showPercent":${showPercent},"sysparm":"${sysparam}","limit":${limit},"page":${page}}]}`;
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
          return this.apiClient.mapTextResponseToFrame(response);
        } else {
          return this.apiClient.mapOutageResponseToFrame(response, target);
        }
      })
      .catch((error) => {
        console.error('outage query error: ', error);
        throw new Error(error.statusText);
      });
  }
  getAnomaly(target, timeFrom, timeTo, options, cacheOverride) {
    if (utils.debugLevel() === 1) {
      console.log('query anomaly');
      console.log(target);
    }

    var tableColumns = '';
    if (typeof target.selectedtableColumns !== 'undefined') {
      console.log('columns: ', target.selectedtableColumns);
      if (target.selectedtableColumns.length > 0) {
        target.selectedtableColumns.map((listItem) => {
          tableColumns += utils.replaceTargetUsingTemplVars(listItem.value, options.scopedVars) + ',';
        });
        if (tableColumns.charAt(tableColumns.length - 1) === ',') {
          tableColumns = tableColumns.substring(0, tableColumns.length - 1);
        }
      }
    }
    var sysparam = '';
    //Checks if variable is an array
    if (target.basic_sysparam.constructor.toString().indexOf('Array') !== -1) {
      for (var i = 0; i < target.basic_sysparam.length; i++) {
        var field = target.basic_sysparam[i];
        var fieldOne = '';
        if (field[1]) {
          fieldOne = utils.replaceTargetUsingTemplVarsCSV(field[1].value, options.scopedVars);
        }
        var fieldTwo = '';
        if (field[2]) {
          fieldTwo = field[2].value;
        }
        var fieldThree = '';
        if (field[3]) {
          fieldThree = utils.replaceTargetUsingTemplVarsCSV(field[3].value, options.scopedVars);
        }
        var fieldFour = '';
        if (field[4]) {
          fieldFour = field[4].value;
        }
        sysparam += fieldFour + fieldOne + fieldTwo + fieldThree;
      }
    }

    var limit = 9999;
    if (typeof target.rowLimit !== 'undefined') {
      if (target.rowLimit > 0 && target.rowLimit < 10000) {
        limit = target.rowLimit;
      }
    }
    var page = 0;
    if (typeof target.page === 'number') {
      if (target.page >= 0) {
        page = target.page;
      }
    }

    var sortBy = '';
    if (typeof target.sortBy !== 'undefined' && target.sortBy !== null) {
      sortBy = utils.replaceTargetUsingTemplVarsCSV(target.sortBy.value, options.scopedVars);
    }
    let bodyData = `{"targets":[{"columns":"${tableColumns}","sysparm":"${sysparam}","limit":${limit},"page":${page},"sortBy":"${sortBy}"}]}`;
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
        return this.apiClient.mapTextResponseToFrame(response);
      })
      .catch((error) => {
        console.error('anomaly query error: ', error);
        throw new Error(error.statusText);
      });
  }
  // End of query methods
  // Start variable query methods
  getGenericVariable(tableName: string, nameColumn: string, idColumn: string, sysparam: string, limit: string) {
    var bodyData = `{"targets":[{"tableName":"${tableName}","nameColumn":"${nameColumn}","idColumn":"${idColumn}","sysparm":"${sysparam}","limit":${limit}}]}`;
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
        throw new Error(error.statusText);
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
        throw new Error(error.statusText);
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
        throw new Error(error.statusText);
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
        throw new Error(error.statusText);
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
        label: 'OS',
        value: 'OS',
        description: 'Get Alerts for all Agents in the class',
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
  getAdminQueryOptions() {
    let queryOptions = [
      {
        label: 'Metrics Definition',
        value: 'Metrics Definition',
        description: '',
      },
    ];
    return queryOptions;
  }
  getAgentFilterTypeOptions() {
    let queryOptions = [
      {
        label: 'OS',
        value: 'OS',
        description: 'Get all agents matching the OS',
      },
      {
        label: 'CI',
        value: 'CI',
        description: 'Get all agents matching the CI',
      },
    ];
    return queryOptions;
  }
  getAgentMetricOptions() {
    let queryOptions = [
      {
        label: 'cpu',
        value: 'cpu',
      },
      {
        label: 'memory',
        value: 'memory',
      },
      {
        label: 'disk',
        value: 'disk',
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
        label: 'is same as',
        value: 'SAMEAS',
        description: 'SAMEAS',
      },
      {
        label: 'is different',
        value: 'NSAMEAS',
        description: 'NSAMEAS',
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
        label: 'Hour',
        value: 'hour',
      },
    ];
    return queryOptions;
  }
  loadServiceOptions(input?) {
    var search = '';
    if (typeof input !== 'undefined') {
      search = input;
    }
    let bodyData = `{"targets":[{"target":"cmdb_ci_service","columns":"name:d,sys_id:v","sysparm":"operational_status=1^name!=All^nameLIKE${search}","limit":100,"sortBy":"name"}]}`;
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
        throw new Error(error.statusText);
      });
  }
  loadCIOptions(serviceId, input) {
    var search = '';
    if (typeof input !== 'undefined') {
      search = input;
    }
    var bodyData = '';
    if (typeof serviceId !== 'undefined') {
      bodyData = `{"targets":[{"target":"em_impact_graph","columns":"child_name:d,child_id:v,child_id:d","sysparm":"business_service=${serviceId}^child_nameLIKE${search}","limit":100,"sortBy":"ci_name"}]}`;
    } else {
      bodyData = `{"targets":[{"target":"cmdb_ci","columns":"name:d,sys_id:v,sys_class_name:d","sysparm":"nameLIKE${search}^name!=NULL","limit":100,"sortBy":"cmdb_ci.name"}]}`;
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
        var result = this.apiClient.mapChecksToValuePlusSuffix(response);
        utils.printDebug(result);
        return this.apiClient.mapSuffixToLabel(result);
      })
      .catch((error) => {
        console.error('loadCIOptions error: ', error);
        throw new Error(error.statusText);
      });
  }
  loadResourceOptions(selectedCIS?, input?) {
    var bodyData = '';
    var search = '';
    if (typeof input !== 'undefined') {
      search = input;
    }
    if (typeof selectedCIS !== 'undefined') {
      var ciArray = selectedCIS.map((option) => {
        return option.value;
      });
      console.log(ciArray);
      bodyData = `{"targets":[{"target":"sa_metric_map","columns":"resource_id:d,resource_id:v","sysparm":"cmdb_ciIN${ciArray}^resource_idLIKE${search}^resource_id!=NULL","limit":100,"sortBy":"resource_id"}]}`;
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
        var result = [{ label: '*', value: '*' }];
        var options = result.concat(this.apiClient.mapChecksToValue(response));
        //Next line removes duplicate value's from the array
        options = options.filter((option, index, self) => index === self.findIndex((t) => t.value === option.value));
        return options;
      })
      .catch((error) => {
        console.error('loadResourceOptions error: ', error);
        throw new Error(error.statusText);
      });
  }
  loadMetricOptions(selectedCIS?, input?) {
    var bodyData = '';
    var search = '';
    if (typeof input !== 'undefined') {
      search = input;
    }
    if (typeof selectedCIS !== 'undefined') {
      var ciArray = selectedCIS.map((option) => {
        return option.value;
      });
      console.log(ciArray);
      bodyData = `{"targets":[{"target":"sa_metric_map","columns":"metric_type_id.metric_type_tiny_name:d,metric_type_id:v","sysparm":"cmdb_ciIN${ciArray}^metric_type_id.metric_type_tiny_nameLIKE${search}","limit":100,"sortBy":""}]}`;
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
        var result = [{ label: '*', value: '*' }];
        var options = result.concat(this.apiClient.mapChecksToValue(response));
        //Next line removes duplicate value's from the array
        options = options.filter((option, index, self) => index === self.findIndex((t) => t.value === option.value));
        return options;
      })
      .catch((error) => {
        console.error('loadMetricOptions error: ', error);
        throw new Error(error.statusText);
      });
  }
  loadColumnChoices(tableName, tableColumn?, input?) {
    let bodyData = `{"targets":[{"target":"sys_choice","columns":"label,value","sysparm":"name=${tableName}^element!=NULL^elementLIKE${tableColumn}^labelLIKE${input}","limit":100}]}`;
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
        throw new Error(error.statusText);
      });
  }
  loadTableColumns(tableName, addSuffix: boolean, input?) {
    var search = '';
    if (typeof input === 'string') {
      search = input.trim();
    }
    if (typeof tableName === 'undefined') {
      return [];
    }
    let bodyData = `{"targets":[{"table":"${tableName}","search":"${search}"}]}`;
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
        utils.printDebug('print loadTableColumns response from SNOW');
        utils.printDebug(response);
        return this.apiClient.mapValueAsSuffix(response);
      })
      .catch((error) => {
        console.error('loadTableColumns error: ', error);
        throw new Error(error.statusText);
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
        var result = this.apiClient.mapChecksToValue(response);
        utils.printDebug(result);
        return this.apiClient.mapValueAsSuffix(result);
      })
      .catch((error) => {
        console.error('loadTableOptions error: ', error);
        throw new Error(error.statusText);
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
    if (state === 'Active') {
      sysparam += 'state!=Closed';
    }
    var bodyData = `{"targets":[{"target":"em_alert","columns":"additional_info","sysparm":"${sysparam}","limit":${limit},"sortBy":""}]}`;
    return this.apiClient
      .request({
        url: this.apiPath + '/v1/query/table',
        data: bodyData,
        method: 'POST',
      })
      .then((response) => {
        utils.printDebug('print getAlertTags response from SNOW');
        utils.printDebug(response);
        var tags = this.apiClient.mapAlertTags(response);
        utils.printDebug(tags);
        return tags;
      })
      .catch((error) => {
        console.error('getAlertTags error: ', error);
        throw new Error(error.statusText);
      });
  }
}
