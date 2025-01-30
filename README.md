# ServiceNow Grafana Data Source Plugin

![Company Logos](https://github.com/optimizca/servicenow-grafana/raw/main/readme_images/company_logos.png)

This ServiceNow Grafana Datasource Plugin enables communication between Grafana and ServiceNow to pull in all kinds of data from your instance. This plugin can query ANY table (even database views), perform aggregate or trend queries on ANY table, time-series metrics from the metricBase, display the Service Dependency Map, and many more features. [www.servicenow.com](https://www.servicenow.com)

![GitHub package.json version](https://img.shields.io/github/package-json/v/optimizca/servicenow-grafana)
[![Build](https://github.com/optimizca/servicenow-grafana/actions/workflows/ci.yml/badge.svg)](https://github.com/optimizca/servicenow-grafana/actions/workflows/ci.yml)
![Grafana Signature Level](https://img.shields.io/badge/Signature_Level-Not_Signed-red?logo=grafana)
![Grafana Minimum Version](https://img.shields.io/badge/Minimum_Version-v9.2.x-red?logo=grafana)
![GitHub last commit](https://img.shields.io/github/last-commit/optimizca/servicenow-grafana)
![GitHub all releases](https://img.shields.io/github/downloads/optimizca/servicenow-grafana/total)

## Temporary workaround for ServiceNow Application Store Release v1.8.0

Error message `com.glide.script.fencing.access.ScopeAccessNotGrantedException: read access to TABLE_NAME not granted`

If you are encountering the error message above, please follow these steps as a temporary workaround to be applied for each TABLE_NAME.

1. Change your scope to ITOM Grafana Plugin
2. In the Application Navigator, enter sys_scope_privilege.LIST to go to the Cross Scope Privilege table.
3. Create a new record with the fields as shown below:
   1. Source Scope: ITOM Grafana Plugin
   2. Target Scope: Global
   3. Target Name: Enter the TABLE_NAME from the error message
   4. Target Type: Table
   5. Application: ITOM Grafana Plugin
   6. Operation: Read
   7. Status: Allowed

## Updating from version <= 1.7.4 to version >= 1.8.0

If you have previously installed a version of the ITOM Grafana Plugin into ServiceNow prior to the release of version 1.8.0 we kindly ask that you replace it with the latest official release from the ServiceNow Store. Instructions can be found starting here [Step 1: Install the ITOM Grafana Plugin into your ServiceNow instance](#step-1-install-the-itom-grafana-plugin-into-your-servicenow-instance)

## Supported ServiceNow Releases

- Washington
- Vancouver
- Utah
- Tokyo
- San Diego
- Rome

## Gallery

Check out the new [Gallery Here](https://github.com/optimizca/servicenow-grafana/wiki/Gallery) to see some screenshots from our plugin in action

## Table of Content

- [ServiceNow Grafana Data Source Plugin](#servicenow-grafana-data-source-plugin)
  - [Temporary workaround for ServiceNow Application Store Release v1.8.0](#temporary-workaround-for-servicenow-application-store-release-v180)
  - [Updating from version \<= 1.7.4 to version \>= 1.8.0](#updating-from-version--174-to-version--180)
  - [Supported ServiceNow Releases](#supported-servicenow-releases)
  - [Gallery](#gallery)
  - [Table of Content](#table-of-content)
  - [Setup Instructions](#setup-instructions)
    - [Step 1: Install the ITOM Grafana Plugin into your ServiceNow instance](#step-1-install-the-itom-grafana-plugin-into-your-servicenow-instance)
    - [Step 2: Configure the Allowed Tables List in ServiceNow](#step-2-configure-the-allowed-tables-list-in-servicenow)
    - [Step 3: Create an Integration User in ServiceNow for Grafana to connect with](#step-3-create-an-integration-user-in-servicenow-for-grafana-to-connect-with)
    - [Step 4: Install Grafana Plugin](#step-4-install-grafana-plugin)
      - [Quick Install](#quick-install)
      - [Scripted Install](#scripted-install)
    - [Step 5: Grafana Datasource Configuration](#step-5-grafana-datasource-configuration)
    - [Step 6: Import Our Grafana Dashboards](#step-6-import-our-grafana-dashboards)
  - [Dashboards](#dashboards)
    - [Which dashboards should I import?](#which-dashboards-should-i-import)
      - [Visibility + ITOM AIOps(Event Mgmt + HLA)](#visibility--itom-aiopsevent-mgmt--hla)
      - [Visibility + Cloud Native Operations(CNO)](#visibility--cloud-native-operationscno)
      - [ACC-M](#acc-m)
      - [Visibility - Cloud](#visibility---cloud)
  - [UI Actions Setup Instructions](#ui-actions-setup-instructions)
  - [Query Editor Options](#query-editor-options)
  - [Query Categories](#query-categories)
    - [Metrics](#metrics)
    - [Node Graph](#node-graph)
    - [Table](#table)
    - [Alerts](#alerts)
    - [Aggregate](#aggregate)
    - [Row Count](#row-count)
    - [Trend Data](#trend-data)
    - [Log Data](#log-data)
    - [Outage Status](#outage-status)
    - [Anomaly](#anomaly)
    - [GeoHash Map](#geohash-map)
  - [Variables](#variables)
  - [FAQ](#faq)
    - [No results found when searching for ITOM Grafana Plugin in ServiceNow?](#no-results-found-when-searching-for-itom-grafana-plugin-in-servicenow)
    - [I just updated to v1.3.0 and everything is broken. How do I fix it?](#i-just-updated-to-v130-and-everything-is-broken-how-do-i-fix-it)
    - [How do I fix the "Panel plugin not found: x" error?](#how-do-i-fix-the-panel-plugin-not-found-x-error)
    - [Why am I getting a Bad Gateway error on my panels?](#why-am-i-getting-a-bad-gateway-error-on-my-panels)
    - [How do I fix the error "String object would exceed maximum permitted size of 33554432"?](#how-do-i-fix-the-error-string-object-would-exceed-maximum-permitted-size-of-33554432)
    - [How do I fix the error Bad Request "Requested URI does not represent any resource"?](#how-do-i-fix-the-error-bad-request-requested-uri-does-not-represent-any-resource)
    - [Why do the select boxes show "No options found"?](#why-do-the-select-boxes-show-no-options-found)
    - [How do I use this plugin with an HTTP Proxy?](#how-do-i-use-this-plugin-with-an-http-proxy)
  - [Scripts](#scripts)

## Setup Instructions

For your ServiceNow instance to communicate with our Grafana plugin, you must first install our [ITOM Grafana Plugin](https://store.servicenow.com/sn_appstore_store.do#!/store/application/c9d5fc3a1bf08990ba4d15c61a4bcb03/1.8.0) integration on your ServiceNow instance.

### Step 1: Install the ITOM Grafana Plugin into your ServiceNow instance

Using the application navigator inside ServiceNow, search for "available applications" and click on System Applications > All Available Applications > Available To Obtain From Store. After the page loads search for "ITOM Grafana Plugin" and click View Details. Finally click either Request Install or Get.

### Step 2: Configure the Allowed Tables List in ServiceNow

As of v1.8.0 there is a custom table included along with the application called Allowed Tables List (x_opti8_itom_grafa_allowed_tables). This table acts as a whitelist of other tables that are allowed to be queried through the API's in the ITOM Grafana Plugin application. If you attempt to query a table which is not on the Allowed Tables List you will receive an error message notifying you of such and how to address it.

The table consists of 3 columns. The Table field which indicates the table you are allowing, the Active field which indicates if the Table will be considered allowed or not, and an optional Description field to provide reasoning/context about why a particular table was allowed.

Please note that the Allowed Tables List is an additional security measure that works in conjunction with the roles you assign to the Integration User in [Step 3: Create an Integration User in ServiceNow for Grafana to connect with](#step-3-create-an-integration-user-in-servicenow-for-grafana-to-connect-with).

Users with the itil role will be able to read the Allowed Tables List, but only users with the admin role will be able to create, edit, or delete records.

### Step 3: Create an Integration User in ServiceNow for Grafana to connect with

- This user may have any username and password you wish
- Timezone for the user **_MUST BE GMT_**
- The user will require these roles at the minimum but other roles depend on the data you'd like available in Grafana:
  - itil
  - evt_mgmt_operator (if Event Management is installed)
  - personalize_dictionary
  - personalize_choices

### Step 4: Install Grafana Plugin

#### Quick Install

Ensure your entering the latest version's release in the following command

```bash
grafana cli --pluginUrl https://github.com/optimizca/servicenow-grafana/releases/download/v1.8.0/optimiz-servicenow-datasource-1.8.0.zip plugins install optimiz-servicenow-datasource
```

Then add our plugin to the list of unsigned plugins in your Grafana configuration file and restart Grafana.

```ini
allow_loading_unsigned_plugins = optimiz-servicenow-datasource
```

#### Scripted Install

Option based scripts written for each operating system give you the option to install Grafana + our plugin or just our plugin in your existing Grafana. [Click here for Quick Install Setup](https://github.com/optimizca/servicenow-grafana/tree/main/scripts)

### Step 5: Grafana Datasource Configuration

1. Open Grafana Configuration => Data Sources
2. Click on the "Add data source" Button
3. Search for and add our "Optimiz-ServiceNow Plugin"
4. Configure the data source based on fields below. Required fields are marked with a ❗
   - Logo URL: URL to an image you wish to use as logo. (Default value is a ServiceNow Logo)
   - API Path: Path to our application's API's in your ServiceNow instance. (Please do not change the default value unless you are a developer or understand the implications)
   - Cache Timeout: Choose length of time to cache each query
   - ❗ URL: The URL to your ServiceNow instance. (For convenience the default value is mostly filled in. Just replace <instance_name> with your own).
   - Access: Leave this value as Server (default)
   - ❗ Basic Auth: Set this to true
   - ❗ With Credentials: Set this to true
   - ❗ User: Enter the ServiceNow username we created earlier in Step 4
   - ❗ Password: Enter the ServiceNow user's password we created earlier in Step 4
5. Click on the "Save & Test" Button. If you get the message "Data source connection is successful" then the plugin is ready to use!

### Step 6: Import Our Grafana Dashboards

![Import Dashboards Tab](https://github.com/optimizca/servicenow-grafana/raw/main/readme_images/import-dashboards.png)

## Dashboards

Dashboard descriptions will be added soon..

- ACC Agents Inventory
- ACC-L CI Details
- Advanced - ACC Agent Inventory
- Advanced - Application Services
- Advanced - vCenter Inventory
- Anomaly Insights
- Application Service Details
- Application Services
- AWS CI Details
- AWS Function Details
- AWS Inventory - US Regions
- AWS Lambda Functions
- Azure CI Details
- Azure Inventory
- CI Details
- Compare CIs
- Generic CI Details
- Kubernetes Details 2
- Kubernetes Details
- Kubernetes
- Landing Page
- Linux Inventory ACC-L
- Live CI Data
- Live Logs
- Observability Dashboard
- Observability Live Logs
- Observability with Log KPIs
- Outage Dashboard
- Related Alerts
- Simple Event Management(Node-Based)
- Simple Event Management
- Tag Health
- UI Actions
- vCenter CI Details
- vCenter Inventory

### Which dashboards should I import?

You may choose to import all dashboards, or start small and work your way up. Below are some suggestions to get you started:

#### Visibility + ITOM AIOps(Event Mgmt + HLA)

- Landing Page
- Application Services
- Application Service Details
- Outage Dashboard
- Simple Event Management
- Generic CI Details
- Tag Health
- UI Actions
- Log Analytics
- Live Logs
- Related Alerts

#### Visibility + Cloud Native Operations(CNO)

- Landing Page
- Observability Dashboard
- Observability Dashboard with Log KPIs
- Kubernetes
- Simple Event Management
- Generic CI Details
- CI Details
- Kubernetes Details
- Kubernetes Details 2
- Tag Health
- UI Actions
- Log Analytics
- Observability Live Logs
- Related Alerts
- Application Services
- Application Service Details
- Outage Dashboard

#### ACC-M

- Landing Page
- ACC Agents Inventory
- Advanced - ACC Agents Inventory (example using location/support groups/environment)
- Compare CIs
- Anomaly Insights
- Simple Event Management
- Generic CI Details
- CI Details
- Tag Health
- UI Actions
- Log Analytics
- Live Logs
- Related Alerts

#### Visibility - Cloud

- Landing Page
- AWS Inventory - US Regions
- AWS CI Details
- Kubernetes
- Kubernetes Details
- Kubernetes Details 2
- Azure Inventory
- Generic CI Details
- CI Details
- AWS Lambda Function
- AWS Function Details
- Tag Health
- vCenter Inventory

## UI Actions Setup Instructions

If you would like to make use of our UI Actions dashboard, there are a few fields that will need to be updated for each instance.

1. Navigate to the plugins menu and search for the button panel shown below. Click into the panel and hit the install button.

![Install Button Panel](https://github.com/optimizca/servicenow-grafana/raw/main/readme_images/install_button.png)

![Install Button Panel2](https://github.com/optimizca/servicenow-grafana/raw/main/readme_images/install_button2.png)

2. Create a Grafana API key using the **_Admin_** role. Key name and TTL are up to you.

![API Key Options](https://github.com/optimizca/servicenow-grafana/raw/main/readme_images/create_api_key.png)

3. Once you hit add, copy the API key shown on screen.

![Copy API Key](https://github.com/optimizca/servicenow-grafana/raw/main/readme_images/copy_api_key.png)

4. Navigate to the UI Actions dashboard inside the Drilldown Dashboards folder. Then edit the button panel.
5. Add an Authorization header using your new key. **_Don't forget to hit the plus button when your done_**

```
Name = Authorization
Value = Bearer <API_KEY>
```

![Button Panel Options](https://github.com/optimizca/servicenow-grafana/raw/main/readme_images/button_options.png)

6. Change the URL field pictured above to reflect the FQDN your grafana instance is currently using. **_Please only change the domain and nothing after the port number. The /api portion should remain the same._**

## Query Editor Options

The plugin supports a wide variety of "Query Categories" allowing you to query data in different ways or perform special processing on the data. Each Query Category will provide you with different options to fill out in order to get the data your looking for.

Categories marked with the ![Static Badge](https://img.shields.io/badge/-Popular-blue) badge have been heavily in use by the community. Categories marked with ![Static Badge](https://img.shields.io/badge/-Unique-BF40BF) are special to this plugin and differentiate us from the current Enterprise ServiceNow datasource.

## Query Categories

- [Metrics ![Static Badge](https://img.shields.io/badge/-Popular-blue) ![Static Badge](https://img.shields.io/badge/-Unique-BF40BF)](#metrics)
- [Node Graph ![Static Badge](https://img.shields.io/badge/-Popular-blue) ![Static Badge](https://img.shields.io/badge/-Unique-BF40BF)](#node-graph)
- [Table ![Static Badge](https://img.shields.io/badge/-Popular-blue)](#table)
- [Alerts ![Static Badge](https://img.shields.io/badge/-Popular-blue) ![Static Badge](https://img.shields.io/badge/-Unique-BF40BF)](#alerts)
- [Aggregate ![Static Badge](https://img.shields.io/badge/-Popular-blue)](#aggregate)
- [Row Count ![Static Badge](https://img.shields.io/badge/-Popular-blue)](#row-count)
- [Trend Data ![Static Badge](https://img.shields.io/badge/-Popular-blue) ![Static Badge](https://img.shields.io/badge/-Unique-BF40BF)](#trend-data)
- [Log Data ![Static Badge](https://img.shields.io/badge/-Popular-blue) ![Static Badge](https://img.shields.io/badge/-Unique-BF40BF)](#log-data)
- [Outage Status ![Static Badge](https://img.shields.io/badge/-Unique-BF40BF)](#outage-status)
- [Anomaly ![Static Badge](https://img.shields.io/badge/-Unique-BF40BF)](#anomaly)
- [GeoHash Map ![Static Badge](https://img.shields.io/badge/-Unique-BF40BF)](#geohash-map)

### Metrics

![Static Badge](https://img.shields.io/badge/-Popular-blue) ![Static Badge](https://img.shields.io/badge/-Unique-BF40BF)

Used to gather time-series metric data from CI's, typically Agent Client Collectors.

| Option Name | Description | Options | Additional Info |
| ----------- | ----------- | ------- | --------------- |
| Service | Selecting a service will filter the CI options below to only CIs in that service | All Services | No effect on final query |
| CI | Select CI(s) which you would like to retrieve metrics for. This will also filter the Resource ID and Metric Name options below so they are relevant to the CI(s) chosen | All CI's or CI's in selected service | |
| Resource ID | Select the resource you wish to collect metrics from | All Resources in the selected CI(s), and \* | Use the \* to get all resources |
| Metric Name | Select the metrics you wish to retrieve | All metrics in the selected CI(s), and \* | Use the \* to get all resources |
| Anomaly | (True) Gather RAW, MIN, MAX & AVG of each metric. (False) Gather only the RAW data | [True, False] | |
| Value Type | Choose to query full timeseries data, or just the latest value | [Timeseries, Latest Value] | |
| Sysparam Query | This is used to filter your results down using the same syntax as filtering a table in ServiceNow | | (Advanced variant) |

### Node Graph

![Static Badge](https://img.shields.io/badge/-Popular-blue) ![Static Badge](https://img.shields.io/badge/-Unique-BF40BF)

Used to display relationships between CI's or Service Dependency Maps. We recommend you use this query with Grafana's Node Graph panel for visualization

| Option Name | Description | Options | Additional Info |
| ----------- | ----------- | ------- | --------------- |
| Starting Point | Select a CI to start the relationship/dependency diagram from | All CI's | This field is mandatory |
| Relationship Types | Select relationship types to whitelist/include in the results | All relationship types from the cmdb_rel_type table | Will cut off the tree past filtered CIs |
| Filter Classes | Select CI Classes to blacklist/exclude from the results | All classes that start with cmdb_ci from the sys_db_object table | Will cut off the tree past filtered CIs |
| Parent Depth | Determines the number of levels to search **up** the tree of dependencies | 0-10 | Default is 3. Recommended to keep below 5 for performance |
| Child Depth | Determines the number of levels to search **down** the tree of dependencies | 0-10 | Default is 3. Recommended to keep below 5 for performance |

### Table

![Static Badge](https://img.shields.io/badge/-Popular-blue)

The table category allows you to query any table or database view inside your ServiceNow instance (given the appropriate roles).

| Option Name | Description | Options | Additional Info |
| ----------- | ----------- | ------- | --------------- |
| Table Name | Select the table you wish to query data from | All tables in the sys_db_object table | Any table or database view that does not appear as an option can be inserted as a custom value |
| Table Columns | Select the columns you wish to query on the chosen table. If none are selected, all columns will be returned | All columns for the selected table in the sys_dictionary | Any column that does not appear as an option can be inserted as a custom value |
| Sysparam Query | This is used to filter your results down using the same syntax as filtering a table in ServiceNow | | (Basic variant) |
| Sort By | Select a table column to sort your records on, then choose if the sort is Ascending(ASC) or Descending(DESC) | All columns for the selected table in the sys_dictionary, [ASC, DESC] | Any column that does not appear as an option can be inserted as a custom value |
| Limit | Limits the amount of records returned to the number submitted | 1-9999 | Default is 2000 |
| Page | This option in combination with the Limit can be thought of as pagination for your requests. Ex. Setting a limit of 10 returns the first 10 records and to see the 10 records following those, increase your page number. | 0-9999 | Default is 0, which is the first page |
| Query Alert Count | Queries the count of alerts that are open on each records cmdb_ci field | [No, Yes] | Adds extra processing to the query. Be cautious when using and make sure your limit is set low |
| Grafana Timerange | Toggle on and select a table column that contains a time. This will filter results to find records where the chosen table column is BETWEEN the time range set in Grafana. | [On, Off], Table Column | Grafana time range is found in the top right of any dashboard |

### Alerts

![Static Badge](https://img.shields.io/badge/-Popular-blue) ![Static Badge](https://img.shields.io/badge/-Unique-BF40BF)

Used to gather Alerts(em_alert) along with some additional processing to determine impacted services and add additional columns for annotations, number of correlated/secondary alerts, number of unique sources in correlated/secondary alerts.

| Option Name | Description | Options | Additional Info |
| ----------- | ----------- | ------- | --------------- |
| Service | Selecting a service will filter the CI options below to only CIs in that service. May also be used to query any Alerts affecting selected service | All Services |  |
| CI | Selecting CI(s) will filter results down to only Alerts with those CI(s) | All CI's or CI's in selected service | |
| Alert Type Filter | This option determines if you would like to base your query on the Service or CI selected. If not, select None to ignore the Service and CI fields then filter using other options | [CI, Service, None] | |
| Alert State Filter | Filters Alert records by state. Select Active to return Open or Reopen records and All to return records with any state | [Active, All] | |
| Sysparam Query | This is used to filter your results down using the same syntax as filtering a table in ServiceNow | | (Advanced variant) |
| Sort By | Select a table column to sort your records on, then choose if the sort is Ascending(ASC) or Descending(DESC) | All columns for the selected table in the sys_dictionary, [ASC, DESC] | Any column that does not appear as an option can be inserted as a custom value |
| Limit | Limits the amount of records returned to the number submitted | 1-9999 | Default is 2000 |
| Page | This option in combination with the Limit can be thought of as pagination for your requests. Ex. Setting a limit of 10 returns the first 10 records and to see the 10 records following those, increase your page number. | 0-9999 | Default is 0, which is the first page |
| Grafana Timerange | Toggle on and select a table column that contains a time. This will filter results to find records where the chosen table column is BETWEEN the time range set in Grafana. | [On, Off], Table Column | Grafana time range is found in the top right of any dashboard |

### Aggregate

![Static Badge](https://img.shields.io/badge/-Popular-blue)

Query a table, group the data by a chosen column, and apply an aggregation function an another column to return stats about your data. Useful when the full table data is not required.

| Option Name | Description | Options | Additional Info |
| ----------- | ----------- | ------- | --------------- |
| Table Name | Select the table you wish to query data from | All tables in the sys_db_object table | Any table or database view that does not appear as an option can be inserted as a custom value |
| Group By | Select the table column to group your results by | All columns for the selected table in the sys_dictionary | |
| Aggregate Function | Select one of the aggregation functions and a table column to apply that function on | [AVG, COUNT, MIN, MAX, STDDEV, SUM], All columns for the selected table in the sys_dictionary | |
| Sysparam Query | This is used to filter your results down using the same syntax as filtering a table in ServiceNow | | (Advanced variant) |
| Limit | Limits the amount of grouped results to return | 1-9999 | Default is 2000 |
| Grafana Timerange | Toggle on and select a table column that contains a time. This will filter results to find records where the chosen table column is BETWEEN the time range set in Grafana. | [On, Off], Table Column | Grafana time range is found in the top right of any dashboard |

### Row Count

![Static Badge](https://img.shields.io/badge/-Popular-blue)

Query a table and optionally set a filter to return the number of records found. Very fast query type if you just need a basic count without grouping.

| Option Name | Description | Options | Additional Info |
| ----------- | ----------- | ------- | --------------- |
| Table Name | Select the table you wish to query data from | All tables in the sys_db_object table | Any table or database view that does not appear as an option can be inserted as a custom value |
| Sysparam Query | This is used to filter your results down using the same syntax as filtering a table in ServiceNow | | (Advanced variant) |
| Grafana Timerange | Toggle on and select a table column that contains a time. This will filter results to find records where the chosen table column is BETWEEN the time range set in Grafana. | [On, Off], Table Column | Grafana time range is found in the top right of any dashboard |

### Trend Data

![Static Badge](https://img.shields.io/badge/-Popular-blue) ![Static Badge](https://img.shields.io/badge/-Unique-BF40BF)

Create bucketed timeseries stats from data in the chosen table. This one is best described with the use cases below.

- Query the number of alerts created each hour of the past week
- Query the number of times an alert management rule has been executed in 10 minute buckets over the past 12 hours
- Query the number of incidents created in 30 minute buckets over the past 8 hours grouped by assignment group

| Option Name | Description | Options | Additional Info |
| ----------- | ----------- | ------- | --------------- |
| Table Name | Select the table you wish to query data from | All tables in the sys_db_object table | Any table or database view that does not appear as an option can be inserted as a custom value |
| Sysparam Query | This is used to filter your results down using the same syntax as filtering a table in ServiceNow | | (Basic variant) |
| Elastic Search Query | Search logs using Lucene syntax | | Only applies if you have chosen the Log Viewer Parents (sn_occ_log_viewer_parent) table |
| Group By | Select the table column to group your results by | All columns for the selected table in the sys_dictionary | |
| Trend | Select a Date/Time table column to use for bucketing the results, then select either Minute or Week, and finally provide a number of minutes/weeks to use for bucketing | All Date/Time type columns for the selected table in the sys_dictionary, [Minute, Week], number of minutes/weeks | |

### Log Data

![Static Badge](https://img.shields.io/badge/-Popular-blue) ![Static Badge](https://img.shields.io/badge/-Unique-BF40BF)

Query your logs from Health Log Analytics (HLA) using this query category. We recommend to use this query with either the log or table panels for visualization.

| Option Name | Description | Options | Additional Info |
| ----------- | ----------- | ------- | --------------- |
| Compress Logs | Reduce the raw_message field into a few key fields | [True, False] | |
| Sysparam Query | This is used to filter your results down using the same syntax as filtering a table in ServiceNow | | (Basic variant) |
| Elastic Search Query | Search logs using Lucene syntax | | |
| Sort By | Select a table column to sort your records on, then choose if the sort is Ascending(ASC) or Descending(DESC) | All columns for the selected table in the sys_dictionary, [ASC, DESC] | Any column that does not appear as an option can be inserted as a custom value |
| Limit | Limits the amount of records returned to the number submitted | 1-9999 | Default is 2000 |
| Page | This option in combination with the Limit can be thought of as pagination for your requests. Ex. Setting a limit of 10 returns the first 10 records and to see the 10 records following those, increase your page number. | 0-9999 | Default is 0, which is the first page |

### Outage Status

![Static Badge](https://img.shields.io/badge/-Unique-BF40BF)

If you utilize outage records in ServiceNow this query type will provide a timeline of up or down for your services and a percentage of uptime over the chosen time range.

| Option Name | Description | Options | Additional Info |
| ----------- | ----------- | ------- | --------------- |
| Service | Select an individual service to query outage status for | All Services |  |
| Show Uptime % | Select False to see timeseries data and True for a Percentage of uptime over the selected time | [False, True] | |
| Sysparam Query | If you did not choose a service above, you can use this field to filter down a list of all services using the same syntax as filtering a table in ServiceNow | | (Advanced variant) |
| Limit | Limits the amount of services returned to the number submitted | 1-9999 | Default is 2000 |
| Page | This option in combination with the Limit can be thought of as pagination for your requests. Ex. Setting a limit of 10 returns the first 10 records and to see the 10 records following those, increase your page number. | 0-9999 | Default is 0, which is the first page |

### Anomaly

![Static Badge](https://img.shields.io/badge/-Unique-BF40BF)

Query your Alert Anomalies with this query type and it will add additional columns to the result. The additional columns are metricType, metricValue, and boundary.

| Option Name | Description | Options | Additional Info |
| ----------- | ----------- | ------- | --------------- |
| Table Columns | Select the columns you wish to query on the Alert Anomalies (em_alert_anomaly) table. If none are selected, all columns will be returned | All columns for the Alert Anomalies (em_alert_anomaly) table in the sys_dictionary | Any column that does not appear as an option can be inserted as a custom value |
| Sysparam Query | This is used to filter your results down using the same syntax as filtering a table in ServiceNow | | (Basic variant) |
| Sort By | Select a table column to sort your records on, then choose if the sort is Ascending(ASC) or Descending(DESC) | All columns for the selected table in the sys_dictionary, [ASC, DESC] | Any column that does not appear as an option can be inserted as a custom value |
| Limit | Limits the amount of records returned to the number submitted | 1-9999 | Default is 2000 |
| Page | This option in combination with the Limit can be thought of as pagination for your requests. Ex. Setting a limit of 10 returns the first 10 records and to see the 10 records following those, increase your page number. | 0-9999 | Default is 0, which is the first page |

### GeoHash Map

![Static Badge](https://img.shields.io/badge/-Unique-BF40BF)

The GeoHash Map query category assist you in plotting your cloud CIs on a world map based on their region/data center. Provide the table which holds your cloud CIs and enter the region/data center column in the group by. This will return geohash coordinates and a count of CIs for each. This was developed with AWS and Azure in mind but may also work for other cloud providers.

| Option Name | Description | Options | Additional Info |
| ----------- | ----------- | ------- | --------------- |
| Table Name | Select a table with the Cloud CI's you'd like to map by geohash | All tables in the sys_db_object table | Any table or database view that does not appear as an option can be inserted as a custom value |
| Group By | Select a table column which holds the region of the CI | All columns for the selected table in the sys_dictionary | This will almost always be ldc_region |
| Sysparam Query | This is used to filter your results down using the same syntax as filtering a table in ServiceNow | | (Advanced variant) |

## Variables

| Namespace | Query | Fields | Description |
| --------- | ----- | ------ | ----------- |
| global_image | | | Returns the Logo URL you set in the data source configuration. The variable can then be used as the src attribute in an \<img\> tag |
| global_instance_name | | | Returns your ServiceNow instance name which was configured in the data source configuration. This variable is useful for creating links back to your ServiceNow instance |
| metric_names | a20ce336db42b010d41e9fd2ca96199e | One or more CI sys_ids | Retrieves a list of all metrics for the given ci(s) |
| golden_metric_names | a20ce336db42b010d41e9fd2ca96199e | One or more CI sys_ids | Retrieves a list of KPIs for the given ci(s) |
| custom_kpis | a20ce336db42b010d41e9fd2ca96199e | One or more CI sys_ids | Retrieves a list of Preset KPIs for the given ci(s). Results will vary based on CI Class |
| generic | em_alert\|\|group_source\|\|group_source\|\| state!=Closed\|\|1000 | Table Name, Display Column, Value Column, Sysparam Query, Limit | Create your own custom list based on the table, columns, and sysparam provided. The first column field will determine the display value users see and the second column is the actual value used in the list. If you need to force a column to be read as display value add suffix :d and for actual value add suffix :v. [Learn more about Display vs Actual values here](https://docs.servicenow.com/bundle/quebec-platform-administration/page/administer/field-administration/concept/c_DisplayValues.html) ***FYI dot-walking will only work if you use the :d suffix*** |
| group_by | em_alert\|\|cmdb_ci\|\|state!=closed | Table Name, Group By Column, Sysparam Query | This variable type is meant to be used when you want to use the same field as the display and actual values of the variable options. It offers much greater performance than the generic variable type but with slightly less flexibility. You can additionally use the same :d and :v suffix to force display or actual values similar to the generic variable type. |
| nested_cis | 4577fd32db1627002ef1400e0b961921\|\|1\|\|1\|\| parent.sys_class_nameNOT INsn_agent_cmdb_ci_agent | CI sys_id, Parent Depth, Child Depth, Sysparam Query | Retrieves the nested/related CIs that are shown in the topology panel. Values should match your topology query for best results. |
| v2_nested_cis | 4577fd32db1627002ef1400e0b961921\|\|1a9cb166f1571100a92eb60da2bce5c5\|\|cmdb_ci_linux_server\|\|3\|\|3 | Starting point CI sys_id, Relationship type sys_ids, Filter Classes, Parent Depth, Child Depth | Retrieves the CIs related to the starting point that are shown in the node graph panel. Values should match your node graph query for best results. |
| nested_classes | 4577fd32db1627002ef1400e0b961921\|\|1\|\|1\|\| parent.sys_class_nameNOT INsn_agent_cmdb_ci_agent | CI sys_id, Parent Depth, Child Depth, Sysparam Query | Retrieves the Classes of all nested/related CIs that are shown in the topology panel. Values should match your topology query for best results. |
| v2_nested_classes | 4577fd32db1627002ef1400e0b961921\|\|1a9cb166f1571100a92eb60da2bce5c5\|\|cmdb_ci_linux_server\|\|3\|\|3 | Starting point CI sys_id, Relationship type sys_ids, Filter Classes, Parent Depth, Child Depth | Retrieves the Classes of all CIs related to the starting point that are shown in the node graph panel. Values should match your node graph query for best results. |

## FAQ

### No results found when searching for ITOM Grafana Plugin in ServiceNow?

You can typically resolve this issue by clicking on System Applications > All Available Applications > All from the application navigator and then clicking the Sync now button.

### I just updated to v1.3.0 and everything is broken. How do I fix it?

Version 1.3.0 includes a change to the plugin id and name, meaning Grafana does not recognize them as the same. To get back up and running please follow the steps below:

- Navigate to the datasource configuration tab inside your Grafana instance and delete the old version of the datasource
- [Follow these steps to re-configure the updated datasource](#step-5-grafana-datasource-configuration)
- Delete and re-import all included dashboards so that they work with the updated datasource

### How do I fix the "Panel plugin not found: x" error?

You are seeing this because the panel plugin we used in the dashboard is not installed on your instance of Grafana.

- Take note of the panel plugin name displayed in the error (plugin names are formatted like (author)-(pluginName)-(pluginType))
  ![Missing Plugin Error](https://github.com/optimizca/servicenow-grafana/raw/main/readme_images/missing_plugin_error.png)
- Navigate to Grafana Configuration => Plugins
- Search for the plugin in the error (Search based on the middle word the plugin displayed in the error)
  ![Search Missing Plugin](https://github.com/optimizca/servicenow-grafana/raw/main/readme_images/search_for_plugin.png)
- Click into the plugin (You will know its the correct one based off the authors name)
- Click the Install Button
  ![Install Plugin Button](https://github.com/optimizca/servicenow-grafana/raw/main/readme_images/install_plugin.png)

### Why am I getting a Bad Gateway error on my panels?

The default timeout for requests made by Grafana in 30 seconds. If your request takes longer than 30 seconds you will see this error.

There are a few possible fixes for this error. Please try each fix as they all work differently and will depend on your needs of the data.

- If you are looking for a subset of data rather than the entire table, try adding some filters to the Sysparam Query
- If displaying every field on the record is not a necessity, try specifying which fields you would like to see in the Table Columns option
- If your familiar with pagination we also have this as an option to reduce the amount of records returned in each query. To use pagination, in the Limit option enter in the number of records to return per request(default is 2000). Then increment the Page option by 1 each time you wish to advance pages(default starts at 0)
- The last fix here is one I do not recommend but is still an option. In the data source configuration page there is an option called Timeout, there you can specify your desired request timeout in seconds(default is 30). I do not recommend this fix as it will likely lead you to the error below this one, use at your own risk.

### How do I fix the error "String object would exceed maximum permitted size of 33554432"?

This happens when the amount of data being returned from a query is greater than 32MB.

- To fix this issue, try the steps in the above question as both are fixed in nearly the same way.

### How do I fix the error Bad Request "Requested URI does not represent any resource"?

We do not currently know what causes this issue as it happens on some instances but not others. If you have more information, please let us know :)

- Inside of your ServiceNow instance, search for and click on "Scripted REST APIs"
  ![Search for Scripted REST APIs](https://github.com/optimizca/servicenow-grafana/raw/main/readme_images/search_rest_apis.png)
- Search the Name field for "Grafana API" and open the record
  ![Search name Grafana API](https://github.com/optimizca/servicenow-grafana/raw/main/readme_images/search_grafana_api.png)
- Remove the "Scripted REST External Default" ACL from the list and save the record
  ![ACL Option](https://github.com/optimizca/servicenow-grafana/raw/main/readme_images/acl_fix1.png)
  ![Removing ACL from list](https://github.com/optimizca/servicenow-grafana/raw/main/readme_images/acl_fix2.png)
- In the same record, add the "Scripted REST External Default" ACL back into the list and save the record again
  ![Add ACL back into list](https://github.com/optimizca/servicenow-grafana/raw/main/readme_images/acl_fix3.png)

### Why do the select boxes show "No options found"?

Currently you will see this on nearly every select box, but we plan to improve/fix this in a future update.

- To get past the "No options found" message, simply enter a space or start typing your desired option and the options will be updated to show actual values

### How do I use this plugin with an HTTP Proxy?

Here is a very helpful link to a community post explaining the environment variables required for Grafana to use a Proxy [https://community.grafana.com/t/grafana-and-proxy-connection/104839/3](https://community.grafana.com/t/grafana-and-proxy-connection/104839/3)

## Scripts

During development of this plugin we developed several helper/utility scripts to help development and real users. At this stage we are choosing to relocate those scripts to a separate repository to keep proper separation. You can find all previously written scripts in the new repository here: [servicenow-grafana-script-utilities](https://github.com/R2DToo/servicenow-grafana-script-utilities)
