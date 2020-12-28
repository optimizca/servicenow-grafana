import { MutableDataFrame, FieldType } from "@grafana/data";
import { SnowAPIClient } from "SnowAPIClient";
import { ServiceNowResult } from "./ServiceNowResult";

export class SNOWManager {
    async getAPIResults(apiURL:string, corsProxy:string, authInfo: string, target: string) {
      let client = new SnowAPIClient();
      //Step 1 = Invoke API
      let serviceNowResults: ServiceNowResult[] = await client.getServiceNowResult(apiURL, corsProxy, authInfo);
      let datapointValues: number[] = [];
      let datapointTimeValues: Date[] = [];
      let datapointCount:number = 0;

      //Step 2 = Process results
      serviceNowResults.forEach(result => {
        console.log('result target ' + result.target);
        //TODO: here we will pass the actual target
        if(result.target === target) {
          console.log('datapoints : ' + JSON.stringify(result.datapoints));
          result.datapoints.forEach(datapoint => {
            datapointValues[datapointCount] = datapoint[0];
            datapointTimeValues[datapointCount] = datapoint[1];
            datapointCount++;
          });
        }
      });

      const frame = new MutableDataFrame({
        //refId: query.refId,
        fields: []
      });

      //Servicenow dataframe
      frame.addField({
        name: "value",
        type: FieldType.number,
        values: datapointValues
      });

      frame.addField({
        name: "time",
        type: FieldType.time,
        values: datapointTimeValues
      });
      
      console.log('returning frame');
      return frame;
    }
}