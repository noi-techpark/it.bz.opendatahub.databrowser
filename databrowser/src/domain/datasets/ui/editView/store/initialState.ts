// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export type EditData = Record<string, unknown>;

export interface State {
  initial: EditData;
  current: EditData;
}

export const initialState: State = {
  initial: {},
  current: {},
};
