// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import {
  DetailViewConfig,
  EditViewConfig,
} from '../../../domain/datasetConfig/types';

export const representationSharedView = ():
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
            {
              title: 'JSON',
              component: CellComponent.JsonCell,
              fields: { data: 'data' },
              params: { usePreformatted: 'true' },
            },
            {
              title: 'Details',
              component: CellComponent.EditRoomVenueCell,
              listFields: {
                pathToParent: 'data',
                fields: {
                  Shortname: 'sname',
                  Indoor: 'sactive',
                  SquareMeters: 'sorigin',
                  Capacity: 'stype',
                  SetupType: 'scode',
                },
                attributeName: 'roomVenue',
              },
            },
          ],
        },
      ],
    },
  ],
});
