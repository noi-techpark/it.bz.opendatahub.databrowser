import { ListViewConfig } from '../../../domain/datasetConfig/types';
import { CellComponent } from '../../../domain/cellComponents/types';

export const districtListView: ListViewConfig = {
  elements: [
    {
      title: 'Title',
      component: CellComponent.StringCell,
      class: 'w-48',
      fields: {
        text: 'Detail.{language}.Title',
      },
    },
    // {
    //   title: 'GPS',
    //   component: CellComponent.GpsListCell,
    //   class: 'w-40',
    //   fields: { gpsEntries: 'GpsPoints[0].Latitude'},
    //   params: {
    //     type: 'position',
    //     latitude: 'Latitude',
    //     longitude: 'Longitude',
    //     altitude: 'Altitude',
    //     altitudeUnit: 'AltitudeUnitofMeasure',
    //   },
    // },
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
        format: 'dd MMMM yyyy',
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
