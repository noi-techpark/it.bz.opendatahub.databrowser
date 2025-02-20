// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { jwtDecode } from 'jwt-decode';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { initialState } from './initialState';

export const useAuth = defineStore('auth', {
  state: () => initialState,
  getters: {
    user(state) {
      if (state.accessToken) {
        const decodedToken = jwtDecode<{
          name: string;
          email: string;
          role: string[];
        }>(state.accessToken);

        return {
          name: decodedToken.name,
          email: decodedToken.email,
          roles: decodedToken.role,
        };
      } else {
        return null;
      }
    },
    hasRole() {
      return (role: string) => this.user?.roles?.includes(role) ?? false;
    },
    hasAnyRole() {
      return (roles: string[]) =>
        roles.find((role) => this.hasRole(role) === true) != null;
    },
  },
  actions: {
    authenticate(accessToken: string | undefined) {
      this.ready = true;

      if (accessToken == null) {
        return;
      }

      this.isAuthenticated = true;
      this.accessToken = accessToken;
    },
    unauthenticate() {
      this.isAuthenticated = false;
      this.accessToken = null;
    },
  },
});

// Add support for hot-module-reload
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuth, import.meta.hot));
}
