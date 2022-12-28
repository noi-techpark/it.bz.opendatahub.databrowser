import { CellComponent } from '../../../domain/cellComponents/types';
import { ListViewConfig } from '../../../domain/datasetConfig/types';

export const articleListView: ListViewConfig = {
  elements: [
    {
      title: 'Image',
      component: CellComponent.ImageCell,
      class: 'w-40',
      fields: {
        src: 'ImageGallery.0.ImageUrl',
      },
      params: {
        width: '200',
      },
    },
    {
      title: 'Title',
      component: CellComponent.StringCell,
      class: 'w-48',
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
    {
      title: 'Languages',
      component: CellComponent.ArrayCell,
      class: 'w-40',
      fields: {
        items: 'HasLanguage',
      },
      params: {
        separator: ', ',
      },
    },
    {
      title: 'Edited',
      component: CellComponent.EditedDateCell,
      class: 'w-40',
      fields: {
        date: 'LastChange',
      },
      params: {
        format: 'do MMMM yyyy',
      },
    },
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
