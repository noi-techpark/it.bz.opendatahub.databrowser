export interface PropertyConfig {
  title: string;
  component: string;
  fields: Record<string, string>;
  params?: Record<string, string>;
  class?: string;
}

export interface FilterConfig {
  name: string;
  component: string;
  params?: Record<string, unknown>;
}

export interface TableColumnConfig extends PropertyConfig {
  filter?: FilterConfig;
}

export interface DetailViewConfig {
  name: string;
  slug: string;
  subcategories: {
    name: string;
    properties: PropertyConfig[];
  }[];
}

export interface ApiConfigEntry {
  description?: {
    title?: string;
    subtitle?: string;
  };
  listEndpoint?: {
    url: string;
    tableConfig: TableColumnConfig[];
  };
  detailEndpoint?: {
    url: string;
    viewConfig: DetailViewConfig[];
  };
}
