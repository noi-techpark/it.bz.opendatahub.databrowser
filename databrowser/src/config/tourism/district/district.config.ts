import { DatasetConfig } from '../../../domain/datasetConfig/types';
import { domains } from '../../../domain/openApi';
import { districtDescription } from './district.description';
import { districtOperations } from './district.operations';
import { districtViews } from './district.views';
import { districtRoute } from './district.route';

export const districtConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: domains.tourism.baseUrl,
  route: districtRoute,
  description: districtDescription,
  views: districtViews,
  operations: districtOperations,
};
