// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import { ListViewConfig } from '../../../domain/datasets/config/types';
import {
  imageTableCell,
  titleTableCell,
  sourceTableCell,
  languageTableCell,
  lastChangesTableCell,
  publishedOnTableCell,
  pushDataTableCell,
  locationTableCellsMinimal,
} from '../../builder/tourism';

export const venueListView: ListViewConfig = {
  elements: [
    titleTableCell(),
    imageTableCell(),
    {
      title: 'Category',
      component: CellComponent.StringCell,
      class: 'w-60',
      objectMapping: { text: 'VenueCategory.0.VenueCode' },
    },
    ...locationTableCellsMinimal(),
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
