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
              fields: { text: 'name' },
            },
            {
              title: 'Category Id',
              component: CellComponent.StringCell,
              fields: { text: 'categoryId' },
            },
            {
              title: 'ID',
              component: CellComponent.StringCell,
              fields: { text: 'id' },
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
              fields: {
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
              fields: { text: 'measurements.0.description' },
            },
            {
              title: 'Image',
              component: CellComponent.ImageEditCell,
              fields: { src: 'measurements.0.imageUrl' },
            },
            {
              title: 'code',
              component: CellComponent.StringCell,
              fields: { text: 'measurements.0.code' },
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
              fields: { text: 'code' },
            },
            {
              title: 'wind direction | dd',
              component: CellComponent.StringCell,
              fields: { text: 'dd' },
            },
            {
              title: 'wind intensity (km) | ff',
              component: CellComponent.StringCell,
              fields: { text: 'ff' },
            },
            {
              title: 'snow depth (cm) | hs',
              component: CellComponent.StringCell,
              fields: { text: 'hs' },
            },
            {
              title: 'lwdType',
              component: CellComponent.StringCell,
              fields: { text: 'lwdType' },
            },
            {
              title: 'precipitation (mm) | n',
              component: CellComponent.StringCell,
              fields: { text: 'n' },
            },
            {
              title: 'air pressure (hPa) | p',
              component: CellComponent.StringCell,
              fields: { text: 'p' },
            },
            {
              title: 'flow rate (m³/s) | q',
              component: CellComponent.StringCell,
              fields: { text: 'q' },
            },
            {
              title: 'relative humidity (%) | rh',
              component: CellComponent.StringCell,
              fields: { text: 'rh' },
            },
            {
              title: 'air temperature (°C) | t',
              component: CellComponent.StringCell,
              fields: { text: 't' },
            },
            {
              title: 'VAX Code',
              component: CellComponent.StringCell,
              fields: { text: 'vaxcode' },
            },
            {
              title: 'water level (cm) | w',
              component: CellComponent.StringCell,
              fields: { text: 'w' },
            },
            {
              title: 'max wind speed (km/h) |wMax',
              component: CellComponent.StringCell,
              fields: { text: 'wMax' },
            },
            {
              title: 'sunshine duration (hh:min) | sd',
              component: CellComponent.StringCell,
              fields: { text: 'sd' },
            },
            {
              title: 'global radiation (W/m²) | gs',
              component: CellComponent.StringCell,
              fields: { text: 'gs' },
            },
            {
              title: 'water temperature (°C) | wt',
              component: CellComponent.StringCell,
              fields: { text: 'wt' },
            },
            {
              title: 'visibility',
              component: CellComponent.StringCell,
              fields: { text: 'visibility' },
            },
            {
              title: 'Zoom Level',
              component: CellComponent.StringCell,
              fields: { text: 'zoomLevel' },
            },
          ],
        },
      ],
    },
  ],
});
