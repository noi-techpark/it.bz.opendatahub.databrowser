// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { RouteLocationNormalizedLoaded } from 'vue-router';
import { RoutePath } from '../types';

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
