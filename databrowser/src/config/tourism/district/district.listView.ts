import { ListViewConfig } from '../../../domain/datasetConfig/types';
import {
  languageTableCell,
  lastChangesTableCell,
  odhActiveTableCell,
  sourceTableCell,
  titleTableCell,
} from '../../builder/tourism';

export const districtListView: ListViewConfig = {
  elements: [
    titleTableCell(),
    languageTableCell(),
    lastChangesTableCell(),
    sourceTableCell(),
    odhActiveTableCell(),
  ],
};
