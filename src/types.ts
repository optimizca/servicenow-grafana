import { DataQuery, DataSourceJsonData } from '@grafana/data';
import { SelectableValue } from '@grafana/data';

export interface MyQuery extends DataQuery {
  queryText: string;
  selectedQueryCategory: SelectableValue<string>;
  alertCategory: SelectableValue<string>;
  resultCategory: SelectableValue<string>;
  aggregationCriteria: SelectableValue<string>;
  constant: number;
  frequency: number;
  application: string;
  metric: string;
  businessTransaction: string;
}

export const defaultQuery: Partial<MyQuery> = {
  queryText: "Alerts",
  constant: 6.5,
  frequency: 1.0,
  selectedQueryCategory: { label: "Alerts", value: 'Alerts', description: "Get alerts information."},
  alertCategory: { label: "Alerts", value: 'Alerts', description: "Get alerts information."} ,
  resultCategory: { label: "Aggregate", value: 'aggregate', description: "Get aggregate alerts by source."},
  aggregationCriteria: { label: "Status", value: 'status', description: "Aggregate incidents by status."},
  application: "Test Application",
  metric: "Overall Application Performance",
  businessTransaction: "Average Response Time",
};

/**
 * These are options configured for each DataSource instance
 */
export interface MyDataSourceOptions extends DataSourceJsonData {
  path?: string;
  resolution?: number;
  //name?: string;
  instanceName?: string;
  moogApiKey?: string;
  //type?: string;
  //url?: string;
  //user?: string; 
}

/**
 * Value that is used in the backend, but never sent over HTTP to the frontend
 */
export interface MySecureJsonData {
  apiKey?: string;
}

export interface Result {
  value?: string;
}


/*export class MovieService {
  getMovies(genre: string): Promise<Result[]> {
    return fetch(`fetch('http://www.mocky.io/v2/5ed522633300004c00f7a83f`)
        .then(res => res.json())
        .then(res => res.map((result: any) => {
          console.log('val : ' + result.value)
          this.formatMovie(result)
          }
        ));
  }

  formatMovie(movie: any): Result {
    return { value: movie.value, };
  }
}*/

import * as request from 'request'
//import { StringLiteral } from '@babel/types';

export class AppdAPIClient {
  getResponse() {
      /*console.log('Fetch result ' + fetch('http://www.mocky.io/v2/5ed522633300004c00f7a83f').then(
        res => res.json()));
        */
      console.log('Getting results from AppdAPIClient')
      request.get('http://www.mocky.io/v2/5ed66436340000afe106da19', (error: any, body: any, response: any) => {
          console.log('response is ' + response )
          console.log('body is ' + body)          
      })
  }
}
