export class MoogSoftIncident {
    id: number;
    severity: string;
    creationTime: number;
    status: string;
    service: string;
    description: string;
    totalAlerts: number

    constructor(apiResponse: any) {
        this.id = apiResponse.incident_id;
        this.severity = apiResponse.severity;
        this.creationTime = apiResponse.first_event_time;
        this.status = apiResponse.status;
        this.service = apiResponse.service;
        this.description = apiResponse.description;
        this.totalAlerts = apiResponse.total_alerts;
    }
}