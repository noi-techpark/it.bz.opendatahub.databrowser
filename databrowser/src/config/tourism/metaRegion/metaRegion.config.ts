import { DatasetConfig } from '../../../domain/datasetConfig/types';
import { domains } from '../../../domain/openApi';
import { metaRegionDescription } from './metaRegion.description';
import { metaRegionOperations } from './metaRegion.operations';
import { metaRegionViews } from './metaRegion.views';
import { metaRegionRoute } from './metaRegion.route';

export const metaRegionConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: domains.tourism.baseUrl,
  route: metaRegionRoute,
  description: metaRegionDescription,
  views: metaRegionViews,
  operations: metaRegionOperations,
};
