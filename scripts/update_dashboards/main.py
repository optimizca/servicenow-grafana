import asyncio
import time
import sys
import logging
import json
import requests
from requests.auth import HTTPBasicAuth
from datetime import timedelta

class BearerAuth(requests.auth.AuthBase):
    def __init__(self, token):
        self.token = token
    def __call__(self, r):
        r.headers["authorization"] = "Bearer " + self.token
        return r

logging.basicConfig(filename='update_dashboards.log', filemode='w', format='%(asctime)s - %(message)s', level=logging.DEBUG)
logging.info("START")
start = time.time()

CONFIG_FILE = "./config.json"

if(sys.argv[1:]):
    CONFIG_FILE = sys.argv[1]

config = {}
try:
    with open(CONFIG_FILE) as json_file:
        json_file = json.load(json_file)
        config = json_file["config"]
        host = config["host"]
        user = config["user"]
        password = config["password"]
        api_key = config["api_key"]
        plugin_id = config["plugin_id"]
        plugin_name = config["plugin_name"]
        auth = {}
        if len(api_key) > 0:
            auth = BearerAuth(api_key)
        else:
            auth = HTTPBasicAuth(user, password)
except Exception as e:
    raise e

async def getListOfPluginDashboards():
    logging.debug("getListOfPluginDashboards")
    requestUrl = f"{host}/api/plugins/{plugin_id}/dashboards"
    response = requests.get(requestUrl, auth = auth)
    results = response.json()
    logging.debug("found %s plugin dashboards", len(results))
    dashboardList = []
    for r in results:
        dashboardList.append({"path": r["path"]})
    return dashboardList

async def importDashboards(listOfDashboards):
    logging.debug("importDashboards")
    for d in listOfDashboards:
        # p refers to the POST data payload
        p = {}
        p["pluginId"] = plugin_id
        p["path"] = d["path"]
        p["overwrite"] = True
        p["inputs"] = [{"name": "*", "type": "datasource", "pluginId": plugin_id, "value": plugin_name}]
        requestUrl = f"{host}/api/dashboards/import"
        response = requests.post(requestUrl, json = p, auth = auth)
        logging.debug("%s - dashboard: %s - status: %s", requestUrl, p["path"], response.status_code)


async def main():
    # Run the main function here
    listOfDashboards = await getListOfPluginDashboards()
    await importDashboards(listOfDashboards)
    if sys.platform == "win32":
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
asyncio.run(main())


end = time.time()
total_time = end - start
logging.info("It took {} seconds to get results".format(total_time))
print("It took {} seconds to get results".format(total_time))
logging.info("END")