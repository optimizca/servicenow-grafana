import { APIClient } from 'APIClient';

import { QueryResponse } from './types';

import * as utils from './Utils';

export class SNOWManager {
  apiClient: APIClient;
  apiPath: string;

  constructor(options) {
    const { basicAuth, withCredentials, url } = options;
    this.apiPath = '';
    let headers = { 'Content-Type': 'application/json' };
    if (typeof basicAuth === 'string' && basicAuth.length > 0) {
      headers['Authorization'] = basicAuth;
    }
    this.apiClient = new APIClient(headers, withCredentials, url);
  }
  getLiveACCData(target, options) {
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
  getCIs(sysparm_query: string, serviceName: string) {
    let cisURL = this.apiPath + '/searchV2';
    let bodyData = '';
    let target = serviceName;

    if (serviceName !== '') {
      cisURL = this.apiPath + '/search/cisV2';
    }
    bodyData = '{"targets":[{"target":"' + target + '","sysparm_query":"' + sysparm_query + '"}]}';
    console.log(bodyData);
    return this.apiClient
      .request({
        url: cisURL,
        data: bodyData,
        method: 'POST',
      })
      .then(this.apiClient.mapChecksToValue);
  }
  getNestedCIS(bodyObj: any) {
    let bodyData = `{"targets":[{"ci": "${bodyObj.ci}",
      "parentDepth":"${bodyObj.parentDepth}",
      "childDepth":"${bodyObj.childDepth}",
      "namespaces":"${bodyObj.namespaces}",
      "excludedClasses":"${bodyObj.excludeClasses}",
      "dependsOn":"${bodyObj.dependsOn}",
      "type":"ci"}]}`;
    if (utils.debugLevel() === 1) {
      console.log('get nested cis');
      console.log(bodyData);
    }
    return this.apiClient
      .request({
        url: this.apiPath + '/v2/variable/nested_value',
        data: bodyData,
        method: 'POST',
      })
      .then(this.apiClient.mapChecksToValue);
  }
  getNestedClasses(bodyObj: any) {
    let bodyData = `{"targets":[{"ci": "${bodyObj.ci}",
      "parentDepth":"${bodyObj.parentDepth}",
      "childDepth":"${bodyObj.childDepth}",
      "namespaces":"${bodyObj.namespaces}",
      "excludedClasses":"${bodyObj.excludeClasses}",
      "dependsOn":"${bodyObj.dependsOn}",
      "type":"class"}]}`;
    if (utils.debugLevel() === 1) {
      console.log('get nested classes');
      console.log(bodyData);
    }
    return this.apiClient
      .request({
        url: this.apiPath + '/v2/variable/nested_value',
        data: bodyData,
        method: 'POST',
      })
      .then(this.apiClient.mapChecksToValue);
  }
  getApplicationServices(filter: string) {
    let bodyData = `{"targets":[{"sysparm_query":"${filter}"}]}`;
    if (utils.debugLevel() === 1) {
      console.log('get application services');
      console.log(bodyData);
    }
    return this.apiClient
      .request({
        url: this.apiPath + '/search/app_services',
        data: bodyData,
        method: 'POST',
      })
      .then(this.apiClient.mapChecksToValue);
  }
  getGenericVariable(tableName: string, nameColumn: string, idColumn: string, sysparam: string) {
    var bodyData = `{"targets":[{"tableName":"${tableName}","nameColumn":"${nameColumn}","idColumn":"${idColumn}","sysparm":"${sysparam}"}]}`;
    console.log(bodyData);
    return this.apiClient
      .request({
        url: this.apiPath + '/v2/variable/generic',
        data: bodyData,
        method: 'POST',
      })
      .then(this.apiClient.mapChecksToValue);
  }
  getAWSRegions() {
    return this.apiClient
      .request({
        url: this.apiPath + '/v2/variable/aws_regions',
        method: 'POST',
      })
      .then(this.apiClient.mapChecksToValue);
  }
  getKubernetesNamespaces() {
    return this.apiClient
      .request({
        url: this.apiPath + '/v2/variable/kubernetes_namespaces',
        method: 'POST',
      })
      .then(this.apiClient.mapChecksToValue);
  }
  getServices(filter: string) {
    let bodyData = '{"targets":[{"filter":"' + filter + '"}]}';
    if (utils.debugLevel() === 1) {
      console.log('get Services API');
      console.log(bodyData);
    }
    return this.apiClient
      .request({
        url: this.apiPath + '/search/servicesV2',
        data: bodyData,
        method: 'POST',
      })
      .then(this.apiClient.mapChecksToValue);
  }
  getMetricsFrames(target, timeFrom, timeTo, options) {
    return this.getMetrics(target, timeFrom, timeTo, options);
  }
  getMetrics(target, timeFrom, timeTo, options) {
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
    let metricURL = this.apiPath + '/query/ci_single_metricV2?startTime=' + timeFrom + '&endTime=' + timeTo;
    if (metricName === '*') {
      metricURL = this.apiPath + '/query/metricsV2?startTime=' + timeFrom + '&endTime=' + timeTo;
    }
    if (anomaly === true) {
      metricURL = this.apiPath + '/query/metrics/anomalityV2?startTime=' + timeFrom + '&endTime=' + timeTo;
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
      })
      .then((response) => {
        console.log('metric response: ', response);
        if (anomaly === true) {
          return this.apiClient.mapAnamMetricsResponseToFrame(response, target, options);
        } else {
          return this.apiClient.mapMetricsResponseToFrame(response, target);
        }
      });
  }

