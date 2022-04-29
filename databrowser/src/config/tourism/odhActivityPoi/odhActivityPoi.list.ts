import {
  CellComponent,
  FilterComponent,
} from '../../../domain/cellComponents/types';
import { domains } from '../../../domain/openApi';
import { ViewConfig } from '../../../domain/viewConfig/types';
import { odhActivityPoiDescription } from './odhActivityPoi.description';

export const odhActivityPoiList: ViewConfig = {
  source: 'embedded',
  description: odhActivityPoiDescription,
  baseUrl: domains.tourism.baseUrl,
  path: '/v1/ODHActivityPoi',
  renderConfig: {
    type: 'list',
    elements: [
      {
        title: 'Image',
        component: CellComponent.ImageCell,
        class: 'w-40',
        fields: {
          src: 'ImageGallery.[0].ImageUrl',
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
  },
};
