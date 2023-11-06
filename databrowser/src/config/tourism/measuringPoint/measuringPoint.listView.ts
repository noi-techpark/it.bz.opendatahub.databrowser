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
      propertyMappings: {
        text: 'Shortname',
      },
    },
    {
      title: 'Region info',
      component: CellComponent.StringCell,
      class: 'w-48',
      propertyMappings: {
        text: 'LocationInfo.RegionInfo.Name.{language}',
      },
    },
    {
      title: 'TV info',
      component: CellComponent.StringCell,
      class: 'w-48',
      propertyMappings: {
        text: 'LocationInfo.TvInfo.Name.{language}',
      },
    },
    {
      title: 'Snow height',
      component: CellComponent.StringCell,
      class: 'w-48',
      propertyMappings: {
        text: 'SnowHeight',
      },
    },
    {
      title: 'Temperature',
      component: CellComponent.StringCell,
      class: 'w-48',
      propertyMappings: {
        text: 'Temperature',
      },
    },
    gpsDataTableCell(),
    lastChangesTableCell(),
    sourceTableCell(),
    odhActiveTableCell(),
  ],
};
