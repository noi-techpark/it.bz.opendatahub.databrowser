// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { RouteDomain } from '../types';
import { RouteLocationNormalizedLoaded } from 'vue-router';

export const computeRouteDomain = (
  route: RouteLocationNormalizedLoaded
): RouteDomain => {
  const domain = route.params.domain;
  return Array.isArray(domain) ? domain.join(',') : domain;
};
