// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import { ListViewConfig } from '../../../domain/datasetConfig/types';
import {
  imageTableCell,
  languageTableCell,
  lastChangesTableCell,
  sourceTableCell,
  titleTableCell,
} from '../../builder/tourism';

export const articleListView: ListViewConfig = {
  elements: [
    imageTableCell(),
    titleTableCell(),
    {
      title: 'Type',
      component: CellComponent.StringCell,
      class: 'w-48',
      propertyMappings: {
        text: 'Type',
      },
    },
    {
      title: 'SubType',
      component: CellComponent.StringCell,
      class: 'w-48',
      propertyMappings: {
        text: 'SubType',
      },
    },
    {
      title: 'Tags',
      component: CellComponent.ArrayCell,
      class: 'w-40',
      propertyMappings: {
        items: 'SmgTags',
      },
      params: {
        separator: ', ',
      },
    },
    languageTableCell(),
    lastChangesTableCell(),
    sourceTableCell(),
  ],
};
