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
  LOGO_TABLE_CONFIG,
  ODH_ACTIVE_TABLE_CONFIG,
  SOURCE_TABLE_CONFIG,
  TITLE_TABLE_CONFIG,
} from '../configBuilder';

export const odhActivityPoiListView: ListViewConfig = {
  elements: [
    { ...IMAGE_TABLE_CONFIG },
    { ...LOGO_TABLE_CONFIG },
    { ...TITLE_TABLE_CONFIG },
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
    { ...SOURCE_TABLE_CONFIG },
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
    { ...ODH_ACTIVE_TABLE_CONFIG },
  ],
};
