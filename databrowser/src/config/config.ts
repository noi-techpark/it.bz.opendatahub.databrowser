import { ApiConfigEntry } from './types';
import {
  odhAccommodationConfig,
  odhActivityPoiConfig,
  odhActivityPoiTypesConfig,
} from './tourism';

const config = {
  'odh-accommodation': odhAccommodationConfig,
  'odh-activity-poi': odhActivityPoiConfig,
  'odh-activity-poi-types': odhActivityPoiTypesConfig,
};

export type ApiConfigKey = keyof typeof config;

export type ApiConfig = Record<ApiConfigKey, ApiConfigEntry>;

export const apiConfig: ApiConfig = config;
