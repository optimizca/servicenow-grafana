import defaults from "lodash/defaults";
import Map from "collections/map";

import {
  DataQueryRequest,
  DataQueryResponse,
  DataSourceApi,
  DataSourceInstanceSettings,
  MutableDataFrame,
  FieldType
} from "@grafana/data";

import {
  MoogsoftQuery,
  MoogsoftDataSourceOptions,
  defaultQuery
} from "./types";
import { MoogsoftAPIClient } from "./MoogsoftAPIClient";
import { getTemplateSrv } from "@grafana/runtime";
import { MoogSoftAlert } from "./MoogSoftAlert";
import { MoogSoftIncident } from "./MoogsoftIncident";
import { MoogsoftMetric } from "MoogsoftMetric";

export class DataSource extends DataSourceApi<
  MoogsoftQuery,
  MoogsoftDataSourceOptions
> {
  resolution: number;
  instanceName: string;
  moogApiKey: string;
  corsProxy: string;

  constructor(
    instanceSettings: DataSourceInstanceSettings<MoogsoftDataSourceOptions>
  ) {
    super(instanceSettings);
    console.log("Resolution : " + instanceSettings.jsonData.resolution);
    this.resolution = instanceSettings.jsonData.resolution || 1000.0;
    this.instanceName = instanceSettings.jsonData.instanceName as string;
    this.moogApiKey = instanceSettings.jsonData.moogApiKey as string;
    this.corsProxy = instanceSettings.jsonData.corsProxy as string;
  }

  async query(
    options: DataQueryRequest<MoogsoftQuery>
  ): Promise<DataQueryResponse> {
    const templateSrv = getTemplateSrv();
    const variablesProtected = templateSrv.getVariables();
    const variablesStringfied = JSON.stringify(variablesProtected);
    var variables: any = JSON.parse(variablesStringfied);
    var selectedServices: string[] = variables[0].current.value;
    var selectedServicesOverrideValue = options.targets[0].services;
    //var selectedSource: string[] = variables[0].current.value;
    //var selectedsourceOverrideValue = options.targets[0].services;
    var resultTyepValue = options.targets[0].resultCategory.value;
    var metricTypeValue = options.targets[0].metricType;
    var metricNameValue = options.targets[0].metricName;
    var metricSourceValue = options.targets[0].metricSource;

    if (
      resultTyepValue === "all" &&
      selectedServicesOverrideValue &&
      selectedServicesOverrideValue !== "$selectedServices"
    ) {
      //In case of all alerts or all incidents override the dashboard level service variable value
      selectedServices = selectedServicesOverrideValue.split(",");
    }

    const { range } = options;
    const from = range.from.valueOf();
    const to = range.to.valueOf();
    let alertsFilter = "";
    let incidentFilter = "";

    if (options.targets[0].selectedQueryCategory.value === "Incidents") {
      incidentFilter = options.targets[0].queryFilter;
    } else {
      alertsFilter = options.targets[0].queryFilter;
    }
    console.log("From : " + new Date(from));
    console.log("To   : " + new Date(to));
    console.log("Filter : " + options.targets[0].queryFilter);

    let client = new MoogsoftAPIClient();
    console.log("Before invoking API...");
    console.log("corsProxy : " + this.corsProxy);
    let allAlerts: MoogSoftAlert[] = await client.getAlerts(
      this.corsProxy,
      this.instanceName,
      this.moogApiKey,
      new Date(from),
      new Date(to),
      alertsFilter
    );
    let allIncidents: MoogSoftIncident[] = await client.getIncidents(
      this.corsProxy,
      this.instanceName,
      this.moogApiKey,
      new Date(from),
      new Date(to),
      incidentFilter
    );
    
    //add code here to handle single source
    let metrics = new Map();

    let singleHostMetrics: MoogsoftMetric[] = [];
    var metricSourcesList = metricSourceValue.split(",");

    // get metrics if the input for single host
    if (metricSourcesList.length === 1) {
      singleHostMetrics = await client.getMetricsFromSingleSource(
        this.corsProxy,
        this.instanceName,
        this.moogApiKey,
        new Date(from),
        new Date(to),
        metricTypeValue,
        metricSourcesList[0],
        metricNameValue,
        "minute",
        1000
      );
    } else {
      //this is for multiple source
      metrics = await client.getMetrics(
        this.corsProxy,
        this.instanceName,
        this.moogApiKey,
        new Date(from),
        new Date(to),
        metricTypeValue,
        metricSourceValue,
        metricNameValue,
        "minute",
        1000
      );
    }

    //let metrics: MoogsoftMetric[] = [];

    //filter alerets
    let alerts: MoogSoftAlert[] = [];
    if (!selectedServices.includes("$__all")) {
      alerts = allAlerts.filter(function(alert) {
        alert.services = alert.services.map(service => service.trim());
        return selectedServices.some(
          r => alert.services.indexOf(r.trim()) >= 0
        );
      });
    } else {
      alerts = allAlerts;
    }

    let incidents: MoogSoftIncident[] = [];
    if (!selectedServices.includes("$__all")) {
      incidents = allIncidents.filter(function(incident) {
        incident.services = incident.services.map(service => service.trim());
        return selectedServices.some(
          r => incident.services.indexOf(r.trim()) >= 0
        );
      });
    } else {
      incidents = allIncidents;
    }

    const data = options.targets.map(target => {
      const query = defaults(target, defaultQuery);
      console.log("query : " + JSON.stringify(query));
      const frame = new MutableDataFrame({
        refId: query.refId,
        fields: []
      });

      //let queryType:string = query.queryText;
      let queryType: string = query.selectedQueryCategory.value as string;
      //let alertCategory: string = query.alertCategory.value as string;
      let resultType: string = query.resultCategory.value as string;
      let aggregationType: string = query.aggregationCriteria.value as string;
      let totalAlerts: string = query.totalAlerts.value as string;

      console.log("query in Datasource is : " + JSON.stringify(query));
      console.log("queryType is : " + queryType);
      //console.log("alertCategory is : " + alertCategory);
      console.log("resultType is : " + resultType);
      console.log("aggregationType is : " + aggregationType);
      console.log("totalAlerts is : " + totalAlerts);

      if (queryType === "Alerts" || queryType === "Incidents") {
        //If query type is alert check its subtype it is incident or alerts
        if (queryType === "Incidents") {
          if (resultType === "total") {
            frame.addField({
              name: "Total Incidents",
              type: FieldType.number,
              values: [allIncidents.length]
            });
          } else if (resultType === "aggregate") {
            var occurences = incidents.reduce(function(r, incident) {
              if (aggregationType === "status") {
                r[incident.status] = ++r[incident.status] || 1;
              } else if (aggregationType === "severity") {
                r[incident.severity] = ++r[incident.severity] || 1;
              }
              return r;
            }, {});
            let aggregationResult = Object.keys(occurences).map(function(key) {
              return { key: key, value: occurences[key] };
            });
            console.log(
              "aggregationResult : " + JSON.stringify(aggregationResult)
            );
            aggregationResult.forEach(element => {
              frame.addField({
                name: element.key,
                type: FieldType.number,
                values: [element.value]
              });
            });
          } else if (resultType === "all") {
            //We are listing all incidents as of now instead of aggregating
            let incidentIdList: number[] = [];
            let incidentDescriptionList: string[] = [];
            let incidentSeverityList: string[] = [];
            let incidentCreationTimeList: Date[] = [];
            let incidentStatusList: string[] = [];
            let incidentServiceList: string[] = [];
            let count = 0;

            console.log("Adding values");
            incidents.forEach(incident => {
              incidentIdList.push(incident.id);
              incidentDescriptionList.push(incident.description);
              incidentSeverityList.push(incident.severity);
              var createUtcSeconds = incident.creationTime;
              var creationDate = new Date(0);
              creationDate.setUTCSeconds(createUtcSeconds);
              incidentCreationTimeList.push(creationDate);
              incidentStatusList.push(incident.status);
              //incidentServiceList.push(incident.services);
              count++;
            });

            console.log("Total incidents are : " + count);
            frame.addField({
              name: "Incident ID",
              type: FieldType.number,
              values: incidentIdList
            });
            frame.addField({
              name: "Severity",
              type: FieldType.string,
              values: incidentSeverityList
            });
            frame.addField({
              name: "Creation Time",
              type: FieldType.time,
              values: incidentCreationTimeList
            });
            frame.addField({
              name: "Status",
              type: FieldType.string,
              values: incidentStatusList
            });
            frame.addField({
              name: "Service",
              type: FieldType.string,
              values: incidentServiceList
            });
            frame.addField({
              name: "Description",
              type: FieldType.string,
              values: incidentDescriptionList
            });
          } else if (resultType === "noiseReduction") {
            let reducedNoise = 0;
            let eventCount = 0;
            alerts.forEach(alert => {
              eventCount = eventCount + alert.eventCount;
            });
            reducedNoise = (incidents.length / eventCount) * 100;
            //As we are calculating total incidents generated for the alerts we are doing 100 - reducedNoise
            reducedNoise = 100 - reducedNoise;
            console.log("reducedNoise : " + reducedNoise);
            frame.addField({
              name: "Noise Reduction",
              type: FieldType.number,
              values: [reducedNoise]
            });
          } else if (resultType === "mttr") {
            let totalMttr = 0;
            incidents.forEach(incident => {
              if (incident.closedOn && incident.resolvedOn) {
                totalMttr =
                  totalMttr + (incident.closedOn - incident.resolvedOn);
              }
            });
            console.log("totalMttr : " + totalMttr);
            let meanMttr = totalMttr / incidents.length;
            frame.addField({
              name: "MTTR",
              type: FieldType.number,
              values: [meanMttr]
            });
          }
        } else if (queryType === "Alerts") {
          //Subtype is alerts
          console.log("Adding alerts as result..");
          if (resultType === "aggregate") {
            var occurenceResults = alerts.reduce(function(r, alert) {
              if (aggregationType === "source" && alert.source) {
                r[alert.source] = ++r[alert.source] || 1;
              } else if (aggregationType === "class" && alert.moogsoftClass) {
                r[alert.moogsoftClass] = ++r[alert.moogsoftClass] || 1;
              } else if (aggregationType === "manager" && alert.manager) {
                r[alert.manager] = ++r[alert.manager] || 1;
              }
              return r;
            }, {});
            let alertAggregationResult = Object.keys(occurenceResults).map(
              function(key) {
                return { key: key, value: occurenceResults[key] };
              }
            );
            let map = new Map();
            alertAggregationResult.forEach(element =>
              map.set(element.key, element.value)
            );
            let newMap = new Map(
              [...map].sort(
                (
                  [sourceKey, sourceValue],
                  [destinationKey, destinationValue]
                ) => {
                  if (sourceValue < destinationValue) {
                    return 1;
                  }
                  if (sourceValue > destinationValue) {
                    return -1;
                  }
                  return 0;
                }
              )
            );
            let alertResultcount: number = newMap.length;
            if (totalAlerts === "10") {
              alertResultcount = 10;
            }
            console.log("alertResultcount : " + alertResultcount);
            let count = 0;
            for (const [key, value] of newMap.entries()) {
              if (count < alertResultcount) {
                frame.addField({
                  name: key,
                  type: FieldType.number,
                  values: [value]
                });
                count++;
              }
            }
          } else if (resultType === "total") {
            frame.addField({
              name: "Total Alerts",
              type: FieldType.number,
              values: [allAlerts.length]
            });
          } else {
            let alertIdList: number[] = [];
            let alertDescriptionList: string[] = [];
            let alertSeverityList: string[] = [];
            let alertCreationTimeList: Date[] = [];
            let alertSourceList: string[] = [];
            let alerLastEventTimeList: Date[] = [];
            let alertServiceList: string[] = [];
            let alertStatusList: string[] = [];
            let alertCustomLabelList: string[] = [];

            alerts.forEach(alert => {
              alertIdList.push(alert.id);
              alertDescriptionList.push(alert.description);
              alertSeverityList.push(alert.severity);
              var createUtcSeconds = alert.creationTime;
              var creationDate = new Date(0);
              creationDate.setUTCSeconds(createUtcSeconds);
              alertCreationTimeList.push(creationDate);
              alertSourceList.push(alert.source);
              var lastUtcSeconds = alert.lastEventTime;
              var lastEventDate = new Date(0);
              lastEventDate.setUTCSeconds(lastUtcSeconds);
              alerLastEventTimeList.push(lastEventDate);
              alertServiceList.push(alert.service);
              alertStatusList.push(alert.status);
              alertCustomLabelList.push(alert.customLabel);
            });
            frame.addField({
              name: "Alert ID",
              type: FieldType.number,
              values: alertIdList
            });
            frame.addField({
              name: "Severity",
              type: FieldType.string,
              values: alertSeverityList
            });
            frame.addField({
              name: "Creation Time",
              type: FieldType.time,
              values: alertCreationTimeList
            });
            frame.addField({
              name: "Source",
              type: FieldType.string,
              values: alertSourceList
            });
            frame.addField({
              name: "Last Enent Time",
              type: FieldType.time,
              values: alerLastEventTimeList
            });
            frame.addField({
              name: "Description",
              type: FieldType.string,
              values: alertDescriptionList
            });
            frame.addField({
              name: "Service",
              type: FieldType.string,
              values: alertServiceList
            });
            frame.addField({
              name: "Custom Label",
              type: FieldType.string,
              values: alertCustomLabelList
            });
          }
        }
        return frame;
      } else if (queryType === "Geolocation Alerts") {
        let frame = new MutableDataFrame({
          refId: query.refId,
          fields: [
            { name: "country", type: FieldType.string },
            { name: "latitude", type: FieldType.number },
            { name: "longitude", type: FieldType.number },
            { name: "metric", type: FieldType.number }
          ]
        });
        console.log("Adding location based alerts..");
        alerts.forEach(alert => {
          const found = selectedServices.some(
            r => alert.services.indexOf(r) >= 0
          );
          const allFound = selectedServices.includes("$__all");
          if (
            (found === true || allFound === true) &&
            typeof alert.country !== "undefined"
          ) {
            frame.add({
              country: alert.country,
              latitude: alert.latitude,
              longitude: alert.longitude,
              metric: alert.metric
            });
          }
        });
        return frame;
      } else if (queryType === "Metrics") {
        if (metricSourcesList.length === 1) {
          let singleSourceMetricTimeList: number[] = [];
          let singleSourceMetricMeanList: number[] = [];
          let singleSourceMetriclowThresholdList: number[] = [];
          let singleSourceMetricHighThresholdList: number[] = [];
          singleHostMetrics.forEach(metric => {
            singleSourceMetricTimeList.push(metric.time);
            singleSourceMetricMeanList.push(metric.mean);
            singleSourceMetriclowThresholdList.push(metric.lowThreshold);
            singleSourceMetricHighThresholdList.push(metric.highThreshold);
          });

          let frame = new MutableDataFrame({
            refId: query.refId,
            fields: [
              {
                name: "Time",
                values: singleSourceMetricTimeList,
                type: FieldType.time
              },
              {
                name: "mean",
                values: singleSourceMetricMeanList,
                type: FieldType.number
              },
              {
                name: "lowThreshold",
                values: singleSourceMetriclowThresholdList,
                type: FieldType.number
              },
              {
                name: "highThreshold",
                values: singleSourceMetricHighThresholdList,
                type: FieldType.number
              }
            ]
          });
          return frame;
        } else {
          console.log("Adding Metrics..");
          console.log(metrics);
          //metrics.forEach(metric => {});

          let frame = new MutableDataFrame({
            refId: query.refId,
            fields: []
          });
          //console.log("metric is : " + JSON.stringify(metric));
          //console.log("metric.time : " + metric.time);
          // console.log("metric.mean : " + metric.mean);
          for (let [key, value] of metrics.entries()) {
            let test2Metrics: number[] = value;
            if (key === "metricTime") {
              frame.addField({
                name: "timestamp",
                type: FieldType.time,
                values: test2Metrics //metric.time
              });
            } else {
              frame.addField({
                name: key,
                type: FieldType.number,
                values: test2Metrics
              });
            }
          }

          return frame;
        }
      }
      return frame;
    });
    return { data };
  }

  async testDatasource() {
    //Health check for the data source.
    console.log("Testing datasource");
    return {
      status: "success",
      message: "Successful check"
    };
  }
}
