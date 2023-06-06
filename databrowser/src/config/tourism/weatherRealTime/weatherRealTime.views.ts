// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { weatherRealTimeListView } from './weatherRealTime.listView';
import { weatherRealTimeSharedView } from './weatherRealTime.sharedView';

export const weatherRealTimeViews = {
  table: weatherRealTimeListView,
  detail: weatherRealTimeSharedView(),
  edit: weatherRealTimeSharedView(),
};
