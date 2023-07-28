// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export const FILTER_OPERATORS = [
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
] as const;

export type FilterOperator = typeof FILTER_OPERATORS[number];

export type FilterValue = string | number | boolean | unknown[] | undefined;

export const isFilterOperator = (value?: string): value is FilterOperator =>
  value != null && FILTER_OPERATORS.includes(value as FilterOperator);

export interface Rawfilter {
  field: string;
  operator: FilterOperator;
  value?: FilterValue;
}

export interface Filter extends Rawfilter {
  title: string;
}

export type RawfilterParser = (rawfilter?: string) => Rawfilter[];
