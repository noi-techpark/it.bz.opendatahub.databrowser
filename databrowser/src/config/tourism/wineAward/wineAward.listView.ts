// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import { ListViewConfig } from '../../../domain/datasetConfig/types';
import {
  imageTableCell,
  languageTableCell,
  lastChangesTableCell,
  odhActiveTableCell,
  sourceTableCell,
} from '../../builder/tourism';

export const wineAwardListView: ListViewConfig = {
  elements: [
    imageTableCell(),
    {
      title: 'Name/Title',
      component: CellComponent.StringCell,
      class: 'w-48',
      objectMappings: {
        text: 'Detail.{language}.Title',
      },
    },
    {
      title: 'Header',
      component: CellComponent.StringCell,
      class: 'w-40',
      objectMappings: {
        text: 'Detail.{language}.Header',
      },
    },
    {
      title: 'Vintage',
      component: CellComponent.StringCell,
      class: 'w-40',
      objectMappings: {
        text: 'Vintage',
      },
    },
    {
      title: 'Award Year',
      component: CellComponent.StringCell,
      class: 'w-40',
      objectMappings: {
        text: 'Awardyear',
      },
    },
    {
      title: 'Awards',
      component: CellComponent.ArrayCell,
      class: 'w-40',
      objectMappings: {
        items: 'Awards',
      },
      params: {
        separator: ', ',
      },
    },
    languageTableCell(),
    lastChangesTableCell(),
    sourceTableCell(),
    odhActiveTableCell(),
  ],
};
