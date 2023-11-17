// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { computed, DeepReadonly, Ref } from 'vue';
import {
  DatasetPath,
  DatasetQuery,
  PathSegments,
} from '../../datasetConfig/types';
import { useMetaDataQuery } from './useMetaDataQuery';

// Return the metadata for the route specified by the path params and query
export const useMetaDataForRoute = (
  datasetPath: Ref<Readonly<DatasetPath> | undefined>,
  datasetQuery: Ref<DeepReadonly<DatasetQuery> | undefined>
) => {
  const metaData = useMetaDataQuery();

  const currentMetaData = computed(() => {
    // TODO: use candidate computation from findCandidateConfigs?
    const candidates = (metaData.data.value ?? [])
      .filter((md) => {
        if (
          datasetPath.value == null ||
          !pathsMatch(datasetPath.value, md.pathSegments)
        ) {
          return false;
        }

        return filterContainedInQuery(
          md.apiFilter,
          datasetQuery.value?.stringified
        );
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

const pathsMatch = (path1: Readonly<PathSegments>, path2: PathSegments) =>
  JSON.stringify(path1).localeCompare(JSON.stringify(path2)) === 0;

const filterContainedInQuery = (
  apiFilter: Record<string, string> | undefined,
  query: Record<string, string> | undefined
) => {
  if (apiFilter == null || query == null) {
    return false;
  }

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
