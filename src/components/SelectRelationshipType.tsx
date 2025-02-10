import { Select, InlineField, InlineFieldRow } from '@grafana/ui';

import React, { useEffect, useState } from 'react';

export const SelectRelationshipType = ({ query, updateQuery, datasource }) => {
  const [chosenValue, setChosenValue] = useState(query.relationshipTypes);
  const [relationshipTypeOptions, setRelationshipTypeOptions] = useState([{ label: 'Loading ...', value: '' }]);

  useEffect(() => {
    let results: any[] = [];
    let unmounted = false;

    async function getRelationshipTypeOptions() {
      results = await datasource.getResource("relationshipTypeOptions")
      if (!unmounted) {
        if (chosenValue) {
          if (chosenValue.length > 0) {
            results = results.concat(chosenValue);
          }
        }
        if (results && results.length > 0) {
          setRelationshipTypeOptions(results);
        }
      }
    }
    getRelationshipTypeOptions();
    return () => {
      unmounted = true;
    };
  }, [datasource, chosenValue]);

  return (
    <>
      <InlineFieldRow>
        <InlineField label="Relationship Types" labelWidth={20} tooltip={'include'}>
          <Select
            width={40}
            value={chosenValue}
            defaultValue={chosenValue}
            options={relationshipTypeOptions}
            isClearable={true}
            isSearchable={true}
            isMulti={true}
            allowCustomValue={true}
            backspaceRemovesValue={true}
            onChange={(v) => {
              setChosenValue(v);
              updateQuery('relationshipTypes', v);
            }}
            onCreateOption={(v) => {
              setChosenValue([...chosenValue, { label: v, value: v }]);
              updateQuery('relationshipTypes', [...chosenValue, { label: v, value: v }]);
            }}
          />
        </InlineField>
      </InlineFieldRow>
    </>
  );
};
