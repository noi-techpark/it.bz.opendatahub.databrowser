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
  textInfoCategory,
  gpsDataCategory,
  idReadOnlyCell,
  imageGalleryCategory,
  logoWithMainImageCells,
  locationCategory,
  odhTagCategory,
  shortnameCell,
  dataStatesSubCategory,
  sourceSubCategory,
} from '../../builder/tourism';

export const venueSharedView = (): DetailViewConfig | EditViewConfig => ({
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
        {
          name: '',
          properties: [
            {
              title: 'Room Details',
              component: CellComponent.EditRoomVenueCell,
              listFields: {
                pathToParent: 'RoomDetails',
                objectMappings: {
                  Shortname: 'Shortname',
                  Indoor: 'Indoor',
                  SquareMeters: 'SquareMeters',
                  Capacity: 'VenueSetup.0.Capacity',
                  SetupType: 'VenueSetup.0.VenueCode',
                },
                attributeName: 'roomVenue',
              },
            },
          ],
        },
        dataStatesSubCategory(),
        sourceSubCategory(),
      ],
    },
    textInfoCategory(),
    contactCategory(),
    imageGalleryCategory(),
    locationCategory(),
    gpsDataCategory(),
    odhTagCategory('venue'),
  ],
});
