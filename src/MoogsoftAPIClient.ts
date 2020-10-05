//import * as request from "request";
import { MoogSoftAlert } from "MoogSoftAlert";
import { MoogsoftMetric } from "MoogsoftMetric";
import { MoogSoftIncident } from "MoogsoftIncident";
import { convertMsTimeToMin } from "Utils";

export class MoogsoftAPIClient {
  /*async request() {
    let alerts: MoogSoftAlert[] = [];
    const response = await fetch(
      "https://cors-anywhere.herokuapp.com/https://api.moogsoft.ai/express/v1/alerts?limit=10000",
      {
        method: "GET",
        mode: "cors",
        headers: new Headers({
          "Content-Type": "application/json",
          apiKey: "optimiz_!e949299c-66f5-4cdf-8d24-96b4c791ae69"
        })
      }
    );

    const json = await response.json();
    //console.log(json);?

    console.log("API result : " + json.data.result);
    json.data.result.forEach(function(item) {
      let apiResponse = new MoogSoftAlert(item);
      alerts.push(apiResponse);
    });

    var occurences = alerts.reduce(function(r, alert) {
      r[alert.source] = ++r[alert.source] || 1;
      return r;
    }, {});

    let sourceResults = Object.keys(occurences).map(function(key) {
      return { key: key, value: occurences[key] };
    });

    console.log("groupByResult : " + JSON.stringify(sourceResults));
    return sourceResults;
  }*/

  getFormattedDate(inputDate: Date) {
    var date = inputDate.getDate();
    var dateString = date < 10 ? "0" + date : date; //get min in 2 digits like 05
    var month = inputDate.getMonth() + 1;
    var monthString = month < 10 ? "0" + month : "" + month;
    var year = inputDate.getFullYear();
    var hours = inputDate.getHours();
    var minutes = inputDate.getMinutes();
    var seconds = inputDate.getSeconds();

    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    var minutesString = minutes < 10 ? "0" + minutes : minutes; //get min in 2 digits like 05
    var secondsString = seconds < 10 ? "0" + seconds : seconds; //get seconds in 2 digits like 05

    var timeString =
      hours + ":" + minutesString + ":" + secondsString + " " + ampm;
    return year + "/" + monthString + "/" + dateString + " " + timeString;
  }

  async getAlerts(
    corsProxy: string,
    moogsoftInstance: string,
    moogsoftKey: string,
    startTime: Date,
    endTime: Date,
    filter: string
  ): MoogSoftAlert[] {
    let alerts: MoogSoftAlert[] = [];
    let timeFilter = "";

    if (startTime && endTime) {
      timeFilter =
        '"creation time" > ' +
        '"' +
        this.getFormattedDate(startTime) +
        '"' +
        ' and "creation time" < ' +
        '"' +
        this.getFormattedDate(endTime) +
        '"';
    }
    let query: string =
      corsProxy + "/" + moogsoftInstance + "/express/v1/alerts?limit=1000";
    //add filter if any filtering is specified

    var currentTimezone = startTime.getTimezoneOffset();
    currentTimezone = (currentTimezone / 60) * -1;
    var gmt = "GMT";
    if (currentTimezone !== 0) {
      gmt += currentTimezone > 0 ? " +" : "";
      gmt += currentTimezone;
    }
    console.log("Timezone is : " + gmt);
    //Add parameter like utcOffset=GMT-05:00
    query = query + "&utcOffset=" + gmt;

    if (timeFilter || filter) {
      query = query + "&filter=";
      if (timeFilter) {
        query = query + timeFilter;
      }
      //Specifying multiple filters
      if (filter) {
        query = query + " AND " + filter;
      }
    }
    console.log("Alert query : " + query);
    const response = await fetch(query, {
      method: "GET",
      mode: "cors",
      headers: new Headers({
        "Content-Type": "application/json",
        apiKey: moogsoftKey
      })
    });

    const json = await response.json();
    json.data.result.forEach(function(item) {
      let alert = new MoogSoftAlert(item);
      alerts.push(alert);
    });
    console.log("Returning alerts data");
    return alerts;
  }

