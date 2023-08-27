// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import {
  View,
  ViewKey,
  DatasetRoute,
  DatasetConfig,
  DatasetDomains,
  ListElements,
} from './types';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { resolveDatasetConfig } from './resolver';
import { SourceType } from './source/types';
import { computed, ref, watch } from 'vue';
import { RouteLocationNormalizedLoaded, useRouter } from 'vue-router';
import { stringifyParameter } from '../api';
import { domainIsKnownToHaveOpenApiDocument } from '../openApi';
import { DatasetPage } from '../../routes';
import { useAuth } from '../auth/store/auth';
import { useApiParameterStore } from '../api/service/apiParameterStore';

export const useDatasetConfigStore = defineStore('datasetConfigStore', () => {
  const _currentDomain = ref<DatasetDomains>('no-dataset-domain-in-url');
  const _config = ref<DatasetConfig>();
  const _source = ref<SourceType>('embedded');
  const _viewKey = ref<ViewKey>();
  const _datasetRoute = ref<DatasetRoute>();
  const _resolutionState = ref<'init' | 'resolving' | 'success' | 'error'>(
    'init'
  );
  const _error = ref<string>();

  const clearState = () => {
    _viewKey.value = undefined;
    _config.value = undefined;
    _source.value = 'embedded';
    _datasetRoute.value = undefined;
    _resolutionState.value = 'init';
    _error.value = undefined;
  };

  const setResolutionState = (
    state: typeof _resolutionState.value,
    error?: unknown
  ) => {
    _resolutionState.value = state;
    if (state === 'error') {
      const message: string =
        error instanceof Error ? error.message : (error as string);
      _error.value = message;
    }
  };

  const resolve = async (datasetRoute: DatasetRoute, source: SourceType) => {
    try {
      setResolutionState('resolving');
      _config.value = await resolveDatasetConfig(datasetRoute, source);
      // Set source from resolved config (may be a different one than requested
      // if a fallback config is used)
      _source.value = _config.value.source;

      setResolutionState('success');
    } catch (error) {
      setResolutionState('error', error);
    }
  };

  const router = useRouter();
  watch(
    router.currentRoute,
    async (route, oldRoute) => {
      console.debug('datasetConfigStore route changed', route);

      // Return early if no dataset config affecting route details changed
      // e.g. when just the route query or hash changed
      if (isSameRouteConfig(route, oldRoute)) {
        console.debug(
          'No dataset config affecting route details changed, returning early'
        );
        return;
      }

      // Return early if current url contains no domain part of a dataset page
      _currentDomain.value = computeCurrentDomain(route.params.domain);
      if (_currentDomain.value === 'no-dataset-domain-in-url') {
        console.debug(
          'No dataset domain found in current URL, returning early'
        );

        // Clear state before returning
        clearState();

        return;
      }

      // If viewKey is not defined for a dataset route, then something is wrong.
      _viewKey.value = routeNameToViewKey(route.name);
      console.log('VIEWKEY', _viewKey.value);

      if (_viewKey.value == null) {
        setResolutionState(
          'error',
          `No view type defined for current route "${route.path}". Please check the router configuration.`
        );
        // setError(
        //   `No view type defined for current route "${route.path}". Please check the router configuration.`
        // );
        return;
      }

      // Build dataset route
      _datasetRoute.value = toDatasetRoute(_currentDomain.value, route);

      await resolve(_datasetRoute.value, _source.value);
    },
    { immediate: true }
  );

  const currentPath = computed(() => {
    if (_config.value == null || _datasetRoute.value == null) {
      return undefined;
    }
    const url =
      _config.value.baseUrl + '/' + _datasetRoute.value.pathParams.join('/');

    return _datasetRoute.value.id == null
      ? url
      : url + '/' + _datasetRoute.value.id;
  });

  const hasCreatePermission = computed(() => {
    const auth = useAuth();
    const roles = _config.value?.operations?.create?.rolesAllowed;
    return roles != null ? auth.hasAnyRole(roles) : false;
  });

  const hasUpdatePermission = computed(() => {
    const auth = useAuth();
    const roles = _config.value?.operations?.update?.rolesAllowed;
    return roles != null ? auth.hasAnyRole(roles) : false;
  });

  const isSourceEmbedded = computed(() => _source.value === 'embedded');

  const isSourceGenerated = computed(() => _source.value === 'generated');

  const hasDetailView = computed(() => _config.value?.views?.detail != null);

  const hasEditView = computed(() => _config.value?.views?.edit != null);

  const hasNewView = computed(() => _config.value?.views?.new != null);

  const hasQuickView = computed(() => _config.value?.views?.quick != null);

  const addRecordSupported = computed(
    () =>
      !isSourceGenerated.value && hasCreatePermission.value && hasNewView.value
  );

  const editRecordSupported = computed(
    () =>
      !isSourceGenerated.value && hasUpdatePermission.value && hasEditView.value
  );

  const tableView = computed(() => {
    const table = _config.value?.views?.table;
    if (table == null) {
      return undefined;
    }

    const { replaceFields } = useApiParameterStore();

    const firstField = (fields?: Record<string, string>) => {
      const values = Object.values(fields ?? {});
      return values.length === 1 ? values[0] : undefined;
    };

    const result = {
      ...table,
      elements: table.elements.map<ListElements>((element) => {
        const fields = replaceFields(element.fields);
        const field = firstField(fields);
        return { ...element, fields, field, listFields: undefined };
      }),
    };

    // console.log('allApiParams', JSON.parse(JSON.stringify(allApiParams.value)));
    console.log('result', JSON.parse(JSON.stringify(result)));
    console.timeEnd('datasetConfigStore table view config');
    console.groupEnd();

    return result;
  });

  const changeSource = async (nextSource: SourceType) => {
    // setPending();

    // if (viewKey.value == null) {
    //   setError(
    //     'View key in dataset config store is empty, but required to change the source. Maybe you need to resolve a config first.'
    //   );
    //   return;
    // }

    if (_datasetRoute.value == null) {
      setResolutionState(
        'error',
        'Dataset route in dataset config store is empty, but required to change the source. Maybe you need to resolve a config first.'
      );
      // setError(
      //   'Dataset route in dataset config store is empty, but required to change the source. Maybe you need to resolve a config first.'
      // );
      return;
    }

    // _source.value = nextSource;
    await resolve(_datasetRoute.value, nextSource);
  };

  const isTableView = computed(() => _viewKey.value === View.TABLE);
  const isDetailView = computed(() => _viewKey.value === View.DETAIL);
  const isEditView = computed(() => _viewKey.value === View.EDIT);
  const isQuickView = computed(() => _viewKey.value === View.QUICK);
  const isRawView = computed(() => _viewKey.value === View.RAW);
  const isNewView = computed(() => _viewKey.value === View.NEW);

  return {
    currentDomain: computed(() => _currentDomain.value),
    currentPath,
    isError: computed(() => _resolutionState.value === 'error'),
    isResolving: computed(() => _resolutionState.value === 'resolving'),
    error: computed(() => _error.value),
    config: computed(() => _config.value),
    hasConfig: computed(() => _config.value != null),
    datasetRoute: computed(() => _datasetRoute.value),
    hasDetailView,
    hasEditView,
    hasNewView,
    hasQuickView,
    hasCreatePermission,
    hasUpdatePermission,
    isSourceEmbedded,
    isSourceGenerated,
    source: computed(() => _source.value),
    addRecordSupported,
    editRecordSupported,
    tableView,
    isTableView,
    isDetailView,
    isEditView,
    isQuickView,
    isRawView,
    isNewView,
    changeSource,
  };
});

