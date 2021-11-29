# ServiceNow Grafana Data Source Plugin

<p align="center">
  <img src="https://www.servicenow.com/content/dam/now-www/en-us/images/global-nav/logo/servicenow-header-logo.svg" alt="drawing" width="200" height="100"/>
  <img src="https://www.optimiz.ca/wp-content/uploads/2019/10/Artboard-2-copy.png" alt="drawing" width="200" height="100"/>
</p>

This ServiceNow Grafana Datasource Plugin enables communication between Grafana and ServiceNow to pull in all kinds of data from your instance. This plugin can query ANY table (even database views), perform aggregate or trend queries on ANY table, time-series metrics from the metricBase, display the Service Dependancy Map, and many more features. [www.servicenow.com](https://www.servicenow.com)

![GitHub package.json version](https://img.shields.io/github/package-json/v/optimizca/servicenow-grafana)
![Grafana Signature Level](https://img.shields.io/badge/Signature%20Level-Private-lightgrey?logo=grafana)
![GitHub last commit](https://img.shields.io/github/last-commit/optimizca/servicenow-grafana)
![GitHub all releases](https://img.shields.io/github/downloads/optimizca/servicenow-grafana/total)

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
- [UI Actions Setup Instructions](#ui-actions-setup-instructions)
- [Variables](https://github.com/optimizca/servicenow-grafana/wiki/Variables)

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

**_The new user's Time zone MUST be set to "GMT" and they need the role of "admin"._**

## Step 2: Install Grafana Plugin

### Quick Install:

Option based scripts written for each operating system give you the option to install Grafana + our plugin or just our plugin in your existing Grafana. [Click here for Quick Install Setup](https://github.com/optimizca/servicenow-grafana/tree/main/scripts)

### Manual Install:

Download or clone the repository and move the unziped folder into your Grafana plugins folder, then restart Grafana.

## Step 3: Grafana Datasource Configuration

1. Open Grafana Configuration => Data Sources
2. Click on the "Add data source" Button
3. Search for and add our "servicenow-optimiz-plugin"
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
5. Add an Authorization header using your new key. **_Don't fortget to hit the plus button when your done_**

```
Name = Authorization
Value = Bearer <API_KEY>
```

![Button Panel Options](https://github.com/optimizca/servicenow-grafana/raw/main/readme_images/button_options.png)

6. Change the URL field pictured above to reflect the FQDN your grafana instance is currently using. **_Please only change the domain and nothing after the port number. The /api portion should remain the same._**
