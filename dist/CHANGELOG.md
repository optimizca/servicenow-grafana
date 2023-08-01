# Change Log

Breaking changes are distinguished by this symbol: 🔧

## 1.6.4 (2023-08-01)
- Updated Generic, Nested CIs & Classes Sysparam Query with the same functionality as the BasicSysparmContainer Components.
- Updated Query Categories that uses InputSysparam with the same functionality and logic as BasicSysparmContainer components.
- Several fixes and updates to the parseBasicSysparm function.
- Removed removeFiltersWithAll as it is no longer needed.

## 1.6.3 (2023-07-19)

- Added NULL as part of the Grafana Variables options.
- Updated Topology label in Query Category to "Topology (Deprecated)".
- Updated Basic Sysparam Query to implement a new "item query" based on the original operator (IN, LIKE/IS NOT, NOT LIKE) whenever making a query with variables that includes 'NULL'.

## 1.6.2 (2023-02-25)

- Made it so that the function mapResponseToVariable returns a default option thats name is "All" and value is "*"

## 1.6.1 (2023-02-25)

- Updated table query to return Date/Time type fields as epoch time so that they work with annotations
- Fixed change annotations in all dashboards which contain them

## 1.6.0 (2023-02-21)

- Several fixes to the options presented in select box components found in the query editor
- Bug fix on anomaly metrics being interpreted as string instead of number
- Added support for variables in the Node Graph query category
- Added description for operator values in sysparm filter
- Added v2 variables for nested data (cis & classes) that will match the new Node Graph query category
- Updated the default Logo URL to represent the latest ServiceNow icon
- Removed tagKey and tagValue variables as they are outdated and will no longer work correctly. Once Tag Normalization becomes GA we will work to add functionality that replaces this. 🔧
- All dashboards have been updated to remove the custom CSS panel, replace the old topology panel with the new node graph panel, and other general updates.

## 1.5.4 (2023-01-09)

- Updated the filter/sysparm component in the query editor to provide more choices to the user.
  This should be backwards compatible with your previously configured dashboards, but please let us know if you encounter issues.
- Updated the Timerange selection component in the query editor to only include columns which are the Date/Time type

## 1.5.3 (2022-12-22)

- Fixed a few new bugs related to table column selection in the query editor inputs introduced in v1.5.1.
- Fixed impact ratings for topology and node graph queries
- Added default colors for impact in the node graph query
- Added default drilldown link for each node in the Node Graph which leads to the Generic CI 360 Degree View dashboard.
  Currently this can not be changed by the user, but we may add support for this in the future.

## 1.5.2 (2022-12-21)

- Added new query category called Node Graph. This query is used to show ci relationships similar to topology,
  but it supports the new node graph panel from grafana instead of our forked version of the novatec-sdg-panel.

## 1.5.1 (2022-12-07)

- Fixed broken options in several query editor inputs
- Updated anomaly metric parsing to match new api response format
- Hid the cache timeout field as the caching was removed in v1.5.0

## 1.5.0 (2022-12-06)

