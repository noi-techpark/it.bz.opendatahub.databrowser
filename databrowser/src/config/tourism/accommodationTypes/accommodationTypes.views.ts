// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { accommodationTypesListView } from './accommodationTypes.listView';
import { accommodationTypesSharedView } from './accommodationTypes.sharedView';

export const accommodationTypesViews = {
  table: accommodationTypesListView,
  detail: accommodationTypesSharedView(),
  edit: accommodationTypesSharedView(),
};
