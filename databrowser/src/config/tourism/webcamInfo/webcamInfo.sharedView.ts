import { CellComponent } from '../../../domain/cellComponents/types';
import {
  DetailViewConfig,
  EditViewConfig,
} from '../../../domain/datasetConfig/types';
import {
  dataStatesSubCategory,
  gpsDataCategory,
  idReadOnlyCell,
  odhTagCategory,
  shortnameCell,
  sourceSubCategory,
} from '../../builder/tourism';

export const webcamInfoSharedView = (): DetailViewConfig | EditViewConfig => ({
  elements: [
    {
      name: 'Main data',
      slug: 'main-data',
      subcategories: [
        {
          name: 'General data',
          properties: [shortnameCell()],
        },
        {
          name: 'IDs',
          properties: [
            idReadOnlyCell(),
            {
              title: 'Area Ids',
              component: CellComponent.ArrayCell,
              fields: {
                items: 'AreaIds',
              },
              params: {
                separator: ', ',
              },
            },
          ],
        },
        dataStatesSubCategory(),
        sourceSubCategory(),
      ],
    },
    gpsDataCategory(),
    odhTagCategory(),
    {
      name: 'Webcam Details',
      slug: 'Webcam Details',
      subcategories: [
        {
          name: 'Webcam Details',
          properties: [
            {
              title: 'Name',
              component: CellComponent.StringCell,
              fields: { text: 'Webcamname.{language}' },
            },
            {
              title: 'Image URL',
              component: CellComponent.UrlCell,
              fields: { text: 'Webcamurl' },
            },
            {
              title: 'Stream URL',
              component: CellComponent.UrlCell,
              fields: { text: 'Streamurl' },
            },
            {
              title: 'Preview URL',
              component: CellComponent.UrlCell,
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
});
