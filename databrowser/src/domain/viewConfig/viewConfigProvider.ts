import { App, inject, ref, Ref, shallowRef, watch } from 'vue';
import { RouteLocationNormalizedLoaded, Router } from 'vue-router';
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

interface ViewConfigResolutionOptions {
  source?: string | '__NO_VIEW_CONFIG__';
}

interface ConfigProvider {
  readonly currentViewConfig: Ref<ResolvedViewConfig>;
  readonly currentSource: Ref<string | undefined>;
  getViewConfig: (
    path: string | string[],
    options?: ViewConfigResolutionOptions
  ) => Promise<ResolvedViewConfig>;
  getViewConfigWithPathParams: (
    path?: string | PathParams,
    options?: ViewConfigResolutionOptions
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

  const currentSource = ref<string | undefined>();

  watch(
    () => [router.currentRoute.value, currentSource.value],
    async (value) => {
      const [route, source] = value as [RouteLocationNormalizedLoaded, string];

      // Skip view config resolution if current route is not about datasets
      if (route.meta.resolveViewConfig !== true) {
        return;
      }

      // Extract  pathParams from current dataset route
      const pathParams = route.params.pathParams;

      // Resolve view config
      currentViewConfig.value = await getViewConfig(pathParams, { source });

      // Set current view config source
      currentSource.value = isViewConfig(currentViewConfig.value)
        ? currentViewConfig.value.source
        : '__NO_VIEW_CONFIG__';
    }
  );

  const toPathParams = (path?: string | PathParams): PathParams => {
    if (path == null) {
      return [];
    }
    // Ensure to use an array
    return Array.isArray(path) ? path : path.split('/');
  };

  const getViewConfigSourcesPool = (
    source: string | undefined
  ): ViewConfigSource[] => {
    if (source == null) {
      return viewConfigSources;
    }

    const vcs = viewConfigSources.find((vcs) => vcs.source === source);

    return vcs == null ? [] : [vcs];
  };

  const getViewConfig = async (
    path?: string | PathParams,
    options?: ViewConfigResolutionOptions
  ): Promise<ResolvedViewConfig> => {
    // Convert input path to path params
    const pathParams = toPathParams(path);

    // Return a NoViewConfig if path params are empty
    if (pathParams.length === 0) {
      return Promise.resolve({
        reason: 'Path required to resolve view configuration',
      });
    }

    // Define pool for view config sources. This pool takes into account
    // source preferences
    const viewConfigSourcesPool = getViewConfigSourcesPool(options?.source);

    // Initialize result with null
    let result: ResolvedViewConfig | null = null;

    // Compute view config
    for (let i = 0; i < viewConfigSourcesPool.length; i++) {
      const source = viewConfigSourcesPool[i];
      const sourceResult = await source.resolve(pathParams);

      // If there is a valid ViewConfig, just use that one
      if (isViewConfig(sourceResult)) {
        result = sourceResult;
        break;
      }

      // If it is the last iteration, use the result, no matter if it
      // contains a valid ViewConfig or a NoViewConfig
      if (i === viewConfigSourcesPool.length - 1) {
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
    path?: string | PathParams,
    options?: ViewConfigResolutionOptions
  ): Promise<ResolvedViewConfigWithPathParams> => {
    // Convert input path to path params
    const pathParams = toPathParams(path);

    return getViewConfig(pathParams, options).then((viewConfig) => ({
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
    currentSource,
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
