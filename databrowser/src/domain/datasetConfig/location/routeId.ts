// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { RouteLocationNormalizedLoaded } from 'vue-router';
import { RouteId } from '../types';

export const computeRouteId = (
  route: RouteLocationNormalizedLoaded
): RouteId | undefined => {
  const id = route.params.id;
  if (id == null || Array.isArray(id)) {
    return undefined;
  }
  return id;
};
