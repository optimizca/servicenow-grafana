import * as request from 'request'
import { MoogSoftAlert } from './MoogSoftAlert'
import { MoogsoftMetric} from './MoogsoftMetric'
import { MoogSoftIncident } from './MoogsoftIncident'

//import { readFileSync } from 'fs';

export class AppdAPIClient {

  async request() {
    let alerts: MoogSoftAlert[] = [];
    const response = await fetch('https://api.moogsoft.ai/express/v1/alerts?limit=10000', {
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
    const response = await fetch('https://api.moogsoft.ai/express/v1/alerts?limit=10000', {
      method: "GET",
      mode: "cors",
      headers: new Headers({
        'Content-Type': 'application/json',
        'apiKey': 'optimiz_!e949299c-66f5-4cdf-8d24-96b4c791ae69'
      })
    });

    const json = await response.json();
    json.data.result.forEach(function (item) {
      let alert = new MoogSoftAlert(item);
      alerts.push(alert);
    });

    return alerts;
  }

  async getIncidents(): MoogSoftIncident[] {
    let incidents: MoogSoftIncident[] = [];
    const response = await fetch('https://api.moogsoft.ai/express/v1/incidents?limit=10000', {
      method: "GET",
      mode: "cors",
      headers: new Headers({
        'Content-Type': 'application/json',
        'apiKey': 'optimiz_!e949299c-66f5-4cdf-8d24-96b4c791ae69'
      })
    });

    const json = await response.json();
    json.data.result.forEach(function (item) {
      let incident = new MoogSoftIncident(item);
      incidents.push(incident);
    });

    return incidents;
  }

  async getMetrics(): MoogsoftMetric[] {
    console.log("Executing getMetrics......");
    let metrics: MoogsoftMetric[] = [];
    
    /*let alertsData = '{"data":{"total":4,"metric":"EC2:NetworkPacketsOut","lastTimestamp":"null","fully_qualified_moob":"moog:integration:cloudwatch","lastTimeThereWasData":"1594655220000","source":"Inventory:i-0aaff0518b329faa6","uuid":null,"results":[{"tags":{"region":"us-east-2","accountNumber":"396447315589","availabilityZone":"us-east-2b","Name":"Inventory"},"engine":{"sigma":4,"median":48,"lowThreshold":-38.80000000000001,"highSigma":11.799999999999997,"lowSigma":21.700000000000003,"holdfor":1,"vector":0,"learning":true,"highThreshold":95.19999999999999,"stateful":true,"DETECTOR_CLASS":"CAdaptiveDetector"},"data":95.33333333333333,"instance":"cloudwatch-integration::us-east-2-optimizLab","uuid":"cloudwatch-integration::us-east-2-optimizLab","timed_at_ms":1594654320000,"processed":false,"created_at_date":1594654320000},{"tags":{"region":"us-east-2","accountNumber":"396447315589","availabilityZone":"us-east-2b","Name":"Inventory"},"engine":{"sigma":4,"severity":1,"triggered":true,"restore":false,"lowThreshold":-38.300000000000004,"signature":"Inventory:i-0aaff0518b329faa6::moog","highSigma":12.5,"confidence":0.32635522,"description":"Metric EC2:NetworkPacketsOut anomalous value: 271.6","learning":true,"highThreshold":98.1,"median":48.1,"lowSigma":21.6,"holdfor":1,"vector":0,"stateful":true,"DETECTOR_CLASS":"CAdaptiveDetector"},"data":271.6,"instance":"cloudwatch-integration::us-east-2-optimizLab","uuid":"cloudwatch-integration::us-east-2-optimizLab","timed_at_ms":1594654620000,"processed":false,"created_at_date":1594854320000}]},"status":"success"}';
    console.log('File Content : ' + alertsData);
    
    let alertsResult = JSON.parse(alertsData);
    console.log('alertsResult.data : ' + JSON.stringify(alertsResult.data));
    console.log('alertsResult.data.results : ' + alertsResult.data.results);
    
    alertsResult.data.results.forEach(function (item) {
      console.log('MoogsoftMetric item ' + JSON.stringify(item));
      let apiResponse = new MoogsoftMetric(item);
      console.log('MoogsoftMetric is : ' + apiResponse);
      metrics.push(apiResponse);
    });

    */
    //const fileContent = readFileSync('D:\\Optimiz\\GrafanaPlugin\\metrics.txt', 'utf-8');
    /*var fs = require('fs');

    fs.readFile('D:\\Optimiz\\GrafanaPlugin\\metrics.txt', 'utf8', function(err, data) {
      if (err) throw err;
      console.log('File Data' + data);
    });
    //console.log('File Content : ' + fileContent);
    */

    let params = {fully_qualified_moob:'moog:integration:cloudwatch', source:'Inventory:i-0aaff0518b329faa6', metric:'EC2:NetworkPacketsOut'};
    let paramString = `fully_qualified_moob=${encodeURIComponent(params.fully_qualified_moob)}&source=${encodeURIComponent(params.source)}&metric=${encodeURIComponent(params.metric)}`;
    console.log("paramString : " + paramString);
    let apiString = 'https://api.moogsoft.ai/express/v1/collectors/datums?' + paramString;
    console.log("apiString : " + apiString);
    
    const response = await fetch(apiString, {
    //const response = await fetch('https://api.moogsoft.ai/express/v1/collectors/datums' , {  
      method: "GET",
      mode: "cors",
      headers: new Headers({
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'x-requested-with': 'https://localhost:3000',
        'apiKey': 'optimiz_!e949299c-66f5-4cdf-8d24-96b4c791ae69'
      })
    });

    console.log('After invoking get metrics');
    
    const json = await response.json();
    //console.log(json);?
    console.log('metrics json : ' + JSON.stringify(json));
    console.log("json.data : " + JSON.stringify(json.data));
    console.log("json.data.result : " + json.data.results);

    if(json.data.results) {
      json.data.results.forEach(function (item) {
        console.log("item" + item);
        let apiResponse = new MoogsoftMetric(item);
        metrics.push(apiResponse);
      });
    }
    
    /*const json = await response.json();
    console.log('Metrics response ' + JSON.stringify(json));
    console.log('json.data.result ' + JSON.stringify(json));
    //json.data.map(apiResult => console.log('apiResult : ' + apiResult))
    json.data.result.forEach(function (item) {
      console.log('MoogsoftMetric item ' + JSON.stringify(item));
      let apiResponse = new MoogsoftMetric(item);
      console.log('MoogsoftMetric is : ' + apiResponse);
      metrics.push(apiResponse);
    });
    */

    return metrics;
  }

  getResponse() {
    console.log('Getting results from AppdAPIClient')

    console.log("Fetching results!!")
    let alerts: MoogSoftAlert[] = [];
    fetch('https://api.moogsoft.ai/express/v1/alerts?limit=10000', {
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

