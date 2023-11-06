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
      propertyMappings: { text: 'sname' },
    },
    {
      title: 'Station type',
      component: CellComponent.StringCell,
      class: 'w-40',
      propertyMappings: { text: 'stype' },
    },
    {
      title: 'Station origin',
      component: CellComponent.StringCell,
      class: 'w-40',
      propertyMappings: { text: 'sorigin' },
    },
    {
      title: 'Station active',
      component: CellComponent.StringCell,
      class: 'w-40',
      propertyMappings: { text: 'sactive' },
    },
    {
      title: 'Station coordinate',
      component: CellComponent.TypeBasedCell,
      class: 'w-60',
      propertyMappings: { data: 'scoordinate' },
    },
    {
      title: 'Station metadata',
      component: CellComponent.TypeBasedCell,
      class: 'w-80',
      propertyMappings: { data: 'smetadata' },
    },

    {
      title: 'Parent name',
      component: CellComponent.StringCell,
      class: 'w-60',
      propertyMappings: { text: 'pname' },
    },
    {
      title: 'Parent type',
      component: CellComponent.StringCell,
      class: 'w-40',
      propertyMappings: { text: 'ptype' },
    },
    {
      title: 'Parent origin',
      component: CellComponent.StringCell,
      class: 'w-40',
      propertyMappings: { text: 'porigin' },
    },
    {
      title: 'Parent active',
      component: CellComponent.StringCell,
      class: 'w-40',
      propertyMappings: { text: 'pactive' },
    },
    {
      title: 'Parent coordinate',
      component: CellComponent.TypeBasedCell,
      class: 'w-60',
      propertyMappings: { data: 'pcoordinate' },
    },
    {
      title: 'Parent metadata',
      component: CellComponent.TypeBasedCell,
      class: 'w-80',
      propertyMappings: { data: 'pmetadata' },
    },
  ],
};
