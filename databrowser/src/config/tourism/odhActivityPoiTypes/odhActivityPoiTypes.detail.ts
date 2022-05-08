import { ViewConfig } from '../../../domain/viewConfig/types';
import { domains } from '../../../domain/openApi';
import { odhActivityTypesPoiDescription } from './odhActivityPoiTypes.description';
import { CellComponent } from '../../../domain/cellComponents/types';

export const odhActivityPoiTypesDetail: ViewConfig = {
  source: 'embedded',
  description: odhActivityTypesPoiDescription,
  baseUrl: domains.tourism.baseUrl,
  path: '/v1/ODHActivityPoiTypes/{id}',
  renderConfig: {
    type: 'detail',
    elements: [
      {
        name: 'Main data',
        slug: 'main-data',
        subcategories: [
          {
            name: '',
            properties: [
              {
                title: 'Id',
                component: CellComponent.StringCell,
                class: 'w-40',
                fields: {
                  text: 'Id',
                },
              },
              {
                title: 'Key',
                component: CellComponent.StringCell,
                class: 'w-40',
                fields: {
                  text: 'Key',
                },
              },
              {
                title: 'Type',
                component: CellComponent.StringCell,
                class: 'w-40',
                fields: {
                  text: 'Type',
                },
              },
              {
                title: 'TypeDesc',
                component: CellComponent.StringCell,
                class: 'w-40',
                fields: {
                  text: 'TypeDesc.{language}',
                },
              },
              {
                title: 'Bitmask',
                component: CellComponent.StringCell,
                class: 'w-40',
                fields: {
                  text: 'Bitmask',
                },
              },
              {
                title: 'Parent',
                component: CellComponent.StringCell,
                class: 'w-40',
                fields: {
                  text: 'Parent',
                },
              },
            ],
          },
        ],
      },
    ],
  },
};
