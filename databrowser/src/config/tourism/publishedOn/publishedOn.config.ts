import { domains } from '../../../domain/openApi';
import { DatasetConfig } from '../../../domain/datasetConfig/types';
import { publishedOnDescription } from './publishedOn.description';
import { publishedOnOperations } from './publishedOn.operations';
import { publishedOnRoute } from './publishedOn.route';
import { publishedOnViews } from './publishedOn.views';

export const publishedOnConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: domains.tourism.baseUrl,
  route: publishedOnRoute,
  description: publishedOnDescription,
  views: publishedOnViews,
  operations: publishedOnOperations,
};
