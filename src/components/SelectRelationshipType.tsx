import {
  Select,
  InlineField,
  InlineFieldRow,
} from '@grafana/ui';

import React, { useEffect, useState } from 'react';

export const SelectRelationshipType = ({ query, updateQuery, datasource }) => {
  const [relationshipTypeOptions, setRelationshipTypeOptions] = useState([{ label: 'Loading ...', value: '' }]);

  useEffect(() => {
    let results: any[] = [];
    let unmounted = false;

    async function getRelationshipTypeOptions() {
      results = await datasource.snowConnection.getRelationshipTypeOptions();
      if (!unmounted) {
        if (results.length > 0) {
          setRelationshipTypeOptions(results);
        }
      }
    }
    getRelationshipTypeOptions();
    return () => {
      unmounted = true;
    };
  }, [datasource.snowConnection]);

  return (
      <>
          <InlineFieldRow>
              <InlineField label="Relationship Types" labelWidth={20}>
                  <Select
                      width={40}
                      value={query.relationshipTypes}
                      defaultValue={query.relationshipTypes}
                      options={relationshipTypeOptions}
                      isClearable={true}
                      isSearchable={true}
                      isMulti={true}
                      allowCustomValue={false}
                      backspaceRemovesValue={true}
                      onChange={(v) => updateQuery('relationshipTypes', v)}
                  />
              </InlineField>
          </InlineFieldRow>
      </>
  );
};

