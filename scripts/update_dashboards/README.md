# Update Dashboards

This script will automate the dashboard importing process for datasource included dashboards. It should work for all datasource plugins that have included dashboards.

## Background

Some datasource plugins offer included dashboards for users to get up and running quickly.
However the interface for importing these dashboards requires the user to click a button for each dashboard which can be tedious.
If the plugin updates the included dashboards, users must repeat this process in order to get the updated dashboards.

## Configuration

This script pulls its configuration data from the config.json file. You can use either basic auth or token auth, but token auth takes priority.

```json
{
  "config": {
    "host": "http://localhost:3000",
    "user": "admin",
    "password": "admin",
    "api_key": "glsa_aupVtDk6vmaLTpnqBrDgdojn8CyNjYwo_8671c83f",
    "plugin_id": "optimiz-servicenow-datasource",
    "plugin_name": "Optimiz-ServiceNow Plugin"
  }
}
```

| Key         | Required | Description                                                                                                                              |
| ----------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| host        | Y        | The full URL to your grafana instance including protocol and port                                                                        |
| user        | N        | Required for basic auth. The username you login to grafana with                                                                          |
| password    | N        | Required for basic auth. The password for the user you login to grafana with                                                             |
| api_key     | N        | Required for token auth. This can be the now deprecated api key from grafana or a new service account token from grafana                 |
| plugin_id   | Y        | The datasource plugin's id. This can be found in the URL of the plugins page either in grafana itself or on the official plugins website |
| plugin_name | Y        | The datasource plugin's name. This is the readable name most people will know a plugin by.                                               |

## Installation

```
pip install -r requirements.txt
```

## Run the Script

```
python3 main.py
```

Then you can check the update_dashboards.log file for results