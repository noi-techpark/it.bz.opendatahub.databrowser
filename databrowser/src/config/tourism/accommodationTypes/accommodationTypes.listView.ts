// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { ListViewConfig } from '../../../domain/datasetConfig/types';
import { CellComponent } from '../../../domain/cellComponents/types';
import { idReadOnlyCell } from '../../builder/tourism';

export const accommodationTypesListView: ListViewConfig = {
  elements: [
    idReadOnlyCell(),
    {
      title: 'Key',
      component: CellComponent.StringCell,
      class: 'w-40',
      objectMappings: {
        text: 'Key',
      },
    },
    {
      title: 'Type',
      component: CellComponent.StringCell,
      class: 'w-40',
      objectMappings: {
        text: 'Type',
      },
    },
    {
      title: 'TypeDesc',
      component: CellComponent.StringCell,
      class: 'w-40',
      objectMappings: {
        text: 'TypeDesc.{language}',
      },
    },
  ],
};
