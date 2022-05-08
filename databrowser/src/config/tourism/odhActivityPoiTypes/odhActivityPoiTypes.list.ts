import { ViewConfig } from '../../../domain/viewConfig/types';
import { domains } from '../../../domain/openApi';
import { odhActivityTypesPoiDescription } from './odhActivityPoiTypes.description';
import { CellComponent } from '../../../domain/cellComponents/types';

export const odhActivityPoiTypesList: ViewConfig = {
  source: 'embedded',
  description: odhActivityTypesPoiDescription,
  baseUrl: domains.tourism.baseUrl,
  path: '/v1/ODHActivityPoiTypes',
  renderConfig: {
    type: 'list',
    elements: [
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
    ],
  },
};
