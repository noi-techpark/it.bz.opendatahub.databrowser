// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { skiRegionListView } from './skiRegion.listView';
import { skiRegionSharedView } from './skiRegion.sharedView';

export const skiRegionViews = {
  table: skiRegionListView,
  detail: skiRegionSharedView(),
  edit: skiRegionSharedView(),
  new: skiRegionSharedView(),
};
