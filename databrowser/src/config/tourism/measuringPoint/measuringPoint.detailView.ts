import { DetailViewConfig } from '../../../domain/datasetConfig/types';
import { CellComponent } from '../../../domain/cellComponents/types';

export const measuringPointDetailView: DetailViewConfig = {
  elements: [
    {
      name: 'Main data',
      slug: 'main-data',
      subcategories: [
        {
          name: 'General data',
          properties: [
            {
              title: 'Shortname',
              component: CellComponent.StringCell,
              fields: { text: 'Shortname' },
            },
          ],
        },
        {
          name: 'IDs',
          properties: [
            {
              title: 'ID',
              component: CellComponent.StringCell,
              fields: { text: 'Id' },
              class: 'break-all',
            },
            {
              title: 'Owner Id',
              component: CellComponent.StringCell,
              fields: { text: 'OwnerId' },
              class: 'break-all',
            },
            {
              title: 'Region Id',
              component: CellComponent.StringCell,
              fields: { text: 'LocationInfo.RegionInfo.Id' },
              class: 'break-all',
            },
            {
              title: 'Area ids',
              component: CellComponent.ArrayCell,
              fields: {
                items: 'AreaIds',
              },
              params: {
                separator: ', ',
              },
            },
            {
              title: 'Municipality Id',
              component: CellComponent.StringCell,
              fields: { text: 'LocationInfo.MunicipalityInfo.Id' },
              class: 'break-all',
            },
            {
              title: 'District Id',
              component: CellComponent.StringCell,
              fields: { text: 'LocationInfo.DistrictInfo.Id' },
              class: 'break-all',
            },
          ],
        },
        {
          name: 'Data states',
          properties: [
            {
              title: 'Last Changes',
              component: CellComponent.DateCell,
              fields: { date: 'LastChange' },
              params: {
                format: 'd/M/yyyy HH:mm',
              },
            },
            {
              title: 'Active on Source',
              component: CellComponent.StringCell,
              fields: { text: 'SmgActive' },
            },
            {
              title: 'Active on Source',
              component: CellComponent.StringCell,
              fields: { text: 'Active' },
            },
            {
              title: 'Active on ODH',
              component: CellComponent.StringCell,
              fields: { text: 'OdhActive' },
            },
            {
              title: 'Published on',
              component: CellComponent.ArrayCell,
              fields: { items: 'PublishedOn' },
            },
          ],
        },
        {
          name: 'Source',
          properties: [
            {
              title: 'Source',
              component: CellComponent.StringCell,
              fields: { text: 'Source' },
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
              title: 'Region',
              component: CellComponent.StringCell,
              fields: { text: 'LocationInfo.RegionInfo.Name.{language}' },
            },
            {
              title: 'District',
              component: CellComponent.StringCell,
              fields: { text: 'LocationInfo.DistrictInfo.Name.{language}' },
            },
            {
              title: 'Municipality',
              component: CellComponent.StringCell,
              fields: { text: 'LocationInfo.MunicipalityInfo.Name.{language}' },
            },
          ],
        },
      ],
    },
    {
      name: 'GPS Data',
      slug: 'Gps',
      subcategories: [
        {
          name: 'GPS Data',
          properties: [
            {
              title: 'GPS Type',
              component: CellComponent.StringCell,
              fields: { text: 'GpsPoints.position.Gpstype' },
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
            {
              title: 'Altitude Unit',
              component: CellComponent.StringCell,
              fields: { text: 'GpsPoints.position.AltitudeUnitofMeasure' },
            },
          ],
        },
      ],
    },
  ],
};
