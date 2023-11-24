// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import { ListViewConfig } from '../../../domain/datasetConfig/types';

export const representationListView: ListViewConfig = {
  elements: [
    {
      title: 'Id',
      component: CellComponent.StringCell,
      class: 'w-60',
      objectMapping: { text: 'id' },
    },
    {
      title: 'Description',
      component: CellComponent.StringCell,
      class: 'w-40',
      objectMapping: { text: 'description' },
    },
    {
      title: 'Stations',
      component: CellComponent.UrlCell,
      class: 'w-80',
      objectMapping: { text: 'self.stations' },
    },
    {
      title: 'Datatypes',
      component: CellComponent.UrlCell,
      class: 'w-80',
      objectMapping: { text: 'self.stations+datatypes' },
    },
    {
      title: 'Measurements',
      component: CellComponent.UrlCell,
      class: 'w-80',
      objectMapping: { text: 'self.stations+datatypes+measurements' },
    },
  ],
};
