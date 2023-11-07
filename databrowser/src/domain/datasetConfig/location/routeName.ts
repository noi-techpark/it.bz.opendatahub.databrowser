// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { RouteName } from '../types';
import { RouteLocationNormalizedLoaded } from 'vue-router';

export const computeRouteName = (
  route: RouteLocationNormalizedLoaded
): RouteName | undefined =>
  route.name == null ? undefined : route.name.toString();
