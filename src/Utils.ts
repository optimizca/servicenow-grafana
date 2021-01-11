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
  let replacedValue = getTemplateSrv().replace(target, scopedVars, 'regex');
  if (replacedValue.startsWith('(') && replacedValue.endsWith(')')) {
    return '/' + replacedValue + '/';
  }

  return replacedValue;
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
    values: new ArrayVector<number>(timeseries.map(p => p[1])),
  };

  let values: ArrayVector<number> | ArrayVector<string>;
  if (fieldType === FieldType.string) {
    values = new ArrayVector<string>(timeseries.map(p => p[0]));
  } else {
    values = new ArrayVector<number>(timeseries.map(p => p[0]));
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
  console.log(filedName);
  if (TIME_FILED_NAMES.includes(filedName)) {
    return FieldType.time;
  }

  if (typeof value === 'number') {
    return FieldType.number;
  }

  return FieldType.string;
}
