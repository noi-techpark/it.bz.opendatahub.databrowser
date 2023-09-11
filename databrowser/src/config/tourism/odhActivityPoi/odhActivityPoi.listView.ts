// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import { ListViewConfig } from '../../../domain/datasetConfig/types';
import {
  imageTableCell,
  languageTableCell,
  lastChangesTableCell,
  locationTableCells,
  logoTableCell,
  odhActiveTableCell,
  sourceTableCell,
  titleTableCell,
} from '../../builder/tourism';

export const odhActivityPoiListView: ListViewConfig = {
  elements: [
    imageTableCell(),
    logoTableCell(),
    titleTableCell(),
    {
      title: 'Categories',
      component: CellComponent.ArrayCell,
      class: 'w-52',
      fields: {
        items: 'AdditionalPoiInfos.{language}.Categories',
      },
      params: {
        separator: ', ',
      },
    },
    ...locationTableCells(),
    {
      title: 'Web-URL',
      component: CellComponent.UrlCell,
      class: 'w-52',
      fields: { text: 'ContactInfos.{language}.Url' },
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
