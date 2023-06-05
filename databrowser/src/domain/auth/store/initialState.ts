// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

interface AuthState {
  ready: boolean;
  isAuthenticated: boolean;
  accessToken: string | null;
}

export const initialState: AuthState = {
  ready: false,
  isAuthenticated: false,
  accessToken: null,
};
