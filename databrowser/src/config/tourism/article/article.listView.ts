import { CellComponent } from '../../../domain/cellComponents/types';
import { ListViewConfig } from '../../../domain/datasetConfig/types';
import {
  EDITED_TABLE_CONFIG,
  IMAGE_TABLE_CONFIG,
  LANGUAGE_TABLE_CONFIG,
} from '../configBuilder';

export const articleListView: ListViewConfig = {
  elements: [
    { ...IMAGE_TABLE_CONFIG },
    {
      title: 'Title',
      component: CellComponent.StringCell,
      class: 'w-60',
      fields: {
        text: 'Detail.{language}.Title',
      },
    },
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
    { ...LANGUAGE_TABLE_CONFIG },
    { ...EDITED_TABLE_CONFIG },
    {
      title: 'Source',
      component: CellComponent.StringCell,
      class: 'w-36',
      fields: {
        text: 'Source',
      },
    },
  ],
};
