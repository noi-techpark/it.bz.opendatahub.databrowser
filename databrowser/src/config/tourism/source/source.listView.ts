// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import { ListViewConfig } from '../../../domain/datasetConfig/types';
import { lastChangesTableCell, shortnameCell } from '../../builder/tourism';

export const sourceListView: ListViewConfig = {
  elements: [
    {
      title: 'Name',
      component: CellComponent.StringCell,
      class: 'w-60',
      fields: { text: 'Name.{language}' },
    },
    shortnameCell(),
    {
      title: 'Source URL',
      component: CellComponent.UrlCell,
      class: 'w-80',
      fields: { text: 'Url' },
    },
    lastChangesTableCell(),
  ],
};
