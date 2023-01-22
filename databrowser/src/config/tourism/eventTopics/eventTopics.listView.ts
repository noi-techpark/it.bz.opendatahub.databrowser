import { ListViewConfig } from '../../../domain/datasetConfig/types';
import { CellComponent } from '../../../domain/cellComponents/types';
import { idReadOnlyCell } from '../../builder/tourism';

export const eventTopicsListView: ListViewConfig = {
  elements: [
    idReadOnlyCell(),
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
