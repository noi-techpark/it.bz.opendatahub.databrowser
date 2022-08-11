import { ListViewConfig } from '../../../domain/datasetConfig/types';
import { CellComponent } from '../../../domain/cellComponents/types';

export const eventTopicsListView: ListViewConfig = {
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
      title: 'Bitmask',
      component: CellComponent.StringCell,
      class: 'w-40',
      fields: {
        text: 'Bitmask',
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
};
