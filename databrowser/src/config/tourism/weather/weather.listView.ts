// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { ListViewConfig } from '../../../domain/datasetConfig/types';
import { CellComponent } from '../../../domain/cellComponents/types';
import { DEFAULT_DATE_FORMAT } from '../../utils';

export const weatherListView: ListViewConfig = {
  elements: [
    {
      title: 'Image',
      component: CellComponent.ImageCell,
      class: 'w-40',
      objectMappings: {
        src: 'Conditions.0.WeatherImgurl',
      },
    },
    {
      title: 'Evolution Title',
      component: CellComponent.StringCell,
      class: 'w-48',
      objectMappings: {
        text: 'evolutiontitle',
      },
    },
    {
      title: 'Evolution',
      component: CellComponent.StringCell,
      class: 'w-48',
      objectMappings: {
        text: 'evolution',
      },
    },
    {
      title: 'Condition Title',
      component: CellComponent.StringCell,
      class: 'w-40',
      objectMappings: {
        text: 'Conditions.0.Title',
      },
    },
    {
      title: 'Conditions',
      component: CellComponent.StringCell,
      class: 'w-40',
      objectMappings: {
        text: 'Conditions.0.WeatherCondition',
      },
    },
    {
      title: 'Temperatures',
      component: CellComponent.StringCell,
      class: 'w-40',
      objectMappings: {
        text: 'Conditions.0.Temperatures',
      },
    },
    {
      title: 'Languages',
      component: CellComponent.StringCell,
      class: 'w-40',
      objectMappings: {
        text: 'language',
      },
    },
    {
      title: 'Edited',
      component: CellComponent.EditedDateCell,
      class: 'w-40',
      objectMappings: {
        date: 'Conditions.0.date',
      },
      params: {
        format: DEFAULT_DATE_FORMAT,
      },
    },
    {
      title: 'Source',
      component: CellComponent.UrlCell,
      class: 'w-36',
      objectMappings: {
        text: 'LicenseInfo.LicenseHolder',
      },
    },
  ],
};
