import SwaggerParser from '@apidevtools/swagger-parser';
import { OpenAPIV3 } from 'openapi-types';
import { ActionContext, GetterTree } from 'vuex';

export interface ApiState {
  description: string;
  documentUrl: string;
  document: OpenAPIV3.Document | null;
  loading: boolean;
  loaded: boolean;
  error: Error | null;
}

export interface State {
  apis: Record<string, ApiState>;
  error?: Error | null;
}

export const state: () => State = () => ({
  apis: {
    tourism: {
      description: 'Open Data Hub Tourism API',
      documentUrl:
        'https://api.tourism.testingmachine.eu/swagger/v1/swagger.json',
      document: null,
      loading: false,
      loaded: false,
      error: null,
    },
    mobility: {
      description: 'Open Data Hub Mobility API',
      documentUrl: 'https://mobility.api.opendatahub.bz.it/v2/apispec',
      document: null,
      loading: false,
      loaded: false,
      error: null,
    },
  },
});

export const getters: GetterTree<State, any> = {
  apiKeys: (state: State) => Object.keys(state.apis),
  apiByKey: (state: State) => (key: string) => state.apis[key],
  apiDescriptionByKey: (state: State) => (key: string) =>
    state.apis[key]?.description,
  documentByKey: (state: State) => (key: string) => state.apis[key]?.document,
  serverUrlsByApiKey:
    (state: State) =>
    (key: string): string[] =>
      state.apis[key].document?.servers?.map((server) => server.url) ?? [
        'none',
      ],
};

export const mutations = {
  loadApiStart(state: State, { key }: { key: string }) {
    const api = state.apis[key];
    if (api == null) {
      state.error = buildUnknownApiKeyError(key);
    } else {
      api.loading = true;
      state.apis = { ...state.apis, [key]: api };
      state.error = undefined;
    }
  },
  loadApiSuccess(
    state: State,
    { key, document }: { key: string; document: OpenAPIV3.Document }
  ) {
    const api = state.apis[key];
    if (api == null) {
      state.error = buildUnknownApiKeyError(key);
    } else {
      api.document = document;
      api.loading = false;
      api.loaded = true;
      state.apis = { ...state.apis, [key]: api };
    }
  },
  loadApiError(state: State, { key, error }: { key: string; error: Error }) {
    const api = state.apis[key];
    if (api == null) {
      state.error = buildUnknownApiKeyError(key);
    } else {
      api.error = error;
      api.loading = false;
      api.loaded = true;
      state.apis = { ...state.apis, [key]: api };
    }
  },
  setError(state: State, error: Error) {
    state.error = error;
  },
};

export const actions = {
  async loadApi(
    { commit, state }: ActionContext<State, any>,
    { key }: { key: string }
  ) {
    // If key is empty, do nothing
    if (key == null || key.length === 0) {
      // eslint-disable-next-line no-console
      console.debug('No OpenAPI key set, doing nothing');
      return;
    }

    try {
      commit('loadApiStart', { key });

      const api = getApiOrThrow(state, key);
      const document = await SwaggerParser.dereference(api.documentUrl, {
        dereference: { circular: 'ignore' },
      });

      commit('loadApiSuccess', { key, document });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(`Failed to fetch OpenAPI document for key ${key}`, err);
      commit('loadApiError', { key, err });
    }
  },
  async selectApi(
    { dispatch, commit, state }: ActionContext<State, any>,
    { key }: { key: string }
  ) {
    // If key is empty, do nothing
    if (key == null || key.length === 0) {
      // eslint-disable-next-line no-console
      console.debug('No OpenAPI key set, doing nothing');
      return;
    }

    try {
      const api = getApiOrThrow(state, key);

      if (!api.loaded) {
        await dispatch('loadApi', { key });
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(`Failed to select OpenAPI document for key ${key}`, err);
      commit('setError', err);
    }
  },
};

const getApiOrThrow = (state: State, key: string) => {
  const api = state.apis[key];
  if (api != null) {
    return api;
  }
  throw buildUnknownApiKeyError(key);
};

const buildUnknownApiKeyError = (key: string): Error =>
  new Error(`OpenAPI config key ${key} unknown`);
