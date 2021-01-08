import {
  ArrayVector,
  DataFrame,
  DataQuery,
  Field,
  FieldType,
  MutableDataFrame,
  TIME_SERIES_TIME_FIELD_NAME,
  TIME_SERIES_VALUE_FIELD_NAME
} from "@grafana/data";
import { APIClient } from "APIClient";
import { ServiceNowResult } from "./ServiceNowResult";
import { BackendSrv, getTemplateSrv } from "@grafana/runtime";

import * as utils from "./Utils";

export class SNOWManager {
  apiClient: APIClient;
  apiPath: string;

  constructor(options) {
    const { basicAuth, withCredentials, url } = options;
    this.apiPath = "";
    let headers = { "Content-Type": "application/json" };
    if (typeof basicAuth === "string" && basicAuth.length > 0) {
      headers["Authorization"] = basicAuth;
    }
    this.apiClient = new APIClient(headers, withCredentials, url);
  }
  getCIs(filter: string) {
    return this.apiClient
      .request({
        url: this.apiPath + "/search",
        data: "",
        method: "POST"
      })
      .then(this.apiClient.mapToTextValue);
  }
  getServices(filter: string) {
    return this.apiClient
      .request({
        url: this.apiPath + "/search/services",
        data: "",
        method: "POST"
      })
      .then(this.apiClient.mapToTextValue);
  }
  getMetricsFrames(target, timeFrom, timeTo, options) {
    return this.getMetrics(target, timeFrom, timeTo, options);
  }
  getMetrics(target, timeFrom, timeTo, options) {
    if (utils.debugLevel() === 1) {
      console.log("isnide getMetrics");
      console.log("print target");
      console.log(target);
      console.log("print options scoped Vars");
      console.log(options.scopedVars);
    }

    const sourceTarget = utils.replaceTargetUsingTemplVars(
      target.metricSource,
      options.scopedVars
    );
    const metricNameTarget = utils.replaceTargetUsingTemplVars(
      target.metricName,
      options.scopedVars
    );
    //let queryTarget = "EC2AMAZ-8AMDGC0";
    //let queryMetricName = "api_response_time_ms_2";
    let bodyData =
      '{"targets":[{"target":"' +
      sourceTarget +
      '","metricName":"' +
      metricNameTarget +
      '"}]}';

    if (utils.debugLevel() === 1) {
      console.log("source after replace");
      console.log(sourceTarget);
      console.log(bodyData);
    }
    return this.apiClient
      .request({
        url:
          this.apiPath +
          "/query/ci_single_metric?startTime="+timeFrom+"&endTime="+timeTo,
        data: bodyData,
        method: "POST"
      })
      .then(response => {
        return this.apiClient.mapMetricsResponseToFrame(response, target);
      });
  }

  getTextFrames(target, timeFrom, timeTo, options,type) {
    if(type==="Alerts")
      return this.getAlerts(target, timeFrom, timeTo, options);
    return [];
  }
  getAlerts(target, timeFrom, timeTo, options) {
    if (utils.debugLevel() === 1) {
      console.log("isnide GetAlerts");
      console.log("print target");
      console.log(target);
      console.log("print options scoped Vars");
      console.log(options.scopedVars);
    }

    const serviceTarget = utils.replaceTargetUsingTemplVars(
      target.service,
      options.scopedVars
    );
    let metricNameTarget="";
  
    
    let bodyData =
      '{"targets":[{"target":"' +
      serviceTarget +
      '","metricName":"' +
      metricNameTarget +
      '"}]}';

    if (utils.debugLevel() === 1) {
      console.log("source after replace");
      console.log(serviceTarget);
      console.log(bodyData);
    }
    return this.apiClient
      .request({
        url:
          this.apiPath +
          "/query/alerts?startTime="+timeFrom+"&endTime="+timeTo,
        data: bodyData,
        method: "POST"
      })
      .then(response => {
        utils.printDebug("print alerts response from SNOW");
        utils.printDebug(response);
        return this.apiClient.mapTextResponseToFrame(response, target);
      });
  }
}
