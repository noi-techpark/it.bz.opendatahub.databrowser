import { domains } from '../../../domain/openApi';
import { DatasetConfig } from '../../../domain/datasetConfig/types';
import { eventShortDescription } from './eventShort.description';
import { eventShortRoute } from './eventShort.route';
import { eventShortViews } from './eventShort.views';

export const eventShortConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: domains.tourism.baseUrl,
  route: eventShortRoute,
  description: eventShortDescription,
  views: eventShortViews,
};
