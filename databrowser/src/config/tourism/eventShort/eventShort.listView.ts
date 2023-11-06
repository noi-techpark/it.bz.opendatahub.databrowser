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
      propertyMappings: { text: 'EventTitle.{language}' },
    },
    {
      title: 'Date start',
      component: CellComponent.EditedDateCell,
      class: 'w-48',
      propertyMappings: { date: 'StartDate' },
      params: { format: DEFAULT_DATE_TIME_FORMAT },
    },
    {
      title: 'Date end',
      component: CellComponent.EditedDateCell,
      class: 'w-48',
      propertyMappings: { date: 'EndDate' },
      params: { format: DEFAULT_DATE_TIME_FORMAT },
    },
    {
      title: 'Rooms',
      component: CellComponent.TypeBasedCell,
      class: 'w-40',
      propertyMappings: { data: 'AnchorVenue' },
    },
    {
      title: 'Location',
      component: CellComponent.StringCell,
      class: 'w-48',
      propertyMappings: { text: 'EventLocation' },
    },
    languageTableCell(),
    lastChangesTableCell(),
    odhActiveTableCell(),
  ],
};
