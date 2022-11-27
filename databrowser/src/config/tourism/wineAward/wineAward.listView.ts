import { ListViewConfig } from '../../../domain/datasetConfig/types';
import {
  CellComponent,
  FilterComponent,
} from '../../../domain/cellComponents/types';

export const wineAwardListView: ListViewConfig = {
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
      title: 'Name/Title',
      component: CellComponent.StringCell,
      class: 'w-48',
      fields: {
        text: 'Detail.{language}.Title',
      },
    },
    {
      title: 'Header',
      component: CellComponent.StringCell,
      class: 'w-40',
      fields: {
        text: 'Detail.{language}.Header',
      },
    },
    {
      title: 'Vintage',
      component: CellComponent.StringCell,
      class: 'w-40',
      fields: {
        text: 'Vintage',
      },
    },
    {
      title: 'Award Year',
      component: CellComponent.StringCell,
      class: 'w-40',
      fields: {
        text: 'Awardyear',
      },
    },
    {
      title: 'Awards',
      component: CellComponent.ArrayCell,
      class: 'w-40',
      fields: {
        items: 'Awards',
      },
      params: {
        separator: ', ',
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
      filter: {
        name: 'langfilter',
        component: FilterComponent.FixedValue,
        params: {
          multiselect: true,
          filterOptions: [
            {
              label: 'German',
              value: 'de',
            },
            {
              label: 'Italian',
              value: 'it',
            },
            {
              label: 'English',
              value: 'en',
            },
            {
              label: 'Dutch',
              value: 'nl',
            },
            {
              label: 'Polish',
              value: 'pl',
            },
            {
              label: 'French',
              value: 'fr',
            },
            {
              label: 'Russian',
              value: 'ru',
            },
          ],
        },
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
        format: 'dd. MMMM yyyy',
      },
    },
    {
      title: 'Source',
      component: CellComponent.StringCell,
      class: 'w-36',
      fields: {
        text: '_Meta.Source',
      },
    },
    {
      title: 'Open Data Hub state',
      component: CellComponent.StateCell,
      class: 'w-36',
      fields: {
        state: 'OdhActive',
      },
    },
  ],
};
