import { DatasetConfig } from '../../../domain/datasetConfig/types';
import { domains } from '../../../domain/openApi';
import { skiRegionDescription } from './skiRegion.description';
import { skiRegionOperations } from './skiRegion.operations';
import { skiRegionViews } from './skiRegion.views';
import { skiRegionRoute } from './skiRegion.route';

export const skiRegionConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: domains.tourism.baseUrl,
  route: skiRegionRoute,
  description: skiRegionDescription,
  views: skiRegionViews,
  operations: skiRegionOperations,
};
