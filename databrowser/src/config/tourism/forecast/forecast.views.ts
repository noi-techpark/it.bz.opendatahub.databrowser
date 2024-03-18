// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { forecastListView } from './forecast.listView';
import { forecastSharedView } from './forecast.sharedView';

export const forecastViews = {
  table: forecastListView,
  detail: forecastSharedView(),
  edit: forecastSharedView(),
};
