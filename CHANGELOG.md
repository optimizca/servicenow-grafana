# Change Log

Breaking changes are distinguised by this symbol: 🔧

## [1.2.2] - In Development

- Bug fix for sysparam query field after Grafana V8.3 update

## [1.2.1] - 2021-11-24

- New Tag Filtering options have been added to Alert queries. These rely on TBAC(Tag Based Alert Clustering Engine) and will search through relevent alert record's additional_info fields for keys with the 'tbac-' prefix and give you options to filter based on these key-value pairs.
- New variables have also been added to allow templating of these tag filters. Find more information on how to set them up on our [Variables Wiki](https://github.com/optimizca/servicenow-grafana/wiki/Variables).
- Updated anomaly metrics query to accept multiple cis, multiple metrics, and you can now use \* as a metric to get all metrics
- Updated topology drilldown links to use sys_id instead of name for more reliable results
- Added new column for queries on the Alerts table. It is called tbac_data and holds json key-value pairs parsed out of the Additional Info field. Additional Info keys must be prefixed with tbac- to be included in new column

## [1.2.0] - 2021-11-16

- Plugin is now signed with a private signature level. Please contact bstill-routley@optimiz.ca if you need your domain added to the signature
- Added a new option in alert and change queries to use the grafana timerange so that only results in the selected time are returned
- Added toggle option to compress log data
- Added a new global variable to get the instance name of your ServiceNow instance
- Fixed bug in table column selection that was introduced in V1.1.5
- Fixed bug in cache related to queries using the grafana timerange
- Dashboards have been sorted in alphabetical order
- Plugin icon updated

## [1.1.5] - 2021-11-05

- Plugin request method updated
- Added simple error messages

## [1.1.4] - 2021-11-03

- Dashboards are now included with the plugin. Provisioning of dashboards has been discontinued.
- The Novatec-SDG-Panel is now included with the plugin
- Default Logo URL has been updated with a new image

## [1.1.3] - 2021-10-29

- Filled some of the datasource config values by default
- Cache timeout is now fully controlled by the user
  - Global cache time is set in the datasource config and defaults to 60s
  - The global cache time can also be overrode in each panel for greater control over your cache

## [1.1.2] - 2021-10-25

- Added ability to fire UI Actions
- Datasource config settings modified (You will see updated instructions inside the datasource) 🔧

## [1.1.1] - 2021-10-21

- Added limit field to generic variable query
- Added global image variable. Set it's value inside the datasource settings

## [1.1.0] - 2021-10-12

- Fixed bug in Sysparam Query field where AND/OR selection had no default 🔧
