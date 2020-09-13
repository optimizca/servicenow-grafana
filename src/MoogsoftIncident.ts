export class MoogSoftIncident {
    id: number;
    severity: string;
    creationTime: number;
    status: string;
    services: string[];
    description: string;
    totalAlerts: number;
    lastStateChange: number;

    constructor(apiResponse: any) {
        this.id = apiResponse.incident_id;
        this.severity = apiResponse.severity;
        this.creationTime = apiResponse.first_event_time;
        this.status = apiResponse.status;
        this.services = apiResponse.services;
        this.description = apiResponse.description;
        this.totalAlerts = apiResponse.total_alerts;
        this.lastStateChange = apiResponse.last_state_change;
    }
}