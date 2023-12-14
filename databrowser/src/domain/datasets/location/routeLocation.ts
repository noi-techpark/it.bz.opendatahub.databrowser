// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { reactiveComputed } from '@vueuse/core';
import { MaybeRef, ToRefs, toRefs, toValue } from 'vue';
import { RouteLocationNormalizedLoaded } from 'vue-router';
import { RouteLocation } from '../config/types';
import { computeRouteDomain } from './routeDomain';
import { computeRouteId } from './routeId';
import { computeRouteName } from './routeName';
import { computeRoutePath } from './routePath';
import { computeRouteQuery } from './routeQuery';

export const computeRouteLocation = (
  route: RouteLocationNormalizedLoaded
): RouteLocation => ({
  routeName: computeRouteName(route),
  routeDomain: computeRouteDomain(route),
  routePath: computeRoutePath(route),
  routeQuery: computeRouteQuery(route),
  routeId: computeRouteId(route),
});

export const useComputeRouteLocation = (
  route: MaybeRef<RouteLocationNormalizedLoaded>
): ToRefs<RouteLocation> => {
  const result = reactiveComputed(() => computeRouteLocation(toValue(route)));

  return toRefs(result);
};
