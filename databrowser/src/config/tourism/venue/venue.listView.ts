// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import { ListViewConfig } from '../../../domain/datasets/config/types';
import {
  imageTableCell,
  titleTableCell,
  sourceTableCell,
  languageTableCell,
  lastChangesTableCell,
  publishedOnTableCell,
} from '../../builder/tourism';

export const venueListView: ListViewConfig = {
  elements: [
    imageTableCell(),
    titleTableCell(),
    {
      title: 'Category',
      component: CellComponent.StringCell,
      class: 'w-60',
      objectMapping: { text: 'VenueCategory.0.VenueCode' },
    },
    {
      title: 'Location',
      component: CellComponent.StringCell,
      class: 'w-40',
      objectMapping: {
        text: 'LocationInfo.MunicipalityInfo.Name.{language}',
      },
    },
    languageTableCell(),
    lastChangesTableCell(),
    sourceTableCell(),
    {
      title: 'Source state',
      component: CellComponent.StateCell,
      class: 'w-40',
      objectMapping: {
        state: 'Active',
      },
    },
    publishedOnTableCell(),
  ],
};
