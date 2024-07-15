// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import {
  DetailViewConfig,
  EditViewConfig,
} from '../../../domain/datasets/config/types';
import { DEFAULT_DATE_FORMAT } from '../../utils';

export const weatherForecastSharedView = ():
  | DetailViewConfig
  | EditViewConfig => ({
  elements: [
    {
      name: '5-Day Weather Forecast',
      slug: 'forecastDaily',
      subcategories: [
        {
          name: 'Municipality',
          properties: [
            {
              title: 'Municipality',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'MunicipalityName.{language}',
              },
            },
          ],
        },
        {
          name: 'TODAY',
          properties: [
            {
              title: '',
              component: CellComponent.DateCell,
              objectMapping: {
                date: 'ForeCastDaily.0.Date',
              },
              params: {
                format: DEFAULT_DATE_FORMAT,
              },
            },
            {
              title: '',
              component: CellComponent.ImageEditCell,
              objectMapping: {
                src: 'ForeCastDaily.0.WeatherImgUrl',
              },
              params: {
                width: '20%',
              },
            },
            {
              title: 'Weather Description',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'ForeCastDaily.0.WeatherDescription.{language}',
              },
            },
            {
              title: 'Max Temperature',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'ForeCastDaily.0.MaxTemp',
              },
            },
            {
              title: 'Min Temperature',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'ForeCastDaily.0.MinTemp',
              },
            },
            {
              title: 'Precipitation Probability',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'ForeCastDaily.0.PrecipitationProbability',
              },
            },
          ],
        },
        {
          name: 'TOMORROW',
          properties: [
            {
              title: '',
              component: CellComponent.DateCell,
              objectMapping: {
                date: 'ForeCastDaily.1.Date',
              },
              params: {
                format: DEFAULT_DATE_FORMAT,
              },
            },
            {
              title: '',
              component: CellComponent.ImageEditCell,
              objectMapping: {
                src: 'ForeCastDaily.1.WeatherImgUrl',
              },
              params: {
                width: '20%',
              },
            },
            {
              title: 'Weather Description',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'ForeCastDaily.1.WeatherDescription.{language}',
              },
            },
            {
              title: 'Max Temperature',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'ForeCastDaily.1.MaxTemp',
              },
            },
            {
              title: 'Min Temperature',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'ForeCastDaily.1.MinTemp',
              },
            },
            {
              title: 'Precipitation Probability',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'ForeCastDaily.1.PrecipitationProbability',
              },
            },
          ],
        },
        {
          name: 'IN TWO DAYS',
          properties: [
            {
              title: '',
              component: CellComponent.DateCell,
              objectMapping: {
                date: 'ForeCastDaily.2.Date',
              },
              params: {
                format: DEFAULT_DATE_FORMAT,
              },
            },
            {
              title: '',
              component: CellComponent.ImageEditCell,
              objectMapping: {
                src: 'ForeCastDaily.2.WeatherImgUrl',
              },
              params: {
                width: '20%',
              },
            },
            {
              title: 'Weather Description',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'ForeCastDaily.2.WeatherDescription.{language}',
              },
            },
            {
              title: 'Max Temperature',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'ForeCastDaily.2.MaxTemp',
              },
            },
            {
              title: 'Min Temperature',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'ForeCastDaily.2.MinTemp',
              },
            },
            {
              title: 'Precipitation Probability',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'ForeCastDaily.2.PrecipitationProbability',
              },
            },
          ],
        },
        {
          name: 'IN THREE DAYS',
          properties: [
            {
              title: '',
              component: CellComponent.DateCell,
              objectMapping: {
                date: 'ForeCastDaily.3.Date',
              },
              params: {
                format: DEFAULT_DATE_FORMAT,
              },
            },
            {
              title: '',
              component: CellComponent.ImageEditCell,
              objectMapping: {
                src: 'ForeCastDaily.3.WeatherImgUrl',
              },
              params: {
                width: '20%',
              },
            },
            {
              title: 'Weather Description',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'ForeCastDaily.3.WeatherDescription.{language}',
              },
            },
            {
              title: 'Max Temperature',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'ForeCastDaily.3.MaxTemp',
              },
            },
            {
              title: 'Min Temperature',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'ForeCastDaily.3.MinTemp',
              },
            },
            {
              title: 'Precipitation Probability',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'ForeCastDaily.3.PrecipitationProbability',
              },
            },
          ],
        },
        {
          name: 'IN FOUR DAYS',
          properties: [
            {
              title: '',
              component: CellComponent.DateCell,
              objectMapping: {
                date: 'ForeCastDaily.4.Date',
              },
              params: {
                format: DEFAULT_DATE_FORMAT,
              },
            },
            {
              title: '',
              component: CellComponent.ImageEditCell,
              objectMapping: {
                src: 'ForeCastDaily.4.WeatherImgUrl',
              },
              params: {
                width: '20%',
              },
            },
            {
              title: 'Weather Description',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'ForeCastDaily.4.WeatherDescription.{language}',
              },
            },
            {
              title: 'Max Temperature',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'ForeCastDaily.4.MaxTemp',
              },
            },
            {
              title: 'Min Temperature',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'ForeCastDaily.4.MinTemp',
              },
            },
            {
              title: 'Precipitation Probability',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'ForeCastDaily.4.PrecipitationProbability',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'Hourly Forecast Today',
      slug: 'hourly1',
      subcategories: [
        {
          name: '06:00',
          properties: [
            {
              title: '',
              component: CellComponent.ImageEditCell,
              objectMapping: {
                src: 'Forecast3HoursInterval.0.WeatherImgUrl',
              },
              params: {
                width: '20%',
              },
            },
            {
              title: 'Weather Description',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.0.WeatherDesc',
              },
            },
            {
              title: 'Temperature',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.0.Temperature',
              },
            },
            {
              title: 'Precipitation Probability',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.0.PrecipitationProbability',
              },
            },
          ],
        },
        {
          name: '09:00',
          properties: [
            {
              title: '',
              component: CellComponent.ImageEditCell,
              objectMapping: {
                src: 'Forecast3HoursInterval.1.WeatherImgUrl',
              },
              params: {
                width: '20%',
              },
            },
            {
              title: 'Weather Description',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.1.WeatherDesc',
              },
            },
            {
              title: 'Temperature',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.1.Temperature',
              },
            },
            {
              title: 'Precipitation Probability',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.1.PrecipitationProbability',
              },
            },
          ],
        },
        {
          name: '12:00',
          properties: [
            {
              title: '',
              component: CellComponent.ImageEditCell,
              objectMapping: {
                src: 'Forecast3HoursInterval.2.WeatherImgUrl',
              },
              params: {
                width: '20%',
              },
            },
            {
              title: 'Weather Description',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.2.WeatherDesc',
              },
            },
            {
              title: 'Temperature',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.2.Temperature',
              },
            },
            {
              title: 'Precipitation Probability',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.2.PrecipitationProbability',
              },
            },
          ],
        },
        {
          name: '15:00',
          properties: [
            {
              title: '',
              component: CellComponent.ImageEditCell,
              objectMapping: {
                src: 'Forecast3HoursInterval.3.WeatherImgUrl',
              },
              params: {
                width: '20%',
              },
            },
            {
              title: 'Weather Description',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.3.WeatherDesc',
              },
            },
            {
              title: 'Temperature',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.3.Temperature',
              },
            },
            {
              title: 'Precipitation Probability',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.3.PrecipitationProbability',
              },
            },
          ],
        },
        {
          name: '18:00',
          properties: [
            {
              title: '',
              component: CellComponent.ImageEditCell,
              objectMapping: {
                src: 'Forecast3HoursInterval.4.WeatherImgUrl',
              },
              params: {
                width: '20%',
              },
            },
            {
              title: 'Weather Description',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.4.WeatherDesc',
              },
            },
            {
              title: 'Temperature',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.4.Temperature',
              },
            },
            {
              title: 'Precipitation Probability',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.4.PrecipitationProbability',
              },
            },
          ],
        },
        {
          name: '21:00',
          properties: [
            {
              title: '',
              component: CellComponent.ImageEditCell,
              objectMapping: {
                src: 'Forecast3HoursInterval.5.WeatherImgUrl',
              },
              params: {
                width: '20%',
              },
            },
            {
              title: 'Weather Description',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.5.WeatherDesc',
              },
            },
            {
              title: 'Temperature',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.5.Temperature',
              },
            },
            {
              title: 'Precipitation Probability',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.5.PrecipitationProbability',
              },
            },
          ],
        },
        {
          name: '00:00',
          properties: [
            {
              title: '',
              component: CellComponent.ImageEditCell,
              objectMapping: {
                src: 'Forecast3HoursInterval.6.WeatherImgUrl',
              },
              params: {
                width: '20%',
              },
            },
            {
              title: 'Weather Description',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.6.WeatherDesc',
              },
            },
            {
              title: 'Temperature',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.6.Temperature',
              },
            },
            {
              title: 'Precipitation Probability',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.6.PrecipitationProbability',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'Hourly Forecast Tomorrow',
      slug: 'hourly2',
      subcategories: [
        {
          name: '03:00',
          properties: [
            {
              title: '',
              component: CellComponent.ImageEditCell,
              objectMapping: {
                src: 'Forecast3HoursInterval.7.WeatherImgUrl',
              },
              params: {
                width: '20%',
              },
            },
            {
              title: 'Weather Description',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.7.WeatherDesc',
              },
            },
            {
              title: 'Temperature',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.7.Temperature',
              },
            },
            {
              title: 'Precipitation Probability',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.7.PrecipitationProbability',
              },
            },
          ],
        },
        {
          name: '06:00',
          properties: [
            {
              title: '',
              component: CellComponent.ImageEditCell,
              objectMapping: {
                src: 'Forecast3HoursInterval.8.WeatherImgUrl',
              },
              params: {
                width: '20%',
              },
            },
            {
              title: 'Weather Description',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.8.WeatherDesc',
              },
            },
            {
              title: 'Temperature',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.8.Temperature',
              },
            },
            {
              title: 'Precipitation Probability',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.8.PrecipitationProbability',
              },
            },
          ],
        },
        {
          name: '09:00',
          properties: [
            {
              title: '',
              component: CellComponent.ImageEditCell,
              objectMapping: {
                src: 'Forecast3HoursInterval.9.WeatherImgUrl',
              },
              params: {
                width: '20%',
              },
            },
            {
              title: 'Weather Description',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.9.WeatherDesc',
              },
            },
            {
              title: 'Temperature',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.9.Temperature',
              },
            },
            {
              title: 'Precipitation Probability',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.9.PrecipitationProbability',
              },
            },
          ],
        },
        {
          name: '12:00',
          properties: [
            {
              title: '',
              component: CellComponent.ImageEditCell,
              objectMapping: {
                src: 'Forecast3HoursInterval.10.WeatherImgUrl',
              },
              params: {
                width: '20%',
              },
            },
            {
              title: 'Weather Description',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.10.WeatherDesc',
              },
            },
            {
              title: 'Temperature',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.10.Temperature',
              },
            },
            {
              title: 'Precipitation Probability',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.10.PrecipitationProbability',
              },
            },
          ],
        },
        {
          name: '15:00',
          properties: [
            {
              title: '',
              component: CellComponent.ImageEditCell,
              objectMapping: {
                src: 'Forecast3HoursInterval.11.WeatherImgUrl',
              },
              params: {
                width: '20%',
              },
            },
            {
              title: 'Weather Description',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.11.WeatherDesc',
              },
            },
            {
              title: 'Temperature',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.11.Temperature',
              },
            },
            {
              title: 'Precipitation Probability',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.11.PrecipitationProbability',
              },
            },
          ],
        },
        {
          name: '18:00',
          properties: [
            {
              title: '',
              component: CellComponent.ImageEditCell,
              objectMapping: {
                src: 'Forecast3HoursInterval.12.WeatherImgUrl',
              },
              params: {
                width: '20%',
              },
            },
            {
              title: 'Weather Description',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.12.WeatherDesc',
              },
            },
            {
              title: 'Temperature',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.12.Temperature',
              },
            },
            {
              title: 'Precipitation Probability',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.12.PrecipitationProbability',
              },
            },
          ],
        },
        {
          name: '21:00',
          properties: [
            {
              title: '',
              component: CellComponent.ImageEditCell,
              objectMapping: {
                src: 'Forecast3HoursInterval.13.WeatherImgUrl',
              },
              params: {
                width: '20%',
              },
            },
            {
              title: 'Weather Description',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.13.WeatherDesc',
              },
            },
            {
              title: 'Temperature',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.13.Temperature',
              },
            },
            {
              title: 'Precipitation Probability',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.13.PrecipitationProbability',
              },
            },
          ],
        },
        {
          name: '00:00',
          properties: [
            {
              title: '',
              component: CellComponent.ImageEditCell,
              objectMapping: {
                src: 'Forecast3HoursInterval.14.WeatherImgUrl',
              },
              params: {
                width: '20%',
              },
            },
            {
              title: 'Weather Description',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.14.WeatherDesc',
              },
            },
            {
              title: 'Temperature',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.14.Temperature',
              },
            },
            {
              title: 'Precipitation Probability',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.14.PrecipitationProbability',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'Hourly Forecast Day 3',
      slug: 'hourly3',
      subcategories: [
        {
          name: '03:00',
          properties: [
            {
              title: '',
              component: CellComponent.ImageEditCell,
              objectMapping: {
                src: 'Forecast3HoursInterval.15.WeatherImgUrl',
              },
              params: {
                width: '20%',
              },
            },
            {
              title: 'Weather Description',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.15.WeatherDesc',
              },
            },
            {
              title: 'Temperature',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.15.Temperature',
              },
            },
            {
              title: 'Precipitation Probability',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.15.PrecipitationProbability',
              },
            },
          ],
        },
        {
          name: '06:00',
          properties: [
            {
              title: '',
              component: CellComponent.ImageEditCell,
              objectMapping: {
                src: 'Forecast3HoursInterval.16.WeatherImgUrl',
              },
              params: {
                width: '20%',
              },
            },
            {
              title: 'Weather Description',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.16.WeatherDesc',
              },
            },
            {
              title: 'Temperature',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.16.Temperature',
              },
            },
            {
              title: 'Precipitation Probability',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.16.PrecipitationProbability',
              },
            },
          ],
        },
        {
          name: '09:00',
          properties: [
            {
              title: '',
              component: CellComponent.ImageEditCell,
              objectMapping: {
                src: 'Forecast3HoursInterval.17.WeatherImgUrl',
              },
              params: {
                width: '20%',
              },
            },
            {
              title: 'Weather Description',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.17.WeatherDesc',
              },
            },
            {
              title: 'Temperature',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.17.Temperature',
              },
            },
            {
              title: 'Precipitation Probability',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.17.PrecipitationProbability',
              },
            },
          ],
        },
        {
          name: '12:00',
          properties: [
            {
              title: '',
              component: CellComponent.ImageEditCell,
              objectMapping: {
                src: 'Forecast3HoursInterval.18.WeatherImgUrl',
              },
              params: {
                width: '20%',
              },
            },
            {
              title: 'Weather Description',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.18.WeatherDesc',
              },
            },
            {
              title: 'Temperature',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.18.Temperature',
              },
            },
            {
              title: 'Precipitation Probability',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.18.PrecipitationProbability',
              },
            },
          ],
        },
        {
          name: '15:00',
          properties: [
            {
              title: '',
              component: CellComponent.ImageEditCell,
              objectMapping: {
                src: 'Forecast3HoursInterval.19.WeatherImgUrl',
              },
              params: {
                width: '20%',
              },
            },
            {
              title: 'Weather Description',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.19.WeatherDesc',
              },
            },
            {
              title: 'Temperature',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.19.Temperature',
              },
            },
            {
              title: 'Precipitation Probability',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.19.PrecipitationProbability',
              },
            },
          ],
        },
        {
          name: '18:00',
          properties: [
            {
              title: '',
              component: CellComponent.ImageEditCell,
              objectMapping: {
                src: 'Forecast3HoursInterval.20.WeatherImgUrl',
              },
              params: {
                width: '20%',
              },
            },
            {
              title: 'Weather Description',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.20.WeatherDesc',
              },
            },
            {
              title: 'Temperature',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.20.Temperature',
              },
            },
            {
              title: 'Precipitation Probability',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.20.PrecipitationProbability',
              },
            },
          ],
        },
        {
          name: '21:00',
          properties: [
            {
              title: '',
              component: CellComponent.ImageEditCell,
              objectMapping: {
                src: 'Forecast3HoursInterval.21.WeatherImgUrl',
              },
              params: {
                width: '20%',
              },
            },
            {
              title: 'Weather Description',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.21.WeatherDesc',
              },
            },
            {
              title: 'Temperature',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.21.Temperature',
              },
            },
            {
              title: 'Precipitation Probability',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.21.PrecipitationProbability',
              },
            },
          ],
        },
        {
          name: '00:00',
          properties: [
            {
              title: '',
              component: CellComponent.ImageEditCell,
              objectMapping: {
                src: 'Forecast3HoursInterval.22.WeatherImgUrl',
              },
              params: {
                width: '20%',
              },
            },
            {
              title: 'Weather Description',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.22.WeatherDesc',
              },
            },
            {
              title: 'Temperature',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.22.Temperature',
              },
            },
            {
              title: 'Precipitation Probability',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.22.PrecipitationProbability',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'Hourly Forecast Day 4',
      slug: 'hourly4',
      subcategories: [
        {
          name: '03:00',
          properties: [
            {
              title: '',
              component: CellComponent.ImageEditCell,
              objectMapping: {
                src: 'Forecast3HoursInterval.23.WeatherImgUrl',
              },
              params: {
                width: '20%',
              },
            },
            {
              title: 'Weather Description',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.23.WeatherDesc',
              },
            },
            {
              title: 'Temperature',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.23.Temperature',
              },
            },
            {
              title: 'Precipitation Probability',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.23.PrecipitationProbability',
              },
            },
          ],
        },
        {
          name: '06:00',
          properties: [
            {
              title: '',
              component: CellComponent.ImageEditCell,
              objectMapping: {
                src: 'Forecast3HoursInterval.24.WeatherImgUrl',
              },
              params: {
                width: '20%',
              },
            },
            {
              title: 'Weather Description',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.24.WeatherDesc',
              },
            },
            {
              title: 'Temperature',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.24.Temperature',
              },
            },
            {
              title: 'Precipitation Probability',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.24.PrecipitationProbability',
              },
            },
          ],
        },
        {
          name: '09:00',
          properties: [
            {
              title: '',
              component: CellComponent.ImageEditCell,
              objectMapping: {
                src: 'Forecast3HoursInterval.25.WeatherImgUrl',
              },
              params: {
                width: '20%',
              },
            },
            {
              title: 'Weather Description',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.25.WeatherDesc',
              },
            },
            {
              title: 'Temperature',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.25.Temperature',
              },
            },
            {
              title: 'Precipitation Probability',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.25.PrecipitationProbability',
              },
            },
          ],
        },
        {
          name: '12:00',
          properties: [
            {
              title: '',
              component: CellComponent.ImageEditCell,
              objectMapping: {
                src: 'Forecast3HoursInterval.26.WeatherImgUrl',
              },
              params: {
                width: '20%',
              },
            },
            {
              title: 'Weather Description',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.26.WeatherDesc',
              },
            },
            {
              title: 'Temperature',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.26.Temperature',
              },
            },
            {
              title: 'Precipitation Probability',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.26.PrecipitationProbability',
              },
            },
          ],
        },
        {
          name: '15:00',
          properties: [
            {
              title: '',
              component: CellComponent.ImageEditCell,
              objectMapping: {
                src: 'Forecast3HoursInterval.27.WeatherImgUrl',
              },
              params: {
                width: '20%',
              },
            },
            {
              title: 'Weather Description',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.27.WeatherDesc',
              },
            },
            {
              title: 'Temperature',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.27.Temperature',
              },
            },
            {
              title: 'Precipitation Probability',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.27.PrecipitationProbability',
              },
            },
          ],
        },
        {
          name: '18:00',
          properties: [
            {
              title: '',
              component: CellComponent.ImageEditCell,
              objectMapping: {
                src: 'Forecast3HoursInterval.28.WeatherImgUrl',
              },
              params: {
                width: '20%',
              },
            },
            {
              title: 'Weather Description',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.28.WeatherDesc',
              },
            },
            {
              title: 'Temperature',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.28.Temperature',
              },
            },
            {
              title: 'Precipitation Probability',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.28.PrecipitationProbability',
              },
            },
          ],
        },
        {
          name: '21:00',
          properties: [
            {
              title: '',
              component: CellComponent.ImageEditCell,
              objectMapping: {
                src: 'Forecast3HoursInterval.29.WeatherImgUrl',
              },
              params: {
                width: '20%',
              },
            },
            {
              title: 'Weather Description',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.29.WeatherDesc',
              },
            },
            {
              title: 'Temperature',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.29.Temperature',
              },
            },
            {
              title: 'Precipitation Probability',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.29.PrecipitationProbability',
              },
            },
          ],
        },
        {
          name: '00:00',
          properties: [
            {
              title: '',
              component: CellComponent.ImageEditCell,
              objectMapping: {
                src: 'Forecast3HoursInterval.30.WeatherImgUrl',
              },
              params: {
                width: '20%',
              },
            },
            {
              title: 'Weather Description',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.30.WeatherDesc',
              },
            },
            {
              title: 'Temperature',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.30.Temperature',
              },
            },
            {
              title: 'Precipitation Probability',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.30.PrecipitationProbability',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'Hourly Forecast Day 5',
      slug: 'hourly5',
      subcategories: [
        {
          name: '03:00',
          properties: [
            {
              title: '',
              component: CellComponent.ImageEditCell,
              objectMapping: {
                src: 'Forecast3HoursInterval.31.WeatherImgUrl',
              },
              params: {
                width: '20%',
              },
            },
            {
              title: 'Weather Description',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.31.WeatherDesc',
              },
            },
            {
              title: 'Temperature',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.31.Temperature',
              },
            },
            {
              title: 'Precipitation Probability',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.31.PrecipitationProbability',
              },
            },
          ],
        },
        {
          name: '06:00',
          properties: [
            {
              title: '',
              component: CellComponent.ImageEditCell,
              objectMapping: {
                src: 'Forecast3HoursInterval.32.WeatherImgUrl',
              },
              params: {
                width: '20%',
              },
            },
            {
              title: 'Weather Description',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.32.WeatherDesc',
              },
            },
            {
              title: 'Temperature',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.32.Temperature',
              },
            },
            {
              title: 'Precipitation Probability',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.32.PrecipitationProbability',
              },
            },
          ],
        },
        {
          name: '09:00',
          properties: [
            {
              title: '',
              component: CellComponent.ImageEditCell,
              objectMapping: {
                src: 'Forecast3HoursInterval.33.WeatherImgUrl',
              },
              params: {
                width: '20%',
              },
            },
            {
              title: 'Weather Description',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.33.WeatherDesc',
              },
            },
            {
              title: 'Temperature',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.33.Temperature',
              },
            },
            {
              title: 'Precipitation Probability',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.33.PrecipitationProbability',
              },
            },
          ],
        },
        {
          name: '12:00',
          properties: [
            {
              title: '',
              component: CellComponent.ImageEditCell,
              objectMapping: {
                src: 'Forecast3HoursInterval.34.WeatherImgUrl',
              },
              params: {
                width: '20%',
              },
            },
            {
              title: 'Weather Description',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.34.WeatherDesc',
              },
            },
            {
              title: 'Temperature',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.34.Temperature',
              },
            },
            {
              title: 'Precipitation Probability',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.34.PrecipitationProbability',
              },
            },
          ],
        },
        {
          name: '15:00',
          properties: [
            {
              title: '',
              component: CellComponent.ImageEditCell,
              objectMapping: {
                src: 'Forecast3HoursInterval.35.WeatherImgUrl',
              },
              params: {
                width: '20%',
              },
            },
            {
              title: 'Weather Description',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.35.WeatherDesc',
              },
            },
            {
              title: 'Temperature',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.35.Temperature',
              },
            },
            {
              title: 'Precipitation Probability',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.35.PrecipitationProbability',
              },
            },
          ],
        },
        {
          name: '18:00',
          properties: [
            {
              title: '',
              component: CellComponent.ImageEditCell,
              objectMapping: {
                src: 'Forecast3HoursInterval.36.WeatherImgUrl',
              },
              params: {
                width: '20%',
              },
            },
            {
              title: 'Weather Description',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.36.WeatherDesc',
              },
            },
            {
              title: 'Temperature',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.36.Temperature',
              },
            },
            {
              title: 'Precipitation Probability',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.36.PrecipitationProbability',
              },
            },
          ],
        },
        {
          name: '21:00',
          properties: [
            {
              title: '',
              component: CellComponent.ImageEditCell,
              objectMapping: {
                src: 'Forecast3HoursInterval.37.WeatherImgUrl',
              },
              params: {
                width: '20%',
              },
            },
            {
              title: 'Weather Description',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.37.WeatherDesc',
              },
            },
            {
              title: 'Temperature',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.37.Temperature',
              },
            },
            {
              title: 'Precipitation Probability',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.37.PrecipitationProbability',
              },
            },
          ],
        },
        {
          name: '00:00',
          properties: [
            {
              title: '',
              component: CellComponent.ImageEditCell,
              objectMapping: {
                src: 'Forecast3HoursInterval.38.WeatherImgUrl',
              },
              params: {
                width: '20%',
              },
            },
            {
              title: 'Weather Description',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.38.WeatherDesc',
              },
            },
            {
              title: 'Temperature',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.38.Temperature',
              },
            },
            {
              title: 'Precipitation Probability',
              component: CellComponent.StringCell,
              objectMapping: {
                text: 'Forecast3HoursInterval.38.PrecipitationProbability',
              },
            },
          ],
        },
      ],
    },
  ],
});
