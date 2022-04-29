import { App, inject, Ref, shallowRef, watch } from 'vue';
import { Router } from 'vue-router';
import { generatedViewConfigSource } from './source/generated';
import { embeddedViewConfigSource } from './source/embedded';
import { ViewConfigSource } from './source/types';
import {
  NoViewConfig,
  PathParams,
  ViewConfig,
  ViewConfigWithPathParams,
} from './types';
import { isViewConfig } from './utils';

const configProviderKey = 'config-provider';

interface ConfigProvider {
  readonly currentViewConfig: Ref<ViewConfig | NoViewConfig>;
  getViewConfig: (
    path: string | string[]
  ) => Promise<ViewConfig | NoViewConfig>;
  getViewConfigWithPathParams: (
    path?: string | PathParams
  ) => Promise<ViewConfigWithPathParams>;
}

interface ConfigProviderPlugin extends ConfigProvider {
  install(app: App): void;
}

const viewConfigSources: ViewConfigSource[] = [
  embeddedViewConfigSource,
  generatedViewConfigSource,
];

export const createViewConfigProvider = (
  router: Router
): ConfigProviderPlugin => {
  const currentViewConfig = shallowRef<ViewConfig | NoViewConfig>({
    reason: 'INIT',
  });

  watch(
    () => router.currentRoute.value,
    async (route) => {
      const pathParams = route.params.pathParams;
      currentViewConfig.value = await getViewConfig(pathParams);
    }
  );

  const toPathParams = (path?: string | PathParams): PathParams => {
    if (path == null) {
      return [];
    }
    // Ensure to use an array
    return Array.isArray(path) ? path : path.split('/');
  };

  const getViewConfig = async (
    path?: string | PathParams
  ): Promise<ViewConfig | NoViewConfig> => {
    // Convert input path to path params
    const pathParams = toPathParams(path);

    // Return a NoViewConfig if path params are empty
    if (pathParams.length === 0) {
      return Promise.resolve({
        reason: 'Path required to resolve view configuration',
      });
    }

    // Initialize result with null
    let result: ViewConfig | NoViewConfig | null = null;

    for (let i = 0; i < viewConfigSources.length; i++) {
      const source = viewConfigSources[i];
      const sourceResult = await source.resolver(pathParams);

      // If there is a valid ViewConfig, just use that one
      if (isViewConfig(sourceResult)) {
        result = sourceResult;
        break;
      }

      // If it is the last iteration, use the result, no matter if it
      // contains a valid ViewConfig or a NoViewConfig
      if (i === viewConfigSources.length - 1) {
        result = sourceResult;
      }
    }

    // Result should never be null at this point, but a check is performed nevertheless
    if (result == null) {
      result = {
        reason: 'No view configuration found',
      };
    }

    return Promise.resolve(result);
  };

  const getViewConfigWithPathParams = async (
    path?: string | PathParams
  ): Promise<ViewConfigWithPathParams> => {
    // Convert input path to path params
    const pathParams = toPathParams(path);

    return getViewConfig(pathParams).then((viewConfig) => ({
      pathParams,
      viewConfig,
    }));
  };

  const result: ConfigProviderPlugin = {
    currentViewConfig,
    getViewConfig,
    getViewConfigWithPathParams,

    install(app: App) {
      const configProvider = this;
      app.provide(configProviderKey, configProvider);
      app.config.globalProperties.$configProvider = configProvider;
    },
  };

  return result;
};

export const useViewConfigProvider = (): ConfigProvider =>
  inject(configProviderKey)!;
