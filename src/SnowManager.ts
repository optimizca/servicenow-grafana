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
    this.apiPath = "/api/488905/oimetrics";
    let headers = { "Content-Type": "application/json" };
    if (typeof basicAuth === "string" && basicAuth.length > 0) {
      headers["Authorization"] = basicAuth;
    }
    this.apiClient = new APIClient(headers, withCredentials, url);
  }
  getServers(filter: string): string[] {
    this.apiClient.request({
      url: this.apiPath + "/search",
      data: "",
      method: "POST"
    });
    return [];
  }

  async getAPIResults(target: string, requestBody: string): DataFrame {
    let apiClient = new SnowAPIClient(this.backendSrv);
    let serviceNowResults: ServiceNowResult[] = [];
    let apiUrl =
      this.corsProxy + "/" + this.snowBaseUrl + "/api/488905/oimetrics/query";
    let response = await apiClient.getApiResult(
      apiUrl,
      "POST",
      this.authInfo,
      requestBody
    );

    let serviceNowResult: ServiceNowResult;
    console.log(JSON.stringify(response));
    response.forEach(function(item) {
      if (item.target === target) {
        serviceNowResult = new ServiceNowResult(item);
        serviceNowResults.push(serviceNowResult);
      }
    });

    return this.getResponseFrame(serviceNowResults, target);
  }

  getResponseFrame(
    serviceNowResults: ServiceNowResult[],
    target: string
  ): MutableDataFrame {
    let datapointValues: number[] = [];
    let datapointTimeValues: Date[] = [];
    let datapointCount = 0;

    serviceNowResults.forEach(result => {
      console.log("result target " + result.target);
      if (result.target === target) {
        console.log("datapoints : " + JSON.stringify(result.datapoints));
        result.datapoints.forEach(datapoint => {
          datapointValues[datapointCount] = datapoint[0];
          datapointTimeValues[datapointCount] = datapoint[1];
          datapointCount++;
        });
      }
    });

    const frame = new MutableDataFrame({
      fields: []
    });

    //Servicenow dataframe
    frame.addField({
      name: "value",
      type: FieldType.number,
      values: datapointValues
    });

    frame.addField({
      name: "time",
      type: FieldType.time,
      values: datapointTimeValues
    });

    console.log("Returning snow data frame");
    return frame;
  }
}
