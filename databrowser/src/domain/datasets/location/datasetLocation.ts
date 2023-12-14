// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { reactiveComputed } from '@vueuse/core';
import { ToRefs, toRefs, toValue } from 'vue';
import { domainIsKnownToHaveOpenApiDocument } from '../../openApi';
import {
  DatasetConfig,
  DatasetDomain,
  DatasetId,
  DatasetPath,
  DatasetQuery,
  RouteDomain,
  RouteId,
  RoutePath,
  RouteQuery,
  ToMaybeRefs,
  ViewKey,
} from '../config/types';
import { computeApiFullUrl } from './apiLocation';
import { stringifyRouteQuery } from './stringifyQuery';

interface ComputeDatasetLocation {
  datasetDomain: DatasetDomain | undefined;
  datasetPath: DatasetPath | undefined;
  datasetQuery: DatasetQuery | undefined;
  datasetId: DatasetId | undefined;
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
      datasetId: undefined,
      fullPath: undefined,
    };
  }

  const datasetDomain = computeDatasetDomain(routeDomain);

  const datasetQuery = computeDatasetQuery(
    routeQuery,
    datasetConfig.views?.[viewKey]?.defaultQueryParams
  );

  const fullPath = computeApiFullUrl(
    datasetDomain,
    routePath,
    routeId,
    datasetQuery
  );

  return {
    datasetDomain,
    datasetPath: routePath,
    datasetQuery,
    datasetId: routeId,
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
