// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { RouteName } from '../config/types';
import { RouteLocationNormalizedLoaded } from 'vue-router';

/**
 * Compute the route name.
 *
 * The route name is the value of the route parameter `name`.
 * If the route parameter `name` is not a string or symbol, the route name is undefined.
 *
 * @param route The route.
 * @returns The route name or undefined if the route name is not a string or symbol.
 */
export const computeRouteName = (
  route: RouteLocationNormalizedLoaded
): RouteName => (route.name == null ? undefined : route.name.toString());