const computeCurrentDomain = (domainFromRoutingParam: string | string[]) => {
  if (domainFromRoutingParam == null) {
    return 'no-dataset-domain-in-url';
  }
  const routeFromParams = stringifyParameter(domainFromRoutingParam);
  return domainIsKnownToHaveOpenApiDocument(routeFromParams)
    ? routeFromParams
    : 'unknown';
};

const isSameRouteConfig = (
  route: RouteLocationNormalizedLoaded,
  oldRoute?: RouteLocationNormalizedLoaded
): boolean => {
  // Return early for first invocation
  if (oldRoute == null) {
    return false;
  }

  // Get current route into
  const viewKey = routeNameToViewKey(route.name);
  const routeDomain = route.params.domain as string;
  const routePathParams = toArray(route.params.pathParams).join('/');
  const routeId = route.params.id as string;

  // Get old route info to compare to current route
  const oldViewKey = routeNameToViewKey(oldRoute.name);
  const oldRouteDomain = oldRoute.params.domain as string;
  const oldRoutePathParams = toArray(oldRoute.params.pathParams).join('/');
  const oldRouteId = oldRoute.params.id as string;

  return (
    viewKey === oldViewKey &&
    routeDomain === oldRouteDomain &&
    routePathParams === oldRoutePathParams &&
    routeId === oldRouteId
  );
};

const routeNameToViewKey = (
  name?: string | symbol | null
): ViewKey | undefined => {
  if (name == null) {
    return undefined;
  }
  switch (name) {
    case DatasetPage.DETAIL:
      return View.DETAIL;
    case DatasetPage.EDIT:
      return View.EDIT;
    case DatasetPage.NEW:
      return View.NEW;
    case DatasetPage.QUICK:
      return View.QUICK;
    case DatasetPage.RAW:
      return View.RAW;
    case DatasetPage.TABLE:
      return View.TABLE;
    default:
      return undefined;
  }
};

const toDatasetRoute = (
  domain: DatasetDomains,
  route: RouteLocationNormalizedLoaded
): DatasetRoute => {
  const path = route.params.pathParams;
  if (path == null) {
    return { domain, pathParams: [] };
  }

  // Ensure to use an array as pathParams
  const pathParams = Array.isArray(path) ? path : path.split('/');

  // Return route without id if id is not defined
  if (route.params.id == null) {
    return { domain, pathParams };
  }

  // Ensure to use a string as id
  const id = stringifyParameter(route.params.id);
  return { domain, pathParams, id };
};

const toArray = (s?: string | string[]) => (Array.isArray(s) ? s : [s]);

// Add support for hot-module-reload
if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useDatasetConfigStore, import.meta.hot)
  );
}

// // Add support for datasetConfig config hot-module-reload
// if (import.meta.hot) {
//   // Need to reference module whose changes should trigger config calculations
//   embeddedDatasetConfigs;

//   // Watch for changes in the config file
//   import.meta.hot.accept('../../../config/config', (config) => {
//     if (config != null) {
//       const store = useDatasetConfigStore();
//       if (store.viewKey != null && store.datasetRoute != null) {
//         // Need some time for data to settle
//         setTimeout(() => store.resolve(store.viewKey!, store.datasetRoute!));
//       }
//     }
//   });
// }
