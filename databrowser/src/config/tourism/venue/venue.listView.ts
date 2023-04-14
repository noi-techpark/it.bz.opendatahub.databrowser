import { CellComponent } from '../../../domain/cellComponents/types';
import { ListViewConfig } from '../../../domain/datasetConfig/types';
import {
  imageTableCell,
  titleTableCell,
  sourceTableCell,
  languageTableCell,
  lastChangesTableCell,
  odhActiveTableCell,
} from '../../builder/tourism';

export const venueListView: ListViewConfig = {
  elements: [
    imageTableCell(),
    titleTableCell(),
    {
      title: 'Category',
      component: CellComponent.StringCell,
      class: 'w-60',
      fields: { text: 'VenueCategory.0.VenueCode' },
    },
    {
      title: 'Location',
      component: CellComponent.StringCell,
      class: 'w-40',
      fields: {
        text: 'LocationInfo.MunicipalityInfo.Name.{language}',
      },
    },
    languageTableCell(),
    lastChangesTableCell(),
    sourceTableCell(),
    odhActiveTableCell(),
  ],
};
