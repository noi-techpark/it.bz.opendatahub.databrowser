// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { ToRefs, toRefs, toValue } from 'vue';
import {
  DatasetDomain,
  DatasetPath,
  DatasetQuery,
  RouteDomain,
  RouteId,
  RoutePath,
  RouteQuery,
  ToMaybeRefs,
} from '../types';
import { DatasetConfig, ViewKey } from '../types';
import { reactiveComputed } from '@vueuse/core';
import { domainIsKnownToHaveOpenApiDocument } from '../../openApi';
import { stringifyRouteQuery, uriEncodeRouteQuery } from '../../utils/route';

interface ComputeDatasetLocation {
  datasetDomain: DatasetDomain | undefined;
  datasetPath: DatasetPath | undefined;
  datasetQuery: DatasetQuery | undefined;
  fullPath: string | undefined;
}

interface ComputeDatasetLocationParams {
  datasetConfig: DatasetConfig | undefined;
  viewKey: ViewKey | undefined;
  routeDomain: RouteDomain;
  routePath: RoutePath;
  routeId: RouteId;
  routeQuery: RouteQuery;
}

export const computeDatasetLocation = ({
  datasetConfig,
  viewKey,
  routeDomain,
  routePath,
  routeId,
  routeQuery,
}: ComputeDatasetLocationParams): ComputeDatasetLocation => {
  if (datasetConfig == null || viewKey == null) {
    return {
      datasetDomain: undefined,
      datasetPath: undefined,
      datasetQuery: undefined,
      fullPath: undefined,
    };
  }

  const datasetDomain = computeDatasetDomain(routeDomain);

  const datasetQuery = computeDatasetQuery(
    routeQuery,
    datasetConfig.views?.[viewKey]?.defaultQueryParams
  );

  const uriEncodedQuery = uriEncodeRouteQuery(datasetQuery.raw);

  const fullPath = computeFullPath(
    datasetConfig.baseUrl,
    routePath,
    routeId,
    uriEncodedQuery
  );

  return {
    datasetDomain,
    datasetPath: routePath,
    datasetQuery,
    fullPath,
  };
};

export const useComputeDatasetLocation = (
  params: ToMaybeRefs<ComputeDatasetLocationParams>
): ToRefs<ComputeDatasetLocation> => {
  const result = reactiveComputed(() => {
    const datasetConfig = toValue(params.datasetConfig);
    const viewKey = toValue(params.viewKey);
    const routeDomain = toValue(params.routeDomain);
    const routePath = toValue(params.routePath);
    const routeId = toValue(params.routeId);
    const routeQuery = toValue(params.routeQuery);

    return computeDatasetLocation({
      datasetConfig,
      viewKey,
      routeDomain,
      routePath,
      routeId,
      routeQuery,
    });
  });

  return toRefs(result);
};

const computeDatasetDomain = (
  routeDomain: string | undefined
): DatasetDomain => {
  if (routeDomain == null) {
    return 'no-dataset-domain-in-url';
  }
  return domainIsKnownToHaveOpenApiDocument(routeDomain)
    ? routeDomain
    : 'unknown';
};

const computeDatasetQuery = (
  routeQuery: RouteQuery,
  defaultValues: Record<string, string> | undefined
): DatasetQuery => {
  const def = defaultValues ?? {};
  const raw = { ...def, ...routeQuery };
  // The array serialization depends on the current dataset domain and
  // should be configurable in the future
  const stringified = stringifyRouteQuery(raw);

  return {
    raw,
    stringified,
    default: def,
  };
};

const computeFullPath = (
  baseUrl: string,
  routePath: RoutePath,
  routeId: RouteId | undefined,
  uriEncodedQuery: string
) => {
  const url = `${baseUrl}/${routePath.join('/')}`;
  const fullPath = routeId == null ? url : `${url}/${routeId}`;
  return `${fullPath}${
    uriEncodedQuery.length === 0 ? '' : '?' + uriEncodedQuery
  }`;
};
