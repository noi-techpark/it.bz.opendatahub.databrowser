import { DatasetConfig } from '../../../domain/datasetConfig/types';
import { domains } from '../../../domain/openApi';
import { odhActivityPoiDescription } from './odhActivityPoi.description';
import { odhActivityPoiViews } from './odhActivityPoi.views';
import { odhActivityPoiOperations } from './odhActivityPoi.operations';
import { odhActivityPoiRoute } from './odhActivityPoi.route';

export const odhActivityPoiConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: domains.tourism.baseUrl,
  route: odhActivityPoiRoute,
  description: odhActivityPoiDescription,
  views: odhActivityPoiViews,
  operations: odhActivityPoiOperations,
};
