import { DatasetConfig } from '../../../domain/datasetConfig/types';
import { domains } from '../../../domain/openApi';
import { webcamInfoOperations } from './webcamInfo.operations';
import { webcamInfoDescription } from './webcamInfo.description';
import { webcamInfoViews } from './webcamInfo.views';
import { webcamInfoRoute } from './webcamInfo.route';

export const webcamInfoConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: domains.tourism.baseUrl,
  route: webcamInfoRoute,
  description: webcamInfoDescription,
  views: webcamInfoViews,
  operations: webcamInfoOperations,
};
