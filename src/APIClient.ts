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
  cacheTimeout: number;
  constructor(headers: any, withCredentials: boolean, url: string, cacheTimeout: number) {
    this.requestOptions = {
      headers: headers,
      withCredentials: withCredentials,
      url: url,
    };
    this.cacheTimeout = cacheTimeout;
    this.cache = new cache.Cache();
  }
  async cachedGet(
    method: string,
    path: string,
    params: Array<Pair<string, string>>,
    cacheDurationSeconds: number | null,
    headers?: Array<Pair<string, string>>,
    body?: string,
    options?: any
  ) {
    var cacheTime = 60;
    if (typeof cacheDurationSeconds === 'undefined' || !cacheDurationSeconds) {
      cacheTime = this.cacheTimeout;
    } else {
      cacheTime = cacheDurationSeconds;
    }
    console.log('using cache timeout: ', cacheTime);

    let cacheKey = this.requestOptions.url + path;

    cacheKey += '/body/' + body;
    var cacheKeyNoTime = cacheKey;
    if (params && Object.keys(params).length > 0) {
      cacheKey =
        cacheKey +
        (cacheKey.search(/\?/) >= 0 ? '&' : '?') +
        params.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&');
    }

    if (this.lastCacheDuration !== cacheTime) {
      this.cache.del(cacheKey);
    }
    this.lastCacheDuration = cacheTime;

    var cachedItem = this.cache.get(cacheKey);

    if (!cachedItem && cacheKey.includes('?')) {
      var cacheKeys = this.cache.keys();
      cacheKeys.map((key) => {
        if (key.includes(cacheKeyNoTime) && key.includes('?')) {
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
          var startTimeDifference = startTime - cacheStartTime;
          var endTimeDifference = endTime - cacheEndTime;
          if (startTimeDifference <= cacheTime * 1000 && endTimeDifference <= cacheTime * 1000) {
            console.log('cache item found in timerange');
            cachedItem = this.cache.get(key);
          }
        }
      });
    }

    if (cachedItem) {
      console.log('cache item found');
      return Promise.resolve(cachedItem);
    }

    var paramString = '?' + params.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&');

    var result: any = '';
    if (method === 'GET') {
      result = getBackendSrv().get(this.requestOptions.url + path, paramString);
    } else if (method === 'POST') {
      result = getBackendSrv().post(this.requestOptions.url + path + paramString, body);
    }

    // Deprecated method
    //const result = getBackendSrv().datasourceRequest(options);

    this.cache.put(cacheKey, result, cacheTime * 1000);

    return result;
  }
  request(options) {
    options.withCredentials = this.requestOptions.withCredentials;
    options.headers = this.requestOptions.headers;
    let apiPath = options.url;
    options.url = this.requestOptions.url + apiPath;
    let paramStartIndex = apiPath.indexOf('?');
    if (paramStartIndex === -1) {
      paramStartIndex = apiPath.length;
    }
    let path = apiPath.substring(0, paramStartIndex);
    var paramsObject: Array<Pair<string, string>> = [];
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
    if (options.cacheOverride) {
      let cacheSecondIndex = options.cacheOverride.indexOf('s');
      let cacheMinuteIndex = options.cacheOverride.indexOf('m');
      if (cacheSecondIndex !== -1) {
        options.cacheOverride = parseInt(options.cacheOverride.substring(0, cacheSecondIndex), 10);
      } else if (cacheMinuteIndex !== -1) {
        options.cacheOverride = parseInt(options.cacheOverride.substring(0, cacheMinuteIndex), 10) * 60;
      }
    }
    return this.cachedGet(
      options.method,
      path,
      paramsObject,
      options.cacheOverride,
      options.headers,
      options.data,
      options
    );
  }
  mapAlertTags(response) {
    var tags: any = [];
    response.map((d) => {
      if (typeof d.additional_info === 'undefined') {
        return;
      }
      var additional_info = JSON.parse(d.additional_info);
      var keys = Object.keys(additional_info);
      var tagKeys = keys.filter((k) => {
        return k.includes('tbac-');
      });
      tagKeys.map((k) => {
        tags.push({ key: k, value: additional_info[k] });
      });
    });
    tags = tags.filter(
      (option, index, self) => index === self.findIndex((t) => t.value === option.value && t.key === option.key)
    );
    return tags;
  }
  mapChecksToValue(result) {
    return _lodash2.default.map(result, function (d, i) {
      if (typeof d.name !== 'undefined' && typeof d.id !== 'undefined') {
        if (d.name === '' || d.name === null) {
          d.name = 'NULL';
        }
        if (d.id === '' || d.id === null) {
          d.id = 'NULL';
        }
        return { text: d.name, value: d.id };
      } else {
        var keys = Object.keys(d);
        if (d[keys[0]] === '' || d[keys[0]] === null) {
          d[keys[0]] = 'NULL';
        }
        if (keys[1] && (d[keys[1]] === '' || d[keys[1]] === null)) {
          d[keys[1]] = 'NULL';
        }
        return { label: d[keys[0]], value: keys[1] ? d[keys[1]] : d[keys[0]] };
      }
    });
  }
  mapChecksToValuePlusSuffix(result) {
    return _lodash2.default.map(result, function (d, i) {
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
    response = _lodash2.default.map(response, function (d, i) {
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
    return _lodash2.default.map(result, function (d, i) {
      if (d && d.text && d.value) {
        return { text: d.text, value: d.value };
      } else if (_lodash2.default.isObject(d)) {
        return { text: d, value: i };
      }
      return { text: d, value: d };
    });
  }
  mapOutageResponseToFrame(result, target) {
    return result.map((data) => {
      let ciName = data.ci;
      console.log(ciName);
      return utils.parseResponse(data.datapoints, ciName, target, [], FieldType.string);
    });
  }
  mapTrendResponseToFrame(result, target) {
    return result.map((data) => {
      return utils.parseResponse(data.datapoints, '', target, [], FieldType.number);
    });
  }
  mapMetricsResponseToFrame(result, target) {
    return result.map((data) => {
      let seriesName = data.source + ':' + data.metricName;
      if (data.type.length > 0) {
        seriesName += ':' + data.type;
      }
      return utils.parseResponse(data.datapoints, seriesName, target, [], FieldType.number);
    });
  }
  mapAnamMetricsResponseToFrame(result, target) {
    var response = result.map((r) => {
      let ciName = r.ciName;
      let metricName = r.metricName;

      return r.data.map((data) => {
        let seriesName = ciName + ':' + metricName + ':' + data.type;
        if (result.length === 1 && (data.type === 'UPPER' || data.type === 'LOWER')) {
          seriesName = data.type;
        }
        return utils.parseAnomResponse(data.data, seriesName, target, [], FieldType.number);
      });
    });
    // Flattens the array
    response = [].concat.apply([], response);
    return response;
  }
  mapTextResponseToFrame(result) {
    const frame = new MutableDataFrame({
      fields: [],
    });
    if (utils.debugLevel() === 1) {
      utils.printDebug('You are Inside mapTextResponseToFrame');
    }
    console.log(result);
    if (!(result.length > 0)) {
      return [];
    }
    result = result.map((r) => {
      if (r.additional_info) {
        var additonal_info = JSON.parse(r.additional_info);
        var keys = Object.keys(additonal_info);
        var tags = keys.filter((k) => {
          return k.includes('tbac-');
        });
        r.tbac_data = {};
        for (var j = 0; j < tags.length; j++) {
          r.tbac_data[tags[j]] = additonal_info[tags[j]];
        }
        r.tbac_data = JSON.stringify(r.tbac_data);
        return r;
      } else {
        return r;
      }
    });
    console.log(result);
    let filedNames = Object.keys(result[0]);
    for (var i = 0; i < filedNames.length; i++) {
      var values = result.map((d) => d[filedNames[i]]);
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
          if (aValue.indexOf('<') !== -1) {
            aValue = aValue.substring(0, aValue.indexOf('<'));
          }
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
