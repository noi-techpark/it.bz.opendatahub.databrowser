import { DatasetConfig } from '../../../domain/datasetConfig/types';
import { domains } from '../../../domain/openApi';
import { eventTopicsOperations } from './eventTopics.operations';
import { eventTopicsDescription } from './eventTopics.description';
import { eventTopicsViews } from './eventTopics.views';
import { eventTopicsRoute } from './eventTopics.route';

export const eventTopicsConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: domains.tourism.baseUrl,
  route: eventTopicsRoute,
  description: eventTopicsDescription,
  views: eventTopicsViews,
  operations: eventTopicsOperations,
};
