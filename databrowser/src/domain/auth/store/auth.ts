import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { ActionTree } from 'vuex';

type State = {
  ready: boolean;
  isAuthenticated: boolean;
  accessToken: string | null;
};

type User = {
  name: string;
  email: string;
};

const state = (): State => ({
  ready: false,
  isAuthenticated: false,
  accessToken: null,
});

const getters = {
  user: (state: State): User | null => {
    if (state.accessToken) {
      const decodedToken = jwtDecode<{ name: string; email: string }>(
        state.accessToken
      );
      return {
        name: decodedToken.name,
        email: decodedToken.email,
      };
    } else {
      return null;
    }
  },
  ready: (state: State): boolean => state.ready,
};

const mutations = {
  authenticated(state: State, accessToken: string) {
    state.isAuthenticated = true;
    state.accessToken = accessToken;
  },
  unauthenticated(state: State) {
    state.isAuthenticated = false;
    state.accessToken = null;
  },
  ready(state: State) {
    state.ready = true;
  },
};

const actions: ActionTree<State, State> = {
  authenticate({ commit }, accessToken: string) {
    commit('authenticated', accessToken);
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  },
  unauthenticate({ commit }, accessToken: string) {
    commit('unauthenticated', accessToken);
    delete axios.defaults.headers.common['Authorization'];
  },
  ready({ commit }) {
    commit('ready');
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
