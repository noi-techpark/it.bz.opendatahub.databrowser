import { DatasetConfig } from '../../../domain/datasetConfig/types';
import { domains } from '../../../domain/openApi';
import { accommodationTypesOperations } from './accommodationTypes.operations';
import { accommodationTypesDescription } from './accommodationTypes.description';
import { accommodationTypesViews } from './accommodationTypes.views';
import { accommodationTypesRoute } from './accommodationTypes.route';
import { SourceType } from '../../../domain/datasetConfig/source/types';

export const accommodationTypesConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: domains.tourism.baseUrl,
  route: accommodationTypesRoute,
  description: accommodationTypesDescription,
  views: accommodationTypesViews,
  operations: accommodationTypesOperations,
};
