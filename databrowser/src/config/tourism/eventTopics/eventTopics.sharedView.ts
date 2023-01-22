import { CellComponent } from '../../../domain/cellComponents/types';
import {
  DetailViewConfig,
  EditViewConfig,
} from '../../../domain/datasetConfig/types';
import { idReadOnlyCell } from '../../builder/tourism';

export const eventTopicsSharedView = (): DetailViewConfig | EditViewConfig => ({
  elements: [
    {
      name: 'Main data',
      slug: 'main-data',
      subcategories: [
        {
          name: '',
          properties: [
            idReadOnlyCell(),
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
});
