import { ListViewConfig } from '../../../domain/datasetConfig/types';
import { CellComponent } from '../../../domain/cellComponents/types';

export const webcamInfoListView: ListViewConfig = {
  elements: [
    {
      title: 'Image',
      component: CellComponent.ImageCell,
      class: 'w-40',
      fields: {
        src: 'Webcamurl',
      },
    },
    {
      title: 'Webcam Name',
      component: CellComponent.StringCell,
      class: 'w-40',
      fields: {
        text: 'Webcamname.{language}',
      },
    },
    {
      title: 'Webcam URL',
      component: CellComponent.UrlCell,
      class: 'w-40',
      fields: {
        text: 'Webcamurl',
      },
    },
    {
      title: 'GPS Data',
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
    {
      title: 'Edited',
      component: CellComponent.EditedDateCell,
      class: 'w-40',
      fields: {
        date: 'LastChange',
      },
      params: {
        format: 'dd. MMMM yyyy',
      },
    },
    {
      title: 'Source',
      component: CellComponent.StringCell,
      class: 'w-36',
      fields: {
        text: '_Meta.Source',
      },
    },
    {
      title: 'ODH state',
      component: CellComponent.StateCell,
      class: 'w-36',
      fields: {
        state: 'OdhActive',
      },
    },
  ],
};
