import { DatasetConfig } from '../../../domain/datasetConfig/types';
import { domains } from '../../../domain/openApi';
import { regionDescription } from './region.description';
import { regionOperations } from './region.operations';
import { regionViews } from './region.views';
import { regionRoute } from './region.route';

export const regionConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: domains.tourism.baseUrl,
  route: regionRoute,
  description: regionDescription,
  views: regionViews,
  operations: regionOperations,
};
