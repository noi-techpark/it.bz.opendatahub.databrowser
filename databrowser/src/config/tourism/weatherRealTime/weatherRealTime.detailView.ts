import { DetailViewConfig } from '../../../domain/datasetConfig/types';
import { CellComponent } from '../../../domain/cellComponents/types';

export const weatherRealTimeDetailView: DetailViewConfig = {
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
              title: 'Id',
              component: CellComponent.StringCell,
              fields: { text: 'id' },
            },
          ],
        },
        {
          name: 'GPS Data',
          properties: [
            {
              title: 'Altitude',
              component: CellComponent.StringCell,
              fields: { text: 'altitude' },
            },
            {
              title: 'Latitude',
              component: CellComponent.StringCell,
              fields: { text: 'latitude' },
            },
            {
              title: 'Longitude',
              component: CellComponent.StringCell,
              fields: { text: 'longitude' },
            },
          ],
        },
        {
          name: 'Measurements',
          properties: [
            {
              title: 'Description',
              component: CellComponent.StringCell,
              fields: { text: 'measurements.0.description' },
            },
            {
              title: 'Image URL',
              component: CellComponent.UrlCell,
              fields: { text: 'measurements.0.imageUrl' },
            },
            {
              title: 'code',
              component: CellComponent.StringCell,
              fields: { text: 'measurements.0.code' },
            },
          ],
        },
        {
          name: 'Others',
          properties: [
            {
              title: 'code',
              component: CellComponent.StringCell,
              fields: { text: 'code' },
            },
            {
              title: 'dd',
              component: CellComponent.StringCell,
              fields: { text: 'dd' },
            },
            {
              title: 'ff',
              component: CellComponent.StringCell,
              fields: { text: 'ff' },
            },
            {
              title: 'hs',
              component: CellComponent.StringCell,
              fields: { text: 'hs' },
            },
            {
              title: 'lwdType',
              component: CellComponent.StringCell,
              fields: { text: 'lwdType' },
            },
            {
              title: 'n',
              component: CellComponent.StringCell,
              fields: { text: 'n' },
            },
            {
              title: 'p',
              component: CellComponent.StringCell,
              fields: { text: 'p' },
            },
            {
              title: 'q',
              component: CellComponent.StringCell,
              fields: { text: 'q' },
            },
            {
              title: 'rh',
              component: CellComponent.StringCell,
              fields: { text: 'rh' },
            },
            {
              title: 'd',
              component: CellComponent.StringCell,
              fields: { text: 'd' },
            },
            {
              title: 'VAX Code',
              component: CellComponent.StringCell,
              fields: { text: 'vaxcode' },
            },
            {
              title: 'w',
              component: CellComponent.StringCell,
              fields: { text: 'w' },
            },
            {
              title: 'wMax',
              component: CellComponent.StringCell,
              fields: { text: 'wMax' },
            },
            {
              title: 'sd',
              component: CellComponent.StringCell,
              fields: { text: 'sd' },
            },
            {
              title: 'gs',
              component: CellComponent.StringCell,
              fields: { text: 'gs' },
            },
            {
              title: 'wt',
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
};
