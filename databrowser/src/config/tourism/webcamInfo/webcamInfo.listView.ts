import { ListViewConfig } from '../../../domain/datasetConfig/types';
import { CellComponent } from '../../../domain/cellComponents/types';

export const eventTopicsListView: ListViewConfig = {
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
      title: 'GPS',
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
