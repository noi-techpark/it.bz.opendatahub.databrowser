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

export const stationTypesSharedView = ():
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
              title: 'Boardings',
              component: CellComponent.ArrayCell,
              propertyMappings: {
                items: 'BoardIds',
              },
              params: {
                separator: ', ',
              },
            },
          ],
        },
        {
          name: 'Characteristics',
          properties: [
            {
              title: 'Room',
              component: CellComponent.ToggleCell,
              propertyMappings: { enabled: 'HasApartment' },
            },
            {
              title: 'Gastronomy',
              component: CellComponent.ToggleCell,
              propertyMappings: { enabled: 'IsGastronomy' },
            },
            {
              title: 'Is Bookable',
              component: CellComponent.ToggleCell,
              propertyMappings: { enabled: 'IsBookable' },
            },
            {
              title: 'Features',
              component: CellComponent.ArrayTagsCell,
              propertyMappings: {
                items: 'Features',
              },
              params: {
                propertyName: 'Name',
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
                url: withOdhBaseUrl('/v1/AccommodationTypes'),
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
                url: withOdhBaseUrl('/v1/AccommodationTypes'),
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
                url: withOdhBaseUrl('/v1/AccommodationTypes'),
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
              propertyMappings: { text: 'HgvId' },
              class: 'break-all',
            },
            {
              title: 'Marketing Group IDs',
              component: CellComponent.ArrayCell,
              propertyMappings: {
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
              propertyMappings: { text: 'AccoDetail.{language}.Longdesc' },
            },
            {
              title: 'Short description',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'AccoDetail.{language}.ShortDesc' },
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
              propertyMappings: { text: 'Shortname' },
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
