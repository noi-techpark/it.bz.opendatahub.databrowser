// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import {
  DetailViewConfig,
  EditViewConfig,
} from '../../../domain/datasetConfig/types';
import {
  accoContactCategory,
  accommodationCategoryCell,
  accommodationTypeCell,
  dataStatesSubCategory,
  gpsDataCategory,
  idReadOnlyCell,
  imageGalleryCategory,
  locationCategory,
  odhTagCategory,
  shortnameCell,
  sourceSubCategory,
  mainImageCell,
} from '../../builder/tourism';
import { withOdhBaseUrl } from '../../utils';

export const accommodationSharedView = ():
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
            shortnameCell(),
            mainImageCell(),
            accommodationTypeCell(),
            accommodationCategoryCell(),
            {
              title: 'Boards',
              component: CellComponent.TagReferenceCell,
              listFields: {
                attributeName: 'tags',
                pathToParent: 'BoardIds',
              },
              params: {
                keySelector: 'Key',
                labelSelector: 'TypeDesc.{language}',
                url: withOdhBaseUrl('/v1/AccommodationTypes?type=Board'),
              },
            },
            // {
            //   title: 'Boardings',
            //   component: CellComponent.ArrayCell,
            //   fields: {
            //     items: 'BoardIds',
            //   },
            //   params: {
            //     separator: ', ',
            //   },
            // },
          ],
        },
        {
          name: 'Characteristics',
          properties: [
            {
              title: 'Room',
              component: CellComponent.ToggleCell,
              fields: { enabled: 'HasApartment' },
            },
            {
              title: 'Gastronomy',
              component: CellComponent.ToggleCell,
              fields: { enabled: 'IsGastronomy' },
            },
            {
              title: 'Is Bookable',
              component: CellComponent.ToggleCell,
              fields: { enabled: 'IsBookable' },
            },
            {
              title: 'Features',
              component: CellComponent.ArrayTagsCell,
              fields: {
                items: 'Features',
              },
              params: {
                fieldName: 'Name',
                separator: ', ',
                max: '3',
              },
            },
            {
              title: 'Special Features',
              component: CellComponent.TagReferenceCell,
              listFields: {
                attributeName: 'tags',
                pathToParent: 'SpecialFeaturesIds',
              },
              params: {
                keySelector: 'Key',
                labelSelector: 'TypeDesc.{language}',
                url: withOdhBaseUrl('/v1/AccommodationTypes?type=SpecialFeature'),
              },
            },
            {
              title: 'Badges',
              component: CellComponent.TagReferenceCell,
              listFields: {
                attributeName: 'tags',
                pathToParent: 'BadgeIds',
              },
              params: {
                keySelector: 'Key',
                labelSelector: 'TypeDesc.{language}',
                url: withOdhBaseUrl('/v1/AccommodationTypes?type=Badge'),
              },
            },
            {
              title: 'Themes',
              component: CellComponent.TagReferenceCell,
              listFields: {
                attributeName: 'tags',
                pathToParent: 'ThemeIds',
              },
              params: {
                keySelector: 'Key',
                labelSelector: 'TypeDesc.{language}',
                url: withOdhBaseUrl('/v1/AccommodationTypes?type=Theme'),
              },
            },
          ],
        },
        {
          name: 'IDs',
          properties: [
            idReadOnlyCell(),
            {
              title: 'HGV ID',
              component: CellComponent.StringCell,
              fields: { text: 'HgvId' },
              class: 'break-all',
            },
            {
              title: 'Marketing Group IDs',
              component: CellComponent.ArrayCell,
              fields: {
                items: 'MarketingGroupIds',
              },
              params: {
                separator: ', ',
              },
            },
          ],
        },
        dataStatesSubCategory(),
        sourceSubCategory(),
      ],
    },
    {
      name: 'Text information',
      slug: 'text-information',
      subcategories: [
        {
          name: 'General data',
          properties: [
            shortnameCell(),
            accommodationTypeCell(),
            accommodationCategoryCell(),
            {
              title: 'Long description',
              component: CellComponent.StringCell,
              fields: { text: 'AccoDetail.{language}.Longdesc' },
            },
            {
              title: 'Short description',
              component: CellComponent.StringCell,
              fields: { text: 'AccoDetail.{language}.ShortDesc' },
            },
          ],
        },
      ],
    },
    accoContactCategory(),
    imageGalleryCategory(),
    {
      name: 'Season/ Opening hours',
      slug: 'season-opening-hours',
      subcategories: [
        {
          name: 'Season/ Opening hours',
          properties: [
            {
              title: 'Name',
              component: CellComponent.StringCell,
              fields: { text: 'Shortname' },
            },
          ],
        },
      ],
    },
    locationCategory(),
    gpsDataCategory(),
    odhTagCategory('accommodation'),
  ],
});
