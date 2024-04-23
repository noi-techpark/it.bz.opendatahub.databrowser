// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import { ListViewConfig } from '../../../domain/datasets/config/types';
import {
  imageTableCell,
  languageTableCell,
  lastChangesTableCell,
  publishedOnTableCell,
  pushDataTableCell,
  sourceTableCell,
  titleTableCell,
} from '../../builder/tourism';
import { DEFAULT_DATE_TIME_FORMAT } from '../../utils';

export const eventListView: ListViewConfig = {
  elements: [
    imageTableCell(),
    titleTableCell(),
    {
      title: 'Date start',
      component: CellComponent.EditedDateCell,
      class: 'w-48',
      params: { format: DEFAULT_DATE_TIME_FORMAT },
      objectMapping: { date: 'DateBegin' },
    },
    {
      title: 'Date end',
      component: CellComponent.EditedDateCell,
      class: 'w-48',
      params: { format: DEFAULT_DATE_TIME_FORMAT },
      objectMapping: { date: 'DateEnd' },
    },
    {
      title: 'Event Organizer',
      component: CellComponent.StringCell,
      class: 'w-48',
      objectMapping: {
        text: 'OrganizerInfos.{language}.CompanyName',
      },
    },
    {
      title: 'Location',
      component: CellComponent.StringCell,
      class: 'w-48',
      objectMapping: {
        text: 'LocationInfo.DistrictInfo.Name.en',
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
    pushDataTableCell(),
  ],
};
