import { DataSourcePlugin } from "@grafana/data";
import { DataSource } from "./DataSource";
import { ConfigEditor } from "./ConfigEditor";
import { QueryEditor } from "./QueryEditor";
import { MoogsoftQuery, MoogsoftDataSourceOptions } from "./types";
import { VariableQueryEditor } from './VariableQueryEditor';

export const plugin = new DataSourcePlugin<
  DataSource,
  MoogsoftQuery,
  MoogsoftDataSourceOptions
>(DataSource)
  .setConfigEditor(ConfigEditor)
  .setQueryEditor(QueryEditor)
  .setVariableQueryEditor(VariableQueryEditor);

  