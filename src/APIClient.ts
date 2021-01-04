import { BackendSrvRequest, getBackendSrv } from "@grafana/runtime";
var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

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
}
