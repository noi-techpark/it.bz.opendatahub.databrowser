import { ApiConfigEntry } from './types';
import {
  odhAccommodationConfig,
  odhActivityPoiConfig,
  odhActivityPoiTypesConfig,
} from './tourism';

const config: Record<string, ApiConfigEntry> = {
  'odh-accommodation': odhAccommodationConfig,
  'odh-activity-poi': odhActivityPoiConfig,
  'odh-activity-poi-types': odhActivityPoiTypesConfig,
};

export type ApiConfig = Record<keyof typeof config, ApiConfigEntry>;

export const apiConfig: ApiConfig = config;
