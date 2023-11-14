// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import { ListViewConfig } from '../../../domain/datasetConfig/types';
import {
  gpsDataTableCell,
  lastChangesTableCell,
  odhActiveTableCell,
  sourceTableCell,
} from '../../builder/tourism';

export const measuringPointListView: ListViewConfig = {
  elements: [
    {
      title: 'Short name',
      component: CellComponent.StringCell,
      class: 'w-48',
      objectMappings: {
        text: 'Shortname',
      },
    },
    {
      title: 'Region info',
      component: CellComponent.StringCell,
      class: 'w-48',
      objectMappings: {
        text: 'LocationInfo.RegionInfo.Name.{language}',
      },
    },
    {
      title: 'TV info',
      component: CellComponent.StringCell,
      class: 'w-48',
      objectMappings: {
        text: 'LocationInfo.TvInfo.Name.{language}',
      },
    },
    {
      title: 'Snow height',
      component: CellComponent.StringCell,
      class: 'w-48',
      objectMappings: {
        text: 'SnowHeight',
      },
    },
    {
      title: 'Temperature',
      component: CellComponent.StringCell,
      class: 'w-48',
      objectMappings: {
        text: 'Temperature',
      },
    },
    gpsDataTableCell(),
    lastChangesTableCell(),
    sourceTableCell(),
    odhActiveTableCell(),
  ],
};
