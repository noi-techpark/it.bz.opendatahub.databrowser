// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { ListViewConfig } from '../../../domain/datasetConfig/types';
import { CellComponent } from '../../../domain/cellComponents/types';
import { DEFAULT_DATE_FORMAT } from '../../utils';

export const weatherRealTimeListView: ListViewConfig = {
  elements: [
    {
      title: 'Name (Location)',
      component: CellComponent.StringCell,
      class: 'w-48',
      fields: {
        text: 'name',
      },
    },
    {
      title: 'Altitude',
      component: CellComponent.StringCell,
      class: 'w-48',
      fields: {
        text: 'altitude',
      },
    },
    {
      title: 'GPS Data',
      component: CellComponent.GpsPointsCell,
      class: 'w-48',
      fields: {
        latitude: 'latitude',
        longitude: 'longitude',
      },
    },
    {
      title: 'Last time updated',
      component: CellComponent.EditedDateCell,
      class: 'w-40',
      fields: {
        date: 'lastUpdated',
      },
      params: {
        format: DEFAULT_DATE_FORMAT,
      },
    },
  ],
};
