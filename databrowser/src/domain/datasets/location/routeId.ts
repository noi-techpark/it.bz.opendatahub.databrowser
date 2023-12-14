// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { RouteLocationNormalizedLoaded } from 'vue-router';
import { RouteId } from '../config/types';

/**
 * Compute the route ID from the route.
 *
 * The route ID is the value of the route parameter `id`.
 * If the route parameter `id` is not a string, the route ID is undefined.
 *
 * @param route The route.
 * @returns The route ID or undefined if the route ID is not a string.
 */
export const computeRouteId = (
  route: RouteLocationNormalizedLoaded
): RouteId => {
  const id = route.params.id;
  // We expect a string or undefined, anything else is not compatible
  // with the RouteId type and further processing.
  if (id === null || Array.isArray(id)) {
    console.debug('The route ID is not a string or undefined', id);
    return undefined;
  }
  return id;
};
