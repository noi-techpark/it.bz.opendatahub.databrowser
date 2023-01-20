import {
  CellComponent,
  FilterComponent,
} from '../../../domain/cellComponents/types';
import { ListViewConfig } from '../../../domain/datasetConfig/types';
import {
  EDITED_TABLE_CONFIG,
  IMAGE_TABLE_CONFIG,
  LANGUAGE_TABLE_CONFIG,
  LOCATION_TABLE_CONFIG,
} from '../configBuilder';

export const odhActivityPoiListView: ListViewConfig = {
  elements: [
    { ...IMAGE_TABLE_CONFIG },
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
      class: 'w-60',
      fields: {
        text: 'Detail.{language}.Title',
      },
    },
    {
      title: 'Categories',
      component: CellComponent.ArrayCell,
      class: 'w-52',
      fields: {
        items: 'AdditionalPoiInfos.{language}.Categories',
      },
      params: {
        separator: ', ',
      },
    },
    { ...LOCATION_TABLE_CONFIG },
    {
      title: 'Web-URL',
      component: CellComponent.UrlCell,
      class: 'w-52',
      fields: { text: 'ContactInfos.{language}.Url' },
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
      title: 'Open Data Hub state',
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
