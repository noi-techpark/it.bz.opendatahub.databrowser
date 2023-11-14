// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import {
  DetailViewConfig,
  EditViewConfig,
} from '../../../domain/datasetConfig/types';

export const weatherRealTimeSharedView = ():
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
              title: 'Name',
              component: CellComponent.StringCell,
              objectMappings: { text: 'name' },
            },
            {
              title: 'Category Id',
              component: CellComponent.StringCell,
              objectMappings: { text: 'categoryId' },
            },
            {
              title: 'ID',
              component: CellComponent.StringCell,
              objectMappings: { text: 'id' },
              params: { readonly: 'true' },
            },
          ],
        },
      ],
    },
    {
      name: 'GPS Data',
      slug: 'gps-data',
      subcategories: [
        {
          name: 'GPS Data',
          properties: [
            {
              title: '',
              component: CellComponent.GpsPointsCell,
              class: 'w-48',
              objectMappings: {
                altitude: 'altitude',
                latitude: 'latitude',
                longitude: 'longitude',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'Measurements',
      slug: 'measurements',
      subcategories: [
        {
          name: 'Measurements',
          properties: [
            {
              title: 'Description',
              component: CellComponent.StringCell,
              objectMappings: { text: 'measurements.0.description' },
            },
            {
              title: 'Image',
              component: CellComponent.ImageEditCell,
              objectMappings: { src: 'measurements.0.imageUrl' },
            },
            {
              title: 'code',
              component: CellComponent.StringCell,
              objectMappings: { text: 'measurements.0.code' },
            },
          ],
        },
      ],
    },
    {
      name: 'Others',
      slug: 'others',
      subcategories: [
        {
          name: 'Others',
          properties: [
            {
              title: 'code',
              component: CellComponent.StringCell,
              objectMappings: { text: 'code' },
            },
            {
              title: 'wind direction | dd',
              component: CellComponent.StringCell,
              objectMappings: { text: 'dd' },
            },
            {
              title: 'wind intensity (km) | ff',
              component: CellComponent.StringCell,
              objectMappings: { text: 'ff' },
            },
            {
              title: 'snow depth (cm) | hs',
              component: CellComponent.StringCell,
              objectMappings: { text: 'hs' },
            },
            {
              title: 'lwdType',
              component: CellComponent.StringCell,
              objectMappings: { text: 'lwdType' },
            },
            {
              title: 'precipitation (mm) | n',
              component: CellComponent.StringCell,
              objectMappings: { text: 'n' },
            },
            {
              title: 'air pressure (hPa) | p',
              component: CellComponent.StringCell,
              objectMappings: { text: 'p' },
            },
            {
              title: 'flow rate (m³/s) | q',
              component: CellComponent.StringCell,
              objectMappings: { text: 'q' },
            },
            {
              title: 'relative humidity (%) | rh',
              component: CellComponent.StringCell,
              objectMappings: { text: 'rh' },
            },
            {
              title: 'air temperature (°C) | t',
              component: CellComponent.StringCell,
              objectMappings: { text: 't' },
            },
            {
              title: 'VAX Code',
              component: CellComponent.StringCell,
              objectMappings: { text: 'vaxcode' },
            },
            {
              title: 'water level (cm) | w',
              component: CellComponent.StringCell,
              objectMappings: { text: 'w' },
            },
            {
              title: 'max wind speed (km/h) |wMax',
              component: CellComponent.StringCell,
              objectMappings: { text: 'wMax' },
            },
            {
              title: 'sunshine duration (hh:min) | sd',
              component: CellComponent.StringCell,
              objectMappings: { text: 'sd' },
            },
            {
              title: 'global radiation (W/m²) | gs',
              component: CellComponent.StringCell,
              objectMappings: { text: 'gs' },
            },
            {
              title: 'water temperature (°C) | wt',
              component: CellComponent.StringCell,
              objectMappings: { text: 'wt' },
            },
            {
              title: 'visibility',
              component: CellComponent.StringCell,
              objectMappings: { text: 'visibility' },
            },
            {
              title: 'Zoom Level',
              component: CellComponent.StringCell,
              objectMappings: { text: 'zoomLevel' },
            },
          ],
        },
      ],
    },
  ],
});
