// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { districtListView } from './district.listView';
import { districtSharedView } from './district.sharedView';

export const districtViews = {
  table: districtListView,
  detail: districtSharedView(),
  edit: districtSharedView(),
  new: districtSharedView(),
};
