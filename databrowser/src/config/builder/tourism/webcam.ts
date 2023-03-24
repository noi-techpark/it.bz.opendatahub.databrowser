import { CellComponent } from '../../../domain/cellComponents/types';
import {
  DetailElements,
  PropertyConfig,
} from '../../../domain/datasetConfig/types';

export const webcamCell = (): PropertyConfig => ({
  title: '',
  component: CellComponent.WebcamCell,
  listFields: {
    attributeName: 'webcams',
    pathToParent: 'Webcam',
    fields: {
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
