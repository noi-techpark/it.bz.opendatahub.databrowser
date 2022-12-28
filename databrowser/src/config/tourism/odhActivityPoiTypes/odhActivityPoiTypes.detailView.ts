import { DetailViewConfig } from '../../../domain/datasetConfig/types';
import { CellComponent } from '../../../domain/cellComponents/types';
import { ID_READONLY_CONFIG } from '../configBuilder';

export const odhActivityPoiTypesDetailView: DetailViewConfig = {
  elements: [
    {
      name: 'Main data',
      slug: 'main-data',
      subcategories: [
        {
          name: '',
          properties: [
            ID_READONLY_CONFIG,
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
};
