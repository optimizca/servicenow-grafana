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
import { BackendSrv } from "@grafana/runtime";

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
  getMetrics(target, timeFrom, timeTo, options) {
    let queryTarget = "EC2AMAZ-8AMDGC0";
    let queryMetricName = "cpu_queuelength";
    let bodyData =
      '{"targets":[{"target":"' +
      queryTarget +
      '","metricName":"' +
      queryMetricName +
      '"}]}';
    console.log(bodyData);
    return this.apiClient
      .request({
        url:
          this.apiPath +
          "/query/ci_single_metric?startTime=1609866030000&endTime=1609866810000",
        data: bodyData,
        method: "POST"
      })
      .then(this.apiClient.mapToTextValue);
  }
}
