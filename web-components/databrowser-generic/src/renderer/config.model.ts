export interface TableColumn {
  field: string;
  rendererTagName: string;
  title: string;
}

export interface TableConfig {
  columns: TableColumn[];
}
