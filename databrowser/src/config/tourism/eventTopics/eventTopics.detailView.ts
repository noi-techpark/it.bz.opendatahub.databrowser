import { DetailViewConfig } from '../../../domain/datasetConfig/types';
import { CellComponent } from '../../../domain/cellComponents/types';

export const eventTopicsDetailView: DetailViewConfig = {
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
