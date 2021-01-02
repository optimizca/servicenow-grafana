import { ArrayVector, DataFrame, DataQuery, Field, FieldType, MutableDataFrame, TIME_SERIES_TIME_FIELD_NAME, TIME_SERIES_VALUE_FIELD_NAME } from '@grafana/data';
import { SnowAPIClient } from "SnowAPIClient";
import { ServiceNowResult } from "./ServiceNowResult";
import { BackendSrv } from '@grafana/runtime';


export class SNOWManager {
  backendSrv: BackendSrv;
  snowBaseUrl: string;
  authInfo: string;
  corsProxy: string;

  constructor(backendSrv: BackendSrv,snowBaseUrl: string, corsProxy: string, authInfo: string) {
    this.backendSrv = backendSrv;
    this.corsProxy = corsProxy;
    this.authInfo = authInfo;
    this.snowBaseUrl = snowBaseUrl;
  }

  async getServers(requestBody:string):string[] {
    let apiUrl = this.corsProxy + "/" + this.snowBaseUrl + '/api/488905/oimetrics/search'
    let apiClient = new SnowAPIClient(this.backendSrv);
    let response = await apiClient.getApiResult(apiUrl,
      'POST',
      this.authInfo,
      requestBody
    )
    console.log('Got search results : ' + response);
    const values = response.map(frame => ({
      text: frame
    }));
    return values;
  }

  async getAPIResults(target: string, requestBody:string):DataFrame {
    let apiClient = new SnowAPIClient(this.backendSrv); 
    let serviceNowResults: ServiceNowResult[] = [];
    let apiUrl = this.corsProxy + "/" + this.snowBaseUrl + '/api/488905/oimetrics/query';
    let response = await apiClient.getApiResult(apiUrl,
      'POST',
      this.authInfo,
      requestBody
    )

    let serviceNowResult:ServiceNowResult;
    console.log(JSON.stringify(response));
    response.forEach(function (item) {
      if (item.target === target) {
        serviceNowResult = new ServiceNowResult(item);
        serviceNowResults.push(serviceNowResult);
      }
    });

    return this.getResponseFrame(serviceNowResults, target);
  }

  getResponseFrame(serviceNowResults: ServiceNowResult[], target:string): MutableDataFrame {
    let datapointValues: number[] = [];
    let datapointTimeValues: Date[] = [];
    let datapointCount: number = 0;

    serviceNowResults.forEach(result => {
      console.log('result target ' + result.target);
      if (result.target === target) {
          console.log('datapoints : ' + JSON.stringify(result.datapoints));
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

    console.log('Returning snow data frame');
    return frame;
  }
}