// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import {
  DetailViewConfig,
  EditViewConfig,
} from '../../../domain/datasets/config/types';
import {
  idReadOnlyCell,
  shortnameCell,
  imageGalleryCategory,
  licenseInfoCategory,
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
              objectMapping: { text: 'ApiDescription.{language}' },
            },
            {
              title: 'Dataspace',
              component: CellComponent.SelectWithOptionsCell,
              class: 'w-60',
              objectMapping: {
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
              title: 'Data Provider',
              component: CellComponent.CustomDataArrayCell,
              arrayMapping: {
                targetPropertyName: 'listItems',
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
              objectMapping: { enabled: 'Deprecated' },
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
              objectMapping: { data: 'RecordCount' },
              params: { usePreformatted: 'true' },
            },
          ],
        },
      ],
    },
    {
      name: 'Api data',
      slug: 'api-data',
      subcategories: [
        {
          name: '',
          properties: [
            {
              title: 'Base URL',
              component: CellComponent.SelectWithOptionsCell,
              objectMapping: { value: 'BaseUrl' },
              params: {
                showAddNewValue: 'true',
                showValueAsLabelFallback: 'true',
                url: withOdhBaseUrl(
                  '/v1/Distinct?odhtype=odhmetadata&fields=BaseUrl.[*]&rawsort=BaseUrl.[*]&getasarray=true'
                ),
              },
            },
            {
              title: 'Path',
              component: CellComponent.ArrayEditableCell,
              arrayMapping: {
                targetPropertyName: 'items',
                pathToParent: 'PathParam',
              },
              required: true,
            },
            {
              title: 'Filter',
              component: CellComponent.ArrayEditableCell,
              arrayMapping: {
                targetPropertyName: 'items',
                pathToParent: 'ApiFilter',
              },
            },
            {
              title: 'API URL',
              component: CellComponent.UrlCell,
              objectMapping: { text: 'ApiUrl' },
              params: { readonly: 'true' },
            },
            {
              title: 'Api Type',
              component: CellComponent.SelectWithOptionsCell,
              class: 'w-60',
              objectMapping: {
                value: 'ApiType',
              },
              params: {
                showAddNewValue: 'true',
                showValueAsLabelFallback: 'true',
                url: withOdhBaseUrl(
                  '/v1/Distinct?odhtype=odhmetadata&fields=ApiType.[*]&rawsort=ApiType.[*]&getasarray=true'
                ),
              },
            },
            {
              title: 'Output',
              component: CellComponent.DictionaryCell,
              objectMapping: {
                dictitems: 'Output',
              },
            },
            {
              title: 'Swagger URL',
              component: CellComponent.UrlCell,
              objectMapping: { text: 'SwaggerUrl' },
            },
            {
              title: 'Type',
              component: CellComponent.StringCell,
              objectMapping: { text: 'Type' },
            },
          ],
        },
      ],
    },
    {
      name: 'Additional data',
      slug: 'additional-data',
      subcategories: [
        {
          name: 'General data',
          properties: [
            {
              title: 'Category',
              component: CellComponent.CustomDataArrayCell,
              arrayMapping: {
                targetPropertyName: 'listItems',
                pathToParent: 'Category',
              },
              params: {
                url: withOdhBaseUrl(
                  '/v1/Distinct?odhtype=odhmetadata&fields=Category.[*]&rawsort=Category.[*]&getasarray=true'
                ),
              },
            },
            {
              title: 'Tags',
              component: CellComponent.TagReferenceCell,
              arrayMapping: {
                targetPropertyName: 'tags',
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
      ],
    },
    imageGalleryCategory(),
    licenseInfoCategory(),
  ],
});
