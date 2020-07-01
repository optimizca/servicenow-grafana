import defaults from 'lodash/defaults';

import {
  DataQueryRequest,
  DataQueryResponse,
  DataSourceApi,
  DataSourceInstanceSettings,
  MutableDataFrame,
  FieldType,
} from '@grafana/data';

import { MyQuery, MyDataSourceOptions, defaultQuery} from './types';
import {AppdAPIClient} from './AppdAPIClient'
import { getTemplateSrv } from '@grafana/runtime';
import {MoogSoftAlert} from './MoogSoftAlert'

export class DataSource extends DataSourceApi<MyQuery, MyDataSourceOptions> {
  resolution: number;

  constructor(instanceSettings: DataSourceInstanceSettings<MyDataSourceOptions>) {
    super(instanceSettings);
    this.resolution = instanceSettings.jsonData.resolution || 1000.0;
  }

  async query(options: DataQueryRequest<MyQuery>): Promise<DataQueryResponse> {
   console.log("options : " + JSON.stringify(options));
   console.log("options.scopedVars : " + JSON.stringify(options.scopedVars));
   console.log("getTemplateSrv().getVariables : " + JSON.stringify(getTemplateSrv().getVariables()));
   const templateSrv = getTemplateSrv();
   const variablesProtected = templateSrv.getVariables();
   const variablesStringfied = JSON.stringify( variablesProtected );
   var variables: any = JSON.parse( variablesStringfied );
   var selectedServices: string[] = variables[0].current.value;

   console.log("variablesProtected : " + variablesProtected);
   console.log("variablesStringfied : " + variablesStringfied);
   console.log("selectedServices : " + selectedServices);

   //const query = getTemplateSrv().replace('SELECT * FROM services WHERE id = "$service"'), options);
   let client =  new AppdAPIClient();
   console.log('Before invoking API...');
   //const sourceResult = await client.request(); 
   //console.log('After invoking API :' + JSON.stringify(sourceResult));
   //console.log('adding frame...');

   let alerts: MoogSoftAlert[] = await client.getAlerts();
   console.log('alerts after invoking API :' + JSON.stringify(alerts));

   const data = options.targets.map(target => {
   const query = defaults(target, defaultQuery);
   console.log('query : ' + JSON.stringify(query));
   console.log('query text: ' + query.queryText);
   

    console.log('Test message');
    const frame = new MutableDataFrame({
      refId: query.refId,
      fields: [
      ],
    });

    let queryType:string = query.queryText;
    if(queryType == "Alerts") {      
      console.log("Adding alerts as result..");
      let serviceAlerts: MoogSoftAlert[] = alerts.filter(function (alert) {
        return selectedServices.some(r=> alert.services.indexOf(r) >= 0);
      });
      
      console.log("serviceAlerts : " + serviceAlerts);

      var occurences = serviceAlerts.reduce(function (r, alert) {
          r[alert.source] = ++r[alert.source] || 1;
          return r;
          }, {});
      
      let sourceResults = Object.keys(occurences).map(function (key) {      
        return { key: key, value: occurences[key] };
      });


      sourceResults.forEach(element => {
        frame.addField({ name: element.key, type: FieldType.number, values: [element.value]});
      });
      return frame;
    } else if (queryType == "Geolocation Alerts") {

      let frame = new MutableDataFrame({
        refId: query.refId,
        fields: [
          { name: 'country', type: FieldType.string},
          { name: 'latitude', type: FieldType.number},
          { name: 'longitude', type: FieldType.number},
          { name: 'metric', type: FieldType.number}
        ],
      });
      console.log("Adding location based alerts..");
      alerts.forEach((alert) => {
        console.log("selectedServices: " + selectedServices);
        console.log("Service found : " + alert.services);
        const found = selectedServices.some(r=> alert.services.indexOf(r) >= 0);
        const allFound = selectedServices.includes('$__all');
        console.log("Service found : " + found);
        console.log("allFound : " + found);
        if((found === true || allFound === true) && typeof alert.country !== "undefined") {
          console.log("country is " + alert.country);
          frame.add({country: alert.country, latitude:alert.latitude, longitude: alert.longitude, metric: alert.metric});
        }
      });
      return frame;
    }
    return frame;
    });
   return { data };
  }

  async testDatasource() {
    //Health check for the data source.
    console.log("Testing datasource");
    return {
      status: 'success',
      message: 'Successful check',
    };
  }
}
