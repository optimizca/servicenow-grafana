import * as request from 'request'
import { MoogSoftAlert } from 'MoogSoftAlert'
import { MoogsoftMetric} from 'MoogsoftMetric'
import { MoogSoftIncident } from 'MoogsoftIncident'

export class MoogsoftAPIClient {

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

  
  getFormattedDate(inputDate:Date) {
    var date = inputDate.getDate();
    var dateString = date < 10 ? '0'+ date : date; //get min in 2 digits like 05
    var month = inputDate.getMonth() + 1;
    var monthString = month < 10 ? '0' + month : '' + month; 
    var year = inputDate.getFullYear();
    var hours = inputDate.getHours();
    var minutes = inputDate.getMinutes();
    var seconds = inputDate.getSeconds();
    
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    var minutesString = minutes < 10 ? '0'+ minutes : minutes; //get min in 2 digits like 05
    var secondsString = seconds < 10 ? '0'+ seconds : seconds; //get seconds in 2 digits like 05
    
    var timeString = hours + ':' + minutesString + ':' + secondsString + ' ' + ampm;
    return year + "/" + monthString + "/" + dateString + ' ' + timeString;
  }

async getAlerts(corsProxy:string, moogsoftInstance:string, moogsoftKey:string, startTime:Date, endTime:Date, filter:string): MoogSoftAlert[] {
    let alerts: MoogSoftAlert[] = [];
    let timeFilter:string = "";

    if (startTime && endTime) {
      timeFilter = "\"creation time\" > " + "\"" + this.getFormattedDate(startTime) + "\"" + " and \"creation time\" < "+ "\"" + this.getFormattedDate(endTime) + "\"" ;
    }
    let query:string =  corsProxy + '/' +  moogsoftInstance + '/express/v1/alerts?limit=10000';
    //add filter if any filtering is specified
      
    var currentTimezone = startTime.getTimezoneOffset();
    currentTimezone = (currentTimezone/60) * -1;
    var gmt = 'GMT';
    if (currentTimezone !== 0) {
      gmt += currentTimezone > 0 ? ' +' : ' ';
      gmt += currentTimezone;
    }
    console.log('Timezone is : ' + gmt);
    //Add parameter like utcOffset=GMT-05:00
    query = query + '&utcOffset=' + gmt;

    if (timeFilter || filter) {
      query = query + "&filter=";
      if(timeFilter) {
        query = query + timeFilter;
      }
      //Specifying multiple filters
      if(filter) {
        query = query + ' AND ' + filter;
      }
    }
    console.log("Alert query : " + query);
    const response = await fetch(query, {
      method: "GET",
      mode: "cors",
      headers: new Headers({
        'Content-Type': 'application/json',
        'apiKey': moogsoftKey
      })
    });

    const json = await response.json();
    json.data.result.forEach(function (item) {
      let alert = new MoogSoftAlert(item);
      alerts.push(alert);
    });
    console.log('Returning alerts data');
    return alerts;
  }

  async getIncidents(corsProxy:string, moogsoftInstance:string, moogsoftKey:string, startTime:Date, endTime:Date, filter:string): MoogSoftIncident[] {
    let incidents: MoogSoftIncident[] = [];
    let timeFilter:string = "";
    
    if (startTime && endTime) {
      timeFilter = "\"creation time\" > " + "\"" + this.getFormattedDate(startTime) + "\"" + " and \"creation time\" < "+ "\"" + this.getFormattedDate(endTime) + "\"" ;
    }
    let query:string = corsProxy + '/' + moogsoftInstance + '/express/v1/incidents?limit=10000';
    var currentTimezone = startTime.getTimezoneOffset();
    currentTimezone = (currentTimezone/60) * -1;
    var gmt = 'GMT';
    if (currentTimezone !== 0) {
      gmt += currentTimezone > 0 ? ' +' : ' ';
      gmt += currentTimezone;
    }
    console.log('Timezone is : ' + gmt);
    //Add parameter like utcOffset=GMT-05:00
    query = query + '&utcOffset=' + gmt;

    //add filter if any filtering is specified
    if (timeFilter || filter) {
      query = query + "&filter=";
      if(timeFilter) {
        query = query + timeFilter;
      }
      //Specifying multiple filters
      if(filter) {
        query = query + ' AND ' + filter;
      }
    }
    console.log("Incident query : " + query);

    const response = await fetch(query, {
      method: "GET",
      mode: "cors",
      headers: new Headers({
        'Content-Type': 'application/json',
        'apiKey': moogsoftKey
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
    let params = {fully_qualified_moob:'moog:integration:cloudwatch', source:'Inventory:i-0aaff0518b329faa6', metric:'EC2:NetworkPacketsOut'};
    let paramString = `fully_qualified_moob=${encodeURIComponent(params.fully_qualified_moob)}&source=${encodeURIComponent(params.source)}&metric=${encodeURIComponent(params.metric)}`;
    console.log("paramString : " + paramString);
    let apiString = 'https://cors-anywhere.herokuapp.com/https://api.moogsoft.ai/express/v1/collectors/datums?' + paramString;
    console.log("apiString : " + apiString);
    
    const response = await fetch(apiString, {
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
    return metrics;
  }

  getResponse() {
    console.log('Getting results from MoogsoftAPIClient')

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

