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
      title: 'Shortname',
      component: CellComponent.StringCell,
      class: 'w-48',
      fields: {
        text: 'Shortname',
      },
    },
    {
      title: 'Intro text',
      component: CellComponent.StringCell,
      class: 'w-48',
      fields: {
        text: 'Detail.{language}.IntroText',
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
      title: 'Edited',
      component: CellComponent.EditedDateCell,
      class: 'w-40',
      fields: {
        date: 'LastChange',
      },
      params: {
        format: 'dd MMMM yyyy',
      },
    },
    {
      title: 'Published on',
      component: CellComponent.ArrayCell,
      class: 'w-40',
      fields: {
        items: 'PublishedOn',
      },
      params: {
        separator: ', ',
      },
    },
    {
      title: 'ODH state',
      component: CellComponent.StateCell,
      class: 'w-36',
      fields: {
        state: 'OdhActive',
      },
    },
  ],
};
