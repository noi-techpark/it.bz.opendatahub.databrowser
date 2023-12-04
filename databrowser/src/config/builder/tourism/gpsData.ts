// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import {
  DetailElements,
  PropertyConfig,
} from '../../../domain/datasetConfig/types';

export const gpsDataCategory = (): DetailElements => ({
  name: 'GPS',
  slug: 'gps-data',
  subcategories: [
    {
      name: 'GPS Points',
      properties: [
        {
          title: '',
          component: CellComponent.EditGpsInfoCell,
          listFields: {
            attributeName: 'gpsInfo',
            pathToParent: 'GpsInfo',
          },
        },
      ],
    },
  ],
});

export const gpsDataTableCell = (): PropertyConfig => ({
  title: 'GPS Data',
  component: CellComponent.GpsPointsCell,
  class: 'w-48',
  fields: {
    type: 'GpsPoints.position.Gpstype',
    latitude: 'GpsPoints.position.Latitude',
    longitude: 'GpsPoints.position.Longitude',
    altitude: 'GpsPoints.position.Altitude',
    altitudeUnit: 'GpsPoints.position.AltitudeUnitofMeasure',
  },
});
