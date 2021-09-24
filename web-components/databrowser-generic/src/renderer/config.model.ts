export type FieldConfig = string | Record<string, string>;

export type ComponentConfig =
  | string
  | {
      name: string;
      config?: any;
    };

export interface RendererConfig {
  field: FieldConfig;
  component: ComponentConfig;
  title: string;
}

export interface ListConfig {
  columns: RendererConfig[];
}

export interface ResourceConfig {
  props: RendererConfig[];
}
