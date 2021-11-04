# ServiceNow Grafana Plugin

<p align="center">
  <img src="https://www.servicenow.com/content/dam/now-www/en-us/images/global-nav/logo/servicenow-header-logo.svg" alt="drawing" width="200" height="100"/>
  <img src="https://www.optimiz.ca/wp-content/uploads/2019/10/Artboard-2-copy.png" alt="drawing" width="200" height="100"/>
</p>

![Latest Version Number](https://img.shields.io/badge/Version-1.1.4-orange)
![GitHub last commit](https://img.shields.io/github/last-commit/optimizca/servicenow-grafana)
![GitHub all releases](https://img.shields.io/github/downloads/optimizca/servicenow-grafana/total)

# Table of Content
- [Change Notes](#change-notes)
- [Supported ServiceNow Versions](#supported-serviceNow-versions)
- [Datasource Instructions](#datasource-instructions)
- [UI Actions Setup Instructions](#ui-actions-setup-instructions)
- [Variables](#variables)

# Change Notes
Breaking changes are distinguised by this symbol: 🔧
- V1.1.4
  - Dashboards are now included with the plugin. Provisioning of dashboards has been discontinued.
  - The Novatec-SDG-Panel is now included with the plugin
  - Default Logo URL has been updated with a new image
- V1.1.3
  - Filled some of the datasource config values by default
  - Cache timeout is now fully controlled by the user
    - Global cache time is set in the datasource config and defaults to 60s
    - The global cache time can also be overrode in each panel for greater control over your cache
- V1.1.2
  - Added ability to fire UI Actions
  - Datasource config settings modified (You will see updated instructions inside the datasource) 🔧
- v1.1.1
  - Added limit field to generic variable query
  - Added global image variable. Set it's value inside the datasource settings
- v1.1.0
  - Fixed bug in Sysparam Query field where AND/OR selection had no default 🔧

# Supported ServiceNow Versions
- Rome
- Quebec
- Paris

# Datasource Instructions

1. Enter the url of your ServiceNow instance with the api included <br/>
Ex. **https://<instance_name>.service-now.com/api/snc/grafana_api**
2. Toggle on the 'Basic Auth' & 'With Credentials' switches
3. Enter your username and password for the ServiceNow instance
4. Click on 'Save & Test' at the bottom to ensure a working connection

# UI Actions Setup Instructions
If you would like to make use of our UI Actions dashboard, there are a few fields that will need to be updated for each instance.

1. Navigate to the plugins menu and search for the button panel shown below. Click into the panel and hit the install button.
![Install Button Panel](/readme_images/install_button.png)
![Install Button Panel2](/readme_images/install_button2.png)
2. Create a Grafana API key using the ***Admin*** role. Key name and TTL are up to you.
![API Key Options](/readme_images/create_api_key.png)
3. Once you hit add, copy the API key shown on screen.
![Copy API Key](/readme_images/copy_api_key.png)
4. Navigate to the UI Actions dashboard inside the Drilldown Dashboards folder. Then edit the button panel.
5. Add an Authorization header using your new key. ***Don't fortget to hit the plus button when your done***
```
Name = Authorization
Value = Bearer <API_KEY>
```
![Button Panel Options](/readme_images/button_options.png)
6. Change the URL field pictured above to reflect the FQDN your grafana instance is currently using. ***Please only change the domain and nothing after the port number. The /api portion should remain the same.***

# Variables

There are 2 important fields when creating a new dashboard variable. ***Namespace*** and ***Query***

<table>
  <tr>
    <th>Namespace</th>
    <th>Query Description</th>
    <th>Query</th>
    <th>Query Fields</th>
    <th>Field Seperator</th>
  </tr>
  <tr>
    <td>metric_names</td>
    <td>Retrieves a list of all metrics for the given ci(s)</td>
    <td><code>a20ce336db42b010d41e9fd2ca96199e</code></td>
    <td><ol><li>One or many CI SysID  <sup>R</sup></li></ol></td>
    <td>,</td>
  </tr>
  <tr>
    <td>golden_metric_names</td>
    <td>Retrieves a list of KPIs for the given ci(s)</td>
    <td><code>a20ce336db42b010d41e9fd2ca96199e</code></td>
    <td><ol><li>One or many CI SysID  <sup>R</sup></li></ol></td>
    <td>,</td>
  </tr>
  <tr>
    <td>custom_kpis</td>
    <td>Retrieves a list of Preset KPIs for the given ci(s). Results will vary based on CI Class</td>
    <td><code>a20ce336db42b010d41e9fd2ca96199e</code></td>
    <td><ol><li>One or many CI SysID  <sup>R</sup></li></ol></td>
    <td>,</td>
  </tr>
  <tr>
    <td>generic</td>
    <td>Create your own custom list based on the table, columns, and sysparam provided. The first column field will determine the display value users see and the second column is the actual value used in the list. If you need to force a column to be read as display value add suffix <code>:d</code> and for actual value add suffix <code>:v</code>. <a href="https://docs.servicenow.com/bundle/quebec-platform-administration/page/administer/field-administration/concept/c_DisplayValues.html">Learn more about Display vs Actual values here</a><br/><b>FYI dotwalking will only work if you use the <code>:d</code> suffix</b></td>
    <td><code>em_alert||group_source||group_source||state!=Closed||1000</code></td>
    <td><ol>
      <li>Table Name  <sup>R</sup></li>
      <li>Display Table Column  <sup>R</sup></li>
      <li>Value Table Column  <sup>R</sup></li>
      <li>Sysparam Query</li>
      <li>Limit</li>
    </ol></td>
    <td>||</td>
  </tr>
  <tr>
    <td>nested_cis</td>
    <td>Retrieves the nested/related CIs that are shown in the topology panel. Values should match your topology query for best results.</td>
    <td><code>4577fd32db1627002ef1400e0b961921||1||1||parent.sys_class_nameNOT INsn_agent_cmdb_ci_agent</code></td>
    <td><ol>
      <li>CI SysID  <sup>R</sup></li>
      <li>Parent Depth  <sup>R</sup></li>
      <li>Child Depth  <sup>R</sup></li>
      <li>Sysparam Query</li>
    </ol></td>
    <td>||</td>
  </tr>
  <tr>
    <td>nested_classes</td>
    <td>Retrieves the Classes of all nested/related CIs that are shown in the topology panel. Values should match your topology query for best results.</td>
    <td><code>4577fd32db1627002ef1400e0b961921||1||1||parent.sys_class_nameNOT INsn_agent_cmdb_ci_agent</code></td>
    <td><ol>
      <li>CI SysID  <sup>R</sup></li>
      <li>Parent Depth  <sup>R</sup></li>
      <li>Child Depth  <sup>R</sup></li>
      <li>Sysparam Query</li>
    </ol></td>
    <td>||</td>
  </tr>
</table>
