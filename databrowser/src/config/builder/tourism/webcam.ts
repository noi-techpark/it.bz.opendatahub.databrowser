import { CellComponent } from '../../../domain/cellComponents/types';
import { PropertyConfig } from '../../../domain/datasetConfig/types';

export const webcamTableCell = (): PropertyConfig => ({
  title: '',
  component: CellComponent.WebcamCell,
  class: 'break-all',
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