  async getIncidents(
    corsProxy: string,
    moogsoftInstance: string,
    moogsoftKey: string,
    startTime: Date,
    endTime: Date,
    filter: string
  ): MoogSoftIncident[] {
    let incidents: MoogSoftIncident[] = [];
    let timeFilter = "";

    if (startTime && endTime) {
      timeFilter =
        '"creation time" > ' +
        '"' +
        this.getFormattedDate(startTime) +
        '"' +
        ' and "creation time" < ' +
        '"' +
        this.getFormattedDate(endTime) +
        '"';
    }
    let query: string =
      corsProxy + "/" + moogsoftInstance + "/express/v1/incidents?limit=1000";
    var currentTimezone = startTime.getTimezoneOffset();
    currentTimezone = (currentTimezone / 60) * -1;
    var gmt = "GMT";
    if (currentTimezone !== 0) {
      gmt += currentTimezone > 0 ? " +" : "";
      gmt += currentTimezone;
    }
    console.log("Timezone is : " + gmt);
    //Add parameter like utcOffset=GMT-05:00
    query = query + "&utcOffset=" + gmt;

    //add filter if any filtering is specified
    if (timeFilter || filter) {
      query = query + "&filter=";
      if (timeFilter) {
        query = query + timeFilter;
      }
      //Specifying multiple filters
      if (filter) {
        query = query + " AND " + filter;
      }
    }
    console.log("Incident query : " + query);

    const response = await fetch(query, {
      method: "GET",
      mode: "cors",
      headers: new Headers({
        "Content-Type": "application/json",
        apiKey: moogsoftKey
      })
    });

    const json = await response.json();
    json.data.result.forEach(function(item) {
      let incident = new MoogSoftIncident(item);
      incidents.push(incident);
    });

    return incidents;
  }

  async getMetricsFromSingleSource(
    corsProxy: string,
    moogsoftInstance: string,
    moogsoftKey: string,
    startTime: Date,
    endTime: Date,
    metricType: string,
    sourceName: string,
    metricName: string,
    metricGranularity: string,
    metriclimit: number
  ): MoogsoftMetric[] {
    let metrics: MoogsoftMetric[] = [];
    let requestedURL = this.buildMetricQueryURL(
      corsProxy,
      moogsoftInstance,
      metricType,
      sourceName,
      metricName,
      startTime,
      endTime,
      metricGranularity,
      metriclimit
    );
    //console.log("my sourceName=" + sourceName);
    metrics = await this.getMetricsBySource(requestedURL, moogsoftKey);
    console.log("my inside single source code ");
    return metrics;
  }

  async getMetrics(
    corsProxy: string,
    moogsoftInstance: string,
    moogsoftKey: string,
    startTime: Date,
    endTime: Date,
    metricType: string,
    metricSourcePattern: string,
    metricName: string,
    metricGranularity: string,
    metriclimit: number
  ) {
    //calciulate how many timeseries points in minutes we will have
    let startTimeMinute = convertMsTimeToMin(startTime); //Math.round(startTime.getTime() / (1000 * 60));
    let endTimeMinute = convertMsTimeToMin(endTime); //convertMsTimeToMin(startTime); Math.round(endTime.getTime() / (1000 * 60));
    let numPoints = endTimeMinute - startTimeMinute;
    console.log("my num points= " + numPoints);
    var metricSourcesList = metricSourcePattern.split(",");

    let sourceName = "";
    let metricArray: number[] = [];

    let listSource = new Map();
    let metrics: MoogsoftMetric[] = [];

    for (let i = 0; i < numPoints; i++) {
      metricArray[i] = (startTimeMinute + i) * 1000 * 60;
    }

    listSource.set("metricTime", [...metricArray]);
    for (let i = 0; i < metricSourcesList.length; i++) {
      sourceName = metricSourcesList[i];
      let requestedURL = this.buildMetricQueryURL(
        corsProxy,
        moogsoftInstance,
        metricType,
        sourceName,
        metricName,
        startTime,
        endTime,
        metricGranularity,
        metriclimit
      );

      //console.log("my sourceName=" + sourceName);
      metrics = await this.getMetricsBySource(requestedURL, moogsoftKey);

      metricArray.fill(0);
      metrics.forEach(metric => {
        let metricTimeMinute = Math.round(metric.time / (1000 * 60));
        let metricTimeIndex = metricTimeMinute - startTimeMinute;
        if (metricTimeIndex >= 0 && metricTimeIndex < numPoints) {
          metricArray[metricTimeIndex] = metric.mean;
        }
      });
      listSource.set(sourceName, [...metricArray]);
    }
    return listSource;
  }

