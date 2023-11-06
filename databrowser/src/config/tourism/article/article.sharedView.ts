// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import {
  DetailViewConfig,
  EditViewConfig,
} from '../../../domain/datasetConfig/types';
import {
  contactCategory,
  dataStatesSubCategory,
  idReadOnlyCell,
  imageGalleryCategory,
  odhTagCategory,
  seasonCategory,
  shortnameCell,
  sourceSubCategory,
  textInfoCategory,
} from '../../builder/tourism';
import { DEFAULT_DATE_FORMAT, withOdhBaseUrl } from '../../utils';

export const articleSharedView = (): DetailViewConfig | EditViewConfig => ({
  elements: [
    {
      name: 'Main data',
      slug: 'main-data',
      subcategories: [
        {
          name: 'General data',
          properties: [shortnameCell()],
        },
        {
          name: 'IDs',
          properties: [idReadOnlyCell()],
        },
        dataStatesSubCategory(),
        sourceSubCategory(),
      ],
    },
    textInfoCategory(),
    contactCategory(),
    imageGalleryCategory(),
    seasonCategory(),
    {
      name: 'Additional Information',
      slug: 'additional-information',
      subcategories: [
        {
          name: '',
          properties: [
            {
              title: '',
              component: CellComponent.ArticleAdditionalInfoCell,
              propertyMappings: {
                infos: 'AdditionalArticleInfos.{language}.Elements',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'Links',
      slug: 'links',
      subcategories: [
        {
          name: '',
          properties: [
            {
              title: '',
              component: CellComponent.ArticleLinkInfoCell,
              propertyMappings: {
                links: 'ArticleLinkInfo.{language}.Elements',
              },
            },
          ],
        },
      ],
    },
    odhTagCategory('article'),
    {
      name: 'Article Details',
      slug: 'article-details',
      subcategories: [
        {
          name: '',
          properties: [
            {
              title: 'Highlight',
              component: CellComponent.ToggleCell,
              propertyMappings: { enabled: 'Highlight' },
            },
            {
              title: '',
              component: CellComponent.ArticleTypeCell,
              propertyMappings: {
                type: 'Type',
                subType: 'SubType',
              },
              params: {
                lookupUrl: withOdhBaseUrl('/v1/ArticleTypes'),
                required: 'true',
              },
              required: true,
            },
            {
              title: 'Article Date',
              component: CellComponent.DateCell,
              propertyMappings: { date: 'ArticleDate' },
              params: { format: DEFAULT_DATE_FORMAT },
            },
            {
              title: 'Article Date To',
              component: CellComponent.DateCell,
              propertyMappings: { date: 'ArticleDateTo' },
              params: { format: DEFAULT_DATE_FORMAT },
            },
          ],
        },
      ],
    },
    {
      name: 'License',
      slug: 'license',
      subcategories: [
        {
          name: '',
          properties: [
            {
              title: 'License',
              component: CellComponent.SelectWithOptionsCell,
              propertyMappings: { value: 'LicenseInfo.License' },
              params: {
                value_001: 'CC0',
                label_001: 'CC0',
                value_002: 'CC-BY',
                label_002: 'CC-BY',
                value_003: 'Closed',
                label_003: 'Closed',
              },
            },
            {
              title: 'Author',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'LicenseInfo.Author' },
            },
            {
              title: 'License Holder',
              component: CellComponent.UrlCell,
              propertyMappings: { text: 'LicenseInfo.LicenseHolder' },
            },
            {
              title: 'Closed Data',
              component: CellComponent.ToggleCell,
              propertyMappings: { enabled: 'LicenseInfo.ClosedData' },
            },
          ],
        },
      ],
    },
  ],
});
