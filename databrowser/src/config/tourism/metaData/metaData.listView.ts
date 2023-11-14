// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import { ListViewConfig } from '../../../domain/datasetConfig/types';
import { imageTableCell, lastChangesTableCell } from '../../builder/tourism';

export const metaDataListView: ListViewConfig = {
  elements: [
    imageTableCell(),
    {
      title: 'Shortname',
      component: CellComponent.StringCell,
      class: 'w-60',
      objectMappings: { text: 'Shortname' },
    },
    {
      title: 'Description',
      component: CellComponent.StringCell,
      class: 'w-60',
      objectMappings: { text: 'ApiDescription.{language}' },
    },
    {
      title: 'Dataspace',
      component: CellComponent.StringCell,
      class: 'w-60',
      objectMappings: { text: 'Dataspace' },
    },
    {
      title: 'Category',
      component: CellComponent.ArrayCell,
      class: 'w-60',
      objectMappings: { items: 'Category' },
      params: { separator: ', ' },
    },
    {
      title: 'Data Provider',
      component: CellComponent.ArrayCell,
      class: 'w-60',
      objectMappings: { items: 'DataProvider' },
      params: { separator: ', ' },
    },
    {
      title: 'Count',
      component: CellComponent.JsonCell,
      class: 'w-60',
      objectMappings: { data: 'RecordCount' },
      params: { usePreformatted: 'true' },
    },
    {
      title: 'Deprecated',
      component: CellComponent.StringCell,
      class: 'w-40',
      objectMappings: { text: 'Deprecated' },
    },
    {
      title: 'Path',
      component: CellComponent.ArrayCell,
      class: 'w-60',
      objectMappings: { items: 'PathParam' },
      params: { separator: '/' },
    },
    {
      title: 'Filter',
      component: CellComponent.ArrayCell,
      class: 'w-60',
      objectMappings: { items: 'ApiFilter' },
      params: { separator: '&' },
    },
    {
      title: 'API URL',
      component: CellComponent.UrlCell,
      class: 'w-80',
      objectMappings: { text: 'ApiUrl' },
    },
    {
      title: 'Swagger URL',
      component: CellComponent.UrlCell,
      class: 'w-80',
      objectMappings: { text: 'SwaggerUrl' },
    },
    lastChangesTableCell(),
  ],
};
