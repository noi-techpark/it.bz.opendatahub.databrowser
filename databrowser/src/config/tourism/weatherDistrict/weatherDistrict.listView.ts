// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { ListViewConfig } from '../../../domain/datasets/config/types';
import { CellComponent } from '../../../domain/cellComponents/types';
import { DEFAULT_DATE_FORMAT } from '../../utils';

export const weatherDistrictListView: ListViewConfig = {
  elements: [
    {
      title: 'Image',
      component: CellComponent.ImageCell,
      class: 'w-40',
      objectMapping: {
        src: 'BezirksForecast.0.WeatherImgUrl',
      },
    },
    {
      title: 'Date',
      component: CellComponent.DateCell,
      class: 'w-48',
      params: {
        format: DEFAULT_DATE_FORMAT,
      },
      objectMapping: {
        date: 'BezirksForecast.0.date',
      },
    },
    {
      title: 'District name',
      component: CellComponent.StringCell,
      class: 'w-48',
      objectMapping: {
        text: 'DistrictName',
      },
    },
    {
      title: 'Weather description',
      component: CellComponent.StringCell,
      class: 'w-48',
      objectMapping: {
        text: 'BezirksForecast.0.WeatherDesc',
      },
    },
    {
      title: 'Max Temperature',
      component: CellComponent.StringCell,
      class: 'w-36',
      objectMapping: {
        text: 'BezirksForecast.0.MaxTemp',
      },
    },
    {
      title: 'Min Temperature',
      component: CellComponent.StringCell,
      class: 'w-36',
      objectMapping: {
        text: 'BezirksForecast.0.MinTemp',
      },
    },
    {
      title: 'Last updated',
      component: CellComponent.EditedDateCell,
      class: 'w-40',
      objectMapping: {
        date: 'date',
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
        text: 'LicenseInfo.LicenseHolder',
      },
    },
  ],
};
