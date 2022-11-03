import { EditViewConfig } from '../../../domain/datasetConfig/types';
import { CellComponent } from '../../../domain/cellComponents/types';

export const webcamInfoEditView: EditViewConfig = {
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
              component: CellComponent.InputSingleLineCell,
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
              component: CellComponent.ToggleCell,
              fields: { enabled: 'Active' },
            },
            {
              title: 'Active on ODH',
              component: CellComponent.ToggleCell,
              fields: { enabled: 'OdhActive' },
            },
            {
              title: 'Active on SMG',
              component: CellComponent.ToggleCell,
              fields: { enabled: 'SmgActive' },
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
              component: CellComponent.GpsPointsCell,
              class: 'w-48',
              fields: {
                type: 'GpsPoints.position.Gpstype',
                latitude: 'GpsPoints.position.Latitude',
                longitude: 'GpsPoints.position.Longitude',
                altitude: 'GpsPoints.position.Altitude',
                altitudeUnit: 'GpsPoints.position.AltitudeUnitofMeasure',
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
            },
            {
              title: 'SMG Tags',
              component: CellComponent.ArrayCellTags,
              class: 'w-40',
              fields: {
                items: 'SmgTags',
              },
            },
          ],
        },
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
              title: 'Name',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'Webcamname.{language}' },
            },
            {
              title: 'Image URL',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'Webcamurl' },
            },
            {
              title: 'Stream URL',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'Streamurl' },
            },
            {
              title: 'Preview URL',
              component: CellComponent.InputSingleLineCell,
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
