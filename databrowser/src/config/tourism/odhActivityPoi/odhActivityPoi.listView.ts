import {
  CellComponent,
  FilterComponent,
} from '../../../domain/cellComponents/types';
import { ListViewConfig } from '../../../domain/datasetConfig/types';

export const odhActivityPoiListView: ListViewConfig = {
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
      title: 'Logo',
      component: CellComponent.ImageCell,
      class: 'w-40',
      fields: {
        src: 'ContactInfos.{language}.LogoUrl',
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
      title: 'Categories',
      component: CellComponent.ArrayCell,
      class: 'w-40',
      fields: {
        items: 'AdditionalPoiInfos.{language}.Categories',
      },
      params: {
        separator: ', ',
      },
    },

    {
      title: 'Location',
      component: CellComponent.TextHighlightCell,
      class: 'w-40',
      fields: {
        title: 'LocationInfo.RegionInfo.Name.{language}',
        subtitle: 'LocationInfo.MunicipalityInfo.Name.{language}',
      },
    },
    {
      title: 'Web-URL',
      component: CellComponent.StringCell,
      class: 'w-36',
      fields: { text: 'ContactInfos.{language}.Url' },
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
    {
      title: 'Source state',
      component: CellComponent.StateCell,
      class: 'w-40',
      fields: {
        state: 'Active',
      },
      filter: {
        name: 'active',
        component: FilterComponent.FixedValue,
        params: {
          filterOptions: [
            {
              label: 'Active',
              value: 'true',
            },
            {
              label: 'Not active',
              value: 'false',
            },
          ],
        },
      },
    },
    {
      title: 'ODH state',
      component: CellComponent.StateCell,
      class: 'w-40',
      fields: {
        state: 'OdhActive',
      },
      filter: {
        name: 'odhactive',
        component: FilterComponent.FixedValue,
        params: {
          filterOptions: [
            {
              label: 'Active',
              value: 'true',
            },
            {
              label: 'Not active',
              value: 'false',
            },
          ],
        },
      },
    },
  ],
};
