// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import { ListViewConfig } from '../../../domain/datasetConfig/types';
import {
  gpsDataTableCell,
  imageTableCell,
  lastChangesTableCell,
  odhActiveTableCell,
  sourceTableCell,
} from '../../builder/tourism';

export const webcamInfoListView: ListViewConfig = {
  elements: [
    imageTableCell(),
    {
      title: 'Webcam Name',
      component: CellComponent.StringCell,
      class: 'w-40',
      objectMapping: {
        text: 'Webcamname.{language}',
      },
    },
    {
      title: 'Webcam URL',
      component: CellComponent.UrlCell,
      class: 'w-40',
      objectMapping: {
        text: 'WebCamProperties.WebcamUrl',
      },
    },
    gpsDataTableCell(),
    lastChangesTableCell(),
    sourceTableCell(),
    odhActiveTableCell(),
  ],
};
