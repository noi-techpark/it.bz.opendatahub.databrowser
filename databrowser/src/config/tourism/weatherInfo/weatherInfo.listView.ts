// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import { ListViewConfig } from '../../../domain/datasetConfig/types';
import { languageTableCell } from '../../builder/tourism';
import { DEFAULT_DATE_FORMAT } from '../../utils';

export const weatherInfoListView: ListViewConfig = {
  elements: [
    {
      title: 'Image',
      component: CellComponent.ImageCell,
      class: 'w-40',
      fields: {
        src: 'Weather.{language}.Conditions.0.WeatherImgurl',
      },
    },
    {
      title: 'Evolution Title',
      component: CellComponent.StringCell,
      class: 'w-48',
      fields: {
        text: 'Weather.{language}.evolutiontitle',
      },
    },
    {
      title: 'Evolution',
      component: CellComponent.StringCell,
      class: 'w-48',
      fields: {
        text: 'Weather.{language}.evolution',
      },
    },
    {
      title: 'Condition Title',
      component: CellComponent.StringCell,
      class: 'w-40',
      fields: {
        text: 'Weather.{language}.Conditions.0.Title',
      },
    },
    {
      title: 'Conditions',
      component: CellComponent.StringCell,
      class: 'w-40',
      fields: {
        text: 'Weather.{language}.Conditions.0.WeatherCondition',
      },
    },
    {
      title: 'Temperatures',
      component: CellComponent.StringCell,
      class: 'w-40',
      fields: {
        text: 'Weather.{language}.Conditions.0.Temperatures',
      },
    },
    languageTableCell(),
    {
      title: 'Edited',
      component: CellComponent.EditedDateCell,
      class: 'w-40',
      fields: {
        date: 'Weather.{language}.Conditions.0.date',
      },
      params: {
        format: DEFAULT_DATE_FORMAT,
      },
    },
    {
      title: 'Source',
      component: CellComponent.UrlCell,
      class: 'w-36',
      fields: {
        text: 'LicenseInfo.LicenseHolder',
      },
    },
  ],
};
