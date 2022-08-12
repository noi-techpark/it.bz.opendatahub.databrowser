import axios from 'axios';
import jwtDecode from 'jwt-decode';
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
    hasRole(state) {
      return (role: string) => this.user?.roles?.includes(role) ?? false;
    },
    hasAnyRole(state) {
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

      // Add authorization token to axios header to be appended to all requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      this.isAuthenticated = true;
      this.accessToken = accessToken;
    },
    unauthenticate() {
      delete axios.defaults.headers.common['Authorization'];
      this.isAuthenticated = false;
      this.accessToken = null;
    },
  },
});

// Add support for hot-module-reload
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuth, import.meta.hot));
}
