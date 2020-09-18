export class MoogSoftAlert {
    id: number;
    manager_id: string;
    manager: string;
    metricPath: string;
    alertId: string;
    source: string;
    country: string;
    longitude: number;
    latitude: number;
    metric: number;
    services: string[];
    severity: string;
    moogsoftClass: string;
    creationTime: number;
    lastEventTime: number;
    description: string;
    service: string;
    status: string;
    eventCount: number;
    
    constructor(apiResponse: any) {
        this.id = apiResponse.alert_id;
        this.manager_id = apiResponse.manager_id;
        this.manager = apiResponse.manager;
        this.metricPath = apiResponse.metricPath;
        this.alertId = apiResponse.alert_id;        
        this.source = apiResponse.source;
        this.country = apiResponse.tags.country;
        this.latitude = apiResponse.tags.latitude;
        this.longitude = apiResponse.tags.longitude;
        this.metric = apiResponse.tags.metric;
        this.services = apiResponse.service;
        this.severity = apiResponse.severity;
        this.creationTime = apiResponse.first_event_time;
        this.lastEventTime = apiResponse.last_event_time;
        this.description = apiResponse.description;
        this.service = apiResponse.service;
        this.status = apiResponse.status;
        this.moogsoftClass = apiResponse.class;
        this.eventCount = apiResponse.event_count;
    }
}