// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import { ListViewConfig } from '../../../domain/datasetConfig/types';
import {
  gpsDataTableCell,
  languageTableCell,
  lastChangesTableCell,
  odhActiveTableCell,
  sourceTableCell,
  titleTableCell,
} from '../../builder/tourism';

export const municipalityListView: ListViewConfig = {
  elements: [
    titleTableCell(),
    {
      title: 'CAP',
      component: CellComponent.StringCell,
      class: 'w-48',
      objectMappings: {
        text: 'Plz',
      },
    },
    gpsDataTableCell(),
    languageTableCell(),
    lastChangesTableCell(),
    sourceTableCell(),
    odhActiveTableCell(),
  ],
};
