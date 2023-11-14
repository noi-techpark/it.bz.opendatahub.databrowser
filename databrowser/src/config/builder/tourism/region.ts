// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import { PropertyConfig } from '../../../domain/datasetConfig/types';

export const regionIdCell = (text: string): PropertyConfig => ({
  title: 'Region ID',
  component: CellComponent.StringCell,
  objectMapping: { text },
});
