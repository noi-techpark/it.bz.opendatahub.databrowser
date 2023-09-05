// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import { ListViewConfig } from '../../../domain/datasetConfig/types';
import { defaultTourismTableQueryParameters as defaultQueryParams } from '../../../domain/datasets/tableView/defaultValues';
import {
  imageTableCell,
  languageTableCell,
  lastChangesTableCell,
  locationTableCells,
  odhActiveTableCell,
  sourceTableCell,
} from '../../builder/tourism';

export const accommodationListView: ListViewConfig = {
  defaultQueryParams,
  elements: [
    imageTableCell(),
    {
      title: 'Title',
      component: CellComponent.StringCell,
      class: 'w-48',
      fields: {
        text: 'AccoDetail.{language}.Name',
      },
    },
    {
      title: 'Accommodation Type',
      component: CellComponent.StringCell,
      class: 'w-48',
      fields: {
        text: 'AccoTypeId',
      },
    },
    {
      title: 'Category',
      component: CellComponent.StringCell,
      class: 'w-48',
      fields: {
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
