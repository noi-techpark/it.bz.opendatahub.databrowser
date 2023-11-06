// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import {
  DetailViewConfig,
  EditViewConfig,
} from '../../../domain/datasetConfig/types';
import { DEFAULT_DATE_FORMAT } from '../../utils';

export const weatherSharedView = (): DetailViewConfig | EditViewConfig => ({
  elements: [
    {
      name: 'Evolution',
      slug: 'evolution',
      subcategories: [
        {
          name: '',
          properties: [
            {
              title: 'Date',
              component: CellComponent.DateCell,
              propertyMappings: {
                date: 'date',
              },
              params: {
                format: DEFAULT_DATE_FORMAT,
              },
            },
            {
              title: 'Evolution Title',
              component: CellComponent.StringCell,
              propertyMappings: {
                text: 'evolutiontitle',
              },
            },
            {
              title: 'Evolution',
              component: CellComponent.StringCell,
              propertyMappings: {
                text: 'evolution',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'Conditions',
      slug: 'conditions',
      subcategories: [
        {
          name: 'Date',
          properties: [
            {
              title: '',
              component: CellComponent.DateCell,
              propertyMappings: {
                date: 'Conditions.0.date',
              },
              params: {
                format: DEFAULT_DATE_FORMAT,
              },
            },
            {
              title: 'Image',
              component: CellComponent.ImageEditCell,
              propertyMappings: {
                src: 'Conditions.0.WeatherImgurl',
              },
              params: {
                width: '80%',
              },
            },
            {
              title: 'Title',
              component: CellComponent.StringCell,
              propertyMappings: {
                text: 'Conditions.0.Title',
              },
            },
            {
              title: 'Weather Condition',
              component: CellComponent.StringCell,
              propertyMappings: {
                text: 'Conditions.0.WeatherCondition',
              },
            },
            {
              title: 'Weather Description',
              component: CellComponent.StringCell,
              propertyMappings: {
                text: 'Conditions.0.Weatherdesc',
              },
            },
            {
              title: 'Temperatures',
              component: CellComponent.StringCell,
              propertyMappings: {
                text: 'Conditions.0.Temperatures',
              },
            },
            {
              title: 'Temperature Max',
              component: CellComponent.StringCell,
              propertyMappings: {
                text: 'Conditions.0.TempMaxmax',
              },
            },
            {
              title: 'Temperature MaxMin',
              component: CellComponent.StringCell,
              propertyMappings: {
                text: 'Conditions.0.TempMaxmin',
              },
            },
            {
              title: 'Temperature MinMax',
              component: CellComponent.StringCell,
              propertyMappings: {
                text: 'Conditions.0.TempMinmax',
              },
            },
            {
              title: 'Temperature Min',
              component: CellComponent.StringCell,
              propertyMappings: {
                text: 'Conditions.0.TempMinmin',
              },
            },
            {
              title: 'Reliability in %',
              component: CellComponent.StringCell,
              propertyMappings: {
                text: 'Conditions.0.Reliability',
              },
            },
            {
              title: 'Bulletin Status',
              component: CellComponent.StringCell,
              propertyMappings: {
                text: 'Conditions.0.bulletinStatus',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'Forecast',
      slug: 'forecast',
      subcategories: [
        {
          name: 'Date',
          properties: [
            {
              title: '',
              component: CellComponent.DateCell,
              propertyMappings: {
                date: 'Forecast.0.date',
              },
              params: {
                format: DEFAULT_DATE_FORMAT,
              },
            },
            {
              title: 'Image',
              component: CellComponent.ImageEditCell,
              propertyMappings: {
                src: 'Forecast.0.WeatherImgurl',
              },
              params: {
                width: '15%',
              },
            },
            {
              title: 'Weather Description',
              component: CellComponent.StringCell,
              propertyMappings: {
                text: 'Forecast.0.Weatherdesc',
              },
            },
            {
              title: 'Weather Code',
              component: CellComponent.StringCell,
              propertyMappings: {
                text: 'Forecast.0.Weathercode',
              },
            },
            {
              title: 'Temperature Max',
              component: CellComponent.StringCell,
              propertyMappings: {
                text: 'Forecast.0.TempMaxmax',
              },
            },
            {
              title: 'Temperature MaxMin',
              component: CellComponent.StringCell,
              propertyMappings: {
                text: 'Forecast.0.TempMaxmin',
              },
            },
            {
              title: 'Temperature MinMax',
              component: CellComponent.StringCell,
              propertyMappings: {
                text: 'Forecast.0.TempMinmin',
              },
            },
            {
              title: 'Reliability in %',
              component: CellComponent.StringCell,
              propertyMappings: {
                text: 'Forecast.0.Reliability',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'Mountain Weather',
      slug: 'mountain-weather',
      subcategories: [
        {
          name: 'General',
          properties: [
            {
              title: 'Date',
              component: CellComponent.DateCell,
              propertyMappings: {
                date: 'Mountain.0.date',
              },
              params: {
                format: DEFAULT_DATE_FORMAT,
              },
            },
            {
              title: 'Image',
              component: CellComponent.ImageEditCell,
              propertyMappings: {
                src: 'Mountain.0.MountainImgurl',
              },
              params: {
                width: '80%',
              },
            },

            {
              title: 'Title',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'Mountain.0.Title' },
            },
            {
              title: 'Conditions',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'Mountain.0.Conditions' },
            },
            {
              title: 'Weather Description',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'Mountain.0.Weatherdesc' },
            },
            {
              title: 'Zerolimit',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'Mountain.0.Zerolimit' },
            },
            {
              title: 'Reliability in %',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'Mountain.0.Reliability' },
            },
          ],
        },
        {
          name: 'North',
          properties: [
            {
              title: 'Date',
              component: CellComponent.DateCell,
              propertyMappings: {
                date: 'Mountain.0.date',
              },
              params: {
                format: DEFAULT_DATE_FORMAT,
              },
            },
            {
              title: 'Image',
              component: CellComponent.ImageEditCell,
              propertyMappings: {
                src: 'Mountain.0.Northimgurl',
              },
              params: {
                width: '15%',
              },
            },
            {
              title: 'North Code',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'Mountain.0.Northcode' },
            },
            {
              title: 'North Description',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'Mountain.0.Northdesc' },
            },
          ],
        },
        {
          name: 'South',
          properties: [
            {
              title: 'Date',
              component: CellComponent.DateCell,
              propertyMappings: {
                date: 'Mountain.0.date',
              },
              params: {
                format: DEFAULT_DATE_FORMAT,
              },
            },
            {
              title: 'Image',
              component: CellComponent.ImageEditCell,
              propertyMappings: {
                src: 'Mountain.0.Southimgurl',
              },
              params: {
                width: '15%',
              },
            },
            {
              title: 'South Code',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'Mountain.0.Southcode' },
            },
            {
              title: 'South Description',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'Mountain.0.Southdesc' },
            },
          ],
        },
        {
          name: 'Sunrise and Sunset/Moonrise and Moonset',
          properties: [
            {
              title: 'Date',
              component: CellComponent.DateCell,
              propertyMappings: {
                date: 'Mountain.0.date',
              },
              params: {
                format: DEFAULT_DATE_FORMAT,
              },
            },
            {
              title: 'Sunrise',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'Mountain.0.Sunrise' },
            },
            {
              title: 'Sunset',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'Mountain.0.Sunset' },
            },
            {
              title: 'Moonrise',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'Mountain.0.Moonrise' },
            },
            {
              title: 'Moonset',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'Mountain.0.Moonset' },
            },
          ],
        },
        {
          name: 'Temperatures',
          properties: [
            {
              title: 'Date',
              component: CellComponent.DateCell,
              propertyMappings: {
                date: 'Mountain.0.date',
              },
              params: {
                format: DEFAULT_DATE_FORMAT,
              },
            },
            {
              title: 'Temp1000',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'Mountain.0.Temp1000' },
            },
            {
              title: 'Temp2000',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'Mountain.0.Temp2000' },
            },
            {
              title: 'Temp3000',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'Mountain.0.Temp3000' },
            },
            {
              title: 'Temp4000',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'Mountain.0.Temp4000' },
            },
          ],
        },
        {
          name: 'Wind',
          properties: [
            {
              title: 'Date',
              component: CellComponent.DateCell,
              propertyMappings: {
                date: 'Mountain.0.date',
              },
              params: {
                format: DEFAULT_DATE_FORMAT,
              },
            },
            {
              title: 'Image',
              component: CellComponent.ImageEditCell,
              propertyMappings: {
                src: 'Mountain.0.WindImgurl',
              },
              params: {
                width: '15%',
              },
            },
            {
              title: 'Wind Code',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'Mountain.0.Windcode' },
            },
            {
              title: 'Wind Description',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'Mountain.0.Winddesc' },
            },
            {
              title: 'Snow Limit',
              component: CellComponent.StringCell,
              propertyMappings: { text: 'Mountain.0.Snowlimit.0' },
            },
          ],
        },
      ],
    },
    {
      name: 'Weather in Bolzano/Bozen',
      slug: 'weather-bolzano',
      subcategories: [
        {
          name: 'Date',
          properties: [
            {
              title: '',
              component: CellComponent.DateCell,
              propertyMappings: {
                date: 'Stationdata.3.date',
              },
              params: {
                format: DEFAULT_DATE_FORMAT,
              },
            },
            {
              title: 'Image',
              component: CellComponent.ImageEditCell,
              propertyMappings: {
                src: 'Stationdata.2.WeatherImgUrl',
              },
              params: {
                width: '15%',
              },
            },
            {
              title: 'City Name',
              component: CellComponent.StringCell,
              propertyMappings: {
                text: 'Stationdata.2.CityName',
              },
            },
            {
              title: 'Weather Code',
              component: CellComponent.StringCell,
              propertyMappings: {
                text: 'Stationdata.2.WeatherCode',
              },
            },
            {
              title: 'Weather Description',
              component: CellComponent.StringCell,
              propertyMappings: {
                text: 'Stationdata.2.WeatherDesc',
              },
            },
            {
              title: 'Max Temperature',
              component: CellComponent.StringCell,
              propertyMappings: {
                text: 'Stationdata.2.MaxTemp',
              },
            },
            {
              title: 'Min Temperature',
              component: CellComponent.StringCell,
              propertyMappings: {
                text: 'Stationdata.2.MinTemp',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'Weather in Merano/Meran',
      slug: 'weather-merano',
      subcategories: [
        {
          name: 'Date',
          properties: [
            {
              title: '',
              component: CellComponent.DateCell,
              propertyMappings: {
                date: 'Stationdata.1.date',
              },
              params: {
                format: DEFAULT_DATE_FORMAT,
              },
            },
            {
              title: 'Image',
              component: CellComponent.ImageEditCell,
              propertyMappings: {
                src: 'Stationdata.1.WeatherImgUrl',
              },
              params: {
                width: '15%',
              },
            },
            {
              title: 'City Name',
              component: CellComponent.StringCell,
              propertyMappings: {
                text: 'Stationdata.1.CityName',
              },
            },
            {
              title: 'Weather Code',
              component: CellComponent.StringCell,
              propertyMappings: {
                text: 'Stationdata.1.WeatherCode',
              },
            },
            {
              title: 'Weather Description',
              component: CellComponent.StringCell,
              propertyMappings: {
                text: 'Stationdata.1.WeatherDesc',
              },
            },
            {
              title: 'Max Temperature',
              component: CellComponent.StringCell,
              propertyMappings: {
                text: 'Stationdata.1.MaxTemp',
              },
            },
            {
              title: 'Min Temperature',
              component: CellComponent.StringCell,
              propertyMappings: {
                text: 'Stationdata.1.MinTemp',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'Weather in Bressanone/Brixen',
      slug: 'weather-bressanone',
      subcategories: [
        {
          name: 'Date',
          properties: [
            {
              title: '',
              component: CellComponent.DateCell,
              propertyMappings: {
                date: 'Stationdata.4.date',
              },
              params: {
                format: DEFAULT_DATE_FORMAT,
              },
            },
            {
              title: 'Image',
              component: CellComponent.ImageEditCell,
              propertyMappings: {
                src: 'Stationdata.4.WeatherImgUrl',
              },
              params: {
                width: '15%',
              },
            },
            {
              title: 'City Name',
              component: CellComponent.StringCell,
              propertyMappings: {
                text: 'Stationdata.4.CityName',
              },
            },
            {
              title: 'Weather Code',
              component: CellComponent.StringCell,
              propertyMappings: {
                text: 'Stationdata.4.WeatherCode',
              },
            },
            {
              title: 'Weather Description',
              component: CellComponent.StringCell,
              propertyMappings: {
                text: 'Stationdata.4.WeatherDesc',
              },
            },
            {
              title: 'Max Temperature',
              component: CellComponent.StringCell,
              propertyMappings: {
                text: 'Stationdata.4.MaxTemp',
              },
            },
            {
              title: 'Min Temperature',
              component: CellComponent.StringCell,
              propertyMappings: {
                text: 'Stationdata.4.MinTemp',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'Weather in Brunico/Bruneck',
      slug: 'weather-brunico',
      subcategories: [
        {
          name: 'Date',
          properties: [
            {
              title: '',
              component: CellComponent.DateCell,
              propertyMappings: {
                date: 'Stationdata.5.date',
              },
              params: {
                format: DEFAULT_DATE_FORMAT,
              },
            },
            {
              title: 'Image',
              component: CellComponent.ImageEditCell,
              propertyMappings: {
                src: 'Stationdata.5.WeatherImgUrl',
              },
              params: {
                width: '15%',
              },
            },
            {
              title: 'City Name',
              component: CellComponent.StringCell,
              propertyMappings: {
                text: 'Stationdata.5.CityName',
              },
            },
            {
              title: 'Weather Code',
              component: CellComponent.StringCell,
              propertyMappings: {
                text: 'Stationdata.5.WeatherCode',
              },
            },
            {
              title: 'Weather Description',
              component: CellComponent.StringCell,
              propertyMappings: {
                text: 'Stationdata.5.WeatherDesc',
              },
            },
            {
              title: 'Max Temperature',
              component: CellComponent.StringCell,
              propertyMappings: {
                text: 'Stationdata.5.MaxTemp',
              },
            },
            {
              title: 'Min Temperature',
              component: CellComponent.StringCell,
              propertyMappings: {
                text: 'Stationdata.5.MinTemp',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'Weather in Vipiteno/Sterzing',
      slug: 'weather-vipiteno',
      subcategories: [
        {
          name: 'Date',
          properties: [
            {
              title: '',
              component: CellComponent.DateCell,
              propertyMappings: {
                date: 'Stationdata.3.date',
              },
              params: {
                format: DEFAULT_DATE_FORMAT,
              },
            },
            {
              title: 'Image',
              component: CellComponent.ImageEditCell,
              propertyMappings: {
                src: 'Stationdata.3.WeatherImgUrl',
              },
              params: {
                width: '15%',
              },
            },
            {
              title: 'City Name',
              component: CellComponent.StringCell,
              propertyMappings: {
                text: 'Stationdata.3.CityName',
              },
            },
            {
              title: 'Weather Code',
              component: CellComponent.StringCell,
              propertyMappings: {
                text: 'Stationdata.3.WeatherCode',
              },
            },
            {
              title: 'Weather Description',
              component: CellComponent.StringCell,
              propertyMappings: {
                text: 'Stationdata.3.WeatherDesc',
              },
            },
            {
              title: 'Max Temperature',
              component: CellComponent.StringCell,
              propertyMappings: {
                text: 'Stationdata.3.MaxTemp',
              },
            },
            {
              title: 'Min Temperature',
              component: CellComponent.StringCell,
              propertyMappings: {
                text: 'Stationdata.3.MinTemp',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'Weather in Silandro/Schlanders',
      slug: 'weather-silandro',
      subcategories: [
        {
          name: 'Date',
          properties: [
            {
              title: '',
              component: CellComponent.DateCell,
              propertyMappings: {
                date: 'Stationdata.0.date',
              },
              params: {
                format: DEFAULT_DATE_FORMAT,
              },
            },
            {
              title: 'Image',
              component: CellComponent.ImageEditCell,
              propertyMappings: {
                src: 'Stationdata.0.WeatherImgUrl',
              },
              params: {
                width: '15%',
              },
            },
            {
              title: 'City Name',
              component: CellComponent.StringCell,
              propertyMappings: {
                text: 'Stationdata.0.CityName',
              },
            },
            {
              title: 'Weather Code',
              component: CellComponent.StringCell,
              propertyMappings: {
                text: 'Stationdata.0.WeatherCode',
              },
            },
            {
              title: 'Weather Description',
              component: CellComponent.StringCell,
              propertyMappings: {
                text: 'Stationdata.0.WeatherDesc',
              },
            },
            {
              title: 'Max Temperature',
              component: CellComponent.StringCell,
              propertyMappings: {
                text: 'Stationdata.0.MaxTemp',
              },
            },
            {
              title: 'Min Temperature',
              component: CellComponent.StringCell,
              propertyMappings: {
                text: 'Stationdata.0.MinTemp',
              },
            },
          ],
        },
      ],
    },
  ],
});
