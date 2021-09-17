import { getBackendSrv } from '@grafana/runtime';
import { FieldType, MutableDataFrame } from '@grafana/data';
import cache from 'memory-cache';
import { Pair } from 'types';

var _lodash = require('lodash');
import _ from 'lodash';

var _lodash2 = _interopRequireDefault(_lodash);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
import * as utils from './Utils';
export class APIClient {
  requestOptions: { headers: any; withCredentials: boolean; url: string };
  cache: any;
  lastCacheDuration: number | undefined;
  constructor(headers: any, withCredentials: boolean, url: string) {
    this.requestOptions = {
      headers: headers,
      withCredentials: withCredentials,
      url: url,
    };
    this.cache = new cache.Cache();
  }
  async cachedGet(
    cacheDurationSeconds: number,
    method: string,
    path: string,
    params: Array<Pair<string, string>>,
    headers?: Array<Pair<string, string>>,
    body?: string,
    options?: any
  ) {
    if (!cacheDurationSeconds) {
      return getBackendSrv().datasourceRequest(options);
      //return await this.get(method, path, params, headers, body);
    }

    let cacheKey = this.requestOptions.url + path;

    cacheKey += '/body/' + body;
    var cacheKeyNoTime = cacheKey;
    if (params && Object.keys(params).length > 0) {
      cacheKey =
        cacheKey +
        (cacheKey.search(/\?/) >= 0 ? '&' : '?') +
        params.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&');
    }

    if (this.lastCacheDuration !== cacheDurationSeconds) {
      this.cache.del(cacheKey);
    }
    this.lastCacheDuration = cacheDurationSeconds;

    var cachedItem = this.cache.get(cacheKey);

    if (!cachedItem) {
      var cacheKeys = this.cache.keys();
      cacheKeys.map((key) => {
        if (key.includes(cacheKeyNoTime)) {
          var cacheTimeParams: any = key.substring(key.indexOf('?') + 1, key.length);
          cacheTimeParams = cacheTimeParams.split('&');
          var cacheStartTime = cacheTimeParams[0].substring(
            cacheTimeParams[0].indexOf('=') + 1,
            cacheTimeParams[0].length
          );
          var cacheEndTime = cacheTimeParams[1].substring(
            cacheTimeParams[1].indexOf('=') + 1,
            cacheTimeParams[1].length
          );
          var timeParams: any = cacheKey.substring(cacheKey.indexOf('?') + 1, cacheKey.length);
          timeParams = timeParams.split('&');
          var startTime = timeParams[0].substring(timeParams[0].indexOf('=') + 1, timeParams[0].length);
          var endTime = timeParams[1].substring(timeParams[1].indexOf('=') + 1, timeParams[1].length);
          if (cacheStartTime - startTime <= 60000 && cacheEndTime - endTime <= 60000) {
            console.log('cache item found in timerange');
            cachedItem = this.cache.get(key);
          }
        }
      });
    }

    if (cachedItem) {
      return Promise.resolve(cachedItem);
    }

    const result = getBackendSrv().datasourceRequest(options);
    //const result = await this.get(method, path, params, headers, body);
    this.cache.put(cacheKey, result, cacheDurationSeconds * 1000);

    return result;
  }
  request(options) {
    options.withCredentials = this.requestOptions.withCredentials;
    options.headers = this.requestOptions.headers;
    let apiPath = options.url;
    options.url = this.requestOptions.url + apiPath;
    let paramStartIndex = apiPath.indexOf('?');
    if (paramStartIndex === -1) paramStartIndex = apiPath.length;
    let path = apiPath.substring(0, paramStartIndex);
    var paramsObject: Pair<string, string>[] = [];
    if (options.url.indexOf('?') !== -1) {
      let paramStr = options.url.substring(options.url.indexOf('?') + 1, options.url.length);
      let paramArray = paramStr.split('&');
      paramArray.map((value) => {
        let key = value.substring(0, value.indexOf('='));
        let keyValue = value.substring(value.indexOf('=') + 1, value.length);
        let pair: Pair<string, string> = [key, keyValue];
        paramsObject.push(pair);
      });
    }
    return this.cachedGet(60, options.method, path, paramsObject, options.headers, options.data, options);
    //return getBackendSrv().datasourceRequest(options);
  }
  mapChecksToValue(result) {
    return _lodash2.default.map(result.data, function (d, i) {
      if (typeof d.name !== 'undefined' && typeof d.id !== 'undefined') {
        return { text: d.name, value: d.id };
      } else {
        var keys = Object.keys(d);
        return { label: d[keys[0]], value: keys[1] ? d[keys[1]] : d[keys[0]] };
      }
    });
  }
  mapChecksToValuePlusSuffix(result) {
    return _lodash2.default.map(result.data, function (d, i) {
      var keys = Object.keys(d);
      return { label: d[keys[0]], value: keys[1] ? d[keys[1]] : d[keys[0]], suffix: d[keys[2]] };
    });
  }
  mapValueSuffixToColumns(result) {
    var displayArray = _lodash2.default.map(result, (d, i) => {
      return { label: d.label + ':display', value: d.value + ':d' };
    });
    var valueArray = _lodash2.default.map(result, (d, i) => {
      return { label: d.label + ':value', value: d.value + ':v' };
    });
    var finalResult = displayArray.concat(valueArray);
    finalResult = _.orderBy(finalResult, ['label'], ['asc']);
    return finalResult;
  }
  mapValueAsSuffix(result) {
    var options = _lodash2.default.map(result, (d) => {
      var option: any = { label: d.label, value: d.value, description: d.value };
      if (typeof d.options !== 'undefined') {
        option.options = _lodash2.default.map(d.options, (n) => {
          return { label: n.label, value: n.value, description: n.value };
        });
        option.options = _.orderBy(option.options, ['label'], ['asc']);
      }
      return option;
    });
    options = _.orderBy(options, ['label'], ['asc']);
    return options;
  }
  mapSuffixToLabel(result) {
    return _lodash2.default.map(result, (d) => {
      return { label: d.label + ' (' + d.suffix + ')', value: d.value };
    });
  }
  appendInstanceNameToResponse(response, instanceName) {
    response.data = _lodash2.default.map(response.data, function (d, i) {
      d.instanceName = instanceName;
      return d;
    });
    return response;
  }
  // mapTagsToValue(result) {
  //   let tagsList: any[] = [];
  //   for (var d = 0; d < result.data.length; d++) {
  //     for (var v = 0; v < result.data[d].values.length; v++) {
  //       let tagValue = result.data[d].key.name + ' - ' + result.data[d].values[v].value;
  //       let tagId = result.data[d].values[v].id;
  //       tagsList.push({ text: tagValue, value: tagId });
  //     }
  //   }
  //   return tagsList;
  // }
  mapToTextValue(result) {
    return _lodash2.default.map(result.data, function (d, i) {
      if (d && d.text && d.value) {
        return { text: d.text, value: d.value };
      } else if (_lodash2.default.isObject(d)) {
        return { text: d, value: i };
      }
      return { text: d, value: d };
    });
  }
  mapOutageResponseToFrame(result, target) {
    return result.data.map((data) => {
      let ciName = data.ci;
      console.log(ciName);
      return utils.parseResponse(data.datapoints, ciName, target, [], FieldType.string);
    });
  }
  mapTrendResponseToFrame(result, target) {
    return result.data.map((data) => {
      return utils.parseResponse(data.datapoints, '', target, [], FieldType.number);
    });
  }
  mapMetricsResponseToFrame(result, target) {
    return result.data.map((data) => {
      let seriesName = data.source + ':' + data.metricName;
      if (data.type.length > 0) {
        seriesName += ':' + data.type;
      }
      return utils.parseResponse(data.datapoints, seriesName, target, [], FieldType.number);
    });
  }
  mapAnamMetricsResponseToFrame(result, target, options) {
    return result.data.map((data) => {
      let sourceTarget = utils.replaceTargetUsingTemplVars(target.source, options.scopedVars);
      let resourceNameTarget = utils.replaceTargetUsingTemplVars(target.metricType, options.scopedVars);
      let metricNameTarget = utils.replaceTargetUsingTemplVars(target.metricName, options.scopedVars);

      let seriesName = sourceTarget + ':' + metricNameTarget + ':' + resourceNameTarget + ':' + data.type;
      if (data.type === 'UPPER' || data.type === 'LOWER') {
        seriesName = data.type;
      }
      return utils.parseAnomResponse(data.data, seriesName, target, [], FieldType.number);
    });
  }
  mapTextResponseToFrame(result) {
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
      var values = result.data.map((d) => d[filedNames[i]]);
      if (filedNames[i] === 'new' || filedNames[i] === 'value:display') {
        values = this.sanitizeValues(values);
      }
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

  sanitizeValues(values) {
    var sanitizedArray: any[] = [];
    values.map((value) => {
      while (value.indexOf('[code]') !== -1) {
        var strBeforeCode = value.substring(0, value.indexOf('[code]'));
        var strAfterCode = value.substring(value.indexOf('[/code]') + 7, value.length);
        if (value.indexOf('<a') !== -1) {
          var aElement = value.substring(value.indexOf('<a'), value.indexOf('</a>', value.indexOf('<a')));
          var aValue = aElement.substring(aElement.indexOf('>') + 1, aElement.length);
          if (aValue.indexOf('<') !== -1) aValue = aValue.substring(0, aValue.indexOf('<'));
          value = strBeforeCode + aValue + strAfterCode;
        } else {
          value = strBeforeCode + strAfterCode;
        }
      }
      sanitizedArray.push(value);
    });
    return sanitizedArray;
  }
}
