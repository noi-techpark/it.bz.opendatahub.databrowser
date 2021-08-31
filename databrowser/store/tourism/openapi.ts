import { GetterTree } from 'vuex';
export interface State {
  basePath: string;
  api: {
    components?: any;
    info?: any;
    openapi?: string;
    paths?: Record<string, any>;
  };
  loading: boolean;
  loaded: boolean;
  error?: {};
}

export const state: () => State = () => ({
  basePath: 'https://api.tourism.testingmachine.eu',
  api: {},
  loading: false,
  loaded: false,
});

export const getters: GetterTree<State, any> = {
  openApiPaths: (state) =>
    state.api.paths != null ? Object.keys(state.api.paths) : [],
};

export const mutations = {
  loadStart(state: State) {
    state.loading = true;
  },
  loadSuccess(state: State, api: any) {
    state.api = api;
    state.loading = false;
    state.loaded = true;
  },
  loadError(state: State, error: any) {
    state.error = error;
    state.loading = false;
    state.loaded = true;
  },
};

export const actions = {
  async loadTourismData({ commit, state }: { commit: any; state: State }) {
    try {
      commit('loadStart');
      const openApiResponse = await fetch(
        `${state.basePath}/swagger/v1/swagger.json`
      );
      const openApi = await openApiResponse.json();
      commit('loadSuccess', openApi);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to fetch tourism OpenAPI data', err);
      commit('loadError', err);
    }
  },
};
