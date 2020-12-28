import { ServiceNowResult } from "ServiceNowResult";

export class SnowAPIClient {
  async getServiceNowResult(
    restEndpointUrl: string,   
    corsProxy: string,
    authorization: string    
  ): ServiceNowResult[] {
    let serviceNowResults: ServiceNowResult[] = [];
    let apiUrl = corsProxy + "/" + restEndpointUrl;
    console.log("Service now apiUrl : " + apiUrl);

    const response = await fetch(apiUrl, {
      method: "POST",
      mode: "cors",
      body: "{\"targets\":[{\"target\":\"EC2AMAZ-8AMDGC0\"}]}",
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": authorization,
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-grafana-org-id": "1",
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Credentials': 'true'
      })
    });

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
