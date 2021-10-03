import * as SwaggerParser from '@apidevtools/swagger-parser';
import { OpenAPIV3 } from 'openapi-types';
import { ActionTree, GetterTree, MutationTree } from 'vuex';
import { RootState } from '.';
import { $loading } from '~/utils/nuxt-accessors';

export interface OpenApiState {
  description: string;
  documentUrl: string;
  document: OpenAPIV3.Document | null;
  loading: boolean;
  loaded: boolean;
  error: Error | null;
}

export interface RemoteApiState {
  apis: Record<string, OpenApiState>;
  error?: Error | null;
}

export const state: () => RemoteApiState = () => ({
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
  error: undefined,
});

export const getters: GetterTree<RemoteApiState, any> = {
  apiKeys: (state) => Object.keys(state.apis),
  apiByKey: (state) => (key: string) => state.apis[key],
  apiDescriptionByKey: (state) => (key: string) => state.apis[key]?.description,
  documentByKey: (state) => (key: string) => state.apis[key]?.document,
  serverUrlsByApiKey:
    (state) =>
    (key: string): string[] =>
      state.apis[key].document?.servers?.map((server) => server.url) ?? [
        'none',
      ],
};

export const mutations: MutationTree<RemoteApiState> = {
  loadApiStart(state, { key }: { key: string }) {
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
    state,
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
  loadApiError(state, { key, error }: { key: string; error: Error }) {
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
  setError(state, error: Error) {
    state.error = error;
  },
};

export const actions: ActionTree<RemoteApiState, RootState> = {
  async loadApi({ commit, state }, { key }: { key: string }) {
    // If key is empty, do nothing
    if (key == null || key.length === 0) {
      // eslint-disable-next-line no-console
      console.debug('No OpenAPI key set, doing nothing');
      return;
    }

    try {
      commit('loadApiStart', { key });

      const api = getApiOrThrow(state, key);
      $loading.start();
      const document = await SwaggerParser.dereference(api.documentUrl, {
        dereference: { circular: 'ignore' },
      });
      $loading.finish();

      commit('loadApiSuccess', { key, document });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(`Failed to fetch OpenAPI document for key ${key}`, err);
      commit('loadApiError', { key, err });
    }
  },
  async selectApi({ dispatch, commit, state }, { key }: { key: string }) {
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

const getApiOrThrow = (state: RemoteApiState, key: string) => {
  const api = state.apis[key];
  if (api != null) {
    return api;
  }
  throw buildUnknownApiKeyError(key);
};

const buildUnknownApiKeyError = (key: string): Error =>
  new Error(`OpenAPI config key ${key} unknown`);
