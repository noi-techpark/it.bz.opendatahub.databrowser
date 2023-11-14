// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import { ListViewConfig } from '../../../domain/datasetConfig/types';

export const stationTypesListView: ListViewConfig = {
  elements: [
    {
      title: 'Station name',
      component: CellComponent.StringCell,
      class: 'w-60',
      objectMappings: { text: 'sname' },
    },
    {
      title: 'Station type',
      component: CellComponent.StringCell,
      class: 'w-40',
      objectMappings: { text: 'stype' },
    },
    {
      title: 'Station origin',
      component: CellComponent.StringCell,
      class: 'w-40',
      objectMappings: { text: 'sorigin' },
    },
    {
      title: 'Station active',
      component: CellComponent.StringCell,
      class: 'w-40',
      objectMappings: { text: 'sactive' },
    },
    {
      title: 'Station coordinate',
      component: CellComponent.TypeBasedCell,
      class: 'w-60',
      objectMappings: { data: 'scoordinate' },
    },
    {
      title: 'Station metadata',
      component: CellComponent.TypeBasedCell,
      class: 'w-80',
      objectMappings: { data: 'smetadata' },
    },

    {
      title: 'Parent name',
      component: CellComponent.StringCell,
      class: 'w-60',
      objectMappings: { text: 'pname' },
    },
    {
      title: 'Parent type',
      component: CellComponent.StringCell,
      class: 'w-40',
      objectMappings: { text: 'ptype' },
    },
    {
      title: 'Parent origin',
      component: CellComponent.StringCell,
      class: 'w-40',
      objectMappings: { text: 'porigin' },
    },
    {
      title: 'Parent active',
      component: CellComponent.StringCell,
      class: 'w-40',
      objectMappings: { text: 'pactive' },
    },
    {
      title: 'Parent coordinate',
      component: CellComponent.TypeBasedCell,
      class: 'w-60',
      objectMappings: { data: 'pcoordinate' },
    },
    {
      title: 'Parent metadata',
      component: CellComponent.TypeBasedCell,
      class: 'w-80',
      objectMappings: { data: 'pmetadata' },
    },
  ],
};
