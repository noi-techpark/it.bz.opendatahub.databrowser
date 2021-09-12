export interface RendererConfig {
  field: string;
  rendererTagName: string;
  title: string;
}

export interface ListConfig {
  columns: RendererConfig[];
}

export interface ResourceConfig {
  props: RendererConfig[];
}
