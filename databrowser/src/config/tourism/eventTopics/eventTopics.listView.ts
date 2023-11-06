// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { ListViewConfig } from '../../../domain/datasetConfig/types';
import { CellComponent } from '../../../domain/cellComponents/types';
import { idReadOnlyCell } from '../../builder/tourism';

export const eventTopicsListView: ListViewConfig = {
  elements: [
    idReadOnlyCell(),
    {
      title: 'Bitmask',
      component: CellComponent.StringCell,
      class: 'w-40',
      propertyMappings: {
        text: 'Bitmask',
      },
    },
    {
      title: 'Type',
      component: CellComponent.StringCell,
      class: 'w-40',
      propertyMappings: {
        text: 'Type',
      },
    },
    {
      title: 'TypeDesc',
      component: CellComponent.StringCell,
      class: 'w-40',
      propertyMappings: {
        text: 'TypeDesc.{language}',
      },
    },
  ],
};
