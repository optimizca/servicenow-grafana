# ServiceNow Grafana Data Source Plugin

![Company Logos](https://github.com/optimizca/servicenow-grafana/raw/main/readme_images/company_logos.png)

This ServiceNow Grafana Datasource Plugin enables communication between Grafana and ServiceNow to pull in all kinds of data from your instance. This plugin can query ANY table (even database views), perform aggregate or trend queries on ANY table, time-series metrics from the metricBase, display the Service Dependency Map, and many more features. [www.servicenow.com](https://www.servicenow.com)

![GitHub package.json version](https://img.shields.io/github/package-json/v/optimizca/servicenow-grafana)
[![Build](https://github.com/optimizca/servicenow-grafana/actions/workflows/build.yaml/badge.svg)](https://github.com/optimizca/servicenow-grafana/actions/workflows/build.yaml)
![Grafana Signature Level](https://img.shields.io/badge/Signature%20Level-NotSigned-lightgrey?logo=grafana)
![GitHub last commit](https://img.shields.io/github/last-commit/optimizca/servicenow-grafana)
![GitHub all releases](https://img.shields.io/github/downloads/optimizca/servicenow-grafana/total)

# Attention for v1.3.0 ❗

If you have updated from an older version to v1.3.0, please [Click here to fix the breaking changes](#i-just-updated-to-v130-and-everything-is-broken-how-do-i-fix-it)

# Gallery

Check out the new [Gallery Here](https://github.com/optimizca/servicenow-grafana/wiki/Gallery) to see some screenshots from our plugin in action

# Table of Content

- [Change Notes 🔧](https://github.com/optimizca/servicenow-grafana/blob/main/CHANGELOG.md)
- [Supported ServiceNow Versions](#supported-serviceNow-versions)
- [Setup Instructions](#setup-instructions)
  - [Step 1: Install application in ServiceNow Instance](#step-1-install-application-in-servicenow-instance)
    - [Search for and click on "studio" in the application navigator](#search-for-and-click-on-studio-in-the-application-navigator)
    - [Click on the "Import From Source Control" button](#click-on-the-import-from-source-control-button)
    - [Enter import details as shown below](#enter-import-details-as-shown-below)
    - [Create a new user in ServiceNow for Grafana to connect with](#create-a-new-user-in-servicenow-for-grafana-to-connect-with)
  - [Step 2: Install Grafana Plugin](#step-2-install-grafana-plugin)
    - [Quick Install](#quick-install)
    - [Manual Install](#manual-install)
  - [Step 3: Grafana Datasource Configuration](#step-3-grafana-datasource-configuration)
  - [Step 4: Import Our Grafana Dashboards](#step-4-import-our-grafana-dashboards)
- [Dashboards](#dashboards)
  - [Which dashboards should I import?](#which-dashboards-should-i-import)
    - [Visibility + ITOM AIOps(Event Mgmt + HLA)](#visibility--itom-aiopsevent-mgmt--hla)
    - [Visibility + Cloud Native Operations(CNO)](#visibility--cloud-native-operationscno)
    - [ACC-M](#acc-m)
    - [Visibility - Cloud](#visibility---cloud)
- [UI Actions Setup Instructions](#ui-actions-setup-instructions)
- [Variables](#variables)
- [FAQ](#faq)
  - [I just updated to v1.3.0 and everything is broken. How do I fix it?](#i-just-updated-to-v130-and-everything-is-broken-how-do-i-fix-it)
  - [How do I fix the "Panel plugin not found: x" error?](#how-do-i-fix-the-panel-plugin-not-found-x-error)
  - [Why am I getting a Bad Gateway error on my panels?](#why-am-i-getting-a-bad-gateway-error-on-my-panels)
  - [How do I fix the error "String object would exceed maximum permitted size of 33554432"?](#how-do-i-fix-the-error-string-object-would-exceed-maximum-permitted-size-of-33554432)
  - [How do I fix the error Bad Request "Requested URI does not represent any resource"?](#how-do-i-fix-the-error-bad-request-requested-uri-does-not-represent-any-resource)
  - [Why do the select boxes show "No options found"?](#why-do-the-select-boxes-show-no-options-found)
  - [How do I change the icons in the Topology(Service Dependency Graph) panel?](#how-do-i-change-the-icons-in-the-topologyservice-dependancy-graph-panel)
  - [How do I fix blank Topology panel icons?](#how-do-i-fix-blank-topology-panel-icons)
- [Query Editor Options](#query-editor-options)
  - [Query Categories](#query-categories)
    - [Metrics](#metrics)
    - [Alerts](#alerts)
    - [Changes](#changes)
    - [Topology](#topology)
    - [Live Agent Data](#live-agent-data)
    - [Table](#table)
    - [Row Count](#row-count)
    - [Aggregate](#aggregate)
    - [GeoHash Map](#geohash-map)
    - [Log Data](#log-data)
    - [Trend Data](#trend-data)
    - [Outage Status](#outage-status)
    - [Anomaly](#anomaly)

# Supported ServiceNow Versions

- Rome
- Quebec
- Paris

# Setup Instructions

For your ServiceNow instance to work with our Grafana plugin, you must first install our [Grafana Plugin](https://github.com/R2DToo/Grafana-Plugin-ServiceNow.git) application on your ServiceNow instance.

## Step 1: Install application in ServiceNow Instance

### Search for and click on "studio" in the application navigator

![Search for Studio](https://github.com/optimizca/servicenow-grafana/raw/main/readme_images/search_studio.png)

### Click on the "Import From Source Control" button

![Import From Source Control Button](https://github.com/optimizca/servicenow-grafana/raw/main/readme_images/sourcecontrol_button.png)

### Enter import details as shown below

- URL: https://github.com/R2DToo/Grafana-Plugin-ServiceNow.git
- Branch: master
- Credentials: Any GitHub account will work. (Even though the repo is public, ServiceNow requires credentials regardless of visibility)

![Import Details](https://github.com/optimizca/servicenow-grafana/raw/main/readme_images/import_details.png)

### Create a new user in ServiceNow for Grafana to connect with

- This user may have any username and password you wish
- Timezone for the user **_MUST BE GMT_**
- The user will also need these roles:
  - soap_query
  - evt_mgmt_operator
  - itil

## Step 2: Install Grafana Plugin

### Quick Install:

Option based scripts written for each operating system give you the option to install Grafana + our plugin or just our plugin in your existing Grafana. [Click here for Quick Install Setup](https://github.com/optimizca/servicenow-grafana/tree/main/scripts)

### Manual Install:

Download or clone the repository and move the unzipped folder into your Grafana plugins folder, then restart Grafana.

## Step 3: Grafana Datasource Configuration

1. Open Grafana Configuration => Data Sources
2. Click on the "Add data source" Button
3. Search for and add our "optimiz-servicenow-datasource"
4. Configure the data source based on fields below. Required fields are marked with a ❗

- Logo URL: URL to an image you wish to use as logo. (Default value is a ServiceNow Logo)
- API Path: Path to our application's API's in your ServiceNow instance. (Please do not change the default value unless you are a developer or understand the implications)
- Cache Timeout: Choose length of time to cache each query
- ❗ URL: The URL to your ServiceNow instance. (For convenience the default value is mostly filled in. Just replace <instance_name> with your own)
- ❗ Access: Leave this value as Server (default)
- ❗ Basic Auth: Set this to true
- ❗ With Credentials: Set this to true
- ❗ User: Enter the ServiceNow username we created earlier in Step 1
- ❗ Password: Enter the ServiceNow user's password we created earlier in Step 1

5. Click on the "Save & Test" Button. If you get the message "Data source connection is successful" then the plugin is ready to use!

## Step 4: Import Our Grafana Dashboards

![Import Dashboards Tab](https://github.com/optimizca/servicenow-grafana/raw/main/readme_images/import-dashboards.png)

# Dashboards

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

## Which dashboards should I import?

You may choose to import all dashboards, or start small and work your way up. Below are some suggestions to get you started:

### Visibility + ITOM AIOps(Event Mgmt + HLA)

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

### Visibility + Cloud Native Operations(CNO)

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

### ACC-M

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

### Visibility - Cloud

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

# UI Actions Setup Instructions

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

# Variables

| Namespace | Query | Fields | Description |
| --------- | ----- | ------ | ----------- |
| global_image | | | Returns the Logo URL you set in the data source configuration. The variable can then be used as the src attribute in an \<img\> tag |
| global_instance_name | | | Returns your ServiceNow instance name which was configured in the data source configuration. This variable is useful for creating links back to your ServiceNow instance |
| metric_names | a20ce336db42b010d41e9fd2ca96199e | One or more CI sys_ids | Retrieves a list of all metrics for the given ci(s) |
| golden_metric_names | a20ce336db42b010d41e9fd2ca96199e | One or more CI sys_ids | Retrieves a list of KPIs for the given ci(s) |
| custom_kpis | a20ce336db42b010d41e9fd2ca96199e | One or more CI sys_ids | Retrieves a list of Preset KPIs for the given ci(s). Results will vary based on CI Class |
| generic | em_alert\|\|group_source\|\|group_source\|\| state!=Closed\|\|1000 | Table Name, Display Column, Value Column, Sysparam Query, Limit | Create your own custom list based on the table, columns, and sysparam provided. The first column field will determine the display value users see and the second column is the actual value used in the list. If you need to force a column to be read as display value add suffix :d and for actual value add suffix :v. [Learn more about Display vs Actual values here](https://docs.servicenow.com/bundle/quebec-platform-administration/page/administer/field-administration/concept/c_DisplayValues.html) ***FYI dot-walking will only work if you use the :d suffix*** |
| nested_cis | 4577fd32db1627002ef1400e0b961921\|\|1\|\|1\|\| parent.sys_class_nameNOT INsn_agent_cmdb_ci_agent | CI sys_id, Parent Depth, Child Depth, Sysparam Query | Retrieves the nested/related CIs that are shown in the topology panel. Values should match your topology query for best results. |
| nested_classes | 4577fd32db1627002ef1400e0b961921\|\|1\|\|1\|\| parent.sys_class_nameNOT INsn_agent_cmdb_ci_agent | CI sys_id, Parent Depth, Child Depth, Sysparam Query | Retrieves the Classes of all nested/related CIs that are shown in the topology panel. Values should match your topology query for best results. |

# FAQ

### I just updated to v1.3.0 and everything is broken. How do I fix it?

Version 1.3.0 includes a change to the plugin id and name, meaning Grafana does not recognize them as the same. To get back up and running please follow the steps below:

- Navigate to the datasource configuration tab inside your Grafana instance and delete the old version of the datasource
- [Follow these steps to re-configure the updated datasource](#step-3-grafana-datasource-configuration)
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
- If your familiar with pagination we also have this as an option to reduce the amount of records returned in each query. To use pagination, in the Limit option enter in the number of records to return per request(default is 9999). Then increment the Page option by 1 each time you wish to advance pages(default starts at 0)
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

### How do I change the icons in the Topology(Service Dependency Graph) panel?

Icons are based on CI Class and use RegEx.

- Clicking on a node in the Topology panel will display that CI's Class.
  - (Node labeled **_Starting Point_** will **NOT** display a class)
    ![Topology on-click CI Class](https://github.com/optimizca/servicenow-grafana/raw/main/readme_images/click_on_topology_node.png)
- In the panel options, go to the section called Icon Mapping. At the bottom of this section, click the Add Icon Mapping button.
  - (**IGNORE** the section called **_External Icon Mapping_**)
    ![Icon Mapping Section](https://github.com/optimizca/servicenow-grafana/raw/main/readme_images/icon_mapping_section.png)
- Copy & paste or create a RegEx that matches the CI Class you saw in step 1.
  ![Icon Mapping RegEx](https://github.com/optimizca/servicenow-grafana/raw/main/readme_images/icon_mapping_regex.png)
- Then select an icon which will be mapped to all CI's whose Class matches your RegEx.
  ![Icon Selection](https://github.com/optimizca/servicenow-grafana/raw/main/readme_images/select_icon.png)

### How do I fix blank Topology panel icons?

When changing data in the Topology panel, the icons will not load dynamically. ![Topology Panel Blank Icons](https://github.com/optimizca/servicenow-grafana/raw/main/readme_images/topology_icons_blank.png)

To fix the icons without reloading the entire page, follow the steps below.

- Click on the Refresh(🗘) symbol inside the panel. This will fix the icons, but your layout won't look right
  ![Topology Panel Refresh Button](https://github.com/optimizca/servicenow-grafana/raw/main/readme_images/topology_refresh_button.png)
- Click on the Tree structure symbol to fix the layout.
  ![Topology Panel Layout Button](https://github.com/optimizca/servicenow-grafana/raw/main/readme_images/topology_layout_button.png)

If you still see blank icons please double check your Icon Mapping RegEx to ensure it matches the CI Class of the node you are looking at. [Click here to learn about creating an icon mapping](#how-do-i-change-the-icons-in-the-topologyservice-dependancy-graph-panel)

Also note that the "Starting Point" node shows a blank icon by default. This can be changed by adding an Icon Mapping entry with blank RegEx and your desired icon.

# Query Editor Options

The plugin supports a wide variety of "Query Categories" allowing you to query data in different ways or perform special processing on the data. Each Query Category will provide you with different options to fill out in order to get the data your looking for.

## Query Categories

- [Metrics](#metrics)
- [Alerts](#alerts)
- [Changes](#changes)
- [Topology](#topology)
- [Live Agent Data](#live-agent-data)
- [Table](#table)
- [Row Count](#row-count)
- [Aggregate](#aggregate)
- [GeoHash Map](#geohash-map)
- [Log Data](#log-data)
- [Trend Data](#trend-data)
- [Outage Status](#outage-status)
- [Anomaly](#anomaly)

### Metrics

Used to gather time-series metric data from CI's.

| Option Name | Description | Options | Additional Info |
| ----------- | ----------- | ------- | --------------- |
| Service | Selecting a service will filter the CI options below to only CIs in that service | All Services | No effect on final query |
| CI | Select CI(s) which you would like to retrieve metrics for. This will also filter the Resource ID and Metric Name options below so they are relevant to the CI(s) chosen | All CI's or CI's in selected service | |
| Resource ID | Select the resource you wish to collect metrics from | All Resources in the selected CI(s), and \* | Use the \* to get all resources |
| Metric Name | Select the metrics you wish to retrieve | All metrics in the selected CI(s), and \* | Use the \* to get all resources |
| Anomaly | (True) Gather RAW, MIN, MAX & AVG of each metric. (False) Gather only the RAW data | [True, False] | |
| Sysparam Query | This is used to filter your results down using the same syntax as filtering a table in ServiceNow | | (Advanced variant) |

### Alerts

Used to gather Alerts(em_alert) along with some additional processing to determine impacted services, parse TBAC tags out of additional_info and more.

| Option Name | Description | Options | Additional Info |
| ----------- | ----------- | ------- | --------------- |
| Service | Selecting a service will filter the CI options below to only CIs in that service. May also be used to query any Alerts affecting selected service | All Services |  |
| CI | Selecting CI(s) will filter results down to only Alerts with those CI(s) | All CI's or CI's in selected service | |
| Alert Type Filter | This option determines if you would like to base your query on the Service or CI selected. If not, select None to ignore the Service and CI fields then filter using other options | [CI, Service, None] | |
| Alert State Filter | Filters Alert records by state. Select Active to return Open or Reopen records and All to return records with any state | [Active, All] | |
| Sysparam Query | This is used to filter your results down using the same syntax as filtering a table in ServiceNow | | (Advanced variant) |
| Tag Keys & Tag Values | Selecting one or multiple keys and values will filter results down to records where additional info matches the Tags selected | Records that match the other filters will be queries for their additional info. The additional info is then parsed out to expose only tags which use the tag normalization. AKA additional info keys which contain a prefix of 'tbac-' | |
| Limit | Limits the amount of records returned to the number submitted | 1-9999 | Default is 9999 |
| Page | This option in combination with the Limit can be thought of as pagination for your requests. Ex. Setting a limit of 10 returns the first 10 records and to see the 10 records following those, increase your page number. | 0-9999 | Default is 0, which is the first page |
| Grafana Timerange | Toggle on and select a table column that contains a time. This will filter results to find records where the chosen table column is BETWEEN the time range set in Grafana. | [On, Off], Table Column | Grafana time range is found in the top right of any dashboard |

### Changes

Used to query the Changes(change_request) table.

| Option Name | Description | Options | Additional Info |
| ----------- | ----------- | ------- | --------------- |
| Service | Selecting a service will filter the CI options below to only CIs in that service. May also be used to query any Changes affecting selected service | All Services |  |
| CI | Selecting CI(s) will filter results down to only Changes with those CI(s) | All CI's or CI's in selected service | |
| Change Type Filter | This option determines if you would like to base your query on the Service or CI selected. If not, select None to ignore the Service and CI fields then filter using other options | [Service, CI, None] | |
| Sysparam Query | This is used to filter your results down using the same syntax as filtering a table in ServiceNow | | (Advanced variant) |
| Limit | Limits the amount of records returned to the number submitted | 1-9999 | Default is 9999 |
| Page | This option in combination with the Limit can be thought of as pagination for your requests. Ex. Setting a limit of 10 returns the first 10 records and to see the 10 records following those, increase your page number. | 0-9999 | Default is 0, which is the first page |
| Grafana Timerange | Toggle on and select a table column that contains a time. This will filter results to find records where the chosen table column is BETWEEN the time range set in Grafana. | [On, Off], Table Column | Grafana time range is found in the top right of any dashboard |

### Topology

Used to recreate service mapping/topology diagrams. Must be used in combination with our included version of the Service Dependency Graph(forked from novatec-sdg-panel) panel plugin.

| Option Name | Description | Options | Additional Info |
| ----------- | ----------- | ------- | --------------- |
| Starting Point | Select a CI to start the topology diagram from | All CI's | This field is mandatory |
| Parent Depth | Determines the number of levels to search **up** the tree of dependencies | 0-10 | Recommended to keep below 5 for performance |
| Child Depth | Determines the number of levels to search **down** the tree of dependencies | 0-10 | Recommended to keep below 5 for performance |
| Sysparam Query | This is used to filter your results down using the same syntax as filtering a table in ServiceNow | | (Advanced variant) |

### Live Agent Data

### Table

The table category allows you to query any table or database view inside your ServiceNow instance.

| Option Name | Description | Options | Additional Info |
| ----------- | ----------- | ------- | --------------- |
| Table Name | Select the table you wish to query data from | All tables in the sys_db_object table | Any table or database view that does not appear as an option can be inserted as a custom value |
| Table Columns | Select the columns you wish to query on the chosen table. If none are selected, all columns will be returned | All columns for the selected table in the sys_dictionary | Any column that does not appear as an option can be inserted as a custom value |
| Sysparam Query | This is used to filter your results down using the same syntax as filtering a table in ServiceNow | | (Basic variant) |
| Sort By | Select a table column to sort your records on, then choose if the sort is Ascending(ASC) or Descending(DESC) | All columns for the selected table in the sys_dictionary, [ASC, DESC] | Any column that does not appear as an option can be inserted as a custom value |
| Limit | Limits the amount of records returned to the number submitted | 1-9999 | Default is 9999 |
| Page | This option in combination with the Limit can be thought of as pagination for your requests. Ex. Setting a limit of 10 returns the first 10 records and to see the 10 records following those, increase your page number. | 0-9999 | Default is 0, which is the first page |
| Query Alert Count | Queries the count of alerts that are open on each records cmdb_ci field | [No, Yes] | Adds extra processing to the query. Be cautious when using and make sure your limit is set low |
| Grafana Timerange | Toggle on and select a table column that contains a time. This will filter results to find records where the chosen table column is BETWEEN the time range set in Grafana. | [On, Off], Table Column | Grafana time range is found in the top right of any dashboard |

### Row Count

| Option Name | Description | Options | Additional Info |
| ----------- | ----------- | ------- | --------------- |

### Aggregate

| Option Name | Description | Options | Additional Info |
| ----------- | ----------- | ------- | --------------- |

### GeoHash Map

| Option Name | Description | Options | Additional Info |
| ----------- | ----------- | ------- | --------------- |

### Log Data

| Option Name | Description | Options | Additional Info |
| ----------- | ----------- | ------- | --------------- |

### Trend Data

| Option Name | Description | Options | Additional Info |
| ----------- | ----------- | ------- | --------------- |

### Outage Status

| Option Name | Description | Options | Additional Info |
| ----------- | ----------- | ------- | --------------- |

### Anomaly

| Option Name | Description | Options | Additional Info |
| ----------- | ----------- | ------- | --------------- |