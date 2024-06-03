// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import {
  DetailViewConfig,
  EditViewConfig,
} from '../../../domain/datasets/config/types';
import {
  contactCategory,
  textInfoCategory,
  gpsDataCategory,
  idReadOnlyCell,
  imageGalleryCategory,
  logoWithMainImageCells,
  locationCategory,
  tagCategory,
  shortnameCell,
  dataStatesSubCategory,
  sourceSubCategoryWithDistinct,
  licenseInfoCategory,
  mappingCategory,
  relatedcontentCategory,
} from '../../builder/tourism';

export const venuev2SharedView = (): DetailViewConfig | EditViewConfig => ({
  elements: [
    {
      name: 'Main data',
      slug: 'main-data',
      subcategories: [
        {
          name: 'General data',
          properties: [shortnameCell(), ...logoWithMainImageCells()],
        },
        {
          name: 'IDs',
          properties: [idReadOnlyCell()],
        },
        dataStatesSubCategory(),
        sourceSubCategoryWithDistinct('venue'),
      ],
    },
    textInfoCategory(),
    contactCategory(),
    imageGalleryCategory(),
    {
      name: 'Venue details',
      slug: 'Venue-details',
      subcategories: [
        {
          name: 'Time and date',
          properties: [
            {
              title: 'Beds',
              component: CellComponent.StringCell,
              objectMapping: { text: 'VenueInfo.Beds' },
            },
            {
              title: 'RoomCount',
              component: CellComponent.StringCell,
              objectMapping: { text: 'VenueInfo.RoomCount' },
            },
            {
              title: 'SquareMeters',
              component: CellComponent.StringCell,
              objectMapping: { text: 'VenueInfo.SquareMeters' },
            },
            {
              title: 'Indoor',
              component: CellComponent.ToggleCell,
              objectMapping: { text: 'VenueInfo.Indoor' },
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
    locationCategory(),
    gpsDataCategory(),
    tagCategory('venue'),
    //todo VenueSetupV2 Capacity
    relatedcontentCategory(),
    mappingCategory(),
    licenseInfoCategory(),
  ],
});
