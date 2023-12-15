// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { SelectOption } from '../../../../../components/select/types';

export const TOURISM_FILTER_OPERATORS = [
  'eq',
  'ne',
  'gt',
  'ge',
  'lt',
  'le',
  'isnull',
  'isnotnull',
  'in',
  'nin',
  'like',
  'likein',
  'likein',
] as const;

export const MOBILITY_FILTER_OPERATORS = [
  'eq',
  'neq',
  'gt',
  'gteq',
  'lt',
  'lteq',
  'in',
  'in',
  'nin',
  're',
  'ire',
  'nre',
  'nire',
  'bbi',
  'bbc',
] as const;

export type TourismFilterOperator = (typeof TOURISM_FILTER_OPERATORS)[number];
export type MobilityFilterOperator = (typeof MOBILITY_FILTER_OPERATORS)[number];

export type TourismFilterOption = SelectOption & {
  value: TourismFilterOperator;
};
export type MobilityFilterOption = SelectOption & {
  value: MobilityFilterOperator;
};

export type FilterOperator = (
  | TourismFilterOperator
  | MobilityFilterOperator
)[number];

export type FilterOption = TourismFilterOption | MobilityFilterOption;
// export type FilterOption = SelectOption & { value: FilterOperator };

export type FilterValue = string | number | boolean | unknown[] | undefined;

export const isFilterOperator = (value?: string): value is FilterOperator =>
  value != null &&
  (TOURISM_FILTER_OPERATORS.includes(value as TourismFilterOperator) ||
    MOBILITY_FILTER_OPERATORS.includes(value as MobilityFilterOperator));

export interface Rawfilter {
  propertyPath: string;
  operator: FilterOperator;
  value?: FilterValue;
}

export interface Filter extends Rawfilter {
  title: string;
}

export type RawfilterParser = (rawfilter?: string) => Rawfilter[];
