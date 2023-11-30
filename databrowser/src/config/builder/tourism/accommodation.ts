// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { CellComponent } from '../../../domain/cellComponents/types';
import { PropertyConfig } from '../../../domain/datasetConfig/types';
import { withOdhBaseUrl } from '../../utils';

export const accommodationCategoryCell = (): PropertyConfig => ({
  title: 'Accommodation category',
  component: CellComponent.InputReferenceCell,
  objectMapping: { value: 'AccoCategoryId' },
  params: {
    url: withOdhBaseUrl('/v1/AccommodationTypes?type=Category'),
    labelSelector: 'TypeDesc.{language}',
    keySelector: 'Key',
  },
  required: true,
});

export const accommodationTypeCell = (): PropertyConfig => ({
  title: 'Accommodation type',
  component: CellComponent.InputReferenceCell,
  objectMapping: { value: 'AccoTypeId' },
  params: {
    url: withOdhBaseUrl('/v1/AccommodationTypes?type=Type'),
    labelSelector: 'TypeDesc.{language}',
    keySelector: 'Key',
  },
  required: true,
});
