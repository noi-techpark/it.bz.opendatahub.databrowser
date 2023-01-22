import { ListViewConfig } from '../../../domain/datasetConfig/types';
import {
  imageTableCell,
  languageTableCell,
  lastChangesTableCell,
  odhActiveTableCell,
  sourceTableCell,
  titleTableCell,
} from '../../builder/tourism';

export const metaRegionListView: ListViewConfig = {
  elements: [
    imageTableCell(),
    titleTableCell(),
    languageTableCell(),
    lastChangesTableCell(),
    sourceTableCell(),
    odhActiveTableCell(),
  ],
};
