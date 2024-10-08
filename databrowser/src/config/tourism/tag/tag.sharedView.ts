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
  dataStatesSubCategory,
  mappingCategory,
} from '../../builder/tourism';
import { withOdhBaseUrl } from '../../utils';

export const tagSharedView = (): DetailViewConfig | EditViewConfig => ({
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
              component: CellComponent.SelectWithOptionsCell,
              class: 'w-60',
              objectMapping: {
                value: 'Source',
              },
              params: {
                showAddNewValue: 'true',
                showValueAsLabelFallback: 'true',
                url: withOdhBaseUrl(
                  '/v1/Distinct?odhtype=tag&fields=Source&rawsort=Source&getasarray=true'
                ),
              },
            },
            {
              title: 'Types',
              component: CellComponent.CustomDataArrayCell,
              arrayMapping: {
                targetPropertyName: 'listItems',
                pathToParent: 'Types',
              },
              params: {
                url: withOdhBaseUrl(
                  '/v1/Distinct?odhtype=odhtag&fields=Types.[*]&rawsort=Types.[*]&getasarray=true'
                ),
              },
            },
            {
              title: 'ODHTagIds',
              component: CellComponent.CustomDataArrayCell,
              arrayMapping: {
                targetPropertyName: 'listItems',
                pathToParent: 'ODHTagIds',
              },
              params: {
                url: withOdhBaseUrl(
                  '/v1/Distinct?odhtype=odhtag&fields=ODHTagIds.[*]&rawsort=ODHTagIds.[*]&getasarray=true'
                ),
              },
            },
            {
              title: 'Main Entity',
              component: CellComponent.SelectWithOptionsCell,
              class: 'w-60',
              objectMapping: {
                value: 'MainEntity',
              },
              params: {
                showAddNewValue: 'true',
                showValueAsLabelFallback: 'true',
                url: withOdhBaseUrl(
                  '/v1/Distinct?odhtype=odhtag&fields=MainEntity&rawsort=MainEntity&getasarray=true'
                ),
              },
            },
            {
              title: 'ValidForEntity',
              component: CellComponent.CustomDataArrayCell,
              arrayMapping: {
                targetPropertyName: 'listItems',
                pathToParent: 'ValidForEntity',
              },
              params: {
                url: withOdhBaseUrl(
                  '/v1/Distinct?odhtype=odhtag&fields=ValidForEntity.[*]&rawsort=ValidForEntity.[*]&getasarray=true'
                ),
              },
            },
          ],
        },
        {
          name: 'IDs',
          properties: [idReadOnlyCell()],
        },
        dataStatesSubCategory({ hideODHActive: true }),
      ],
    },
    {
      name: 'Additional data',
      slug: 'additional-data',
      subcategories: [
        {
          name: 'Additional data',
          properties: [
            {
              title: 'DisplayAsCategory',
              component: CellComponent.ToggleTriStateCell,
              objectMapping: { enabled: 'DisplayAsCategory' },
            },
            {
              title: 'MappedTagIds',
              component: CellComponent.CustomDataArrayCell,
              arrayMapping: {
                targetPropertyName: 'listItems',
                pathToParent: 'MappedTagIds',
              },
              params: {
                url: withOdhBaseUrl(
                  '/v1/Distinct?odhtype=odhtag&fields=MappedTagIds.[*]&rawsort=MappedTagIds.[*]&getasarray=true'
                ),
              },
            },
            {
              title: 'LTSTaggingInfo',
              component: CellComponent.DictionaryCell,
              objectMapping: {
                dictitems: 'LTSTaggingInfo',
              },
            },
            {
              title: 'IDMCategoryMapping',
              component: CellComponent.DictionaryCell,
              objectMapping: {
                dictitems: 'IDMCategoryMapping',
              },
            },
            {
              title: 'PublishDataWithTagOn',
              component: CellComponent.DictionaryCell,
              objectMapping: {
                dictitems: 'PublishDataWithTagOn',
              },
            },
          ],
        },
      ],
    },
    mappingCategory(),
    licenseInfoCategory(),
  ],
});
