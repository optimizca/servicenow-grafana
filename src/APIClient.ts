import { getBackendSrv } from "@grafana/runtime";

import { FieldType,MutableDataFrame } from "@grafana/data";

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
import * as utils from "./Utils";
export class APIClient {
  requestOptions: { headers: any; withCredentials: boolean; url: string };
  constructor(headers: any, withCredentials: boolean, url: string) {
    this.requestOptions = {
      headers: headers,
      withCredentials: withCredentials,
      url: url
    };
  }

  request(options) {
    options.withCredentials = this.requestOptions.withCredentials;
    options.headers = this.requestOptions.headers;
    let apiPath = options.url;
    options.url = this.requestOptions.url + apiPath;
    return getBackendSrv().datasourceRequest(options);
  }
  mapToTextValue(result) {
    return _lodash2.default.map(result.data, function(d, i) {
      if (d && d.text && d.value) {
        return { text: d.text, value: d.value };
      } else if (_lodash2.default.isObject(d)) {
        return { text: d, value: i };
      }
      return { text: d, value: d };
    });
  }
  mapMetricsResponseToFrame(result, target) {
    const dataFrames = result.data.map(data => utils.parseResponse(
      data.datapoints,
      data.source,
      target,
      [],
      FieldType.number
    ));
    return dataFrames;
 
  }
  mapTextResponseToFrame(result, target) {
    const frame = new MutableDataFrame({
      fields: []
    });
  utils.printDebug("You are Inside mapTextResponseToFrame") 
   let filedNames=Object.keys(result.data[0]);
   for (var i = 0; i < filedNames.length; i++) {
        var values = result.data.map(d => d[filedNames[i]]
      );
      let fieldType =FieldType.string
      if(values.length >=0)
        fieldType =utils.getFiledType(values[0],filedNames[i])
      frame.addField({
        name: filedNames[i],
        type: fieldType,
        values: values
      });
   }
    return frame;
  }
  

}
