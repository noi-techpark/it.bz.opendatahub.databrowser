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
              propertyMappings: { text: 'name' },
            },
            {
              title: 'Category Id',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'categoryId' },
            },
            {
              title: 'ID',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'id' },
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
              propertyMappings: {
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
              propertyMappings: { text: 'measurements.0.description' },
            },
            {
              title: 'Image',
              component: CellComponent.ImageEditCell,
              propertyMappings: { src: 'measurements.0.imageUrl' },
            },
            {
              title: 'code',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'measurements.0.code' },
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
              propertyMappings: { text: 'code' },
            },
            {
              title: 'wind direction | dd',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'dd' },
            },
            {
              title: 'wind intensity (km) | ff',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'ff' },
            },
            {
              title: 'snow depth (cm) | hs',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'hs' },
            },
            {
              title: 'lwdType',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'lwdType' },
            },
            {
              title: 'precipitation (mm) | n',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'n' },
            },
            {
              title: 'air pressure (hPa) | p',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'p' },
            },
            {
              title: 'flow rate (m³/s) | q',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'q' },
            },
            {
              title: 'relative humidity (%) | rh',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'rh' },
            },
            {
              title: 'air temperature (°C) | t',
              component: CellComponent.StringCell,
              propertyMappings: { text: 't' },
            },
            {
              title: 'VAX Code',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'vaxcode' },
            },
            {
              title: 'water level (cm) | w',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'w' },
            },
            {
              title: 'max wind speed (km/h) |wMax',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'wMax' },
            },
            {
              title: 'sunshine duration (hh:min) | sd',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'sd' },
            },
            {
              title: 'global radiation (W/m²) | gs',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'gs' },
            },
            {
              title: 'water temperature (°C) | wt',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'wt' },
            },
            {
              title: 'visibility',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'visibility' },
            },
            {
              title: 'Zoom Level',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'zoomLevel' },
            },
          ],
        },
      ],
    },
  ],
});
