import { ServiceNowResult } from "ServiceNowResult";
import { BackendSrv } from '@grafana/runtime';

export class SnowAPIClient {
  backendSrv: BackendSrv;  
  constructor(backendSrv: BackendSrv){
    this.backendSrv = backendSrv;
  }

  //Generic method to execute an API 
  async getApiResult(apiUrl:string, methodType:string, authInfo:string, requestBody:string):any[] {
    let response = await this.backendSrv.datasourceRequest({
      url: apiUrl,
      method: methodType,
      mode: 'cors',
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": authInfo
      }),
      data: requestBody,
      });
    console.log('api results are : ' + JSON.stringify(response));
    return response.data;   
  }
}
