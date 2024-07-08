// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import { ListViewConfig } from '../../../domain/datasets/config/types';
import {
  gpsDataShortTableCell,
  imageTableCell,
  languageTableCell,
  lastChangesTableCell,
  locationTableCells,
  publishedOnTableCell,
  pushDataTableCell,
  sourceTableCell,
  titleTableCell,
} from '../../builder/tourism';

export const odhActivityPoiListView: ListViewConfig = {
  elements: [
    titleTableCell(),
    imageTableCell(),
    {
      title: 'Categories',
      component: CellComponent.ArrayCell,
      class: 'w-52',
      objectMapping: {
        items: 'AdditionalPoiInfos.{language}.Categories',
      },
      params: {
        separator: ', ',
      },
    },
    ...locationTableCells(),
    // {
    //   title: 'Web-URL',
    //   component: CellComponent.UrlCell,
    //   class: 'w-52',
    //   objectMapping: { text: 'ContactInfos.{language}.Url' },
    // },
    gpsDataShortTableCell(),
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
