import { App, inject, Ref, shallowRef, watch } from 'vue';
import { Router } from 'vue-router';
import { generatedViewConfigSource } from './source/generated';
import { embeddedViewConfigSource } from './source/embedded';
import { ViewConfigSource } from './source/types';
import {
  PathParams,
  ResolvedViewConfig,
  ViewConfigWithPathParams,
  ResolvedViewConfigWithPathParams,
} from './types';
import { isViewConfig } from './utils';

const configProviderKey = 'config-provider';

interface ConfigProvider {
  readonly currentViewConfig: Ref<ResolvedViewConfig>;
  getViewConfig: (path: string | string[]) => Promise<ResolvedViewConfig>;
  getViewConfigWithPathParams: (
    path?: string | PathParams
  ) => Promise<ResolvedViewConfigWithPathParams>;
  getAllViewConfigs: () => Promise<Record<string, ViewConfigWithPathParams[]>>;
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
  const currentViewConfig = shallowRef<ResolvedViewConfig>({
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
  ): Promise<ResolvedViewConfig> => {
    // Convert input path to path params
    const pathParams = toPathParams(path);

    // Return a NoViewConfig if path params are empty
    if (pathParams.length === 0) {
      return Promise.resolve({
        reason: 'Path required to resolve view configuration',
      });
    }

    // Initialize result with null
    let result: ResolvedViewConfig | null = null;

    for (let i = 0; i < viewConfigSources.length; i++) {
      const source = viewConfigSources[i];
      const sourceResult = await source.resolve(pathParams);

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
  ): Promise<ResolvedViewConfigWithPathParams> => {
    // Convert input path to path params
    const pathParams = toPathParams(path);

    return getViewConfig(pathParams).then((viewConfig) => ({
      pathParams,
      viewConfig,
    }));
  };

  const getAllViewConfigs = async (): Promise<
    Record<string, ViewConfigWithPathParams[]>
  > => {
    const viewConfigs: Record<string, ViewConfigWithPathParams[]> = {};
    for (let i = 0; i < viewConfigSources.length; i++) {
      const source = viewConfigSources[i];
      const allViewConfigsForSource = await source.getAllViewConfigs();
      for (const domain of Object.keys(allViewConfigsForSource)) {
        const viewConfigsForDomain = viewConfigs[domain] ?? [];
        const furtherViewConfigsForDomain = allViewConfigsForSource[domain];

        viewConfigs[domain] = [
          ...viewConfigsForDomain,
          ...furtherViewConfigsForDomain,
        ];

        // Sort view configs for a given domain by their title
        viewConfigs[domain].sort((a, b) => {
          const aTitle = a.viewConfig.description?.title ?? '';
          const bTitle = b.viewConfig.description?.title ?? '';
          return aTitle.localeCompare(bTitle);
        });
      }
    }

    return viewConfigs;
  };

  const result: ConfigProviderPlugin = {
    currentViewConfig,
    getViewConfig,
    getViewConfigWithPathParams,
    getAllViewConfigs,

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
