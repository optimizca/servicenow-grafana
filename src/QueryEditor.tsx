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

let metricServiceOptions = [
  {
    label: "*",
    value: "*"
  }
];

let metricSourceOptions = [
  {
    label: "Loading",
    value: ""
  }
];
let metricNameOptions = [
  {
    label: "*",
    value: "*"
  }
];

let metricTypeOptions = [
  {
    label: "*",
    value: "*"
  }
];

export class QueryEditor extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
  }

  onQueryCategoryChange = (event: SelectableValue<string>) => {
    const { onChange, query } = this.props;
    onChange({ ...query, selectedQueryCategory: event });
  };

  onServiceListChange = (event: SelectableValue<string>) => {
    const { onChange, query } = this.props;
    onChange({ ...query, selectedServiceList: event });
  };
  onMetricSourceListChange = (event: SelectableValue<string>) => {
    const { onChange, query } = this.props;
    onChange({ ...query, selectedMetricSourceList: event });
  };
  onMetricTypeListChange = (event: SelectableValue<string>) => {
    const { onChange, query } = this.props;
    onChange({ ...query, selectedMetricTypeList: event });
  };

  onMetricNameListChange = (event: SelectableValue<string>) => {
    const { onChange, query } = this.props;
    onChange({ ...query, selectedMetricNameList: event });
  };

  onServiceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query } = this.props;
    onChange({ ...query, service: event.target.value });
  };
  onMetricSourceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query } = this.props;
    onChange({ ...query, metricSource: event.target.value });
  };
  onMetricTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query } = this.props;
    onChange({ ...query, metricType: event.target.value });
  };
  onMetricNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query } = this.props;
    onChange({ ...query, metricName: event.target.value });
  };
  onQueryFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query } = this.props;
    onChange({ ...query, queryFilter: event.target.value });
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

    const { selectedQueryCategory } = query;

    const { service } = query;
    const { metricSource } = query;
    const { metricType } = query;
    const { metricName } = query;

    const { selectedServiceList } = query;
    const { selectedMetricSourceList } = query;
    const { selectedMetricNameList } = query;
    const { selectedMetricTypeList } = query;

    const queryCategoryOption = [
      {
        label: "Metrics",
        value: "Metrics",
        description: "Get Timeseries metrics"
      },
      {
        label: "Alerts",
        value: "Alerts",
        description: "Get Alert"
      },
      {
        label: "Incidents",
        value: "Incidents",
        description: "Get Incidents"
      },
      {
        label: "Change",
        value: "Change",
        description: "Get Change"
      },
      {
        label: "Topology",
        value: "Topology",
        description: "Get Topology"
      }

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

        <div>
          <div className="gf-form-inline">
            {selectedQueryCategory.value === "Metrics" && (
              <div className="gf-form max-width-30"></div>
            )}
          </div>
          <div className="gf-form max-width-30">
            <InlineFormLabel className="width-10" tooltip="">
              Services
            </InlineFormLabel>
            <Select
              options={metricServiceOptions}
              value={selectedServiceList || ""}
              allowCustomValue
              onChange={this.onServiceListChange}
              isSearchable={true}
              isClearable={true}
              isMulti={true}
              backspaceRemovesValue={true}
            />
            <FormField
              labelWidth={12}
              value={service}
              onChange={this.onServiceChange}
              label="Service RegEx"
              tooltip="Match CI source using regex add your pattern inside /<pattern here>/"
              color="blue"
              placeholder="$service"
            />
          </div>
          <div className="gf-form max-width-30">
            <InlineFormLabel className="width-10" tooltip="">
              Metric Source
            </InlineFormLabel>
            <Select
              options={metricSourceOptions}
              value={selectedMetricSourceList || ""}
              allowCustomValue
              onChange={this.onMetricSourceListChange}
              isSearchable={true}
              isClearable={true}
              isMulti={true}
              backspaceRemovesValue={true}
            />
            <FormField
              labelWidth={12}
              value={metricSource}
              onChange={this.onMetricSourceChange}
              label="Source RegEx"
              tooltip="Match CI source using regex add your pattern inside /<pattern here>/"
              color="blue"
            />
          </div>
          <div className="gf-form max-width-30">
            <InlineFormLabel className="width-10" tooltip="">
              Metric Type
            </InlineFormLabel>
            <Select
              options={metricTypeOptions}
              value={selectedMetricTypeList || ""}
              allowCustomValue
              onChange={this.onMetricTypeListChange}
              isSearchable={true}
              isClearable={true}
              isMulti={true}
              backspaceRemovesValue={true}
            />
            <FormField
              labelWidth={12}
              value={metricType}
              onChange={this.onMetricTypeChange}
              label="Metric Type RegEx"
              tooltip="Match Type using regex add your pattern inside /<pattern here>/"
              color="blue"
            />
          </div>
          <div className="gf-form max-width-30">
            <InlineFormLabel className="width-10" tooltip="">
              Metric Name
            </InlineFormLabel>
            <Select
              options={metricNameOptions}
              value={selectedMetricNameList || ""}
              allowCustomValue
              onChange={this.onMetricNameListChange}
              isSearchable={true}
              isClearable={true}
              isMulti={true}
              backspaceRemovesValue={true}
            />
            <FormField
              labelWidth={12}
              value={metricName}
              onChange={this.onMetricNameChange}
              label="Metric Name RegEx"
              tooltip="Match Name using regex add your pattern inside /<pattern here>/"
              color="blue"
            />
          </div>
        </div>
      </>
    );
  }
}
