import { ListViewConfig } from '../../../domain/datasetConfig/types';
import { CellComponent } from '../../../domain/cellComponents/types';

export const measuringPointListView: ListViewConfig = {
  elements: [
    {
      title: 'Image',
      component: CellComponent.ImageCell,
      class: 'w-40',
      fields: {
        src: 'BezirksForecast.0.WeatherImgUrl',
      },
    },
    {
      title: 'Title',
      component: CellComponent.StringCell,
      class: 'w-48',
      fields: {
        text: 'Shortname',
      },
    },
    {
      title: 'Snow height',
      component: CellComponent.StringCell,
      class: 'w-48',
      fields: {
        text: 'SnowHeight',
      },
    },
    {
      title: 'Temperature',
      component: CellComponent.StringCell,
      class: 'w-48',
      fields: {
        text: 'Temperature',
      },
    },
    {
      title: 'GPS',
      component: CellComponent.GpsListCell,
      class: 'w-40',
      fields: { gpsEntries: 'GpsPoints[0].position[0]' },
      params: {
        type: 'Gpstype',
        latitude: 'Latitude',
        longitude: 'Longitude',
        altitude: 'Altitude',
        altitudeUnit: 'AltitudeUnitofMeasure',
      },
    },
    {
      title: 'Altitude',
      component: CellComponent.StringCell,
      class: 'w-48',
      fields: {
        text: 'Altitude',
      },
    },
    {
      title: 'Languages',
      component: CellComponent.ArrayCell,
      class: 'w-40',
      fields: {
        items: 'HasLanguage',
      },
      params: {
        separator: ', ',
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
        format: 'do MMMM yyyy',
      },
    },
    {
      title: 'Source',
      component: CellComponent.StringCell,
      class: 'w-36',
      fields: {
        text: 'Source',
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