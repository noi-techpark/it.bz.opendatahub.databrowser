export interface State {
  api: {};
  loaded: boolean;
  error?: {};
}

export const state: () => State = () => ({
  api: {},
  loaded: false,
});

export const mutations = {
  loadSuccess(state: State, api: any) {
    state.api = api;
    state.loaded = true;
  },
  loadError(state: State, error: any) {
    state.error = error;
    state.loaded = true;
  },
};

export const actions = {
  async loadTourismData({ commit }: any) {
    try {
      const openApiResponse = await fetch(
        'https://api.tourism.testingmachine.eu/swagger/v1/swagger.json'
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
