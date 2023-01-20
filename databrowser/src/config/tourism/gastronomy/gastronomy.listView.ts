import { ListViewConfig } from '../../../domain/datasetConfig/types';
import { CellComponent } from '../../../domain/cellComponents/types';
import {
  EDITED_TABLE_CONFIG,
  IMAGE_TABLE_CONFIG,
  LANGUAGE_TABLE_CONFIG,
  LOCATION_TABLE_CONFIG,
} from '../configBuilder';

export const gastronomyListView: ListViewConfig = {
  elements: [
    { ...IMAGE_TABLE_CONFIG },
    {
      title: 'Title',
      component: CellComponent.StringCell,
      class: 'w-48',
      fields: {
        text: 'Detail.{language}.Title',
      },
    },
    { ...LOCATION_TABLE_CONFIG },
    { ...LANGUAGE_TABLE_CONFIG },
    {
      title: 'Tags',
      component: CellComponent.ArrayCellTags,
      class: 'w-40',
      fields: {
        items: 'CategoryCodes',
      },
      params: {
        fieldName: 'Shortname',
        separator: ', ',
        max: '3',
      },
    },
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
      title: 'Open Data Hub state',
      component: CellComponent.StateCell,
      class: 'w-36',
      fields: {
        state: 'OdhActive',
      },
    },
  ],
};
