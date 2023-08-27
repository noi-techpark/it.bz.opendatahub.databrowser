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
      fields: { date: 'DateBegin' },
    },
    {
      title: 'Date end',
      component: CellComponent.EditedDateCell,
      class: 'w-48',
      params: { format: DEFAULT_DATE_TIME_FORMAT },
      fields: { date: 'DateEnd' },
    },
    {
      title: 'Price',
      component: CellComponent.StringCell,
      class: 'w-32',
      fields: {
        text: 'EventPrice.Price',
      },
    },
    {
      title: 'Event Organizer',
      component: CellComponent.StringCell,
      class: 'w-48',
      fields: {
        text: 'OrganizerInfos.{language}.CompanyName',
      },
    },
    {
      title: 'Location',
      component: CellComponent.StringCell,
      class: 'w-48',
      fields: {
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
      fields: {
        state: 'Active',
      },
      // filter: {
      //   name: 'active',
      //   component: FilterComponent.FixedValue,
      //   params: {
      //     filterOptions: [
      //       {
      //         label: 'Active',
      //         value: 'true',
      //       },
      //       {
      //         label: 'Not active',
      //         value: 'false',
      //       },
      //     ],
      //   },
      // },
    },
    odhActiveTableCell(),
  ],
};
