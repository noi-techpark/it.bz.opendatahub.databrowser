// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { weatherListView } from './weather.listView';
import { weatherSharedView } from './weather.sharedView';

export const weatherViews = {
  table: weatherListView,
  detail: weatherSharedView(),
  edit: weatherSharedView(),
};
