// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { RouteQuery } from '../config/types';
import { RouteLocationNormalizedLoaded } from 'vue-router';

/**
 * Compute the route query.
 *
 * The route query is the value of the route parameter `query`.
 *
 * @param route The route.
 * @returns The route query.
 */
export const computeRouteQuery = (
  route: RouteLocationNormalizedLoaded
): RouteQuery => route.query;
