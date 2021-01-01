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
    console.log('ap results are : ' + JSON.stringify(response));
    return response.data;   
  }

  async getServiceNowResult(
    restEndpointUrl: string,   
    corsProxy: string,
    authorization: string
  ): ServiceNowResult[] {
    let serviceNowResults: ServiceNowResult[] = [];
    let apiUrl = corsProxy + "/" + restEndpointUrl;
    console.log("Service now apiUrl : " + apiUrl);

    let response = await apiClient.getApiResult(apiUrl,
      'POST',
      authorization,
      '{\"targets\":[{\"target\":\"EC2AMAZ-8AMDGC0\"}]}'
    )
    
    const json = await response.json();
    console.log("serviceNowResults is : ");
    console.log(JSON.stringify(json));
    json.forEach(function(item) {
      let serviceNowResult = new ServiceNowResult(item);
      serviceNowResults.push(serviceNowResult);
    });
    return serviceNowResults;
  }
}
