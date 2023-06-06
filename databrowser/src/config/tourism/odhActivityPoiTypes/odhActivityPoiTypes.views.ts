// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { odhActivityPoiTypesListView } from './odhActivityPoiTypes.listView';
import { odhActivityPoiTypesSharedView } from './odhActivityPoiTypes.sharedView';

export const odhActivityPoiTypesViews = {
  table: odhActivityPoiTypesListView,
  detail: odhActivityPoiTypesSharedView(),
  edit: odhActivityPoiTypesSharedView(),
};
