// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { stationTypesListView } from './stationTypes.listView';
import { stationTypesSharedView } from './stationTypes.sharedView';

export const stationTypesViews = {
  table: stationTypesListView,
  detail: stationTypesSharedView(),
};
