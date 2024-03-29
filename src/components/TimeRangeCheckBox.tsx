import { InlineFieldRow, InlineField, Select, InlineSwitch } from '@grafana/ui';
import React, { useState, useEffect } from 'react';

export const TimerangeCheckbox = ({ query, updateQuery, datasource, table }) => {
  const [options, setOptions] = useState([{ label: 'Loading ...', value: '' }]);

  useEffect(() => {
    let results = [];
    console.log('SelectTableColumns - UseEffect');
    let unmounted = false;

    async function getTableColumnOptions() {
      results = await datasource.snowConnection.getTableColumnOptions(table?.value, 'glide_date_time');
      if (!unmounted) {
        if (results.length > 0) {
          console.log('Setting tableColumn options: ', results);
          if (query.grafanaTimerangeColumn) {
            if (query.grafanaTimerangeColumn.length > 0) {
              results = results.concat(query.grafanaTimerangeColumn);
            }
          }

          setOptions(results);
        }
      }
    }
    getTableColumnOptions();
    return () => {
      unmounted = true;
    };
  }, [datasource.snowConnection, table, query.grafanaTimerangeColumn]);

  return (
    <>
      <InlineFieldRow>
        <InlineField
          label="Grafana Timerange"
          labelWidth={20}
          tooltip="If selected, only results that fit inbetween your Grafana Timerange will be returned"
        >
          <InlineSwitch
            value={query.grafanaTimerange}
            onChange={(v: any) => updateQuery('grafanaTimerange', v.target.checked)}
          />
        </InlineField>
        {query.grafanaTimerange && (
          <InlineField>
            <Select
              options={options}
              value={query.grafanaTimerangeColumn}
              defaultValue={query.grafanaTimerangeColumn}
              width={40}
              isSearchable={true}
              isClearable={true}
              isMulti={false}
              backspaceRemovesValue={true}
              allowCustomValue={true}
              onChange={(v) => updateQuery('grafanaTimerangeColumn', v)}
              onCreateOption={(v) => updateQuery('grafanaTimerangeColumn', { label: v, value: v })}
              maxMenuHeight={200}
            />
          </InlineField>
        )}
      </InlineFieldRow>
    </>
  );
};
