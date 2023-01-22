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

export const tourismAssociationListListView: ListViewConfig = {
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
