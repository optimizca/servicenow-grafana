export class MoogsoftMetric {
    data: number;
    instance: string;
    created_at_date: number
    
    constructor(apiResponse: any) {
        this.data = apiResponse.data;
        this.instance = apiResponse.instance;
        this.created_at_date = apiResponse.created_at_date;
    }
}