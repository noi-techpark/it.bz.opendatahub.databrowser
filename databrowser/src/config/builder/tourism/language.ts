// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import { PropertyConfig } from '../../../domain/datasetConfig/types';

export const languageTableCell = (): PropertyConfig => ({
  title: 'Languages',
  component: CellComponent.ArrayCell,
  class: 'w-40',
  objectMappings: { items: 'HasLanguage' },
  params: { separator: ', ' },
});
