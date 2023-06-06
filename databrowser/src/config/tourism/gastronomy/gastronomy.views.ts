// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { gastronomyListView } from './gastronomy.listView';
import { gastronomySharedView } from './gastronomy.sharedView';

export const gastronomyViews = {
  table: gastronomyListView,
  detail: gastronomySharedView(),
  edit: gastronomySharedView(),
  new: gastronomySharedView(),
};
