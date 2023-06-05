// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import { ListViewConfig } from '../../../domain/datasetConfig/types';
import { odhActiveTableCell } from '../../builder/tourism';
import { DEFAULT_DATE_FORMAT } from '../../utils';

export const snowReportListView: ListViewConfig = {
  //edit source odh
  elements: [
    {
      title: 'Image',
      component: CellComponent.ImageCell,
      class: 'w-40',
      fields: {
        src: 'SkiMapUrl',
      },
    },
    {
      title: 'Logo',
      component: CellComponent.ImageCell,
      class: 'w-40',
      fields: {
        src: 'contactlogo',
      },
    },
    {
      title: 'Name',
      component: CellComponent.StringCell,
      class: 'w-48',
      fields: {
        text: 'Areaname',
      },
    },
    {
      title: 'Location',
      component: CellComponent.StringCell,
      class: 'w-48',
      fields: {
        text: 'contactcity',
      },
    },
    {
      title: 'Station Snow Height',
      component: CellComponent.StringCell,
      class: 'w-48',
      fields: {
        text: 'Measuringpoints.0.Shortname',
      },
    },
    {
      title: 'Snow Height',
      component: CellComponent.StringCell,
      class: 'w-48',
      fields: {
        text: 'Measuringpoints.0.SnowHeight',
      },
    },
    {
      title: 'Slope km',
      component: CellComponent.StringCell,
      class: 'w-36',
      fields: {
        text: 'SkiAreaSlopeKm',
      },
    },
    {
      title: 'Source',
      component: CellComponent.StringCell,
      class: 'w-36',
      fields: {
        text: 'lang',
      },
    },
    {
      title: 'Edited',
      component: CellComponent.EditedDateCell,
      class: 'w-40',
      fields: {
        date: 'Measuringpoints.0.LastUpdate',
      },
      params: {
        format: DEFAULT_DATE_FORMAT,
      },
    },
    {
      title: 'Source',
      component: CellComponent.StringCell,
      class: 'w-36',
      fields: {
        text: 'Measuringpoints.0.Source',
      },
    },
    odhActiveTableCell(),
  ],
};
