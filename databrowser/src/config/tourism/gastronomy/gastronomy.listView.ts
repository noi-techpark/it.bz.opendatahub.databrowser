import { CellComponent } from '../../../domain/cellComponents/types';
import { ListViewConfig } from '../../../domain/datasetConfig/types';
import {
  imageTableCell,
  languageTableCell,
  lastChangesTableCell,
  locationTableCell,
  odhActiveTableCell,
  sourceTableCell,
  titleTableCell,
} from '../../builder/tourism';

export const gastronomyListView: ListViewConfig = {
  elements: [
    imageTableCell(),
    titleTableCell(),
    locationTableCell(),
    languageTableCell(),
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
    lastChangesTableCell(),
    sourceTableCell(),
    odhActiveTableCell(),
  ],
};
