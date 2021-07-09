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

  getServices(filter: string) {
    let option = '';
    let bodyData = '{"targets":[{"filter":"' + filter + '","option":"' + option + '"}]}';
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
    let sourceTarget = utils.replaceTargetUsingTemplVars(target.source, options.scopedVars);
    let resourceNameTarget = utils.replaceTargetUsingTemplVars(target.metricType, options.scopedVars);
    let metricNameTarget = utils.replaceTargetUsingTemplVars(target.metricName, options.scopedVars);
    metricNameTarget = utils.trimRegEx(metricNameTarget);
    sourceTarget = utils.trimRegEx(sourceTarget);
    let metricAnomaly = utils.replaceTargetUsingTemplVars(target.metricAnomaly, options.scopedVars);
    if (metricAnomaly === 'true') {
      anomaly = true;
    }
    console.log('metricanimaly= ' + metricAnomaly);
    var sysparam = '';
    if (typeof target.sysparam_query !== 'undefined') {
      if (target.sysparam_query) sysparam = target.sysparam_query;
    }
    //let queryTarget = "EC2AMAZ-8AMDGC0";
    //let queryMetricName = "api_response_time_ms_2";
    let bodyData =
      '{"targets":[{"target":"' +
      sourceTarget +
      '","resourceName":"' +
      resourceNameTarget +
      '","metricName":"' +
      metricNameTarget +
      '","sysparm_query":"' +
      sysparam +
      '"}]}';
    let metricURL = this.apiPath + '/query/ci_single_metricV2?startTime=' + timeFrom + '&endTime=' + timeTo;
    if (metricNameTarget === '*') {
      metricURL = this.apiPath + '/query/metricsV2?startTime=' + timeFrom + '&endTime=' + timeTo;
    }
    if (anomaly === true) {
      metricURL = this.apiPath + '/query/metrics/anomalityV2?startTime=' + timeFrom + '&endTime=' + timeTo;
    }
    //return this.getTextFrames(target, timeFrom, timeTo, options,'Metrics');
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

  getTextFrames(target, timeFrom, timeTo, options, type) {
    if (type === 'Alerts') {
      return this.getAlerts(target, timeFrom, timeTo, options);
    }
    if (type === 'Changes') {
      return this.getChanges(target, timeFrom, timeTo, options);
    }
    if (type === 'Metrics') {
      return this.getAllMetrics(target, timeFrom, timeTo, options);
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
    return [];
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
      console.log('print options scoped Vars');
      console.log(options.scopedVars);
    }
    var serviceTarget = utils.replaceTargetUsingTemplVars(target.service, options.scopedVars);
    if (typeof target.selectedServiceList !== 'undefined') {
      serviceTarget = utils.replaceTargetUsingTemplVars(target.selectedServiceList.value, options.scopedVars);
    }

    var child_depth = 3;
    if (typeof target.topology_child_depth !== 'undefined') {
      if (target.topology_child_depth > 0) {
        child_depth = target.topology_child_depth;
      }
    }
    var excluded_classes = '';
    if (typeof target.topology_filter !== 'undefined') {
      if (target.topology_filter) {
        excluded_classes = target.topology_filter;
      }
    }

    let bodyData =
      '{"targets":[{"target":"' +
      serviceTarget +
      '","child_depth":"' +
      child_depth +
      '","exclude_classes":"' +
      excluded_classes +
      '"}]}';

    if (utils.debugLevel() === 1) {
      console.log('source after replace');
      console.log(serviceTarget);
      console.log(bodyData);
    }
    return this.apiClient
      .request({
        url: this.apiPath + '/query/topology?startTime=' + timeFrom + '&endTime=' + timeTo,
        data: bodyData,
        method: 'POST',
      })
      .then((response) => {
        utils.printDebug('print altopology response from SNOW');
        utils.printDebug(response);
        utils.printDebug('~~~~~~~~~~~~~~~~');

        utils.printDebug(response.data);
        utils.printDebug('~~~~~~~~~~~~~~~~');
        return response.data.rows;
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

    const sysparam_query = utils.replaceTargetUsingTemplVars(target.sysparam_query, options.scopedVars);
    let metricNameTarget = '';

    let bodyData = '{"targets":[{"target":"' + sysparam_query + '","metricName":"' + metricNameTarget + '"}]}';

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
        return this.apiClient.mapTextResponseToFrame(response, target);
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
  getAlerts(target, timeFrom, timeTo, options) {
    if (utils.debugLevel() === 1) {
      console.log('isnide GetAlerts');
      console.log('print target');
      console.log(target);
      console.log('print options scoped Vars');
      console.log(options.scopedVars);
    }
    const serviceTarget = utils.replaceTargetUsingTemplVars(target.service, options.scopedVars);
    const sourceTarget = utils.replaceTargetUsingTemplVars(target.source, options.scopedVars);
    let bodyTarget = serviceTarget;
    let alertState = 'Active';
    let alertType = 'service';
    let sys_query = '';
    if (target.selectedAlertStateList) {
      if (target.selectedAlertStateList.value === 'All') {
        alertState = 'All';
      }
    }
    if (target.selectedAlertTypeList) {
      if (target.selectedAlertTypeList.value === 'CI') {
        alertType = 'ci';
        bodyTarget = sourceTarget;
      } else if (target.selectedAlertTypeList.value === 'OS') {
        alertType = 'os';
        bodyTarget = sourceTarget;
        if (bodyTarget.indexOf('(') !== -1) {
          bodyTarget = bodyTarget.substring(bodyTarget.indexOf('(') + 1, bodyTarget.indexOf(')'));
        }
      } else if (target.selectedAlertTypeList.value === 'None') {
        alertType = 'none';
      }
    }
    if (typeof target.sysparam_query !== 'undefined') {
      if (target.sysparam_query) {
        sys_query = target.sysparam_query;
      }
    }

    let bodyData = `{"targets":[{"target":"${bodyTarget}","sysparm_query":"${sys_query}"}]}`;
    //let bodyData = '{"targets":[{"target":"' + bodyTarget + '","metricName":"' + metricNameTarget + '"}]}';

    if (utils.debugLevel() === 1) {
      console.log('source after replace');
      console.log(serviceTarget);
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
        return this.apiClient.mapTextResponseToFrame(response, target);
      });
  }

  getChanges(target, timeFrom, timeTo, options) {
    if (utils.debugLevel() === 1) {
      console.log('inside getChanges');
      console.log('print target', target);
    }
    var serviceToReplace: string = '$service';
    if (target.selectedServiceList) {
      serviceToReplace = target.selectedServiceList.value;
    }

    const serviceTarget = utils.replaceTargetUsingTemplVars(serviceToReplace, options.scopedVars);
    const sourceTarget = utils.replaceTargetUsingTemplVars(target.source, options.scopedVars);
    let bodyTarget = serviceTarget;
    let changeType = 'service';
    let sysparam = '';
    if (target.selectedChangeTypeList) {
      if (target.selectedChangeTypeList.value === 'CI') {
        changeType = 'ci';
        bodyTarget = sourceTarget;
      }
    }
    if (typeof target.sysparam_query !== 'undefined') {
      if (target.sysparam_query) sysparam = target.sysparam_query;
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
        return this.apiClient.mapTextResponseToFrame(response, target);
      });
  }
  getAllACCAgents(target, timeFrom, timeTo, options) {
    if (utils.debugLevel() === 1) {
      console.log('inside getAllACCAgents');
      console.log('print target', target);
    }
    var agentFilter = '';
    if (typeof target.selectedAgentFilter !== 'undefined') {
      if (target.selectedAgentFilter.value) agentFilter = target.selectedAgentFilter.value;
    }
    var metricNames = '';
    if (typeof target.metricName !== 'undefined') {
      if (target.metricName) metricNames = target.metricName;
    }
    var sysparam_query = '';
    if (typeof target.sysparam_query) {
      if (target.sysparam_query) sysparam_query = target.sysparam_query;
    }
    var filterType = '';
    if (typeof target.selectedAgentFilterType !== 'undefined') {
      if (target.selectedAgentFilterType) filterType = target.selectedAgentFilterType.value.toLowerCase();
    }
    agentFilter = utils.replaceTargetUsingTemplVars(agentFilter, options.scopedVars);
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
        return this.apiClient.mapTextResponseToFrame(response, target);
      });
  }
  getAllMetrics(target, timeFrom, timeTo, options) {
    if (utils.debugLevel() === 1) {
      console.log('isnide GetAllMetrics');
      console.log('print target');
      console.log(target);
      console.log('print options scoped Vars');
      console.log(options.scopedVars);
    }

    const sourceTarget = utils.replaceTargetUsingTemplVars(target.source, options.scopedVars);
    let bodyTarget = sourceTarget;

    let metricNameTarget = '*';

    let bodyData = '{"targets":[{"target":"' + bodyTarget + '","metricName":"' + metricNameTarget + '"}]}';

    if (utils.debugLevel() === 1) {
      console.log('source after replace');
      console.log(bodyData);
    }
    return this.apiClient
      .request({
        url: this.apiPath + '/query?startTime=' + +timeFrom + '&endTime=' + timeTo,
        data: bodyData,
        method: 'POST',
      })
      .then((response) => {
        utils.printDebug('print alerts response from SNOW');
        utils.printDebug(response);
        return this.apiClient.mapTextResponseToFrame(response, target);
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
    const sourceTarget = utils.replaceTargetUsingTemplVars(target.source, options.scopedVars);
    var sysparam = '';
    if (typeof target.sysparam_query !== 'undefined') {
      if (target.sysparam_query) {
        sysparam = target.sysparam_query;
      }
    }
    let bodyData = '{"targets":[{"target":"' + sourceTarget + '","sysparm_query":"' + sysparam + '"}]}';

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
        return this.apiClient.mapTextResponseToFrame(response, target);
      });
  }

  getCategoryQueryOption() {
    let queryOptions = [
      {
        label: 'Metrics',
        value: 'Metrics',
        description: 'Get Timeseries metrics',
      },
      {
        label: 'Alerts',
        value: 'Alerts',
        description: 'Get Alert',
      },
      {
        label: 'Changes',
        value: 'Changes',
        description: 'Get Changes',
      },
      {
        label: 'Topology',
        value: 'Topology',
        description: 'Get Topology',
      },
      {
        label: 'Admin',
        value: 'Admin',
        description: 'Definitions and Admin Queries',
      },
      {
        label: 'CI Summary',
        value: 'CI_Summary',
        description: 'CI Summary',
      },
      {
        label: 'Agents',
        value: 'Agents',
        description: 'Get Agent information',
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
  async getAgentFilters() {
    var response = await this.getMonitoredCIsClasses();
    var options: { label: string; value: string; description: string }[] = [];
    response.map((option) => {
      options.push({ label: option.text, value: option.value, description: '' });
    });
    return options;
  }

  getMonitoredCIsClasses() {
    let cisURL = this.apiPath + '/search/cis/classV2';
    let bodyData = '';

    return this.apiClient
      .request({
        url: cisURL,
        data: bodyData,
        method: 'POST',
      })
      .then(this.apiClient.mapChecksToValue);
  }
}
