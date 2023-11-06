// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { computed, Ref } from 'vue';
import { PathParams } from '../../datasetConfig/types';
import { useMetaDataQuery } from './useMetaDataQuery';
import { stringifyParameter } from '../../api';
import { useRouter } from 'vue-router';
import { useDatasetConfigStore } from '../../datasetConfig/store/datasetConfigStore';
import { storeToRefs } from 'pinia';

type Query = Record<string, string | null | (string | null)[]>;

// Return the metadata for the current route
export const useMetaDataForCurrentRoute = () => {
  const { datasetPath } = storeToRefs(useDatasetConfigStore());
  const pathParams = computed(() => datasetPath.value ?? []);
  const { currentRoute } = useRouter();
  const query = computed(() => currentRoute.value.query);

  console.log('useMetaDataForCurrentRoute');

  return useMetaDataForRoute(pathParams, query);
};

// Return the metadata for the route specified by the path params and query
export const useMetaDataForRoute = (
  pathParams: Ref<Readonly<PathParams>>,
  query: Ref<Query>
) => {
  const metaData = useMetaDataQuery();

  const currentMetaData = computed(() => {
    const candidates = (metaData.data.value ?? [])
      .filter((md) => {
        if (!pathsMatch(pathParams.value, md.pathParam)) {
          return false;
        }

        const queryAsObject = queryToObject(query.value);
        return filterContainedInQuery(md.apiFilter ?? {}, queryAsObject);
      })
      // There may be more than one candidate, for example if the query contains
      // a filter that is not present in the API filter (e.g. language). In that
      // case, we want to pick the one with the most filters, as that is the most
      // specific.
      .sort(
        (a, b) =>
          Object.keys(b.apiFilter ?? {}).length -
          Object.keys(a.apiFilter ?? {}).length
      );

    return candidates.length > 0 ? candidates[0] : undefined;
  });

  return { currentMetaData };
};

const pathsMatch = (path1: Readonly<PathParams>, path2: PathParams) =>
  JSON.stringify(path1).localeCompare(JSON.stringify(path2)) === 0;

const queryToObject = (query: Query) =>
  Object.entries(query).reduce<Record<string, string>>(
    (prev, [key, value]) => ({ ...prev, [key]: stringifyParameter(value) }),
    {}
  );

const filterContainedInQuery = (
  apiFilter: Record<string, string>,
  query: Record<string, string>
) => {
  const apiFilterKeys = Object.keys(apiFilter);
  const queryKeys = Object.keys(query);

  // If there are more API filter keys than query keys, the filter cannot be contained in the query
  if (apiFilterKeys.length > queryKeys.length) {
    return false;
  }

  // Check if all API filter key / values are present in the query
  return Object.entries(apiFilter).every(
    ([key, value]) => query[key] === value
  );
};
