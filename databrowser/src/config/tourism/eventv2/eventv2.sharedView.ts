// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import {
  DetailViewConfig,
  EditViewConfig,
} from '../../../domain/datasets/config/types';
import { withOdhBaseUrl } from '../../utils';
import {
  contactCategory,
  dataStatesSubCategory,
  imageGalleryCategory,
  odhTagCategory,
  shortnameWithLogoAndMainImageSubCategory,
  sourceSubCategoryWithDistinct,
  textInfoCategory,
  idReadOnlyCell,
  licenseInfoCategory,
  mappingCategory,
} from '../../builder/tourism';
import { DEFAULT_DATE_TIME_FORMAT } from '../../utils';

export const eventv2SharedView = (): DetailViewConfig | EditViewConfig => ({
  elements: [
    {
      name: 'Main data',
      slug: 'main-data',
      subcategories: [
        shortnameWithLogoAndMainImageSubCategory(),
        {
          name: 'IDs',
          properties: [idReadOnlyCell()],
        },
        dataStatesSubCategory(),
        sourceSubCategoryWithDistinct('event'),
      ],
    },
    textInfoCategory(),
    imageGalleryCategory(),
    {
      name: 'Event details',
      slug: 'Event-details',
      subcategories: [
        {
          name: 'Time and date',
          properties: [
            {
              title: 'Date Begin',
              component: CellComponent.DateCell,
              objectMapping: { date: 'Begin' },
              params: { type: 'datetime', format: DEFAULT_DATE_TIME_FORMAT },
            },
            {
              title: 'Date End',
              component: CellComponent.DateCell,
              objectMapping: { date: 'End' },
              params: { type: 'datetime', format: DEFAULT_DATE_TIME_FORMAT },
            },
            {
              title: 'Capacity',
              component: CellComponent.StringCell,
              objectMapping: { text: 'Capacity' },
            },
            {
              title: 'Event Group Id',
              component: CellComponent.StringCell,
              objectMapping: { text: 'EventGroupId' },
            },
            {
              title: 'Is Root',
              component: CellComponent.ToggleCell,
              objectMapping: { enabled: 'IsRoot' },
            },
          ],
        },
      ],
    },
    {
      name: 'Venue',
      slug: 'Venue',
      subcategories: [
        {
          name: '',
          properties: [
            {
              title: '',
              component: CellComponent.InputReferenceCell,
              objectMapping: { value: 'VenueId' },
              params: {
                url: withOdhBaseUrl('/v1/VenueV2'),
                labelSelector: 'Detail.{language}.Title',
                keySelector: 'Id',
              },
            },
            {
              title: 'Venue ID',
              component: CellComponent.StringCell,
              objectMapping: { text: 'VenueId' },
              params: { readonly: 'true' },
              class: 'break-all',
            },
          ],
        },
      ],
    },
    contactCategory(),
    odhTagCategory('event'),
    licenseInfoCategory(),
    mappingCategory(),
    {
      name: 'Other',
      slug: 'other',
      subcategories: [
        {
          name: 'Various Ids',
          properties: [
            {
              title: 'Area Id',
              component: CellComponent.StringCell,
              objectMapping: { text: 'LocationInfo.AreaInfo.Id' },
            },
          ],
        },
        {
          name: 'Deprecated',
          properties: [
            {
              title: 'Active on Open Data Hub',
              component: CellComponent.ToggleCell,
              objectMapping: { enabled: 'SmgActive' },
            },
          ],
        },
      ],
    },
  ],
});
