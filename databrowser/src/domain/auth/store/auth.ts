import jwtDecode from 'jwt-decode';

type State = {
  isAuthenticated: boolean;
  accessToken: string | null;
};

type User = {
  name: string;
  email: string;
};

const state = (): State => ({
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
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
};
