import { CellComponent } from '../../../domain/cellComponents/types';
import { ListViewConfig } from '../../../domain/datasetConfig/types';
import {
  gpsDataTableCell,
  languageTableCell,
  lastChangesTableCell,
  odhActiveTableCell,
  sourceTableCell,
  titleTableCell,
} from '../../builder/tourism';

export const municipalityListView: ListViewConfig = {
  elements: [
    titleTableCell(),
    {
      title: 'CAP',
      component: CellComponent.StringCell,
      class: 'w-48',
      fields: {
        text: 'Plz',
      },
    },
    gpsDataTableCell(),
    languageTableCell(),
    lastChangesTableCell(),
    sourceTableCell(),
    odhActiveTableCell(),
  ],
};
