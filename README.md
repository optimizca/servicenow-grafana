# ServiceNow Grafana Plugin

<p align="center">
  <img src="https://www.servicenow.com/content/dam/now-www/en-us/images/global-nav/logo/servicenow-header-logo.svg" alt="drawing" width="200" height="100"/>
  <img src="https://www.optimiz.ca/wp-content/uploads/2019/10/Artboard-2-copy.png" alt="drawing" width="200" height="100"/>
</p>

![Latest Version Number](https://img.shields.io/badge/Version-1.2.1-orange)
![GitHub last commit](https://img.shields.io/github/last-commit/optimizca/servicenow-grafana)
![GitHub all releases](https://img.shields.io/github/downloads/optimizca/servicenow-grafana/total)

# Important Information. Please Read!

- The ServiceNow user account you enter when setting up the datasource MUST be set to the GMT timezone inside of ServiceNow.

# Table of Content

- [Change Notes 🔧](https://github.com/optimizca/servicenow-grafana/blob/main/CHANGELOG.md)
- [Supported ServiceNow Versions](#supported-serviceNow-versions)
- [Datasource Instructions](#datasource-instructions)
- [UI Actions Setup Instructions](#ui-actions-setup-instructions)
- [Variables](https://github.com/optimizca/servicenow-grafana/wiki/Variables)

# Supported ServiceNow Versions

- Rome
- Quebec
- Paris

# Datasource Instructions

Please find these instructions listed at the top of our datasource configuration page inside Grafana.

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
