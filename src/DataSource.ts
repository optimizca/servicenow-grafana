import { BackendSrv } from "@grafana/runtime";
import defaults from "lodash/defaults";
import { getTemplateSrv } from "@grafana/runtime";

import {
  DataQueryRequest,
  DataQueryResponse,
  DataSourceApi,
  DataSourceInstanceSettings,
  DataFrame
} from "@grafana/data";

import {
  PluginQuery,
  PluginDataSourceOptions,
  CustomVariableQuery,
  defaultQuery
} from "./types";
import { SNOWManager } from "SNOWManager";

export class DataSource extends DataSourceApi<
  PluginQuery,
  PluginDataSourceOptions
> {
  snowConnection: SNOWManager;

  constructor(instanceSettings, $q, backendSrv, templateSrv) {
    super(instanceSettings);
    const connectionOptions = {
      type: instanceSettings.type,
      url: instanceSettings.url,
      name: instanceSettings.name,
      basicAuth: instanceSettings.basicAuth,
      withCredentials: instanceSettings.withCredentials
    };
    this.snowConnection = new SNOWManager(connectionOptions);
  }

  async metricFindQuery(query: CustomVariableQuery, options?: any) {
    console.log("inside template variables metricFindQuery");

    if (query.namespace === "services") {
      console.log("isnide services");
    }

    if (query.namespace === "cis") {
      return this.snowConnection.getCIs("");
      console.log("isnide cis");
    }
    if (query.namespace === "acc_agents") {
      console.log("isnide cis");
    }

    //let values = ["test", "test2"];
    return [];
  }

  async query(
    options: DataQueryRequest<PluginQuery>
  ): Promise<DataQueryResponse> {
    // Return a constant for each query.
    const data = await Promise.all(
      options.targets.map(async target => {
        const query = defaults(target, defaultQuery);
        let queryType: string = query.selectedQueryCategory.value as string;
        console.log("queryType : " + queryType);
        console.log("Selected value for query variable : " + target.services);
        //e.g. if the query variable is server and the value in the query editor is like $server
        //then it will be replaced at runtime by the actual value of the variable selected in
        //the dropdown
        const replacedValue = getTemplateSrv().replace(
          target.services,
          options.scopedVars
        );
        console.log("replacedValue for query variable : " + replacedValue);

        let queryResults: DataFrame;
        //Here we will get and return results based on the query type e.g. Alerts, Events etc
        switch (queryType) {
          case "Alerts":
            /*queryResults = await this.snowConnection.getAPIResults('cpu_loadavgsec',
            '{\"targets\":[{\"target\":\"EC2AMAZ-8AMDGC0\"}]}');*/
            break;
        }

        return queryResults;
      })
    );
    return { data };
  }

  async testDatasource() {
    //TODO: Implement a health check for the data source here.
    return {
      status: "success",
      message: "Success"
    };
  }
}
