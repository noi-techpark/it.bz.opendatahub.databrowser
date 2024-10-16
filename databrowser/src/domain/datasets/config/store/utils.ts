// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { LocationQuery, useRouter } from 'vue-router';
import { DatasetDomain, DatasetQuery } from '../types';
import { Ref, watch } from 'vue';

export const useQueryParamsCleanUp = (
  domain: Ref<DatasetDomain | undefined>,
  datasetQuery: Ref<DatasetQuery | undefined>
) => {
  const router = useRouter();
  const { currentRoute } = router;

  // Watch datasetQuery changes and update route if:
  // - search or filters changed => jump to first page
  // - default values are part of query params => remove them from URL
  watch(
    datasetQuery,
    (datasetQueryValue, datasetQueryOldValue) => {
      // Remove current page param from query if search or filters changed
      const searchAndFilterParamsCleanup =
        removeCurrentPageParamIfSearchOrFiltersChanged(
          domain.value,
          datasetQueryValue,
          datasetQueryOldValue,
          currentRoute.value.query
        );

      // Remove default query params
      const defaultParamsCleanup = removeDefaultParams(
        datasetQueryValue,
        currentRoute.value.query
      );

      // Update route if needed
      if (
        searchAndFilterParamsCleanup.updateRoute ||
        defaultParamsCleanup.updateRoute
      ) {
        const query = intersectQueryParams(
          searchAndFilterParamsCleanup.routeQuery,
          defaultParamsCleanup.routeQuery
        );
        setTimeout(() => router.replace({ query }));
      }
    },
    { immediate: true }
  );
};

// Remove current page info from query param if search or
// filters changed. The idea is to paginate back to the
// first page if any of them changed.
export const removeCurrentPageParamIfSearchOrFiltersChanged = (
  domain: DatasetDomain | undefined,
  datasetQuery: DatasetQuery | undefined,
  datasetQueryOld: DatasetQuery | undefined,
  currentLocation: LocationQuery
): { updateRoute: boolean; routeQuery: LocationQuery } => {
  // Check if search or filters changed
  const searchOrFiltersChanged = hasSearchOrFiltersChanged(
    domain,
    datasetQuery,
    datasetQueryOld
  );

  if (searchOrFiltersChanged) {
    // Remove page location param for tourism
    if (domain === 'tourism') {
      const routeQuery = { ...currentLocation };
      delete routeQuery['pagenumber'];
      return { updateRoute: true, routeQuery };
    }
    // Remove page location param for mobility
    if (domain === 'mobility') {
      const routeQuery = { ...currentLocation };
      delete routeQuery['offset'];
      return { updateRoute: true, routeQuery };
    }
  }

  return { updateRoute: false, routeQuery: currentLocation };
};

// Remove default query params. This is a pure esthetical
// function, to avoid showing default values in the URL.
export const removeDefaultParams = (
  datasetQuery: DatasetQuery | undefined,
  currentLocation: LocationQuery
): { updateRoute: boolean; routeQuery: LocationQuery } => {
  if (datasetQuery?.default == null) {
    return { updateRoute: false, routeQuery: currentLocation };
  }

  const routeQuery = { ...currentLocation };

  let routeQueryChanged = false;
  // Remove default values from query params
  Object.entries(datasetQuery?.default).forEach(([key, value]) => {
    if (routeQuery[key] === value) {
      delete routeQuery[key];
      routeQueryChanged = true;
    }
  });

  return { updateRoute: routeQueryChanged, routeQuery };
};

// Intersect query params, the result will be a new object
// with only the keys that are present in both objects
export const intersectQueryParams = (
  query1: LocationQuery,
  query2: LocationQuery
): LocationQuery => {
  return Object.keys(query1).reduce<LocationQuery>((acc, key) => {
    if (query2[key] != null) {
      acc[key] = query1[key];
    }
    return acc;
  }, {});
};

// Check if search or filters changed
const hasSearchOrFiltersChanged = (
  domain: DatasetDomain | undefined,
  datasetQuery: DatasetQuery | undefined,
  datasetQueryOld: DatasetQuery | undefined
) => {
  if (domain != null && datasetQuery != null && datasetQueryOld != null) {
    // Tourism
    if (domain === 'tourism') {
      const searchfilterChanged =
        datasetQuery.stringified.searchfilter !==
        datasetQueryOld.stringified.searchfilter;
      const rawfilterChanged =
        datasetQuery.stringified.rawfilter !==
        datasetQueryOld.stringified.rawfilter;

      return searchfilterChanged || rawfilterChanged;
    }

    // Mobility
    if (domain === 'mobility') {
      const whereChanged =
        datasetQuery.stringified.where !== datasetQueryOld.stringified.where;
      return whereChanged;
    }
  }
  return false;
};
