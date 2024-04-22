// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { ListViewConfig } from '../../../domain/datasets/config/types';
import {
  imageTableCell,
  languageTableCell,
  lastChangesTableCell,
  logoTableCell,
  publishedOnTableCell,
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
    publishedOnTableCell(),
  ],
};