- This update will now require Grafana v9.2.0 as a minimum 🔧
- The ServiceNow Application has been updated to a scoped application. [See repo here](https://github.com/R2DToo/ITOM-Grafana-Plugin) 🔧
  Check the README for instructions on how to install the new scoped application in your ServiceNow instance.
  This also means the default API Path in the datasource configuration has been updated to /api/x_opti8_itom_grafa/grafana_api
- Updated the default Logo URL in the datasource configuration to https://www.servicenow.com/favicon.ico
- Increased the width for many of the query editor inputs
- Fixed display values for query editor select inputs
- Removed the Changes query category. Use the Table query category as a replacement 🔧
- Removed the Live Agent Data query category since it was a placeholder which wasn't used 🔧
- Fixed Grafana Timerange query editor input when using the Alert query category
- Replaced deprecated datasource request method
- Removed custom caching method
- Code refactoring of components and query editor
- Updated the visible name of the plugin to Optimiz-ServiceNow Plugin

## 1.4.1 (2022-01-28)

- Updated topology panel on-click summary to show name of impact severity rather than the number
- Minor styling tweaks to the topology panel

## 1.4.0 (2022-01-21)

- Updated query error handling which will give more user-friendly error messages
- Updated Aggregate Function column component into select box 🔧
- Fixed missing refId's for data frames. Filtering based on query should now work across the entire plugin.
- Removed trend period of Hour. Can still be set to 60 Minutes if you need 🔧
- Added INSTANCEOF to the list of sysparam operators
- Added sortBy options to Alert and Change Query Categories
- Updated sortBy component in query editor
- Added table column types to select options
- Fixed a ton of internal errors related to clearing select components in the query editor
- Updated Service Dependency Graph (Topology) Panel to enable user to choose wether alerts or impact severity will be used to color nodes
- Filters have been added to Service Dependency Graph (Topology) Panel. They allow you to filter out certain impact levels, or nodes where alerts are present.
- Added unified css theme to all of our dashboards. Big thanks to the [Boom Theme Panel](https://grafana.com/grafana/plugins/yesoreyeram-boomtheme-panel/) created by [Sriram](https://github.com/yesoreyeram) for making this possible.

## 1.3.4 (2021-12-29)

- Minor bug fix for Alert category Tag Keys/Values component when parsing records without tbac values in their additional info
- Bug fix for Alert query category ci field was not being used correctly in query
- Removed the OS option from Alert Type Filter component in Alert category
- Added default values for limit and page components in the query editor
- More bug fixes for the caching system

## 1.3.3 (2021-12-28)

- Bug fix to the caching system. Fixes issues with multiple similar panels all resolving to final panels result.

## 1.3.2 (2021-12-27)

- Updated the Grafana Time range component in query editor. Will now give you the option to choose which column is used in the filter.
- Added Grafana Time range component into Aggregate, Table, and Row Count query categories.

## 1.3.1 (2021-12-23)

- Bug fixed in groupBy component where removing the selected value would cause errors
- Bug fixed in table column component where custom values would not display in the component
- Added groupBy component to the Trend query category
- Updated trendBy column selection component in query editor

## 1.3.0 (2021-12-14)

- Changed the plugin id and name to follow latest Grafana naming convention 🔧
  - All users will need to re-add this datasource and all dashboards will need to be re-imported as well.
- Removed outdated Agents Query Category 🔧
- Added option to specify Ascending or Descending sort
- Updated Table Columns selection component in the query editor
- Updated Group By component in the query editor to use select box instead of basic text input
- Updated Sysparam Query column selection component in the query editor

## 1.2.3 (2021-12-10)

- Removed outdated Admin and CI Summary Query Categories 🔧
- Sorted Query Categories list

## 1.2.2 (2021-12-08)

- Bug fix for sysparam query field after Grafana V8.3 update
- Added new feature for variable and sysparam query interaction. If you set the All Value for a variable to \* then use it in a sysparam query, that one query will be removed from the request. This allows you to return fields with a NULL/empty value when setting the variable to All.

## 1.2.1 (2021-11-24)

- New Tag Filtering options have been added to Alert queries. These rely on TBAC(Tag Based Alert Clustering Engine) and will search through relevant alert record's additional_info fields for keys with the 'tbac-' prefix and give you options to filter based on these key-value pairs.
- New variables have also been added to allow templating of these tag filters. Find more information on how to set them up on our [Variables Wiki](https://github.com/optimizca/servicenow-grafana/wiki/Variables).
- Updated anomaly metrics query to accept multiple cis, multiple metrics, and you can now use \* as a metric to get all metrics
- Updated topology drilldown links to use sys_id instead of name for more reliable results
- Added new column for queries on the Alerts table. It is called tbac_data and holds json key-value pairs parsed out of the Additional Info field. Additional Info keys must be prefixed with tbac- to be included in new column

## 1.2.0 (2021-11-16)

- Plugin is now signed with a private signature level. Please contact bstill-routley@optimiz.ca if you need your domain added to the signature
- Added a new option in alert and change queries to use the grafana time range so that only results in the selected time are returned
- Added toggle option to compress log data
- Added a new global variable to get the instance name of your ServiceNow instance
- Fixed bug in table column selection that was introduced in V1.1.5
- Fixed bug in cache related to queries using the grafana time range
- Dashboards have been sorted in alphabetical order
- Plugin icon updated

## 1.1.5 (2021-11-05)

- Plugin request method updated
- Added simple error messages

## 1.1.4 (2021-11-03)

- Dashboards are now included with the plugin. Provisioning of dashboards has been discontinued.
- The Novatec-SDG-Panel is now included with the plugin
- Default Logo URL has been updated with a new image

## 1.1.3 (2021-10-29)

- Filled some of the datasource config values by default
- Cache timeout is now fully controlled by the user
  - Global cache time is set in the datasource config and defaults to 60s
  - The global cache time can also be overrode in each panel for greater control over your cache

## 1.1.2 (2021-10-25)

- Added ability to fire UI Actions
- Datasource config settings modified (You will see updated instructions inside the datasource) 🔧

## 1.1.1 (2021-10-21)

- Added limit field to generic variable query
- Added global image variable. Set it's value inside the datasource settings

## 1.1.0 (2021-10-12)

- Fixed bug in Sysparam Query field where AND/OR selection had no default 🔧
