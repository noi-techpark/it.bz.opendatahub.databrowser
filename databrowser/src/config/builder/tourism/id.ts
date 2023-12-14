// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import { PropertyConfig } from '../../../domain/datasets/config/types';

export const idCell = (): PropertyConfig => ({
  title: 'ID',
  component: CellComponent.StringCell,
  objectMapping: { text: 'Id' },
});

export const idReadOnlyCell = (): PropertyConfig => ({
  ...idCell(),
  params: { readonly: 'true' },
});

export const customIdCell = (): PropertyConfig => ({
  title: 'Custom Id',
  component: CellComponent.StringCell,
  objectMapping: { text: 'CustomId' },
});

export const idAndCustomIdCells = (): PropertyConfig[] => [
  idReadOnlyCell(),
  customIdCell(),
];
