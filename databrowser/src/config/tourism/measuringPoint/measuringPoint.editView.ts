import { EditViewConfig } from '../../../domain/datasetConfig/types';
import { CellComponent } from '../../../domain/cellComponents/types';
import {
  ID_READONLY_CONFIG,
  LAST_CHANGES_CONFIG,
} from '../configBuilderCommonView';

export const measuringPointEditView: EditViewConfig = {
  elements: [
    {
      name: 'Main data',
      slug: 'main-data',
      subcategories: [
        {
          name: 'General data',
          properties: [
            ID_READONLY_CONFIG,
            {
              title: 'Shortname',
              component: CellComponent.StringCell,
              fields: { text: 'Shortname' },
            },
            {
              title: 'Owner ID',
              component: CellComponent.StringCell,
              fields: { text: 'OwnerId' },
            },
            LAST_CHANGES_CONFIG,
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
              component: CellComponent.StringCell,
              fields: { text: 'LocationInfo.TvInfo.Name.{language}' },
            },
            {
              title: 'Region info',
              component: CellComponent.StringCell,
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
              title: 'GPS type',
              component: CellComponent.StringCell,
              fields: {
                text: 'GpsPoints.position.Gpstype',
              },
            },
            {
              title: 'Latitude',
              component: CellComponent.StringCell,
              fields: {
                text: 'GpsPoints.position.Latitude',
              },
            },
            {
              title: 'Longitude',
              component: CellComponent.StringCell,
              fields: {
                text: 'GpsPoints.position.Longitude',
              },
            },
            {
              title: 'Altitude',
              component: CellComponent.StringCell,
              fields: {
                text: 'GpsPoints.position.Altitude',
              },
            },
            {
              title: 'Altitude unit',
              component: CellComponent.StringCell,
              fields: {
                text: 'GpsPoints.position.AltitudeUnitofMeasure',
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
              component: CellComponent.StringCell,
              fields: { text: 'SnowHeight' },
            },
            {
              title: 'New snow height',
              component: CellComponent.StringCell,
              fields: { text: 'newSnowHeight' },
            },
            {
              title: 'Temperature',
              component: CellComponent.StringCell,
              fields: { text: 'Temperature' },
            },
            {
              title: 'Last snow date',
              component: CellComponent.DateCell,
              fields: { date: 'LastSnowDate' },
            },
          ],
        },
      ],
    },
  ],
};
