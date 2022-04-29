import { ViewConfig } from '../domain/viewConfig/types';
import {
  odhAccommodationDetail,
  odhAccommodationList,
  odhActivityPoiDetail,
  odhActivityPoiList,
  odhActivityPoiTypesDetail,
  odhActivityPoiTypesList,
} from './tourism';

export const embeddedViewConfigs: Record<string, ViewConfig> = {
  'tourism/v1/AccommodationTmp': odhAccommodationList,
  'tourism/v1/AccommodationTmp/{id}': odhAccommodationDetail,
  'tourism/v1/ODHActivityPoi': odhActivityPoiList,
  'tourism/v1/ODHActivityPoi/{id}': odhActivityPoiDetail,
  'tourism/v1/ODHActivityPoiTypes': odhActivityPoiTypesList,
  'tourism/v1/ODHActivityPoiTypes/{id}': odhActivityPoiTypesDetail,
};
