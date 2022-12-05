import { EditViewConfig } from '../../../domain/datasetConfig/types';
import { CellComponent } from '../../../domain/cellComponents/types';

export const weatherRealTimeEditView: EditViewConfig = {
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
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'name' },
            },
            {
              title: 'Category Id',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'categoryId' },
            },
            {
              title: 'Id',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'id' },
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
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'measurements.0.description' },
            },
            {
              title: 'Image URL',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'measurements.0.imageUrl' },
            },
            {
              title: 'code',
              component: CellComponent.InputSingleLineCell,
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
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'code' },
            },
            {
              title: 'wind direction | dd',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'dd' },
            },
            {
              title: 'wind intensity (km) | ff',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'ff' },
            },
            {
              title: 'snow depth (cm) | hs',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'hs' },
            },
            {
              title: 'lwdType',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'lwdType' },
            },
            {
              title: 'precipitation (mm) | n',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'n' },
            },
            {
              title: 'air pressure (hPa) | p',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'p' },
            },
            {
              title: 'flow rate (m³/s) | q',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'q' },
            },
            {
              title: 'relative humidity (%) | rh',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'rh' },
            },
            {
              title: 'air temperature (°C) | t',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 't' },
            },
            {
              title: 'VAX Code',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'vaxcode' },
            },
            {
              title: 'water level (cm) | w',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'w' },
            },
            {
              title: 'max wind speed (km/h) |wMax',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'wMax' },
            },
            {
              title: 'sunshine duration (hh:min) | sd',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'sd' },
            },
            {
              title: 'global radiation (W/m²) | gs',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'gs' },
            },
            {
              title: 'water temperature (°C) | wt',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'wt' },
            },
            {
              title: 'visibility',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'visibility' },
            },
            {
              title: 'Zoom Level',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'zoomLevel' },
            },
          ],
        },
      ],
    },
  ],
};
