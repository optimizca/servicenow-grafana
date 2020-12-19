export class ServiceNowResult {
  target: string;
  datapoints: number[];

  constructor(apiResponse: any) {
    this.target = apiResponse.target;
    this.datapoints = apiResponse.datapoints;
  }
}
