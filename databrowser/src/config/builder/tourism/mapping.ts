// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import {
  DetailElements,
  PropertyConfig,
} from '../../../domain/datasets/config/types';

export const mappingCategory = (): DetailElements => ({
  name: 'Mapping',
  slug: 'mapping',
  subcategories: [
    {
      name: '',
      properties: [mappingCell()],
    },
  ],
});

export const mappingCell = (): PropertyConfig => ({
  title: 'Mapping',
  component: CellComponent.MappingCell,
  objectMapping: { mapping: 'Mapping' },
});
