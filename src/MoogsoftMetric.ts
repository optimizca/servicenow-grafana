export class MoogsoftMetric {
  mean: number;
  time: number;

  constructor(apiResponse: any) {
    this.mean = apiResponse.mean;
    this.time = apiResponse.timed_at_ms;
  }
}
