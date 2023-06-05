// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { watch } from 'vue';
import { RouteLocationNormalizedLoaded, Router } from 'vue-router';
import { SupportedDomains } from '../openApi/types';
import { DatasetRoute, View, ViewKey } from './types';
import { useDatasetConfigStore } from './store/datasetConfigStore';
import { DatasetPage } from '../../routes';

export const useConfigRouterWatcher = (router: Router) => {
  const datasetConfigStore = useDatasetConfigStore();

  watch(
    () => router.currentRoute.value,
    async (route, oldRoute) => {
      console.debug('Router watcher route changed', route);

      // Return early if no dataset config affecting route details changed
      // e.g. when just the route query or hash changed
      if (isSameRouteConfig(route, oldRoute)) {
        console.debug(
          'No dataset config affecting route details changed, returning early'
        );
        return;
      }

      // Get route info
      const viewKey = routeNameToViewKey(route.name);
      const routeDomain = route.params.domain as SupportedDomains;
      const routePathParams = route.params.pathParams;
      const routeId = route.params.id as string;

      // If viewKey is not defined for a dataset route, then something is wrong.
      if (viewKey == null) {
        datasetConfigStore.setError(
          `No view type defined for current route "${route.path}". Please check the router configuration.`
        );
        return;
      }

      // If domain is not defined for a dataset route, then something is wrong.
      if (routeDomain == null) {
        datasetConfigStore.setError(
          `No domain for current route "${route.path}". Please check the router configuration.`
        );
        return;
      }

      const datasetRoute = toDatasetRoute(
        routeDomain,
        routePathParams,
        routeId
      );

      // Call store action to resolve config
      datasetConfigStore.resolve(viewKey, datasetRoute);

      console.debug('dataset config', datasetConfigStore.config);
    },
    { immediate: true }
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

const toDatasetRoute = (
  domain: SupportedDomains,
  path?: string | string[],
  id?: string
): DatasetRoute => {
  if (path == null) {
    return { domain, pathParams: [] };
  }
  // Ensure to use an array
  const pathParams = Array.isArray(path) ? path : path.split('/');
  return { domain, pathParams, id };
};

const toArray = (s?: string | string[]) => (Array.isArray(s) ? s : [s]);
