// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import { ListViewConfig } from '../../../domain/datasetConfig/types';
import { lastChangesTableCell } from '../../builder/tourism';

export const metaDataListView: ListViewConfig = {
  elements: [
    {
      title: 'Shortname',
      component: CellComponent.StringCell,
      class: 'w-60',
      fields: { text: 'Shortname' },
    },
    {
      title: 'Description',
      component: CellComponent.StringCell,
      class: 'w-60',
      fields: { text: 'ApiDescription.{language}' },
    },
    {
      title: 'Dataspace',
      component: CellComponent.StringCell,
      class: 'w-60',
      fields: { text: 'Dataspace' },
    },
    {
      title: 'Category',
      component: CellComponent.ArrayCell,
      class: 'w-60',
      fields: { items: 'Category' },
      params: { separator: ', ' },
    },
    {
      title: 'Data Provider',
      component: CellComponent.ArrayCell,
      class: 'w-60',
      fields: { items: 'DataProvider' },
      params: { separator: ', ' },
    },
    {
      title: 'Count',
      component: CellComponent.JsonCell,
      class: 'w-60',
      fields: { data: 'RecordCount' },
      params: { usePreformatted: 'true' },
    },
    {
      title: 'Deprecated',
      component: CellComponent.StringCell,
      class: 'w-40',
      fields: { text: 'Deprecated' },
    },
    {
      title: 'Path',
      component: CellComponent.ArrayCell,
      class: 'w-60',
      fields: { items: 'PathParam' },
      params: { separator: '/' },
    },
    {
      title: 'Filter',
      component: CellComponent.ArrayCell,
      class: 'w-60',
      fields: { items: 'ApiFilter' },
      params: { separator: '&' },
    },
    {
      title: 'API URL',
      component: CellComponent.UrlCell,
      class: 'w-80',
      fields: { text: 'ApiUrl' },
    },
    {
      title: 'Swagger URL',
      component: CellComponent.UrlCell,
      class: 'w-80',
      fields: { text: 'SwaggerUrl' },
    },
    lastChangesTableCell(),
  ],
};
