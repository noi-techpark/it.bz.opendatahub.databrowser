import { DatasetConfig } from '../../../domain/datasetConfig/types';
import { domains } from '../../../domain/openApi';
import { venueDescription } from './venue.description';
import { venueOperations } from './venue.operations';
import { venueViews } from './venue.views';
import { venueRoute } from './venue.route';

export const venueConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: domains.tourism.baseUrl,
  route: venueRoute,
  description: venueDescription,
  views: venueViews,
  operations: venueOperations,
};
