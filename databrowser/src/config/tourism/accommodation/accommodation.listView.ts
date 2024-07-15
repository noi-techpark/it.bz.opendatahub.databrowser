// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import { ListViewConfig } from '../../../domain/datasets/config/types';
import {
  imageTableCell,
  languageTableCell,
  lastChangesTableCell,
  pushDataTableCell,
  publishedOnTableCell,
  sourceTableCell,
} from '../../builder/tourism';

export const accommodationListView: ListViewConfig = {
  elements: [
    {
      title: 'Title',
      component: CellComponent.StringCell,
      class: 'w-48',
      objectMapping: {
        text: 'AccoDetail.{language}.Name',
      },
    },
    imageTableCell(),
    {
      title: 'Accommodation Type',
      component: CellComponent.StringCell,
      class: 'w-48',
      objectMapping: {
        text: 'AccoTypeId',
      },
    },
    {
      title: 'Category',
      component: CellComponent.StringCell,
      class: 'w-48',
      objectMapping: {
        text: 'AccoCategoryId',
      },
    },
    // ...locationTableCells(),
    {
      title: 'Location',
      component: CellComponent.StringCell,
      class: 'w-48',
      objectMapping: {
        text: 'LocationInfo.DistrictInfo.Name.en',
      },
    },
    languageTableCell(),
    lastChangesTableCell(),
    sourceTableCell(),
    {
      title: 'Source state',
      component: CellComponent.StateCell,
      class: 'w-40',
      objectMapping: {
        state: 'Active',
      },
    },
    publishedOnTableCell(),
    pushDataTableCell(),
  ],
};
