import SwaggerParser from '@apidevtools/swagger-parser';
import { OpenAPI } from 'openapi-types';
import { GetterTree } from 'vuex';
export interface State {
  basePath: string;
  openApiDocumentPath: string;
  api: OpenAPI.Document;
  loading: boolean;
  loaded: boolean;
  error?: {};
}

export const state: () => State = () => ({
  // basePath: 'https://api.tourism.testingmachine.eu',
  // openApiDocumentPath:
  //   'https://api.tourism.testingmachine.eu/swagger/v1/swagger.json',
  basePath: 'https://mobility.api.opendatahub.bz.it',
  openApiDocumentPath: 'https://mobility.api.opendatahub.bz.it/v2/apispec',
  api: {} as OpenAPI.Document,
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
      const openApi = await SwaggerParser.validate(state.openApiDocumentPath);
      commit('loadSuccess', openApi);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to fetch tourism OpenAPI data', err);
      commit('loadError', err);
    }
  },
};
