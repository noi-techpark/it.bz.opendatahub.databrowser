// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { ListViewConfig } from '../../../domain/datasets/config/types';
import { CellComponent } from '../../../domain/cellComponents/types';
import { DEFAULT_DATE_FORMAT } from '../../utils';

export const forecastListView: ListViewConfig = {
  elements: [
    {
      title: 'Image',
      component: CellComponent.ImageCell,
      class: 'w-40',
      objectMapping: {
        src: 'ForeCastDaily.0.WeatherImgUrl',
      },
    },
    {
      title: 'Municipality',
      component: CellComponent.StringCell,
      class: 'w-48',
      objectMapping: {
        text: 'MunicipalityName.{language}',
      },
    },
    {
      title: 'Weather Description',
      component: CellComponent.StringCell,
      class: 'w-48',
      objectMapping: {
        text: 'ForeCastDaily.0.WeatherDescription.{language}',
      },
    },
    {
      title: 'Max Temperature',
      component: CellComponent.StringCell,
      class: 'w-40',
      objectMapping: {
        text: 'ForeCastDaily.0.MaxTemp',
      },
    },
    {
      title: 'Min Temperature',
      component: CellComponent.StringCell,
      class: 'w-40',
      objectMapping: {
        text: 'ForeCastDaily.0.MinTemp',
      },
    },
    {
      title: 'Edited',
      component: CellComponent.EditedDateCell,
      class: 'w-40',
      objectMapping: {
        date: 'LastChange',
      },
      params: {
        format: DEFAULT_DATE_FORMAT,
      },
    },
    {
      title: 'Source',
      component: CellComponent.UrlCell,
      class: 'w-36',
      objectMapping: {
        text: '_Meta.Source',
      },
    },
  ],
};
