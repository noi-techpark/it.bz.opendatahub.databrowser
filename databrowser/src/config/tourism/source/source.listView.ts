// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import { ListViewConfig } from '../../../domain/datasets/config/types';
import { lastChangesTableCell } from '../../builder/tourism';

export const sourceListView: ListViewConfig = {
  elements: [
    {
      title: 'Key',
      component: CellComponent.StringCell,
      class: 'w-60',
      objectMapping: { text: 'Key' },
    },
    {
      title: 'Name',
      component: CellComponent.StringCell,
      objectMapping: { text: 'Name.{language}' },
    },
    {
      title: 'Interfaces',
      component: CellComponent.ArrayCell,
      class: 'w-60',
      objectMapping: { items: 'Interfaces' },
      params: {
        separator: ', ',
      },
    },
    {
      title: 'Source URL',
      component: CellComponent.UrlCell,
      class: 'w-80',
      objectMapping: { text: 'Url' },
    },
    lastChangesTableCell(),
  ],
};
