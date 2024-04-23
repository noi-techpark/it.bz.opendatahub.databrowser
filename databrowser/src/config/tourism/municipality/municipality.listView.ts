// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import { ListViewConfig } from '../../../domain/datasets/config/types';
import {
  gpsDataTableCell,
  languageTableCell,
  lastChangesTableCell,
  publishedOnTableCell,
  sourceTableCell,
  titleTableCell,
} from '../../builder/tourism';

export const municipalityListView: ListViewConfig = {
  elements: [
    titleTableCell(),
    {
      title: 'CAP',
      component: CellComponent.StringCell,
      class: 'w-48',
      objectMapping: {
        text: 'Plz',
      },
    },
    gpsDataTableCell(),
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
    {
      title: 'Visible in search',
      component: CellComponent.StateCell,
      class: 'w-40',
      objectMapping: {
        state: 'VisibleInSearch',
      },
    },
    publishedOnTableCell(),
  ],
};
