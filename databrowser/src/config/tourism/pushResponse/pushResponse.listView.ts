// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import { ListViewConfig } from '../../../domain/datasets/config/types';
import { DEFAULT_DATE_TIME_FORMAT } from '../../utils';

export const pushResponseListView: ListViewConfig = {
  elements: [
    {
      title: 'ID',
      component: CellComponent.StringCell,
      class: 'w-40',
      objectMapping: { text: 'Id' },
    },
    {
      title: 'Publisher',
      component: CellComponent.StringCell,
      class: 'w-32',
      objectMapping: { text: 'Publisher' },
    },
    {
      title: 'Date',
      component: CellComponent.EditedDateCell,
      class: 'w-20',
      objectMapping: { date: 'Date' },
      params: { format: DEFAULT_DATE_TIME_FORMAT },
    },
    {
      title: 'Success',
      component: CellComponent.TypeBasedCell,
      class: 'w-20',
      objectMapping: { data: 'Result.Success' },
    },
    {
      title: 'Response',
      component: CellComponent.StringCell,
      class: 'w-40',
      objectMapping: { text: 'Result.Response' },
    },
    {
      title: 'Push object ID',
      component: CellComponent.StringCell,
      class: 'w-60',
      objectMapping: { text: 'PushObject.Id' },
    },
    {
      title: 'Push object type',
      component: CellComponent.StringCell,
      class: 'w-40',
      objectMapping: { text: 'PushObject.Type' },
    },
  ],
};
