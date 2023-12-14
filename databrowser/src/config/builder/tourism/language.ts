// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import { PropertyConfig } from '../../../domain/datasets/config/types';

export const languageTableCell = (): PropertyConfig => ({
  title: 'Languages',
  component: CellComponent.ArrayCell,
  class: 'w-40',
  objectMapping: { items: 'HasLanguage' },
  params: { separator: ', ' },
});
