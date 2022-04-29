import { ViewConfig } from '../../../domain/viewConfig/types';
import { domains } from '../../../domain/openApi';

export const odhActivityPoiTypesList: ViewConfig = {
  source: 'embedded',
  baseUrl: domains.tourism.baseUrl,
  path: '/v1/ODHActivityPoiTypes',
  renderConfig: {
    type: 'detail',
    elements: [
      { name: 'Main data', slug: 'main-data', subcategories: [] },
      {
        name: 'Text information',
        slug: 'text-information',
        subcategories: [],
      },
    ],
  },
};
