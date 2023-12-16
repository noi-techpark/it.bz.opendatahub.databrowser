// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export interface Entry<T> {
  key: string;
  value: T;
}
export type ChildEntry = Entry<string>;
export type Mapping = {
  key: string;
  value: ChildEntry[];
};
