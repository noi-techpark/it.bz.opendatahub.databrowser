// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { weatherDistrictListView } from './weatherDistrict.listView';
import { weatherDistrictSharedView } from './weatherDistrict.sharedView';

export const weatherDistrictViews = {
  table: weatherDistrictListView,
  detail: weatherDistrictSharedView(),
  edit: weatherDistrictSharedView(),
};
