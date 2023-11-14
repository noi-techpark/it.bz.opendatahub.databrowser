// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import { PropertyConfig } from '../../../domain/datasetConfig/types';

export const titleTableCell = (): PropertyConfig => ({
  title: 'Title',
  component: CellComponent.StringCell,
  class: 'w-60',
  objectMappings: { text: 'Detail.{language}.Title' },
});
