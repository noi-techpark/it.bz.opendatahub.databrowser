// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetConfig } from '../../domain/datasetConfig/types';
import {
  defaultTourismTableQueryParameters,
  defaultTourismSingleRecordQueryParameters,
} from '../../domain/datasets/tableView/defaultValues';
import { representationConfig } from '../mobility/representation/representation.config';
import { stationTypesConfig } from '../mobility/stationTypes/stationTypes.config';
import { accommodationConfig } from './accommodation/accommodation.config';
import { accommodationTypesConfig } from './accommodationTypes/accommodationTypes.config';
import { articleConfig } from './article/article.config';
import { districtConfig } from './district/district.config';
import { eventConfig } from './event/event.config';
import { eventShortConfig } from './eventShort/eventShort.config';
import { eventTopicsConfig } from './eventTopics/eventTopics.config';
import { experienceAreaConfig } from './experienceArea/experienceArea.config';
import { gastronomyConfig } from './gastronomy/gastronomy.config';
import { measuringPointConfig } from './measuringPoint/measuringPoint.config';
import { metaDataConfig } from './metaData/metaData.config';
import { metaRegionConfig } from './metaRegion/metaRegion.config';
import { municipalityConfig } from './municipality/municipality.config';
import { odhActivityPoiConfig } from './odhActivityPoi/odhActivityPoi.config';
import { odhActivityPoiTypesConfig } from './odhActivityPoiTypes/odhActivityPoiTypes.config';
import { publishedOnConfig } from './publishedOn/publishedOn.config';
import { regionConfig } from './region/region.config';
import { skiAreaConfig } from './skiArea/skiArea.config';
import { skiRegionConfig } from './skiRegion/skiRegion.config';
import { snowReportConfig } from './snowReport/snowReport.config';
import { sourceConfig } from './source/source.config';
import { tourismAssociationListConfig } from './tourismAssociationList/tourismAssociationList.config';
import { venueConfig } from './venue/venue.config';
import { weatherConfig } from './weather/weather.config';
import { weatherDistrictConfig } from './weatherDistrict/weatherDistrict.config';
import { weatherInfoConfig } from './weatherInfo/weatherInfo.config';
import { weatherRealTimeConfig } from './weatherRealTime/weatherRealTime.config';
import { webcamInfoConfig } from './webcamInfo/webcamInfo.config';
import { wineAwardConfig } from './wineAward/wineAward.config';

export const tourismEmbeddedDatasetConfigs = [
  accommodationConfig,
  articleConfig,
  eventShortConfig,
  odhActivityPoiConfig,
  odhActivityPoiTypesConfig,
  eventTopicsConfig,
  accommodationTypesConfig,
  webcamInfoConfig,
  wineAwardConfig,
  gastronomyConfig,
  venueConfig,
  weatherInfoConfig,
  municipalityConfig,
  districtConfig,
  regionConfig,
  metaRegionConfig,
  tourismAssociationListConfig,
  skiRegionConfig,
  skiAreaConfig,
  sourceConfig,
  weatherConfig,
  weatherDistrictConfig,
  weatherRealTimeConfig,
  measuringPointConfig,
  snowReportConfig,
  eventConfig,
  experienceAreaConfig,
  metaDataConfig,
  publishedOnConfig,
  representationConfig,
  stationTypesConfig,
].map<DatasetConfig>((config) => ({
  ...config,
  views: {
    ...config.views,
    table:
      config.views?.table == null
        ? undefined
        : {
            ...config.views?.table,
            defaultQueryParams: defaultTourismTableQueryParameters,
          },
    detail:
      config.views?.detail == null
        ? undefined
        : {
            ...config.views?.detail,
            defaultQueryParams: defaultTourismSingleRecordQueryParameters,
          },
    edit:
      config.views?.edit == null
        ? undefined
        : {
            ...config.views?.edit,
            defaultQueryParams: defaultTourismSingleRecordQueryParameters,
          },
    quick:
      config.views?.quick == null
        ? undefined
        : {
            ...config.views?.quick,
            defaultQueryParams: defaultTourismSingleRecordQueryParameters,
          },
    raw:
      config.views?.raw == null
        ? undefined
        : {
            ...config.views?.raw,
            defaultQueryParams: defaultTourismSingleRecordQueryParameters,
          },
  },
}));
