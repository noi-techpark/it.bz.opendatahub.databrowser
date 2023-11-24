// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { MobilityFilterOption, TourismFilterOption } from './types';

export const tourismFilterSelectOptions: TourismFilterOption[] = [
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

export const mobilityFilterSelectOptions: MobilityFilterOption[] = [
  {
    label: 'equal to',
    value: 'eq',
  },
  {
    label: 'not equal to',
    value: 'neq',
  },
  {
    label: 'greater than',
    value: 'gt',
  },
  {
    label: 'greater or equal',
    value: 'gteq',
  },
  {
    label: 'less than',
    value: 'lt',
  },
  {
    label: 'less or equal',
    value: 'lteq',
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
    label: 'regular expression',
    value: 're',
  },
  {
    label: 'insensitive regular expression',
    value: 'ire',
  },
  {
    label: 'negated regular expression',
    value: 'nre',
  },
  {
    label: 'negated insensitive regular expression',
    value: 'nire',
  },
  {
    label: 'bounding box intersection',
    value: 'bbi',
  },
  {
    label: 'bounding box containing',
    value: 'bbc',
  },
];
