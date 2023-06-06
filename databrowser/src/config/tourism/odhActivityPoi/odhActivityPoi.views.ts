// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { odhActivityPoiListView } from './odhActivityPoi.listView';
import { odhActivityPoiSharedView } from './odhActivityPoi.sharedView';
import { odhActivityPoiQuickView } from './odhActivityPoi.quickView';

export const odhActivityPoiViews = {
  table: odhActivityPoiListView,
  detail: odhActivityPoiSharedView(),
  edit: odhActivityPoiSharedView(),
  new: odhActivityPoiSharedView(),
  quick: odhActivityPoiQuickView,
};
