import * as request from 'request'
//import {AppdAPIResponse} from './AppdAPIResponse'
import { MoogSoftAlert } from './MoogSoftAlert'

export class AppdAPIClient {

  async request() {
    let alerts: MoogSoftAlert[] = [];
    const response = await fetch('https://cors-anywhere.herokuapp.com/https://api.moogsoft.ai/express/v1/alerts?limit=10000', {
      method: "GET",
      mode: "cors",
      headers: new Headers({
        'Content-Type': 'application/json',
        'apiKey': 'optimiz_!e949299c-66f5-4cdf-8d24-96b4c791ae69'
      })
    });

    const json = await response.json();
    //console.log(json);?


    console.log("API result : " + json.data.result)
    json.data.result.forEach(function (item) {
      let apiResponse = new MoogSoftAlert(item);
      alerts.push(apiResponse);
    });

    var occurences = alerts.reduce(function (r, alert) {
      r[alert.source] = ++r[alert.source] || 1;
      return r;
    }, {});

    let sourceResults = Object.keys(occurences).map(function (key) {
      return { key: key, value: occurences[key] };
    });

    console.log('groupByResult : ' + JSON.stringify(sourceResults));
    return sourceResults;
  }

  async getAlerts(): MoogSoftAlert[] {
    let alerts: MoogSoftAlert[] = [];
    const response = await fetch('https://cors-anywhere.herokuapp.com/https://api.moogsoft.ai/express/v1/alerts?limit=10000', {
      method: "GET",
      mode: "cors",
      headers: new Headers({
        'Content-Type': 'application/json',
        'apiKey': 'optimiz_!e949299c-66f5-4cdf-8d24-96b4c791ae69'
      })
    });

    const json = await response.json();
    //console.log(json);


    //console.log(json.data.result)
    //json.data.map(apiResult => console.log('apiResult : ' + apiResult))
    json.data.result.forEach(function (item) {
      //console.log('item ' + JSON.stringify(item));
      let apiResponse = new MoogSoftAlert(item);
      //console.log('MoogsoftAlert is : ' + apiResponse);
      alerts.push(apiResponse);
    });

    return alerts;
  }

  getResponse() {
    console.log('Getting results from AppdAPIClient')

    console.log("Fetching results!!")
    let alerts: MoogSoftAlert[] = [];
    fetch('https://cors-anywhere.herokuapp.com/https://api.moogsoft.ai/express/v1/alerts?limit=10000', {
      method: "GET",
      mode: "cors",
      headers: new Headers({
        'Content-Type': 'application/json',
        'apiKey': 'optimiz_!e949299c-66f5-4cdf-8d24-96b4c791ae69'
      })
    })
      .then(res => res.json())
      .then((json) => {
        console.log("Fetching results..")
        console.log(json.data.result);
        json.data.result.forEach(function (item) {
          console.log('item ' + JSON.stringify(item));
          let apiResponse = new MoogSoftAlert(item);
          console.log('MoogsoftAlert is : ' + apiResponse);
          alerts.push(apiResponse);
        });
        console.log('Alerts : ' + JSON.stringify(alerts));
        var occurences = alerts.reduce(function (r, alert) {
          r[alert.source] = ++r[alert.source] || 1;
          return r;
        }, {});

        var groupByResult = Object.keys(occurences).map(function (key) {
          return { key: key, value: occurences[key] };
        });

        console.log('groupByResult : ' + JSON.stringify(groupByResult));
      })
      .catch(console.log)

    let options: any = {
      headers: {
        'Content-Type': 'application/json',
        'apiKey': 'optimiz_!e949299c-66f5-4cdf-8d24-96b4c791ae69',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST,GET,PUT',
        'Access-Control-Allow-Headers': 'Origin',
        'Access-Control-Allow-Credentials': 'true',
        'origin': 'http://localhost:3000'
      }
    }

    request.get('http://www.mocky.io/v2/5ed66436340000afe106da19', options, (error: any, response: any, body: any) => {
    })
  }
}

