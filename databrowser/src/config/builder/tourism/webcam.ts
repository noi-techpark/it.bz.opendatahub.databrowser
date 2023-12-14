// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import {
  DetailElements,
  PropertyConfig,
} from '../../../domain/datasets/config/types';

export const webcamCell = (): PropertyConfig => ({
  title: '',
  component: CellComponent.WebcamCell,
  arrayMapping: {
    targetPropertyName: 'webcams',
    pathToParent: 'Webcam',
    objectMapping: {
      name: 'Webcamname.{language}',
      imageUrl: 'Webcamurl',
      latitude: 'GpsInfo.Latitude',
      longitude: 'GpsInfo.Longitude',
      altitude: 'GpsInfo.Altitude',
      listPosition: 'ListPosition',
    },
  },
});

export const webcamCategory = (): DetailElements => ({
  name: 'Webcam Details',
  slug: 'webcam-details',
  subcategories: [
    {
      name: '',
      properties: [webcamCell()],
    },
  ],
});
