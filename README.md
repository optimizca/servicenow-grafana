# ServiceNow Grafana Plugin

<p align="center">
  <img src="https://www.servicenow.com/content/dam/now-www/en-us/images/global-nav/logo/servicenow-header-logo.svg" alt="drawing" width="200" height="100"/>
  <img src="https://www.optimiz.ca/wp-content/uploads/2019/10/Artboard-2-copy.png" alt="drawing" width="200" height="100"/>
</p>

## Datasource Instructions

---

1. Enter the url of your ServiceNow instance with the api included <br/>
Ex. **https://<instance_name>.service-now.com/api/snc/grafana_api**
2. Toggle on the 'Basic Auth' & 'With Credentials' switches
3. Enter your username and password for the ServiceNow instance
4. Click on 'Save & Test' at the bottom to ensure a working connection

## Variables

---

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
    <td><code>em_alert||group_source||group_source||state!=Closed</code></td>
    <td><ol>
      <li>Table Name  <sup>R</sup></li>
      <li>Display Table Column  <sup>R</sup></li>
      <li>Value Table Column  <sup>R</sup></li>
      <li>Sysparam Query</li>
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