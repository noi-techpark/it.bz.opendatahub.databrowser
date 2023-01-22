import { CellComponent } from '../../../domain/cellComponents/types';
import { ListViewConfig } from '../../../domain/datasetConfig/types';
import {
  imageTableCell,
  languageTableCell,
  lastChangesTableCell,
  sourceTableCell,
  titleTableCell,
} from '../../builder/tourism';

export const articleListView: ListViewConfig = {
  elements: [
    imageTableCell(),
    titleTableCell(),
    {
      title: 'Type',
      component: CellComponent.StringCell,
      class: 'w-48',
      fields: {
        text: 'Type',
      },
    },
    {
      title: 'SubType',
      component: CellComponent.StringCell,
      class: 'w-48',
      fields: {
        text: 'SubType',
      },
    },
    {
      title: 'Tags',
      component: CellComponent.ArrayCellTags,
      class: 'w-40',
      fields: {
        items: 'ODHTags',
      },
      params: {
        fieldName: 'Id',
        separator: ', ',
        max: '3',
      },
    },
    languageTableCell(),
    lastChangesTableCell(),
    sourceTableCell(),
  ],
};
