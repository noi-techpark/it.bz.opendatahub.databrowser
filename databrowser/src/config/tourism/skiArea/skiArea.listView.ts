import { ListViewConfig } from '../../../domain/datasetConfig/types';
import {
  imageTableCell,
  languageTableCell,
  lastChangesTableCell,
  logoTableCell,
  odhActiveTableCell,
  sourceTableCell,
  titleTableCell,
} from '../../builder/tourism';

export const skiAreaListView: ListViewConfig = {
  elements: [
    imageTableCell(),
    logoTableCell(),
    titleTableCell(),
    languageTableCell(),
    lastChangesTableCell(),
    sourceTableCell(),
    odhActiveTableCell(),
  ],
};
