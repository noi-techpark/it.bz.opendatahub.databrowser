import { ViewConfig, ResolvedViewConfig } from './types';

export const isViewConfig = (
  config: ResolvedViewConfig
): config is ViewConfig => (config as ViewConfig).source != null;
