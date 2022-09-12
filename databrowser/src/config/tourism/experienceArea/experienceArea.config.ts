import { DatasetConfig } from '../../../domain/datasetConfig/types';
import { domains } from '../../../domain/openApi';
import { experienceAreaOperations } from './experienceArea.operations';
import { experienceAreaDescription } from './experienceArea.description';
import { experienceAreaViews } from './experienceArea.views';
import { experienceAreaRoute } from './experienceArea.route';

export const experienceAreaConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: domains.tourism.baseUrl,
  route: experienceAreaRoute,
  description: experienceAreaDescription,
  views: experienceAreaViews,
  operations: experienceAreaOperations,
};
