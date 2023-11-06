// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import { ListViewConfig } from '../../../domain/datasetConfig/types';
import { lastChangesTableCell } from '../../builder/tourism';

export const publishedOnListView: ListViewConfig = {
  elements: [
    {
      title: 'Key',
      component: CellComponent.StringCell,
      class: 'w-60',
      propertyMappings: { text: 'Key' },
    },
    {
      title: 'Name',
      component: CellComponent.StringCell,
      propertyMappings: { text: 'Name.{language}' },
    },
    {
      title: 'Publisher URL',
      component: CellComponent.UrlCell,
      class: 'w-80',
      propertyMappings: { text: 'Url' },
    },
    lastChangesTableCell(),
  ],
};
