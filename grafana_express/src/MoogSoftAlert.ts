export class MoogSoftAlert {
    manager_id: string;
    manager: string;
    metricPath: string;
    alertId: string;
    source: string;
    severity: string;
    lastEventTime: number;
    country: string;
    longitude: number;
    latitude: number;
    metric: number;
    services: string[]

    //metricValues: MetricValue[];
    
    constructor(apiResponse: any) {
        //console.log('apiResponse : ' + JSON.stringify(apiResponse));
        this.manager_id = apiResponse.manager_id;
        //console.log('apiResponse.manager_id ' + apiResponse.manager_id);
        this.manager = apiResponse.manager;
        this.metricPath = apiResponse.metricPath;
        this.alertId = apiResponse.alert_id;
        this.severity = apiResponse.severity;
        this.lastEventTime = apiResponse.last_event_time;
        this.source = apiResponse.source;
        this.country = apiResponse.tags.country;
        this.latitude = apiResponse.tags.latitude;
        this.longitude = apiResponse.tags.longitude;
        this.metric = apiResponse.tags.metric;
        this.services = apiResponse.service;
        console.log("Moogsoft services : " + this.services);
    }
}