export class MoogsoftMetric {
  mean: number;
  time: number;
  sourceName: string;
  metricName: string;

  constructor(apiResponse: any, sourceName, metricName) {
    this.mean = apiResponse.mean;
    this.time = apiResponse.timed_at_ms;
    this.sourceName = sourceName;
    this.metricName = metricName;
  }
}
