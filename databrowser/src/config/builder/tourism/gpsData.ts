// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import {
  DetailElements,
  PropertyConfig,
} from '../../../domain/datasetConfig/types';

export const gpsDataCategory = (): DetailElements => ({
  name: 'GPS Data',
  slug: 'gps-data',
  subcategories: [
    {
      name: 'GPS Data',
      properties: [
        {
          title: '',
          component: CellComponent.GpsPointsCell,
          propertyMappings: {
            type: 'GpsPoints.position.Gpstype',
            latitude: 'GpsPoints.position.Latitude',
            longitude: 'GpsPoints.position.Longitude',
            altitude: 'GpsPoints.position.Altitude',
            altitudeUnit: 'GpsPoints.position.AltitudeUnitofMeasure',
          },
        },
      ],
    },
    {
      name: 'Map',
      properties: [
        {
          title: '',
          component: CellComponent.QuickViewMapView,
          propertyMappings: {
            latitude: 'GpsPoints.position.Latitude',
            longitude: 'GpsPoints.position.Longitude',
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
  propertyMappings: {
    type: 'GpsPoints.position.Gpstype',
    latitude: 'GpsPoints.position.Latitude',
    longitude: 'GpsPoints.position.Longitude',
    altitude: 'GpsPoints.position.Altitude',
    altitudeUnit: 'GpsPoints.position.AltitudeUnitofMeasure',
  },
});
