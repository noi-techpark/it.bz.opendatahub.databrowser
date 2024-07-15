// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import { ListViewConfig } from '../../../domain/datasets/config/types';
import {
  imageTableCell,
  languageTableCell,
  lastChangesTableCell,
  locationTableCells,
  odhActiveTableCell,
  sourceTableCell,
  titleTableCell,
} from '../../builder/tourism';

export const gastronomyListView: ListViewConfig = {
  elements: [
    titleTableCell(),
    imageTableCell(),
    ...locationTableCells(),
    languageTableCell(),
    {
      title: 'Tags',
      component: CellComponent.ArrayTagsCell,
      class: 'w-40',
      objectMapping: {
        items: 'CategoryCodes',
      },
      params: {
        propertyName: 'Shortname',
        separator: ', ',
        max: '3',
      },
    },
    lastChangesTableCell(),
    sourceTableCell(),
    odhActiveTableCell(),
  ],
};
