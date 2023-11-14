// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import { ListViewConfig } from '../../../domain/datasetConfig/types';
import {
  languageTableCell,
  lastChangesTableCell,
  odhActiveTableCell,
} from '../../builder/tourism';
import { DEFAULT_DATE_TIME_FORMAT } from '../../utils';

export const eventShortListView: ListViewConfig = {
  elements: [
    {
      title: 'Title',
      component: CellComponent.StringCell,
      class: 'w-48',
      objectMappings: { text: 'EventTitle.{language}' },
    },
    {
      title: 'Date start',
      component: CellComponent.EditedDateCell,
      class: 'w-48',
      objectMappings: { date: 'StartDate' },
      params: { format: DEFAULT_DATE_TIME_FORMAT },
    },
    {
      title: 'Date end',
      component: CellComponent.EditedDateCell,
      class: 'w-48',
      objectMappings: { date: 'EndDate' },
      params: { format: DEFAULT_DATE_TIME_FORMAT },
    },
    {
      title: 'Rooms',
      component: CellComponent.TypeBasedCell,
      class: 'w-40',
      objectMappings: { data: 'AnchorVenue' },
    },
    {
      title: 'Location',
      component: CellComponent.StringCell,
      class: 'w-48',
      objectMappings: { text: 'EventLocation' },
    },
    languageTableCell(),
    lastChangesTableCell(),
    odhActiveTableCell(),
  ],
};
