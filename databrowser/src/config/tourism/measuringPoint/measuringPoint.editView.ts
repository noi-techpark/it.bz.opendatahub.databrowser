import { EditViewConfig } from '../../../domain/datasetConfig/types';
import { CellComponent } from '../../../domain/cellComponents/types';

export const measuringPointEditView: EditViewConfig = {
  elements: [
    {
      name: 'Main data',
      slug: 'main-data',
      subcategories: [
        {
          name: 'General data',
          properties: [
            {
              title: 'ID',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'Id' },
            },
            {
              title: 'Shortname',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'Shortname' },
            },
            {
              title: 'Owner ID',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'OwnerId' },
            },
            {
              title: 'Last update',
              component: CellComponent.EditedDateCell, //date picker when ready
              class: 'w-40',
              fields: {
                date: '_Meta.LastUpdate',
              },
              params: {
                format: 'do MMMM yyyy',
              },
            },
            {
              title: 'Active',
              component: CellComponent.ToggleCell,
              fields: { text: 'Active' },
            },
            {
              title: 'Smg Active',
              component: CellComponent.ToggleCell,
              fields: { text: 'SmgActive' },
            },
          ],
        },
      ],
    },
    {
      name: 'Location',
      slug: 'location',
      subcategories: [
        {
          name: 'Location',
          properties: [
            {
              title: 'TV info',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'LocationInfo.TvInfo.Name.{language}' },
            },
            {
              title: 'Region info',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'LocationInfo.RegionInfo.Name.{language}' },
            },
          ],
        },
      ],
    },
    {
      name: 'GPS Data',
      slug: 'gps-data',
      subcategories: [
        {
          name: 'GPS Data',
          properties: [
            {
              title: '',
              component: CellComponent.GpsPointsCell, //To be discussed.
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
      name: 'Sensor data',
      slug: 'sensor-data',
      subcategories: [
        {
          name: 'Sensor data',
          properties: [
            {
              title: 'Snow height',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'SnowHeight' },
            },
            {
              title: 'New snow height',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'newSnowHeight' },
            },
            {
              title: 'Temperature',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'Temperature' },
            },
            {
              title: 'Last snow date',
              component: CellComponent.InputSingleLineCell,
              fields: { text: 'LastSnowDate' },
            },
          ],
        },
      ],
    },
  ],
};
