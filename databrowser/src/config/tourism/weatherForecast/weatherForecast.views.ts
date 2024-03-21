// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { weatherForecastListView } from './weatherForecast.listView';
import { weatherForecastSharedView } from './weatherForecast.sharedView';

export const weatherForecastViews = {
  table: weatherForecastListView,
  detail: weatherForecastSharedView(),
  edit: weatherForecastSharedView(),
};
