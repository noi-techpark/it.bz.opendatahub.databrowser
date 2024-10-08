// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import { ListViewConfig } from '../../../domain/datasets/config/types';
import { lastChangesTableCell, publishedOnCell } from '../../builder/tourism';

export const odhTagListView: ListViewConfig = {
  elements: [
    {
      title: 'Shortname',
      component: CellComponent.StringCell,
      class: 'w-60',
      objectMapping: { text: 'Shortname' },
    },
    {
      title: 'TagName',
      component: CellComponent.StringCell,
      class: 'w-60',
      objectMapping: { text: 'TagName.{language}' },
    },
    {
      title: 'ValidForEntity',
      component: CellComponent.ArrayCell,
      class: 'w-60',
      objectMapping: { items: 'ValidForEntity' },
      params: { separator: ', ' },
    },
    {
      title: 'Source',
      component: CellComponent.ArrayCell,
      class: 'w-60',
      objectMapping: { items: 'Source' },
      params: { separator: ', ' },
    },
    lastChangesTableCell(),
    publishedOnCell(),
  ],
};
