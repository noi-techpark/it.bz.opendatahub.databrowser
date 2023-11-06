// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { RouteQuery } from '../types';
import { stringifyRouteQueryValues } from '../utils';
import { RouteLocationNormalizedLoaded } from 'vue-router';

export const computeRouteQuery = (
  route: RouteLocationNormalizedLoaded
): RouteQuery => stringifyRouteQueryValues(route.query);
