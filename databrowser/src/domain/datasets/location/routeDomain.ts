// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { RouteDomain } from '../config/types';
import { RouteLocationNormalizedLoaded } from 'vue-router';

/**
 * Compute the route domain from the route.
 *
 * The route domain is the value of the route parameter `domain`.
 * If the route parameter `domain` is not a string, the route domain is undefined.
 *
 * @param route The route.
 * @returns The route domain or undefined if the route domain is not a string.
 */
export const computeRouteDomain = (
  route: RouteLocationNormalizedLoaded
): RouteDomain => {
  const domain = route.params.domain;
  // We expect a string or undefined, anything else is not compatible
  // with the RouteId type and further processing.
  if (domain == null || Array.isArray(domain)) {
    console.debug('The route domain is not a string or undefined', domain);
    return undefined;
  }
  return domain;
};
