import defaults from 'lodash/defaults';

import React, { ChangeEvent, PureComponent } from 'react';
import { LegacyForms, AsyncSelect } from '@grafana/ui';
import { InlineFormLabel } from '@grafana/ui';
import { QueryEditorProps } from '@grafana/data';
import { DataSource } from './DataSource';
import { defaultQuery, PluginDataSourceOptions, PluginQuery } from './types';
import * as utils from './Utils';

const { FormField } = LegacyForms;
const { Select } = LegacyForms;
import { SelectableValue } from '@grafana/data';

type Props = QueryEditorProps<DataSource, PluginQuery, PluginDataSourceOptions>;

let metricsTable: any;
let sourceSelection: any[] = [];

let serviceOptions = [
  {
    label: '',
    value: '',
  },
];

let sourceOptions = [
  {
    label: '',
    value: '',
  },
];
let metricNameOptions: any[] = [];

let metricTypeOptions: any[] = [];

export class QueryEditor extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
  }

  loadCategoryOptions = async () => {
    metricsTable = await this.props.datasource.snowConnection.getMetricsDefinition('', 0, 0, '');
    console.log('Metrics Table');
    console.log(metricsTable);
    metricTypeOptions.push({ label: '*', value: '*' });
    metricNameOptions.push({ label: '*', value: '*' });
    metricsTable.fields.map(fields => {
      if (fields.name === 'metric_tiny_name') {
        fields.values.buffer.map(value => {
          metricNameOptions.push({ label: value, value: value });
        });
      }
      if (fields.name === 'resource_id') {
        fields.values.buffer.map(value => {
          if (value !== '') {
            metricTypeOptions.push({ label: value, value: value });
          }
        });
      }
    });

    return this.props.datasource.snowConnection.getCategoryQueryOption();
  };

  onQueryCategoryChange = async (event: SelectableValue<string>) => {
    const { onChange, query } = this.props;
    serviceOptions = [];
    if (event.value !== undefined) {
      let selectedCategory: string = event['value'].toString();
      let newServices = await this.props.datasource.snowConnection.getServices(selectedCategory);
      newServices.map(ns => serviceOptions.push({ label: ns['text'], value: ns['value'] }));
    }
    onChange({ ...query, selectedQueryCategory: event });
  };

  onServiceListChange = async (event: SelectableValue<string>) => {
    const { onChange, query } = this.props;
    sourceOptions = [
      {
        label: 'Loading',
        value: '',
      },
    ];
    if (event) {
      let selectedValues: string = event.value || '';
      let newSources = await this.props.datasource.snowConnection.getCIs('', selectedValues);
      newSources.map(ns => sourceOptions.push({ label: ns['text'], value: ns['value'] }));
    }
    onChange({ ...query, selectedServiceList: event });
  };
  onSourceListChange = async (event: SelectableValue<string>) => {
    const { onChange, query } = this.props;
    metricNameOptions = [{ label: '*', value: '*' }];
    metricTypeOptions = [{ label: '*', value: '*' }];
    let matchList: number[] = [];
    if (event) {
      let selectedValues = event.map(e => e['value']);
      console.log('Source Value');
      console.log(selectedValues);

      metricsTable.fields.map(field => {
        if (field.name === 'ci') {
          for (let i = 0; i < field.values.buffer.length; i++) {
            if (field.values.buffer[i].includes(selectedValues)) {
              matchList.push(i);
            }
          }
        }
      });
      metricsTable.fields.map(field => {
        if (matchList.length > 0) {
          if (field.name === 'metric_tiny_name') {
            for (let i = 0; i < field.values.buffer.length; i++) {
              if (matchList.includes(i)) {
                metricNameOptions.push({ label: field.values.buffer[i], value: field.values.buffer[i] });
              }
            }
          }
          if (field.name === 'resource_id') {
            for (let i = 0; i < field.values.buffer.length; i++) {
              if (matchList.includes(i)) {
                if (field.values.buffer[i] !== '') {
                  metricTypeOptions.push({ label: field.values.buffer[i], value: field.values.buffer[i] });
                }
              }
            }
          }
        }
      });
      sourceSelection = selectedValues;
    } else {
      metricsTable.fields.map(fields => {
        if (fields.name === 'metric_tiny_name') {
          fields.values.buffer.map(value => {
            metricNameOptions.push({ label: value, value: value });
          });
        }
        if (fields.name === 'resource_id') {
          fields.values.buffer.map(value => {
            if (value !== '') {
              metricTypeOptions.push({ label: value, value: value });
            }
          });
        }
      });
      sourceSelection = [];
    }
    query.source = utils.createRegEx(sourceSelection);
    onChange({ ...query, selectedSourceList: event });
  };
  onMetricTypeListChange = (event: SelectableValue<string>) => {
    const { onChange, query } = this.props;
    let matchList: number[] = [];
    metricNameOptions = [{ label: '*', value: '*' }];
    if (event) {
      let selectedValues = event.map(e => e['value']);
      console.log('Metric Type Selected');
      console.log(selectedValues);
      metricsTable.fields.map(field => {
        if (field.name === 'resource_id') {
          for (let i = 0; i < field.values.buffer.length; i++) {
            if (selectedValues.includes(field.values.buffer[i])) {
              matchList.push(i);
            }
          }
        }
      });
      if (matchList.length > 0) {
        metricsTable.fields.map(field => {
          if (field.name === 'metric_tiny_name') {
            for (let i = 0; i < field.values.buffer.length; i++) {
              if (matchList.includes(i)) {
                metricNameOptions.push({ label: field.values.buffer[i], value: field.values.buffer[i] });
              }
            }
          }
        });
      }
    } else {
      if (sourceSelection) {
        metricsTable.fields.map(field => {
          if (field.name === 'ci') {
            for (let i = 0; i < field.values.buffer.length; i++) {
              if (sourceSelection.includes(field.values.buffer[i])) {
                matchList.push(i);
              }
            }
          }
        });
        metricsTable.fields.map(field => {
          if (field.name === 'metric_tiny_name') {
            for (let i = 0; i < field.values.buffer.length; i++) {
              if (matchList.includes(i)) {
                metricNameOptions.push({ label: field.values.buffer[i], value: field.values.buffer[i] });
              }
            }
          }
          if (field.name === 'resource_id') {
            for (let i = 0; i < field.values.buffer.length; i++) {
              if (matchList.includes(i)) {
                if (field.values.buffer[i] === '') {
                  metricTypeOptions.push({ label: field.values.buffer[i], value: field.values.buffer[i] });
                }
              }
            }
          }
        });
        /*for (let i = 0; i < metricsTable.values.ci.buffer.length; i++) {
          if (metricsTable.values.ci.buffer[i].includes(sourceSelection)) {
            metricNameOptions.push({
              label: metricsTable.values.metric_tiny_name.buffer[i],
              value: metricsTable.values.metric_tiny_name.buffer[i],
            });
            metricTypeOptions.push({
              label: metricsTable.values.resource_id.buffer[i],
              value: metricsTable.values.resource_id.buffer[i],
            });
          }
        }*/
      }
    }
    if (event) {
      query.metricType = event.map(e => e['value']) || '';
    } else {
      query.metricType = '';
    }
    query.metricType = utils.createRegEx(query.metricType);
    onChange({ ...query, selectedMetricTypeList: event });
  };

  onMetricNameListChange = (event: SelectableValue<string>) => {
    const { onChange, query } = this.props;
    if (event) {
      query.metricName = event.map(e => e['value']) || '';
    } else {
      query.metricName = '';
    }
    query.metricName = utils.createRegEx(query.metricName);
    onChange({ ...query, selectedMetricNameList: event });
  };
  onSelectedAdminCategoryList = (event: SelectableValue<string>) => {
    const { onChange, query } = this.props;
    onChange({ ...query, selectedAdminCategoryList: event });
  };
  onAlertStateListChange = (event: SelectableValue<string>) => {
    const { onChange, query } = this.props;
    onChange({ ...query, selectedAlertStateList: event });
  };
  onAlertTypeListChange = (event: SelectableValue<string>) => {
    const { onChange, query } = this.props;
    onChange({ ...query, selectedAlertTypeList: event });
  };

  onServiceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query } = this.props;
    onChange({ ...query, service: event.target.value });
  };
  onSourceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query } = this.props;
    onChange({ ...query, source: event.target.value });
  };
  onMetricTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query } = this.props;
    onChange({ ...query, metricType: event.target.value });
  };
  onMetricNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query } = this.props;
    onChange({ ...query, metricName: event.target.value });
  };
  onSysParamQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query } = this.props;
    onChange({ ...query, sysparam_query: event.target.value });
  };

  options = [
    { label: 'Basic option', value: 0 },
    {
      label: 'Option with description',
      value: 1,
      description: 'this is a description',
    },
    {
      label: 'Option with description and image',
      value: 2,
      description: 'This is a very elaborate description, describing all the wonders in the world.',
      imgUrl: 'https://placekitten.com/40/40',
    },
  ];

  render() {
    const query = defaults(this.props.query, defaultQuery);

    const { selectedQueryCategory } = query;
    const { sysparam_query } = query;

    const { selectedServiceList } = query;
    const { selectedSourceList } = query;
    const { selectedMetricNameList } = query;
    const { selectedMetricTypeList } = query;
    const { selectedAdminCategoryList } = query;
    const { selectedAlertStateList } = query;
    const { selectedAlertTypeList } = query;

    //let queryCategoryOption = this.props.datasource.snowConnection.getCategoryQueryOption();

    let alertStateOptions = this.props.datasource.snowConnection.getAlertStateOptions();
    let alertTypeOptions = this.props.datasource.snowConnection.getAlertTypeOptions();
    let adminCategoryOption = this.props.datasource.snowConnection.getAdminQueryOptions();

    return (
      <>
        <div className="gf-form-inline">
          <div className="gf-form">
            <InlineFormLabel
              className="width-10"
              tooltip="Category for the query such as Metrics, Incidents, Alerts, Geografical alerts"
            >
              Query Category
            </InlineFormLabel>

            <AsyncSelect
              loadOptions={this.loadCategoryOptions}
              defaultOptions
              value={selectedQueryCategory || ''}
              allowCustomValue
              onChange={this.onQueryCategoryChange}
              className={'min-width-10'}
            />
          </div>
        </div>

        <div>
          {selectedQueryCategory.value !== 'Admin' && (
            <div>
              <div className="gf-form-inline">
                <div className="gf-form">
                  <InlineFormLabel className="width-10" tooltip="">
                    Services
                  </InlineFormLabel>
                  <Select
                    options={serviceOptions}
                    value={selectedServiceList || ''}
                    allowCustomValue
                    onChange={this.onServiceListChange}
                    isSearchable={true}
                    isClearable={true}
                    isMulti={false}
                    backspaceRemovesValue={true}
                    className={'min-width-10'}
                  />
                </div>
              </div>
              <div className="gf-form-inline">
                <div className="gf-form">
                  <InlineFormLabel className="width-10" tooltip="">
                    CI Name
                  </InlineFormLabel>
                  <Select
                    options={sourceOptions}
                    value={selectedSourceList || ''}
                    allowCustomValue
                    onChange={this.onSourceListChange}
                    isSearchable={true}
                    isClearable={true}
                    isMulti={true}
                    backspaceRemovesValue={true}
                    className={'min-width-10'}
                  />
                </div>
              </div>
            </div>
          )}
          {selectedQueryCategory.value === 'Metrics' && (
            <div>
              <div className="gf-form-inline">
                <div className="gf-form">
                  <InlineFormLabel className="width-10" tooltip="">
                    Resource ID
                  </InlineFormLabel>
                  <Select
                    options={metricTypeOptions}
                    value={selectedMetricTypeList || ''}
                    allowCustomValue
                    onChange={this.onMetricTypeListChange}
                    isSearchable={true}
                    isClearable={true}
                    isMulti={true}
                    backspaceRemovesValue={true}
                    className={'min-width-10'}
                  />
                </div>
              </div>
              <div>
                <div className="gf-form-inline">
                  <div className="gf-form">
                    <InlineFormLabel className="width-10" tooltip="">
                      Metric Name
                    </InlineFormLabel>
                    <Select
                      options={metricNameOptions}
                      value={selectedMetricNameList || ''}
                      allowCustomValue
                      onChange={this.onMetricNameListChange}
                      isSearchable={true}
                      isClearable={true}
                      isMulti={true}
                      backspaceRemovesValue={true}
                      className={'min-width-10'}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {selectedQueryCategory.value === 'Alerts' && (
            <div>
              <div className="gf-form max-width-21">
                <InlineFormLabel className="width-10" tooltip="">
                  Alert Filter
                </InlineFormLabel>

                <Select
                  options={alertTypeOptions}
                  value={selectedAlertTypeList || ''}
                  onChange={this.onAlertTypeListChange}
                />
                <Select
                  options={alertStateOptions}
                  value={selectedAlertStateList || ''}
                  onChange={this.onAlertStateListChange}
                />
              </div>
            </div>
          )}
          {selectedQueryCategory.value === 'Admin' && (
            <div>
              <div className="gf-form max-width-21">
                <InlineFormLabel className="width-10" tooltip="">
                  Category Option
                </InlineFormLabel>
                <Select
                  options={adminCategoryOption}
                  value={selectedAdminCategoryList || ''}
                  allowCustomValue
                  onChange={this.onSelectedAdminCategoryList}
                />
                <FormField
                  labelWidth={12}
                  value={sysparam_query}
                  onChange={this.onSysParamQueryChange}
                  label="sysparam_query"
                  tooltip="use sysparam query to filter return results example: source=Observability"
                  color="blue"
                />
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}
