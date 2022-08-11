import { domains } from '../../../domain/openApi';
import { DatasetConfig } from '../../../domain/datasetConfig/types';
import { eventDescription } from './event.description';
import { eventOperations } from './event.operations';
import { eventRoute } from './event.route';
import { eventViews } from './event.views';

export const eventConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: domains.tourism.baseUrl,
  route: eventRoute,
  description: eventDescription,
  views: eventViews,
  operations: eventOperations,
};
