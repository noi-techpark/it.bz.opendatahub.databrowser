// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import { ListViewConfig } from '../../../domain/datasetConfig/types';
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
    imageTableCell(),
    titleTableCell(),
    ...locationTableCells(),
    languageTableCell(),
    {
      title: 'Tags',
      component: CellComponent.ArrayTagsCell,
      class: 'w-40',
      objectMappings: {
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
