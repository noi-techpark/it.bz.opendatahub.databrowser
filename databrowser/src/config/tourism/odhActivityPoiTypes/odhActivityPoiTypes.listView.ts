import { ListViewConfig } from '../../../domain/datasetConfig/types';
import { CellComponent } from '../../../domain/cellComponents/types';

export const odhActivityPoiTypesListView: ListViewConfig = {
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
};
