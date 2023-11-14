// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import {
  PropertyConfig,
  SubCategoryElement,
} from '../../../domain/datasetConfig/types';
import { logoWithMainImageCells } from './image';

export const shortnameCell = (options?: {
  required?: boolean;
}): PropertyConfig => ({
  title: 'Shortname',
  component: CellComponent.StringCell,
  objectMapping: { text: 'Shortname' },
  required: options?.required === true ? true : undefined,
});

export const shortnameWithLogoAndMainImageSubCategory =
  (): SubCategoryElement => ({
    name: 'General data',
    properties: [shortnameCell(), ...logoWithMainImageCells()],
  });
