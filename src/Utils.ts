import { getTemplateSrv } from '@grafana/runtime';

import {
  ArrayVector,
  DataFrame,
  DataQuery,
  Field,
  FieldType,
  TIME_SERIES_TIME_FIELD_NAME,
  TIME_SERIES_VALUE_FIELD_NAME,
} from '@grafana/data';

export function convertMsTimeToMin(value) {
  return Math.round(value.getTime() / (1000 * 60));
}

import { TIME_FILED_NAMES } from './Constants';

export function replaceTargetUsingTemplVars(target, scopedVars) {
  let replacedValue = getTemplateSrv().replace(target, scopedVars, 'csv');
  let commaIndex: number = replacedValue.indexOf(',');
  if (commaIndex >= 0) {
    while (commaIndex >= 0) {
      replacedValue = replacedValue.replace(',', '|');
      commaIndex = replacedValue.indexOf(',');
    }
    replacedValue = '(' + replacedValue + ')';
  }
  if (replacedValue.startsWith('(') && replacedValue.endsWith(')')) {
    return '/' + replacedValue + '/';
  }

  return replacedValue;
}

export function replaceTargetUsingTemplVarsCSV(target, scopedVars) {
  return getTemplateSrv().replace(target, scopedVars, 'csv');
}

export function debugLevel() {
  return 1;
}

export function parseResponse(
  timeseries,
  seriesName,
  target: DataQuery,
  valueMappings?: any[],
  fieldType?: FieldType
): DataFrame {
  const timeFiled: Field = {
    name: TIME_SERIES_TIME_FIELD_NAME,
    type: FieldType.time,
    config: {
      custom: {},
    },
    values: new ArrayVector<number>(timeseries.map((p) => p[1])),
  };

  let values: ArrayVector<number> | ArrayVector<string>;
  if (fieldType === FieldType.string) {
    values = new ArrayVector<string>(timeseries.map((p) => p[0]));
  } else {
    values = new ArrayVector<number>(timeseries.map((p) => p[0]));
  }

  const valueFiled: Field = {
    name: TIME_SERIES_VALUE_FIELD_NAME,
    type: fieldType ?? FieldType.number,
    labels: {},
    config: {
      displayName: seriesName,
      custom: {},
    },
    values,
  };

  const fields: Field[] = [timeFiled, valueFiled];

  const frame: DataFrame = {
    name: seriesName,
    refId: target.refId,
    fields,
    length: timeseries.length,
  };

  return frame;
}
export function parseAnomResponse(
  timeseries,
  seriesName,
  target: DataQuery,
  valueMappings?: any[],
  fieldType?: FieldType
): DataFrame {
  const timeFiled: Field = {
    name: TIME_SERIES_TIME_FIELD_NAME,
    type: FieldType.time,
    config: {
      custom: {},
    },
    values: new ArrayVector<number>(timeseries.map((p) => p.x)),
  };

  let values: ArrayVector<number> | ArrayVector<string>;
  if (fieldType === FieldType.string) {
    values = new ArrayVector<string>(timeseries.map((p) => p.y));
  } else {
    values = new ArrayVector<number>(timeseries.map((p) => p.y));
  }

  const valueFiled: Field = {
    name: TIME_SERIES_VALUE_FIELD_NAME,
    type: fieldType ?? FieldType.number,
    labels: {},
    config: {
      displayName: seriesName,
      custom: {},
    },
    values,
  };

  const fields: Field[] = [timeFiled, valueFiled];

  const frame: DataFrame = {
    name: seriesName,
    refId: target.refId,
    fields,
    length: timeseries.length,
  };

  return frame;
}
export function printDebug(value) {
  if (debugLevel() === 1) {
    console.log(value);
  }
}

//this function is used to map a text based field type to its type
export function getFiledType(value, filedName) {
  //console.log(filedName);
  if (TIME_FILED_NAMES.includes(filedName)) {
    return FieldType.time;
  }

  if (typeof value === 'number') {
    return FieldType.number;
  }

  return FieldType.string;
}
//remove () from RegEx at position 1 and length-2
export function trimRegEx(str) {
  //console.log(str.charAt(str.length-2)+" "+)
  if (str.charAt(str.length - 2) === ')' && str.charAt(1) === '(') {
    str = str.charAt(0) + str.slice(2, -2) + str.charAt(str.length - 1);
  }
  return str;
}

export function createRegEx(input) {
  console.log('inside createRegEx');
  console.log('Input: ' + input);
  let regExStr = '';
  console.log('Input Length: ' + input.length);
  if (input.length === 1) {
    console.log('Using original input value');
    return input[0];
  }
  if (typeof input === 'string') {
    console.log('Its a string');
    return input;
  }

  for (let i = 0; i < input.length; i++) {
    regExStr += '|' + input[i];
  }

  if (regExStr.charAt(0) === '|') {
    regExStr = regExStr.substring(1, regExStr.length);
    regExStr = '/' + regExStr + '/';
  }
  console.log('New Regex Expression: ' + regExStr);
  return regExStr;
}
