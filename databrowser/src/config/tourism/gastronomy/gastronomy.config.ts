import { DatasetConfig } from '../../../domain/datasetConfig/types';
import { domains } from '../../../domain/openApi';
import { gastronomyDescription } from './gastronomy.description';
import { gastronomyOperations } from './gastronomy.operations';
import { gastronomyViews } from './gastronomy.views';
import { gastronomyRoute } from './gastronomy.route';

export const gastronomyConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: domains.tourism.baseUrl,
  route: gastronomyRoute,
  description: gastronomyDescription,
  views: gastronomyViews,
  operations: gastronomyOperations,
};
