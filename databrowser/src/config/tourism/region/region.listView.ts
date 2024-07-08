// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { ListViewConfig } from '../../../domain/datasets/config/types';
import {
  imageTableCell,
  languageTableCell,
  lastChangesTableCell,
  logoTableCell,
  sourceTableCell,
  publishedOnTableCell,
  pushDataTableCell,
  titleTableCell,
} from '../../builder/tourism';

export const regionListView: ListViewConfig = {
  elements: [
    titleTableCell(),
    imageTableCell(),
    logoTableCell(),
    languageTableCell(),
    lastChangesTableCell(),
    sourceTableCell(),
    publishedOnTableCell(),
    pushDataTableCell(),
  ],
};