  buildMetricQueryURL(
    corsProxy,
    moogsoftInstance,
    metricType,
    metricSource,
    metricName,
    startTime,
    endTime,
    granularity,
    limit
  ) {
    //limit = 1;
    let requestURL = corsProxy + "/" + moogsoftInstance + "/express/v1/datums?";
    //corsProxy + "/" + moogsoftInstance + "/express/v1/rollups?";

    let query = requestURL;
    let timeFilter = "";
    if (startTime && endTime) {
      timeFilter =
        "&start_time=" +
        Math.round(startTime.getTime()) +
        "&end_time=" +
        Math.round(endTime.getTime());
    }

    let filter =
      "&fully_qualified_moob=" +
      metricType +
      "&metric=" +
      metricName +
      "&source=" +
      metricSource +
      timeFilter +
      "&limit=" +
      limit; //+
    //"&granularity=" +
    //granularity;
    query = query + "" + filter;
    // console.log("metric query : " + query);
    return query;
  }

  //get metrics by source
  async getMetricsBySource(requestURL, apiKey): MoogsoftMetric[] {
    let metrics: MoogsoftMetric[] = [];
    const response = await fetch(requestURL, {
      method: "GET",
      mode: "cors",
      headers: new Headers({
        "Content-Type": "application/json",
        apiKey: apiKey
      })
    });

    const json = await response.json();
    console.log("metrics json : " + JSON.stringify(json));
    console.log("json.data : " + JSON.stringify(json.data));
    console.log("json.data.result : " + json.data.results);

    if (json.data.results) {
      json.data.results.forEach(function(item) {
        console.log("item" + item);
        let apiResponse = new MoogsoftMetric(
          item,
          json.data.source,
          json.data.metric
        );
        metrics.push(apiResponse);
      });
    }
    //console.log("my metrics inside" + metrics[0].sourceName);
    return metrics;
  }

  /*getResponse() {
    console.log("Getting results from MoogsoftAPIClient");

    console.log("Fetching results!!");
    let alerts: MoogSoftAlert[] = [];
    fetch(
      "https://cors-anywhere.herokuapp.com/https://api.moogsoft.ai/express/v1/alerts?limit=10000",
      {
        method: "GET",
        mode: "cors",
        headers: new Headers({
          "Content-Type": "application/json",
          apiKey: "optimiz_!e949299c-66f5-4cdf-8d24-96b4c791ae69"
        })
      }
    )
      .then(res => res.json())
      .then(json => {
        console.log("Fetching results..");
        console.log(json.data.result);
        json.data.result.forEach(function(item) {
          console.log("item " + JSON.stringify(item));
          let apiResponse = new MoogSoftAlert(item);
          console.log("MoogsoftAlert is : " + apiResponse);
          alerts.push(apiResponse);
        });
        console.log("Alerts : " + JSON.stringify(alerts));
        var occurences = alerts.reduce(function(r, alert) {
          r[alert.source] = ++r[alert.source] || 1;
          return r;
        }, {});

        var groupByResult = Object.keys(occurences).map(function(key) {
          return { key: key, value: occurences[key] };
        });

        console.log("groupByResult : " + JSON.stringify(groupByResult));
      })
      .catch(console.log);

    let options: any = {
      headers: {
        "Content-Type": "application/json",
        apiKey: "optimiz_!e949299c-66f5-4cdf-8d24-96b4c791ae69",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST,GET,PUT",
        "Access-Control-Allow-Headers": "Origin",
        "Access-Control-Allow-Credentials": "true",
        origin: "http://localhost:3000"
      }
    };

    request.get(
      "http://www.mocky.io/v2/5ed66436340000afe106da19",
      options,
      (error: any, response: any, body: any) => {}
    );
  }*/
}
