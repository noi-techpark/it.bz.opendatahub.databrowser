import { DetailViewConfig } from '../../../domain/datasetConfig/types';
import { CellComponent } from '../../../domain/cellComponents/types';

export const webcamInfoDetailView: DetailViewConfig = {
  elements: [
    {
      name: 'Main data',
      slug: 'main-data',
      subcategories: [
        {
          name: 'General data',
          properties: [
            {
              title: 'Shortname',
              component: CellComponent.StringCell,
              fields: { text: 'Shortname' },
            },
          ],
        },
        {
          name: 'IDs',
          properties: [
            {
              title: 'ID',
              component: CellComponent.StringCell,
              fields: { text: 'Id' },
              class: 'break-all',
            },
            {
              title: 'Area Ids',
              component: CellComponent.StringCell,
              fields: { text: 'AreaIds' },
              class: 'break-all',
            },
          ],
        },
        {
          name: 'Data states',
          properties: [
            {
              title: 'Last Changes',
              component: CellComponent.DateCell,
              fields: { date: 'LastChange' },
              params: {
                format: 'd/M/yyyy HH:mm',
              },
            },
            {
              title: 'Active on Source',
              component: CellComponent.StringCell,
              fields: { text: 'Active' },
            },
            {
              title: 'Active on ODH',
              component: CellComponent.StringCell,
              fields: { text: 'OdhActive' },
            },
            {
              title: 'Active on SMG',
              component: CellComponent.StringCell,
              fields: { text: 'SmgActive' },
            },
          ],
        },
        {
          name: 'Source',
          properties: [
            {
              title: 'Source',
              component: CellComponent.StringCell,
              fields: { text: 'Source' },
            },
          ],
        },
      ],
    },
    {
      name: 'GPS Data',
      slug: 'GPS Data',
      subcategories: [
        {
          name: 'GPS Data',
          properties: [
            {
              title: '',
              component: CellComponent.GpsListCell,
              class: 'w-40',
              fields: { gpsEntries: 'GpsInfos' },
              params: {
                type: 'Gpstype',
                latitude: 'Latitude',
                longitude: 'Longitude',
                altitude: 'Altitude',
                altitudeUnit: 'AltitudeUnitofMeasure',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'Tags',
      slug: 'tags',
      subcategories: [
        {
        name: 'Tags',
        properties: [
          {
            title: 'ODH Tags',
            component: CellComponent.ArrayCellTags,
            class: 'w-40',
            fields: {
              items: 'ODHTags',
            },
          }
          {
            title: 'SMG Tags',
            component: CellComponent.ArrayCellTags,
            class: 'w-40',
            fields: {
              items: 'SmgTags',
            },
          }
        ]
      }
      ],
    },
    {
      name: 'Webcam Details',
      slug: 'Webcam Details',
      subcategories: [
        {
          name: 'Webcam Details',
          properties: [
            {
              title: 'Vintage',
              component: CellComponent.StringCell,
              fields: { text: 'Webcamname.{language}' },
            },
            {
              title: 'Image URL',
              component: CellComponent.StringCell,
              fields: { text: 'Webcamurl' },
            },
            {
              title: 'Stream URL',
              component: CellComponent.StringCell,
              fields: { text: 'Streamurl' },
            },
            {
              title: 'Preview URL',
              component: CellComponent.StringCell,
              fields: { text: 'Previewurl' },
            },
            {
              title: 'Latitude',
              component: CellComponent.StringCell,
              fields: { text: 'GpsPoints.position.Latitude' },
            },
            {
              title: 'Longitude',
              component: CellComponent.StringCell,
              fields: { text: 'GpsPoints.position.Longitude' },
            },
            {
              title: 'Altitude',
              component: CellComponent.StringCell,
              fields: { text: 'GpsPoints.position.Altitude' },
            },
          ],
        },
      ],
    },
  ],
};
