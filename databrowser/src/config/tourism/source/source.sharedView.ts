// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import {
  DetailViewConfig,
  EditViewConfig,
} from '../../../domain/datasetConfig/types';
import {
  idReadOnlyCell,
  lastChangesCell,
  licenseInfoCategory,
} from '../../builder/tourism';

export const sourceSharedView = (): DetailViewConfig | EditViewConfig => ({
  elements: [
    {
      name: 'Main data',
      slug: 'main-data',
      subcategories: [
        {
          name: 'General data',
          properties: [
            {
              title: 'Key',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'Key' },
              required: true,
            },
            {
              title: 'Name',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'Name.{language}' },
            },
            {
              title: 'Description',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'Description.{language}' },
            },
            idReadOnlyCell(),
            {
              title: 'URL',
              component: CellComponent.UrlCell,
              propertyMappings: { text: 'Url' },
            },
            {
              title: 'Interfaces',
              component: CellComponent.ArrayEditableCell,
              listFields: {
                attributeName: 'items',
                pathToParent: 'Interfaces',
              },
              required: false,
            },
            lastChangesCell(),
          ],
        },
      ],
    },
    licenseInfoCategory(),
  ],
});
