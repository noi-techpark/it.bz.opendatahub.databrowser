// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { FilterOption } from './types';

export const filterSelectOptions: FilterOption[] = [
  {
    label: 'equal to',
    value: 'eq',
  },
  {
    label: 'not equal to',
    value: 'ne',
  },
  {
    label: 'like',
    value: 'like',
  },
  {
    label: 'greater than',
    value: 'gt',
  },
  {
    label: 'greater or equal',
    value: 'ge',
  },
  {
    label: 'less than',
    value: 'lt',
  },
  {
    label: 'less or equal',
    value: 'le',
  },
  {
    label: 'is null',
    value: 'isnull',
  },
  {
    label: 'is not null',
    value: 'isnotnull',
  },
  {
    label: 'includes',
    value: 'in',
  },
  {
    label: 'not includes',
    value: 'nin',
  },
  {
    label: 'likein',
    value: 'likein',
  },
];
