import { getBackendSrv } from '@grafana/runtime';

import { FieldType, MutableDataFrame } from '@grafana/data';

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
import * as utils from './Utils';
export class APIClient {
  requestOptions: { headers: any; withCredentials: boolean; url: string };
  constructor(headers: any, withCredentials: boolean, url: string) {
    this.requestOptions = {
      headers: headers,
      withCredentials: withCredentials,
      url: url,
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
    const dataFrames = result.data.map(data => {
      let seriesName = data.source + ':' + data.metricName;
      if (data.type.length > 0) {
        seriesName += ':' + data.type;
      }
      return utils.parseResponse(data.datapoints, seriesName, target, [], FieldType.number);
    });

    return dataFrames;
  }
  mapAnamMetricsResponseToFrame(result, target, options) {
    const dataFrames = result.data.map(data => {
      let sourceTarget = utils.replaceTargetUsingTemplVars(target.source, options.scopedVars);
      let resourceNameTarget = utils.replaceTargetUsingTemplVars(target.metricType, options.scopedVars);
      let metricNameTarget = utils.replaceTargetUsingTemplVars(target.metricName, options.scopedVars);

      let seriesName = sourceTarget + ':' + metricNameTarget + ':' + resourceNameTarget + ':' + data.type;
      if (data.type === 'UPPER' || data.type === 'LOWER') {
        seriesName = data.type;
      }
      return utils.parseAnomResponse(data.data, seriesName, target, [], FieldType.number);
    });

    return dataFrames;
  }
  mapTextResponseToFrame(result, target) {
    const frame = new MutableDataFrame({
      fields: [],
    });
    if (utils.debugLevel() === 1) {
      utils.printDebug('You are Inside mapTextResponseToFrame');
    }
    console.log(result);
    if (!(result.data.length > 0)) {
      return [];
    }
    let filedNames = Object.keys(result.data[0]);
    for (var i = 0; i < filedNames.length; i++) {
      var values = result.data.map(d => d[filedNames[i]]);
      let fieldType = FieldType.string;
      if (values.length >= 0) {
        fieldType = utils.getFiledType(values[0], filedNames[i]);
      }
      frame.addField({
        name: filedNames[i],
        type: fieldType,
        values: values,
      });
    }
    if (utils.debugLevel() === 1) {
      utils.printDebug(frame);
    }
    return frame;
  }
}
