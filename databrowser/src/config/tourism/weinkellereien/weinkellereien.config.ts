import { DatasetConfig } from '../../../domain/datasetConfig/types';
import { domains } from '../../../domain/openApi';
import { weinkellereienDescription } from './weinkellereien.description';
import { weinkellereienOperations } from './weinkellereien.operations';
import { weinkellereienViews } from './weinkellereien.views';
import { weinkellereienRoute } from './weinkellereien.route';

export const weinkellereienConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: domains.tourism.baseUrl,
  route: weinkellereienRoute,
  description: weinkellereienDescription,
  views: weinkellereienViews,
  operations: weinkellereienOperations,
};
