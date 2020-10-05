export class MoogsoftMetric {
  mean: number;
  time: number;
  lowThreshold: number;
  highThreshold: number;
  sourceName: string;
  metricName: string;

  constructor(apiResponse: any, sourceName, metricName) {
    this.mean = apiResponse.data;
    this.time = apiResponse.timed_at_ms;
    this.lowThreshold = apiResponse.engine.lowThreshold;
    this.highThreshold = apiResponse.engine.highThreshold;

    this.sourceName = sourceName;
    this.metricName = metricName;
  }
}
