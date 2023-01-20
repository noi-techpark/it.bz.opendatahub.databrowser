import { ListViewConfig } from '../../../domain/datasetConfig/types';
import { CellComponent } from '../../../domain/cellComponents/types';
import {
  EDITED_TABLE_CONFIG,
  LANGUAGE_TABLE_CONFIG,
  ODH_ACTIVE_TABLE_CONFIG,
  SOURCE_TABLE_CONFIG,
  TITLE_TABLE_CONFIG,
} from '../configBuilder';

export const municipalityListView: ListViewConfig = {
  elements: [
    { ...TITLE_TABLE_CONFIG },
    {
      title: 'CAP',
      component: CellComponent.StringCell,
      class: 'w-48',
      fields: {
        text: 'Plz',
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
    { ...LANGUAGE_TABLE_CONFIG },
    { ...EDITED_TABLE_CONFIG },
    { ...SOURCE_TABLE_CONFIG },
    { ...ODH_ACTIVE_TABLE_CONFIG },
  ],
};
