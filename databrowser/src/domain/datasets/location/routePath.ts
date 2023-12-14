// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { RouteLocationNormalizedLoaded } from 'vue-router';
import { RoutePath } from '../config/types';

/**
 * Compute the route path.
 *
 * The route path is the value of the route parameter `pathSegments`.
 * If the route parameter `pathSegments` is null or undefined, the route path is an empty array.
 * If the route parameter `pathSegments` is a string, the route path is an array with that string as single entry.
 * If the route parameter `pathSegments` is an array, the route path is that array.
 *
 * @param route The route.
 * @returns The route path or an empty array if the route path is null or undefined.
 */
export const computeRoutePath = (
  route: RouteLocationNormalizedLoaded
): RoutePath => {
  const path = route.params.pathSegments;
  if (path == null) {
    return [];
  }

  // Ensure to use an array as pathSegments
  return Array.isArray(path) ? path : path.split('/');
};
