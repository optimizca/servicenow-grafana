import defaults from "lodash/defaults";

import React, { ChangeEvent, PureComponent } from "react";
import { LegacyForms } from "@grafana/ui";
import { InlineFormLabel } from "@grafana/ui";
import { QueryEditorProps } from "@grafana/data";
import { DataSource } from "./DataSource";
import { defaultQuery, PluginDataSourceOptions, PluginQuery } from "./types";

const { FormField } = LegacyForms;
const { Select } = LegacyForms;
import { SelectableValue } from "@grafana/data";

type Props = QueryEditorProps<DataSource, PluginQuery, PluginDataSourceOptions>;

export class QueryEditor extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
  }

  onQueryFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query } = this.props;
    onChange({ ...query, queryFilter: event.target.value });
  };

  onServicesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query } = this.props;
    onChange({ ...query, services: event.target.value });
  };

  onMetricTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query } = this.props;
    onChange({ ...query, metricType: event.target.value });
  };

  onMetricNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query } = this.props;
    onChange({ ...query, metricName: event.target.value });
  };

  onMetricSourceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query } = this.props;
    onChange({ ...query, metricSource: event.target.value });
  };

  onQueryCategoryChange = (event: SelectableValue<string>) => {
    const { onChange, query } = this.props;
    onChange({ ...query, selectedQueryCategory: event });
  };

  onAlertCategoryChange = (event: SelectableValue<string>) => {
    const { onChange, query } = this.props;
    onChange({ ...query, alertCategory: event });
  };

  onQueryTypeChange = (event: SelectableValue<string>) => {
    const { onChange, query } = this.props;
    onChange({ ...query, resultCategory: event });
  };

  ontTotalAlertsChange = (event: SelectableValue<string>) => {
    const { onChange, query } = this.props;
    onChange({ ...query, totalAlerts: event });
  };

  onAggregationTypeChange = (event: SelectableValue<string>) => {
    const { onChange, query } = this.props;
    console.log("this.props : " + JSON.stringify(this.props));
    console.log("event : " + JSON.stringify(event));
    onChange({ ...query, aggregationCriteria: event });
  };

  options = [
    { label: "Basic option", value: 0 },
    {
      label: "Option with description",
      value: 1,
      description: "this is a description"
    },
    {
      label: "Option with description and image",
      value: 2,
      description:
        "This is a very elaborate description, describing all the wonders in the world.",
      imgUrl: "https://placekitten.com/40/40"
    }
  ];

  render() {
    const query = defaults(this.props.query, defaultQuery);
    const { queryFilter } = query;
    const { services } = query;
    const { metricType } = query;
    //const { metricName } = query;
    //const { metricSource } = query;
    const { selectedQueryCategory } = query;
    const { resultCategory } = query;
    const { aggregationCriteria } = query;
    const { totalAlerts } = query;

    const queryCategoryOption = [
      {
        label: "Incident",
        value: "Incidents",
        description: "Get incidents information."
      },
      {
        label: "Alerts",
        value: "Alerts",
        description: "Get alerts information."
      },
      {
        label: "Geolocation Alerts",
        value: "Geolocation Alerts",
        description: "Get the alerts information with their geolocations."
      },
      {
        label: "Metrics",
        value: "Metrics",
        description: "Get metrics information."
      }
    ];

    const resultCategoryOption = [
      {
        label: "Aggregate",
        value: "aggregate",
        description: "Get aggregate results by source"
      },
      { label: "List All", value: "all", description: "Get all results." },
      {
        label: "Total",
        value: "total",
        description: "Get total number of results."
      },
      {
        label: "Noise reduction",
        value: "noiseReduction",
        description: "Noise reduction percentage."
      },
      {
        label: "MTTR",
        value: "mttr",
        description: "Get total number of results."
      }
    ];

    const aggregationTypeOption = [
      {
        label: "Status",
        value: "status",
        description: "Aggregate incidents by status."
      },
      {
        label: "Severity",
        value: "severity",
        description: "Aggregate incidents by severity."
      },
      {
        label: "Source",
        value: "source",
        description: "Aggregate alerts by source."
      },
      {
        label: "Class",
        value: "class",
        description: "Aggregate alerts by class."
      },
      {
        label: "Manager",
        value: "manager",
        description: "Aggregate alerts by manager."
      }
    ];

    const totalAlertsOption = [
      { label: "10", value: "10", description: "Top 10 alerts." },
      { label: "All", value: "all", description: "All alerts." }
    ];

    return (
      <>
        <div className="gf-form max-width-21">
          <InlineFormLabel
            className="width-10"
            tooltip="Category for the query such as Metrics, Incidents, Alerts, Geografical alerts"
          >
            Query Category
          </InlineFormLabel>

          <Select
            options={queryCategoryOption}
            value={selectedQueryCategory || ""}
            allowCustomValue
            onChange={this.onQueryCategoryChange}
          />
        </div>

        <div className="gf-form-inline">
          {(selectedQueryCategory.value === queryCategoryOption[0].value ||
            selectedQueryCategory.value === queryCategoryOption[1].value) && (
            <div className="gf-form max-width-30">
              <InlineFormLabel className="width-10" tooltip="Result Type">
                Result Type
              </InlineFormLabel>
              <Select
                options={resultCategoryOption}
                value={resultCategory || ""}
                allowCustomValue
                onChange={this.onQueryTypeChange}
              />

              <InlineFormLabel
                className="width-10"
                tooltip="Incident Aggregation Parameter"
              >
                Aggregation criteria
              </InlineFormLabel>
              <Select
                options={aggregationTypeOption}
                value={aggregationCriteria || ""}
                allowCustomValue
                onChange={this.onAggregationTypeChange}
              />

              <InlineFormLabel
                className="width-10"
                tooltip="Total alerts to display in case of aggregation of alerts"
              >
                Alert count
              </InlineFormLabel>
              <Select
                options={totalAlertsOption}
                value={totalAlerts || ""}
                allowCustomValue
                onChange={this.ontTotalAlertsChange}
              />
            </div>
          )}
        </div>
        <div>
          <div className="gf-form-inline">
            {(selectedQueryCategory.value === queryCategoryOption[0].value ||
              selectedQueryCategory.value === queryCategoryOption[1].value ||
              selectedQueryCategory.value === queryCategoryOption[2].value) && (
              <div className="gf-form max-width-30">
                <FormField
                  labelWidth={8}
                  value={queryFilter || ""}
                  onChange={this.onQueryFilterChange}
                  label="Query Filter"
                  tooltip="Filter for the query"
                />

                <FormField
                  labelWidth={8}
                  value={services || ""}
                  onChange={this.onServicesChange}
                  label="Services"
                  tooltip="Filter for the servies. This option is applicable only when all alerts or incidents are selected"
                />
              </div>
            )}
          </div>
          <div className="gf-form-inline">
            {selectedQueryCategory.value === queryCategoryOption[3].value && (
              <div className="gf-form max-width-30">
                <FormField
                  labelWidth={8}
                  value={metricType}
                  onChange={this.onMetricTypeChange}
                  label="Metric Type"
                  tooltip="Metric Type"
                  color="blue"
                />
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}
