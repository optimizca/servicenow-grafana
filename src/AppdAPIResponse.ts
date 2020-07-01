export class AppdAPIResponse {
    metricId: number;
    metricName: string;
    metricPath: string;
    frequency: string;
    //metricValues: MetricValue[];

    constructor(apiResponse: any) {
        console.log('apiResponse :: ' + JSON.stringify(apiResponse));
        console.log('apiResponse.metricId :: ' + apiResponse.metricId);
        this.metricId = apiResponse.metricId;
        this.metricName = apiResponse.metricName;
        this.metricPath = apiResponse.metricPath;
        this.frequency = apiResponse.frequency;

        /*
        let metricArray = apiResponse.metricValues;
        console.log('metricArray : ' + metricArray);
        metricArray.map((metric: any) => new MetricValue(metric));
        this.metricValues = undefined;
        */
    }
}

/*
class MetricValue {
    startTimeInMillis : number;
    occurrences : number;
    current : number;
    min : number;
    max : number;
    useRange : number;
    count : number;
    sum : number;
    value : number;
    standardDeviation : number;

    constructor(apiResponse: any) {
        console.log('apiResponse in MetricValue : ' + apiResponse);
        this.startTimeInMillis = apiResponse.startTimeInMillis;
        this.occurrences = apiResponse.occurrences;
        this.current = apiResponse.current;
        this.min = apiResponse.min;
        this.max = apiResponse.max;
        this.useRange = apiResponse.useRange;
        this.count = apiResponse.count;
        this.sum = apiResponse.sum;
        this.value = apiResponse.value;
        this.standardDeviation = apiResponse.standardDeviation;        
    }
}
*/