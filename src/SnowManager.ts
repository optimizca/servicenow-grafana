import { MutableDataFrame, FieldType } from "@grafana/data";
import { SnowAPIClient } from "SnowAPIClient";
import { ServiceNowResult } from "./ServiceNowResult";
import { BackendSrv } from '@grafana/runtime';

export class SNOWManager {
  backendSrv: BackendSrv;

  constructor(backendSrv: BackendSrv) {
    this.backendSrv = backendSrv;
  }

  async getServers(apiUrl:string, methodType:string, authInfo:string, requestBody:string):string[] {
    let apiClient = new SnowAPIClient(this.backendSrv);
    let response = await apiClient.getApiResult(apiUrl,
      'POST',
      authInfo,
      requestBody
    )
    console.log('Got search results : ' + response);
    const values = response.map(frame => ({
      text: frame
    }));
    return values;
  }

  async getAPIResults(apiURL: string, corsProxy: string, authInfo: string, target: string, requestBody:string) {
    let apiClient = new SnowAPIClient(this.backendSrv);
    let serviceNowResults: ServiceNowResult[] = [];
    let datapointValues: number[] = [];
    let datapointTimeValues: Date[] = [];
    let datapointCount: number = 0;

    let response = await apiClient.getApiResult(apiURL,
      'POST',
      authInfo,
      '{\"targets\":[{\"target\":\"EC2AMAZ-8AMDGC0\"}]}'
    )
    
    console.log(JSON.stringify(response));
    response.forEach(function(item) {
      let serviceNowResult = new ServiceNowResult(item);
      serviceNowResults.push(serviceNowResult);
    });
    
    //TODO: do the result processing like zabbix here
    //Step 2 = Process results
    serviceNowResults.forEach(result => {
      console.log('result target ' + result.target);
      //TODO: here we will pass the actual target
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

    console.log('Returning frame');
    return frame;
  }
}