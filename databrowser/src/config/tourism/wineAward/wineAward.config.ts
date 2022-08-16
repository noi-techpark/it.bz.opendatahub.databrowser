import { DatasetConfig } from '../../../domain/datasetConfig/types';
import { domains } from '../../../domain/openApi';
import { wineAwardOperations } from './wineAward.operations';
import { wineAwardDescription } from './wineAward.description';
import { wineAwardViews } from './wineAward.views';
import { wineAwardRoute } from './wineAward.route';

export const wineAwardConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: domains.tourism.baseUrl,
  route: wineAwardRoute,
  description: wineAwardDescription,
  views: wineAwardViews,
  operations: wineAwardOperations,
};
