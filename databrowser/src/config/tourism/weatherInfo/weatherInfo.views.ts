// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { weatherInfoListView } from './weatherInfo.listView';
import { weatherInfoSharedView } from './weatherInfo.sharedView';

export const weatherInfoViews = {
  table: weatherInfoListView,
  detail: weatherInfoSharedView(),
  edit: weatherInfoSharedView(),
};
