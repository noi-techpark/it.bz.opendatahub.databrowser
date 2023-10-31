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
  shortnameCell,
  imageGalleryCategory,
} from '../../builder/tourism';
import { withOdhBaseUrl } from '../../utils';

export const metaDataSharedView = (): DetailViewConfig | EditViewConfig => ({
  elements: [
    {
      name: 'Main data',
      slug: 'main-data',
      subcategories: [
        {
          name: 'General data',
          properties: [
            shortnameCell({ required: true }),
            {
              title: 'Description',
              component: CellComponent.StringCell,
              fields: { text: 'ApiDescription.{language}' },
            },
            {
              title: 'Dataspace',
              component: CellComponent.SelectWithOptionsCell,
              class: 'w-60',
              fields: {
                value: 'Dataspace',
              },
              params: {
                showAddNewValue: 'true',
                showValueAsLabelFallback: 'true',
                url: withOdhBaseUrl(
                  '/v1/Distinct?odhtype=odhmetadata&fields=Dataspace.[*]&rawsort=Dataspace.[*]&getasarray=true'
                ),
              },
            },
            {
              title: 'Category',
              component: CellComponent.CustomDataArrayCell,
              listFields: {
                attributeName: 'listItems',
                pathToParent: 'Category',
              },
              params: {
                url: withOdhBaseUrl(
                  '/v1/Distinct?odhtype=odhmetadata&fields=Category.[*]&rawsort=Category.[*]&getasarray=true'
                ),
              },
            },
            {
              title: 'Data Provider',
              component: CellComponent.CustomDataArrayCell,
              listFields: {
                attributeName: 'listItems',
                pathToParent: 'DataProvider',
              },
              params: {
                url: withOdhBaseUrl(
                  '/v1/Distinct?odhtype=odhmetadata&fields=DataProvider.[*]&rawsort=DataProvider.[*]&getasarray=true'
                ),
              },
            },
            {
              title: 'Deprecated',
              component: CellComponent.ToggleCell,
              fields: { enabled: 'Deprecated' },
            },
            {
              title: 'Base URL',
              component: CellComponent.UrlCell,
              fields: { text: 'BaseUrl' },
            },
            {
              title: 'Path',
              component: CellComponent.ArrayEditableCell,
              listFields: {
                attributeName: 'items',
                pathToParent: 'PathParam',
              },
              required: true,
            },
            {
              title: 'Filter',
              component: CellComponent.ArrayEditableCell,
              listFields: {
                attributeName: 'items',
                pathToParent: 'ApiFilter',
              },
            },
            {
              title: 'API URL',
              component: CellComponent.UrlCell,
              fields: { text: 'ApiUrl' },
              params: { readonly: 'true' },
            },
            {
              title: 'Swagger URL',
              component: CellComponent.UrlCell,
              fields: { text: 'SwaggerUrl' },
            },
            {
              title: 'Tags',
              component: CellComponent.TagReferenceCell,
              listFields: {
                attributeName: 'tags',
                pathToParent: 'OdhTagIds',
              },
              params: {
                keySelector: 'Id',
                labelSelector: 'TagName.{language}',
                url: withOdhBaseUrl('/v1/ODHTag'),
              },
            },
          ],
        },
        {
          name: 'IDs',
          properties: [idReadOnlyCell()],
        },
        {
          name: 'Count',
          properties: [
            {
              title: 'Count',
              component: CellComponent.JsonCell,
              fields: { data: 'RecordCount' },
              params: { usePreformatted: 'true' },
            },
          ],
        },
      ],
    },
    imageGalleryCategory(),
  ],
});
