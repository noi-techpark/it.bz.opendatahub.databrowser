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
  licenseInfoCategory,
} from '../../builder/tourism';
import { withOdhBaseUrl } from '../../utils';

export const odhTagSharedView = (): DetailViewConfig | EditViewConfig => ({
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
              title: 'TagName',
              component: CellComponent.StringCell,
              objectMapping: { text: 'TagName.{language}' },
            },
            {
              title: 'Source',
              component: CellComponent.CustomDataArrayCell,
              arrayMapping: {
                targetPropertyName: 'listItems',
                pathToParent: 'Source',
              },
              params: {
                url: withOdhBaseUrl(
                  'v1/Distinct?odhtype=odhtag&fields=Source.[*]&rawsort=Source.[*]&getasarray=true'
                ),
              },
            },
          ],
        },
        {
          name: 'IDs',
          properties: [idReadOnlyCell()],
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
    licenseInfoCategory(),
  ],
});
