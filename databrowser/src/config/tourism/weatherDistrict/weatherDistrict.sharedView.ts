// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import {
  DetailViewConfig,
  EditViewConfig,
} from '../../../domain/datasets/config/types';
import { DEFAULT_DATE_FORMAT } from '../../utils';

export const weatherDistrictSharedView = ():
  | DetailViewConfig
  | EditViewConfig => ({
  elements: [
    {
      name: 'Main data',
      slug: 'main-data',
      subcategories: [
        {
          name: 'General data',
          properties: [
            {
              title: 'District Name',
              component: CellComponent.StringCell,
              objectMapping: { text: 'DistrictName' },
            },
          ],
        },
        {
          name: 'Forecast',
          properties: [
            {
              title: 'Date',
              component: CellComponent.DateCell,
              params: { format: DEFAULT_DATE_FORMAT },
              objectMapping: { date: 'BezirksForecast.0.date' },
            },
            {
              title: 'Weather image',
              component: CellComponent.ImageCell,
              objectMapping: { text: 'BezirksForecast.0.WeatherImgUrl' },
              params: { width: '20%' },
            },
            {
              title: 'Weather description',
              component: CellComponent.StringCell,
              objectMapping: { text: 'BezirksForecast.0.WeatherDesc' },
            },
            {
              title: 'Weather code',
              component: CellComponent.StringCell,
              objectMapping: { text: 'BezirksForecast.0.WeatherCode' },
            },
            {
              title: 'Weather code',
              component: CellComponent.StringCell,
              objectMapping: { text: 'BezirksForecast.0.WeatherCode' },
            },
            {
              title: 'Max temp',
              component: CellComponent.StringCell,
              objectMapping: { text: 'BezirksForecast.0.MaxTemp' },
            },
            {
              title: 'Min temp',
              component: CellComponent.StringCell,
              objectMapping: { text: 'BezirksForecast.0.MinTemp' },
            },
            {
              title: 'Freeze',
              component: CellComponent.StringCell,
              objectMapping: { text: 'BezirksForecast.0.Freeze' },
            },
            {
              title: 'Rain from',
              component: CellComponent.StringCell,
              objectMapping: { text: 'BezirksForecast.0.RainFrom' },
            },
            {
              title: 'Rain to',
              component: CellComponent.StringCell,
              objectMapping: { text: 'BezirksForecast.0.RainTo' },
            },
            {
              title: 'Part1',
              component: CellComponent.StringCell,
              objectMapping: { text: 'BezirksForecast.0.Part1' },
            },
            {
              title: 'Part2',
              component: CellComponent.StringCell,
              objectMapping: { text: 'BezirksForecast.0.Part2' },
            },
            {
              title: 'Part3',
              component: CellComponent.StringCell,
              objectMapping: { text: 'BezirksForecast.0.Part3' },
            },
            {
              title: 'Part4',
              component: CellComponent.StringCell,
              objectMapping: { text: 'BezirksForecast.0.Part4' },
            },
            {
              title: 'Thunderstorm',
              component: CellComponent.StringCell,
              objectMapping: { text: 'BezirksForecast.0.Thunderstorm' },
            },
          ],
        },
      ],
    },
  ],
});
