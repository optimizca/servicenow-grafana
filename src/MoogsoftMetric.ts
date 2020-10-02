export class MoogsoftMetric {
  mean: number;
  time: number;
  lowThreshold: number;
  highThreshold: number;
  sourceName: string;
  metricName: string;

  constructor(apiResponse: any, sourceName, metricName) {
    this.mean = apiResponse.mean;
    this.time = apiResponse.timed_at_ms;
    this.lowThreshold = apiResponse.low;
    this.highThreshold = apiResponse.high;

    this.sourceName = sourceName;
    this.metricName = metricName;
  }
}
