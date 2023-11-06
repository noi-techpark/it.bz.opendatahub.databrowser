// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { ToRefs, toRefs, toValue } from 'vue';
import {
  DatasetPath,
  DatasetQuery,
  RouteId,
  RoutePath,
  RouteQuery,
  ToMaybeRefs,
} from '../types';
import { DatasetConfig, ViewKey } from '../types';
import { stringifyQuery } from 'vue-router';
import { reactiveComputed } from '@vueuse/core';

interface ComputeDatasetLocation {
  datasetPath: DatasetPath | undefined;
  datasetQuery: DatasetQuery | undefined;
  fullPath: string | undefined;
}

interface ComputeDatasetLocationParams {
  datasetConfig: DatasetConfig | undefined;
  viewKey: ViewKey | undefined;
  routePath: RoutePath | undefined;
  routeId: RouteId | undefined;
  routeQuery: RouteQuery | undefined;
}

export const computeDatasetLocation = ({
  datasetConfig,
  viewKey,
  routePath,
  routeId,
  routeQuery,
}: ComputeDatasetLocationParams): ComputeDatasetLocation => {
  if (datasetConfig == null || viewKey == null || routePath == null) {
    return {
      datasetPath: undefined,
      datasetQuery: undefined,
      fullPath: undefined,
    };
  }

  const query = {
    ...(datasetConfig.views?.[viewKey]?.defaultQueryParams ?? {}),
    ...(routeQuery ?? {}),
  };

  const fullPath = computeFullPath(
    datasetConfig.baseUrl,
    routePath,
    routeId,
    query
  );

  return {
    datasetPath: routePath,
    datasetQuery: query,
    fullPath,
  };
};

export const useComputeDatasetLocation = (
  params: ToMaybeRefs<ComputeDatasetLocationParams>
): ToRefs<ComputeDatasetLocation> => {
  const result = reactiveComputed(() => {
    const datasetConfig = toValue(params.datasetConfig);
    const viewKey = toValue(params.viewKey);
    const routePath = toValue(params.routePath);
    const routeId = toValue(params.routeId);
    const routeQuery = toValue(params.routeQuery);

    return computeDatasetLocation({
      datasetConfig,
      viewKey,
      routePath,
      routeId,
      routeQuery,
    });
  });

  return toRefs(result);
};

const computeFullPath = (
  baseUrl: string,
  routePath: RoutePath,
  routeId: RouteId | undefined,
  routeQuery: RouteQuery
) => {
  const url = `${baseUrl}/${routePath.join('/')}`;
  const fullPath = routeId == null ? url : `${url}/${routeId}`;

  const queryString = stringifyQuery(routeQuery);
  return `${fullPath}${queryString.length === 0 ? '' : '?' + queryString}`;
};
