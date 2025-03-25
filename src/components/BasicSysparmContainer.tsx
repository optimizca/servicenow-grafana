import React, { useState, useEffect } from 'react';
import { BasicSysparmRow } from './BasicSysparmRow';
import { getTemplateSrv } from '@grafana/runtime';

export const BasicSysparmContainer = ({ query, updateQuery, datasource, table, multiUpdateQuery }) => {
  // Table Column Options are handled here as they will be the same for each row
  const [columnOptions, setColumnOptions] = useState([{ label: 'Loading ...', value: '' }]);

  useEffect(() => {
    let results = [];
    let unmounted = false;

    if (!query && !table && !table?.value) {
      return;
    }

    const processedTableName = getTemplateSrv().replace(table?.value, query.scopedVars, 'csv');

    async function getTableColumnOptions() {
      results = await datasource.getResource(`tableColumnOptions?tableName=${processedTableName}`);
      if (!unmounted) {
        if (results && results.length > 0) {
          console.log('BasicSysparmContainer - Setting table column options');
          setColumnOptions(results);
        }
      }
    }
    function backwardsCompatFix() {
      // console.log('backwardsCompatFix old basic_sysparam: ', query.basic_sysparam);
      let newBasicSysparm = query.basic_sysparam.map((old_row) => {
        return {
          column: old_row[1] || null,
          operator: old_row[2] || null,
          value: old_row[3] || null,
          separator: old_row[4] || {
            label: 'AND',
            value: '^',
          },
        };
      });
      // console.log('backwardsCompatFix new basicSysparm: ', newBasicSysparm);
      multiUpdateQuery({
        basic_sysparam: [],
        basicSysparm: newBasicSysparm,
      });
    }
    if (query.basic_sysparam.length > 0) {
      backwardsCompatFix();
    }
    getTableColumnOptions();
    return () => {
      unmounted = true;
    };
  }, [query, datasource, table, query.basic_sysparam, multiUpdateQuery, table?.value, query.scopedVars]);

  const values = [...query.basicSysparm];
  const deleteRow = (index: number) => {
    let newValue = values;
    newValue.splice(index, 1);
    updateQuery('basicSysparm', newValue);
  };

  const addRow = () => {
    let newValue = values;
    newValue.push({
      column: null,
      operator: null,
      value: null,
      separator: {
        label: 'AND',
        value: '^',
      },
    });
    updateQuery('basicSysparm', newValue);
  };

  const updateValue = (index: number, key: string, updateValue: any) => {
    let newValue = values;
    newValue[index][key] = updateValue;
    updateQuery('basicSysparm', newValue);
  };

  return (
    <>
      {values.map((sysparmRowData, i) => (
        <BasicSysparmRow
          index={i}
          value={sysparmRowData}
          datasource={datasource}
          updateValue={updateValue}
          addRow={addRow}
          deleteRow={deleteRow}
          columnOptions={columnOptions}
          table={table}
          key={i}
          showAddRow={i === values.length - 1}
        />
      ))}
    </>
  );
};
