// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export type SelectValue = string | number | boolean;

export enum SelectSize {
  sm = 'sm',
  md = 'md',
}

export interface SelectOption<T = string | number | undefined> {
  label: string;
  value: T;
  disabled?: boolean;
  isAction?: boolean;
}

export interface GroupSelectOption<T = string | number | undefined> {
  name: string;
  options: SelectOption<T>[];
}

export type SelectOptionsPlacement = 'bottom' | 'top';