  getTextFrames(target, timeFrom, timeTo, options, type, instanceName?) {
    if (type === 'Alerts') {
      return this.getAlerts(target, timeFrom, timeTo, options, instanceName);
    }
    if (type === 'Changes') {
      return this.getChanges(target, timeFrom, timeTo, options);
    }
    if (type === 'CI_Summary') {
      return this.getCISummary(target, options);
    }
    if (type === 'Agents') {
      return this.getAllACCAgents(target, timeFrom, timeTo, options);
    }
    if (type === 'Admin') {
      if (target.selectedAdminCategoryList.value === 'Metrics Definition') {
        return this.getMetricsDefinition(target, timeFrom, timeTo, options);
      }
      return [];
    }
    if (type === 'Generic') {
      return this.queryGenericTable(target, timeFrom, timeTo, options);
    }
    if (type === 'Database_Views') {
      return this.queryDatabaseViews(target, timeFrom, timeTo, options);
    }
    return [];
  }
  getGeohashMap(target, options) {
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
        url: this.apiPath + '/v2/query/geohash_map',
        data: bodyData,
        method: 'POST',
      })
      .then((response) => {
        utils.printDebug('print geohash_map response from SNOW');
        utils.printDebug(response);
        return this.apiClient.mapTextResponseToFrame(response);
      });
  }
  getAggregateQuery(target, options) {
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
    let bodyData = `{"targets":[{"target":"${tableName}","type":"${type}","column":"${column}","groupBy":"${groupBy}","sysparm":"${sysparam}"}]}`;
    if (utils.debugLevel() === 1) {
      console.log(target);
      console.log(bodyData);
    }
    return this.apiClient
      .request({
        url: this.apiPath + '/v2/query/aggregate',
        data: bodyData,
        method: 'POST',
      })
      .then((response) => {
        utils.printDebug('print aggregate query response from SNOW');
        utils.printDebug(response);
        return this.apiClient.mapTextResponseToFrame(response);
      });
  }
  getRowCount(target, options) {
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
        url: this.apiPath + '/v2/query/row_count',
        data: bodyData,
        method: 'POST',
      })
      .then((response) => {
        utils.printDebug('print row count response from SNOW');
        utils.printDebug(response);
        return this.apiClient.mapTextResponseToFrame(response);
      });
  }
  queryLogData(target, timeFrom, timeTo, options) {
    var sysparam = '';
    if (typeof target.sysparam_count !== 'undefined') {
      for (var i = 0; i <= target.sysparam_count; i++) {
        var sysparam_entry = '';
        if (typeof target.sysparam_option4 !== 'undefined') {
          if (typeof target.sysparam_option4[i] !== 'undefined') {
            sysparam_entry += target.sysparam_option4[i].value;
            if (typeof target.sysparam_option1 !== 'undefined') {
              sysparam_entry += utils.replaceTargetUsingTemplVarsCSV(
                target.sysparam_option1[i]?.value,
                options.scopedVars
              );
              if (typeof target.sysparam_option2 !== 'undefined') {
                sysparam_entry += target.sysparam_option2[i]?.value;
                if (typeof target.sysparam_option3 !== 'undefined') {
                  sysparam_entry += utils.replaceTargetUsingTemplVarsCSV(
                    target.sysparam_option3[i]?.value.toString(),
                    options.scopedVars
                  );
                }
              }
            }
          }
        }
        sysparam += sysparam_entry;
      }
    }

    var limit = 9999;
    if (typeof target.rowLimit !== 'undefined') {
      if (target.rowLimit > 0 && target.rowLimit < 10000) {
        limit = target.rowLimit;
      }
    }

    var sortBy = '';
    if (typeof target.sortBy !== 'undefined' && target.sortBy !== null) {
      sortBy = utils.replaceTargetUsingTemplVarsCSV(target.sortBy.value, options.scopedVars);
    }
    var bodyData = `{targets:[{"sysparm":"${sysparam}","limit":${limit},"sortBy":"${sortBy}","startTime":${timeFrom},"endTime":${timeTo}}]}`;
    if (utils.debugLevel() === 1) {
      console.log(target);
      console.log(bodyData);
    }
    return this.apiClient
      .request({
        url: this.apiPath + '/v2/query/log',
        data: bodyData,
        method: 'POST',
      })
      .then((response) => {
        utils.printDebug('print query log data response from SNOW');
        utils.printDebug(response);
        return this.apiClient.mapTextResponseToFrame(response);
      });
  }
  queryDatabaseViews(target, timeFrom, timeTo, options) {
    if (utils.debugLevel() === 1) {
      console.log('queryDatabaseViews');
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
    if (typeof target.sysparam_count !== 'undefined') {
      for (var i = 0; i <= target.sysparam_count; i++) {
        var sysparam_entry = '';
        if (typeof target.sysparam_option4 !== 'undefined') {
          if (typeof target.sysparam_option4[i] !== 'undefined') {
            sysparam_entry += target.sysparam_option4[i].value;
            if (typeof target.sysparam_option1 !== 'undefined') {
              sysparam_entry += utils.replaceTargetUsingTemplVarsCSV(
                target.sysparam_option1[i]?.value,
                options.scopedVars
              );
              if (typeof target.sysparam_option2 !== 'undefined') {
                sysparam_entry += target.sysparam_option2[i]?.value;
                if (typeof target.sysparam_option3 !== 'undefined') {
                  sysparam_entry += utils.replaceTargetUsingTemplVarsCSV(
                    target.sysparam_option3[i]?.value.toString(),
                    options.scopedVars
                  );
                }
              }
            }
          }
        }
        sysparam += sysparam_entry;
      }
    }

    var limit = 9999;
    if (typeof target.rowLimit !== 'undefined') {
      if (target.rowLimit > 0 && target.rowLimit < 10000) {
        limit = target.rowLimit;
      }
    }

    var sortBy = '';
    if (typeof target.sortBy !== 'undefined' && target.sortBy !== null) {
      sortBy = utils.replaceTargetUsingTemplVarsCSV(target.sortBy.value, options.scopedVars);
    }

    let bodyData = `{"targets":[{"target":"${tableName}","columns":"${tableColumns}","sysparm":"${sysparam}","limit":${limit},"sortBy":"${sortBy}"}]}`;
    if (utils.debugLevel() === 1) {
      console.log(target);
      console.log(bodyData);
    }
    return this.apiClient
      .request({
        url: this.apiPath + '/query/dbview',
        data: bodyData,
        method: 'POST',
      })
      .then((response) => {
        utils.printDebug('print database views response from SNOW');
        utils.printDebug(response);
        return this.apiClient.mapTextResponseToFrame(response);
      });
  }
  queryGenericTable(target, timeFrom, timeTo, options) {
    if (utils.debugLevel() === 1) {
      console.log('isnide query generic table');
      console.log('print target');
      console.log(target);
      console.log('print options');
      console.log(options);
    }
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
    if (sysparam.indexOf('/') === 0) {
      sysparam = sysparam.substring(2, sysparam.length - 2);
      sysparam = sysparam.replace(/[|]/g, ',');
    }

    let bodyData = `{"targets":[{"target":"${tableName}","sysparm":"${sysparam}"}]}`;
    if (utils.debugLevel() === 1) {
      console.log(bodyData);
    }
    return this.apiClient
      .request({
        url: this.apiPath + '/query/table',
        data: bodyData,
        method: 'POST',
      })
      .then((response) => {
        utils.printDebug('print generic response from SNOW');
        utils.printDebug(response);
        return this.apiClient.mapTextResponseToFrame(response);
      });
  }
  getTopologyFrame(target, timeFrom, timeTo, options) {
    return this.getTopology(target, timeFrom, timeTo, options).then((response) => {
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
  getTopology(target, timeFrom, timeTo, options) {
    if (utils.debugLevel() === 1) {
      console.log('isnide get Topology');
      console.log('print target');
      console.log(target);
      console.log('print options');
      console.log(options);
    }
    var serviceTarget = utils.replaceTargetUsingTemplVars(target.service, options.scopedVars);
    if (typeof target.selectedServiceList !== 'undefined') {
      serviceTarget = utils.replaceTargetUsingTemplVars(target.selectedServiceList.value, options.scopedVars);
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
        excluded_classes = utils.replaceTargetUsingTemplVars(target.topology_filter, options.scopedVars);
      }
    }
    var namespaces = '';
    if (typeof target.topology_namespaces !== 'undefined') {
      if (target.topology_namespaces) {
        namespaces = utils.replaceTargetUsingTemplVars(target.topology_namespaces, options.scopedVars);
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
        url: this.apiPath + '/query/topology',
        data: bodyData,
        method: 'POST',
      })
      .then((response) => {
        utils.printDebug('print topology response from SNOW');
        utils.printDebug(response);
        utils.printDebug('~~~~~~~~~~~~~~~~');

        utils.printDebug(response.data);
        utils.printDebug('~~~~~~~~~~~~~~~~');
        return response.data.rows;
      });
  }
  loadServiceOptions(input?) {
    var search = '';
    if (typeof input !== 'undefined') search = input;
    let bodyData = `{"targets":[{"target":"cmdb_ci_service","columns":"name:d,sys_id:v","sysparm":"name!=All^nameLIKE${search}","limit":100,"sortBy":"name"}]}`;
    if (utils.debugLevel() === 1) {
      console.log(bodyData);
      console.log('loadServiceOptions');
    }
    return this.apiClient
      .request({
        url: this.apiPath + '/query/dbview',
        data: bodyData,
        method: 'POST',
      })
      .then((response) => {
        utils.printDebug('print loadServiceOptions response from SNOW');
        utils.printDebug(response);
        utils.printDebug(this.apiClient.mapChecksToValue(response));
        return this.apiClient.mapChecksToValue(response);
      });
  }
  loadCIOptions(serviceId, input) {
    var search = '';
    if (typeof input !== 'undefined') search = input;
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
        url: this.apiPath + '/query/dbview',
        data: bodyData,
        method: 'POST',
      })
      .then((response) => {
        utils.printDebug('print loadCIOptions response from SNOW');
        utils.printDebug(response);
        var result = this.apiClient.mapChecksToValuePlusSuffix(response);
        utils.printDebug(result);
        return this.apiClient.mapSuffixToLabel(result);
      });
  }
  loadResourceOptions(selectedCIS?, input?) {
    var bodyData = '';
    var search = '';
    if (typeof input !== 'undefined') search = input;
    if (typeof selectedCIS !== 'undefined') {
      var ciArray = selectedCIS.map((option) => {
        return option.value;
      });
      console.log(ciArray);
      bodyData = `{"targets":[{"target":"sa_metric_map","columns":"resource_id:d,resource_id:v","sysparm":"cmdb_ciIN${ciArray}^resource_idLIKE${search}^resource_id!=NULL","limit":100,"sortBy":"resource_id"}]}`;
    }
    return this.apiClient
      .request({
        url: this.apiPath + '/query/dbview',
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
      });
  }
  loadMetricOptions(selectedCIS?, input?) {
    var bodyData = '';
    var search = '';
    if (typeof input !== 'undefined') search = input;
    if (typeof selectedCIS !== 'undefined') {
      var ciArray = selectedCIS.map((option) => {
        return option.value;
      });
      console.log(ciArray);
      bodyData = `{"targets":[{"target":"sa_metric_map","columns":"metric_type_id.metric_type_tiny_name:d,metric_type_id:v","sysparm":"cmdb_ciIN${ciArray}^metric_type_id.metric_type_tiny_nameLIKE${search}","limit":100,"sortBy":""}]}`;
    }
    return this.apiClient
      .request({
        url: this.apiPath + '/query/dbview',
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
      });
    // var allMetricOptions = await this.apiClient
    //   .request({
    //     url: this.apiPath + '/query/dbview',
    //     data: bodyData,
    //     method: 'POST',
    //   })
    //   .then((response) => {
    //     utils.printDebug('print loadResourceOptions response from SNOW');
    //     utils.printDebug(response);
    //     var result = [{ label: '*', value: '*' }];
    //     var options = result.concat(this.apiClient.mapChecksToValue(response));
    //     //Next line removes duplicate value's from the array
    //     options = options.filter((option, index, self) => index === self.findIndex((t) => t.value === option.value));
    //     return options;
    //   });
    // console.log('allMetricOptions: ', allMetricOptions);
    // //TODO: Query metrics for each metrics in the above list, then filter out any which do not have datapoints
    // this.apiClient
    //   .request({
    //     url: this.apiPath + '/query/ci_single_metricV2?startTime=' + timeFrom + '&endTime=' + timeTo;
    //     data: bodyData,
    //     method: 'POST',
    //   })
    //   .then((response) => {
    //     utils.printDebug('print loadResourceOptions response from SNOW');
    //     utils.printDebug(response);
    //     var result = [{ label: '*', value: '*' }];
    //     var options = result.concat(this.apiClient.mapChecksToValue(response));
    //     //Next line removes duplicate value's from the array
    //     options = options.filter((option, index, self) => index === self.findIndex((t) => t.value === option.value));
    //     return options;
    //   });
  }
  loadColumnChoices(tableName, tableColumn?, input?) {
    let bodyData = `{"targets":[{"target":"sys_choice","columns":"label,value","sysparm":"name=${tableName}^element!=NULL^elementLIKE${tableColumn}^labelLIKE${input}","limit":100}]}`;
    if (utils.debugLevel() === 1) {
      console.log(bodyData);
      console.log('loadColumnChoices');
    }
    return this.apiClient
      .request({
        url: this.apiPath + '/query/dbview',
        data: bodyData,
        method: 'POST',
      })
      .then((response) => {
        utils.printDebug('print loadColumnChoices response from SNOW');
        utils.printDebug(response);
        utils.printDebug(this.apiClient.mapChecksToValue(response));
        return this.apiClient.mapChecksToValue(response);
      });
  }
  loadTableColumns(tableName, addSuffix: boolean, input?) {
    var search = '';
    if (typeof input === 'string') {
      search = input.trim();
    }
    if (typeof tableName === 'undefined') return [];
    let bodyData = `{"targets":[{"table":"${tableName}","search":"${search}"}]}`;
    if (utils.debugLevel() === 1) {
      console.log(bodyData);
    }
    return this.apiClient
      .request({
        url: this.apiPath + '/v2/select/table_columns',
        data: bodyData,
        method: 'POST',
      })
      .then((response) => {
        utils.printDebug('print loadTableColumns response from SNOW');
        utils.printDebug(response.data);
        utils.printDebug(this.apiClient.mapValueSuffixToColumns(response.data));
        if (addSuffix) {
          return this.apiClient.mapValueSuffixToColumns(response.data);
        } else {
          return response.data;
        }
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
        url: this.apiPath + '/query/dbview',
        data: bodyData,
        method: 'POST',
      })
      .then((response) => {
        utils.printDebug('print loadTableOptions response from SNOW');
        utils.printDebug(response);
        var result = this.apiClient.mapChecksToValue(response);
        utils.printDebug(result);
        return this.apiClient.mapValueAsSuffix(result);
      });
  }
  getMetricsDefinition(target, timeFrom, timeTo, options) {
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
        url: this.apiPath + '/query/metrics_mapping?startTime=' + timeFrom + '&endTime=' + timeTo,
        data: bodyData,
        method: 'POST',
      })
      .then((response) => {
        utils.printDebug('print getMetricsDefinition response from SNOW');
        utils.printDebug(response);
        return this.apiClient.mapTextResponseToFrame(response);
      });
  }
  getMetricNamesInCIs(metricCategory, cis) {
    if (utils.debugLevel() === 1) {
      console.log('isnide getMetricsForCI');
      console.log('print target');
      console.log(metricCategory);
      console.log('print options scoped Vars');
      console.log(cis);
    }
    let ciTarget = utils.createRegEx(cis);

    ciTarget = utils.trimRegEx(ciTarget);

    //let queryTarget = "EC2AMAZ-8AMDGC0";
    //let queryMetricName = "api_response_time_ms_2";
    let bodyData = '{"targets":[{"target":"' + ciTarget + '","metricType":"' + metricCategory + '"}]}';
    let cisURL = this.apiPath + '/query/cis/metricsV2';
    //return this.getTextFrames(target, timeFrom, timeTo, options,'Metrics');
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
      .then(this.apiClient.mapChecksToValue);
  }

  /*async getMetricsColumnForCI(target, timeFrom, timeTo, options, cis: any[], column: string) {
    if (utils.debugLevel() === 1) {
      console.log('isnide getMetricsForCI');
    }
    var fullMetrics = await this.getMetricsDefinition(target, timeFrom, timeTo, options);
    let metric_column_list: any[] = [];
    for (let i = 0; i < fullMetrics.values.ci['buffer'].length; i++) {
      cis.some(ci => {
        if (ci === fullMetrics.values.ci['buffer'][i]) {
          if (metric_column_list.findIndex(mn => mn.text === fullMetrics.values[column]['buffer'][i]) < 0) {
            metric_column_list.push({
              text: fullMetrics.values[column]['buffer'][i],
              value: fullMetrics.values[column]['buffer'][i],
            });
          }
        }
      });
    }
    return metric_column_list;
  }*/
  getAlerts(target, timeFrom, timeTo, options, instanceName) {
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

    let bodyData = `{"targets":[{"target":"${bodyTarget}","sysparm_query":"${sys_query}"}]}`;
    //let bodyData = '{"targets":[{"target":"' + bodyTarget + '","metricName":"' + metricNameTarget + '"}]}';

    if (utils.debugLevel() === 1) {
      console.log('source after replace');
      console.log(service);
      console.log(bodyData);
    }
    return this.apiClient
      .request({
        url:
          this.apiPath +
          '/query/alertsV2?startTime=' +
          +timeFrom +
          '&endTime=' +
          timeTo +
          '&alertState=' +
          alertState +
          '&alertType=' +
          alertType,
        data: bodyData,
        method: 'POST',
      })
      .then((response) => {
        utils.printDebug('print alerts response from SNOW');
        utils.printDebug(response);
        response = this.apiClient.appendInstanceNameToResponse(response, instanceName);
        utils.printDebug(response);
        return this.apiClient.mapTextResponseToFrame(response);
      });
  }

  getChanges(target, timeFrom, timeTo, options) {
    if (utils.debugLevel() === 1) {
      console.log('inside getChanges');
      console.log('print target', target);
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
    let changeType = 'service';

    if (target.selectedChangeTypeList) {
      if (target.selectedChangeTypeList.value === 'CI') {
        changeType = 'ci';
        bodyTarget = ci;
      }
    }
    let sysparam = '';
    if (typeof target.sysparam_query !== 'undefined') {
      if (target.sysparam_query)
        sysparam = utils.replaceTargetUsingTemplVarsCSV(target.sysparam_query, options.scopedVars);
    }

    let bodyData = `{"targets":[{"target":"${bodyTarget}","sysparm_query":"${sysparam}"}]}`;

    if (utils.debugLevel() === 1) {
      console.log('bodyData: ', bodyData);
    }
    return this.apiClient
      .request({
        url: `${this.apiPath}/query/changeV2?startTime=${timeFrom}&endTime=${timeTo}&alertType=${changeType}`,
        data: bodyData,
        method: 'POST',
      })
      .then((response) => {
        utils.printDebug('print changes response from SNOW');
        utils.printDebug(response);
        return this.apiClient.mapTextResponseToFrame(response);
      });
  }
  getAllACCAgents(target, timeFrom, timeTo, options) {
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
      if (target.selectedAgentFilter.value)
        agentFilter = utils.replaceTargetUsingTemplVars(target.selectedAgentFilter.value, options.scopedVars);
    }
    if (typeof target.selectedMetricNameList !== 'undefined') {
      target.selectedMetricNameList.map((listItem) => {
        metricNamesArray.push(utils.replaceTargetUsingTemplVars(listItem.value, options.scopedVars));
      });
      metricNames = utils.createRegEx(metricNamesArray);
    }
    if (typeof target.sysparam_query) {
      if (target.sysparam_query)
        sysparam_query = utils.replaceTargetUsingTemplVarsCSV(target.sysparam_query, options.scopedVars);
    }
    if (typeof target.selectedAgentFilterType !== 'undefined') {
      if (target.selectedAgentFilterType) filterType = target.selectedAgentFilterType.value.toLowerCase();
    }
    let bodyData = `{"targets":[{"target":"${agentFilter}","metricName":"${metricNames}","sysparm_query":"${sysparam_query}","filterType":"${filterType}"}]}`;
    console.log('Body data: ', bodyData);
    return this.apiClient
      .request({
        url: `${this.apiPath}/query/acc_agentsV2?startTime=${timeFrom}&endTime=${timeTo}`,
        data: bodyData,
        method: 'POST',
      })
      .then((response) => {
        console.log('ACC response: ', response);
        return this.apiClient.mapTextResponseToFrame(response);
      });
  }
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

  //this function support single CI or multiple CIs using regex
  getCISummary(target, options) {
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
        url: this.apiPath + '/search/ci/summaryTblV2',
        data: bodyData,
        method: 'POST',
      })
      .then((response) => {
        utils.printDebug('print alerts response from SNOW');
        utils.printDebug(response);
        return this.apiClient.mapTextResponseToFrame(response);
      });
  }

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
  getSysparamTypeOptions() {
    let queryOptions = [
      {
        label: 'is',
        value: '=',
      },
      {
        label: 'is not',
        value: '!=',
      },
      {
        label: 'starts with',
        value: 'STARTSWITH',
      },
      {
        label: 'ends with',
        value: 'ENDSWITH',
      },
      {
        label: 'contains',
        value: 'LIKE',
      },
      {
        label: 'does not contain',
        value: 'NOT LIKE',
      },
      {
        label: 'is empty',
        value: 'ISEMPTY',
      },
      {
        label: 'is not empty',
        value: 'ISNOTEMPTY',
      },
      {
        label: 'is anything',
        value: 'ANYTHING',
      },
      {
        label: 'is one of',
        value: 'IN',
      },
      {
        label: 'is empty string',
        value: 'EMPTYSTRING',
      },
      {
        label: 'less than or is',
        value: '<=',
      },
      {
        label: 'greater than or is',
        value: '>=',
      },
      {
        label: 'between',
        value: 'BETWEEN',
      },
      {
        label: 'is same as',
        value: 'SAMEAS',
      },
      {
        label: 'is different',
        value: 'NSAMEAS',
      },
    ];
    return queryOptions;
  }
  async getAgentFilters() {
    var response = await this.getMonitoredCIsClasses('');
    var options: { label: string; value: string; description: string }[] = [];
    response.map((option) => {
      options.push({ label: option.text, value: option.value, description: '' });
    });
    return options;
  }

  getMonitoredCIsClasses(sysparam) {
    let bodyData = `{"targets":[{"sysparm":"${sysparam}"}]}`;

    return this.apiClient
      .request({
        url: this.apiPath + '/search/cis/classV2',
        data: bodyData,
        method: 'POST',
      })
      .then(this.apiClient.mapChecksToValue);
  }
}
