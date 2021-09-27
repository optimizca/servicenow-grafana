import React from 'react';
import { QueryEditorProps } from '@grafana/data';
import { DataSource } from './DataSource';
import { PluginDataSourceOptions, PluginQuery } from './types';
import { SplitQueryEditor } from './SplitQueryEditor';

type Props = QueryEditorProps<DataSource, PluginQuery, PluginDataSourceOptions>;

export const QueryEditor: React.FC<Props> = (props) => {
  return <SplitQueryEditor {...props} />;
};
