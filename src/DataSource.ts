import { BackendSrv } from "@grafana/runtime";
import defaults from "lodash/defaults";
import { getTemplateSrv } from "@grafana/runtime";
import _ from "lodash";
import {
  DataQueryRequest,
  DataQueryResponse,
  DataSourceApi,
  DataSourceInstanceSettings,
  DataFrame,
  LoadingState
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
      return this.snowConnection.getServices("");
    }

    if (query.namespace === "cis") {
      return this.snowConnection.getCIs("");
    }
    if (query.namespace === "acc_agents") {
      console.log("isnide cis");
    }

    return [];
  }

  query(options: DataQueryRequest<PluginQuery>): Promise<DataQueryResponse> {
    const { range } = options;
    const from = range.from.valueOf();
    const to = range.to.valueOf();
    const promises = _.map(options.targets, t => {
      if (t.hide) {
        return [];
      }
      let target = _.cloneDeep(t);

      const query = defaults(target, defaultQuery);
      let queryType: string = query.selectedQueryCategory.value as string;
      switch (queryType) {
        case "Metrics":
          //add replace target varaibales
          this.snowConnection.getMetrics(target, from, to, options);
          break;

        default:
          return [];
      }
    }); //end of targets iteration

    // Data for panel (all targets)
    return Promise.all(_.flatten(promises))
      .then(_.flatten)
      .then(data => {
        return {
          data,
          state: LoadingState.Done,
          key: options.requestId
        };
      });
  }

  testDatasource() {
    return this.snowConnection.apiClient
      .request({
        url: "/",
        method: "GET"
      })
      .then(response => {
        if (response.status === 200) {
          return {
            status: "success",
            message: "Data source connection is successful",
            title: "Success"
          };
        }
      });
  }
}
