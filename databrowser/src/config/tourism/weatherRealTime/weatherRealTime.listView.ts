// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { ListViewConfig } from '../../../domain/datasets/config/types';
import { CellComponent } from '../../../domain/cellComponents/types';
import { DEFAULT_DATE_FORMAT } from '../../utils';

export const weatherRealTimeListView: ListViewConfig = {
  elements: [
    {
      title: 'Name (Location)',
      component: CellComponent.StringCell,
      class: 'w-48',
      objectMapping: {
        text: 'name',
      },
    },
    {
      title: 'Altitude',
      component: CellComponent.StringCell,
      class: 'w-48',
      objectMapping: {
        text: 'altitude',
      },
    },
    {
      title: 'Latitude',
      component: CellComponent.StringCell,
      class: 'w-48',
      objectMapping: {
        text: 'latitude',
      },
    },
    {
      title: 'Longitude',
      component: CellComponent.StringCell,
      class: 'w-48',
      objectMapping: {
        text: 'longitude',
      },
    },
    {
      title: 'Last time updated',
      component: CellComponent.EditedDateCell,
      class: 'w-40',
      objectMapping: {
        date: 'lastUpdated',
      },
      params: {
        format: DEFAULT_DATE_FORMAT,
      },
    },
  ],
};
