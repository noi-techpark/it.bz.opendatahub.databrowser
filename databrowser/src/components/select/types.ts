// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export type SelectValue = string | number | boolean;

export enum SelectSize {
  sm = 'sm',
  md = 'md',
}

export interface SelectOption {
  label: string;
  value: string | number | undefined;
  disabled?: boolean;
  isAction?: boolean;
}

export type SelectOptionsPlacement = 'bottom' | 'top';
