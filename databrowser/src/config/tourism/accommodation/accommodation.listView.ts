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
} from '../../builder/tourism';

export const accommodationListView: ListViewConfig = {
  elements: [
    imageTableCell(),
    {
      title: 'Title',
      component: CellComponent.StringCell,
      class: 'w-48',
      objectMappings: {
        text: 'AccoDetail.{language}.Name',
      },
    },
    {
      title: 'Accommodation Type',
      component: CellComponent.StringCell,
      class: 'w-48',
      objectMappings: {
        text: 'AccoTypeId',
      },
    },
    {
      title: 'Category',
      component: CellComponent.StringCell,
      class: 'w-48',
      objectMappings: {
        text: 'AccoCategoryId',
      },
    },
    ...locationTableCells(),
    languageTableCell(),
    lastChangesTableCell(),
    sourceTableCell(),
    odhActiveTableCell(),
  ],
};
