// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import { ListViewConfig } from '../../../domain/datasetConfig/types';
import {
  imageTableCell,
  titleTableCell,
  sourceTableCell,
  languageTableCell,
  lastChangesTableCell,
  odhActiveTableCell,
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
    odhActiveTableCell(),
  ],
};
