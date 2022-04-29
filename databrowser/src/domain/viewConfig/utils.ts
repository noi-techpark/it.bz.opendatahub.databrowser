import { NoViewConfig, ViewConfig } from './types';

export const isViewConfig = (
  config: ViewConfig | NoViewConfig
): config is ViewConfig => (config as ViewConfig).source != null;
