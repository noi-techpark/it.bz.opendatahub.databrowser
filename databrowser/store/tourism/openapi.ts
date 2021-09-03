import { load } from 'js-yaml';
import { GetterTree } from 'vuex';
export interface State {
  basePath: string;
  openApiDocumentPath: string;
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
  openApiDocumentPath:
    'https://api.tourism.testingmachine.eu/swagger/v1/swagger.json',
  // basePath: 'https://mobility.api.opendatahub.bz.it/v2',
  // openApiDocumentPath: 'https://mobility.api.opendatahub.bz.it/v2/apispec',
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
      const openApiResponse = await fetch(state.openApiDocumentPath);
      const openApi = await parseOpenApiResponse(openApiResponse);
      commit('loadSuccess', openApi);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to fetch tourism OpenAPI data', err);
      commit('loadError', err);
    }
  },
};

const parseOpenApiResponse = async (response: Response): Promise<unknown> => {
  const contentType = response.headers.get('content-type');

  // Parse OpenAPI document based on response content-type
  if (contentType != null) {
    const lowerCasedContentType = contentType.toLowerCase();

    // If OpenAPI document is JSON, parse it with JSON parser
    if (lowerCasedContentType.includes('application/json')) {
      return await response.json();
    }

    // If OpenAPI document is YAML, parse it with YAML parser
    if (lowerCasedContentType.includes('application/yaml')) {
      const text = await response.text();
      return load(text);
    }
  }

  // Throw exception on unknown content type
  throw new Error(
    'Unknown Content-Type for OpenAPI document (no Content-Type in response, must be one of "application/json" or "application/yaml")'
  );
};
