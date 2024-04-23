// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import {
  DetailViewConfig,
  EditViewConfig,
} from '../../../domain/datasets/config/types';
import { idReadOnlyCell } from '../../builder/tourism';
import { DEFAULT_DATE_TIME_FORMAT } from '../../utils';

export const pushResponseSharedView = ():
  | DetailViewConfig
  | EditViewConfig => ({
  elements: [
    {
      name: 'Main data',
      slug: 'main-data',
      subcategories: [
        {
          name: 'General data',
          properties: [
            {
              title: 'Publisher',
              component: CellComponent.StringCell,
              objectMapping: { text: 'Publisher' },
              params: { readonly: 'true' },
            },
            {
              title: 'Date',
              component: CellComponent.EditedDateCell,
              objectMapping: { date: 'Date' },
              params: { format: DEFAULT_DATE_TIME_FORMAT },
            },
            {
              title: 'Success',
              component: CellComponent.TypeBasedCell,
              objectMapping: { data: 'Result.Success' },
            },
            {
              title: 'Response',
              component: CellComponent.StringCell,
              objectMapping: { text: 'Result.Response' },
              params: { readonly: 'true' },
            },
          ],
        },
        {
          name: 'IDs',
          properties: [idReadOnlyCell()],
        },
        {
          name: 'PushObject',
          properties: [
            {
              title: 'Push object ID',
              component: CellComponent.StringCell,
              objectMapping: { text: 'PushObject.Id' },
              params: { readonly: 'true' },
            },
            {
              title: 'Push object type',
              component: CellComponent.StringCell,
              objectMapping: { text: 'PushObject.Type' },
              params: { readonly: 'true' },
            },
          ],
        },
      ],
    },
  ],
});
