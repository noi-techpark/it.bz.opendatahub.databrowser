// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { accommodationListView } from './accommodation.listView';
import { accommodationSharedView } from './accommodation.sharedView';

export const accommodationViews = {
  table: accommodationListView,
  detail: accommodationSharedView(),
  edit: accommodationSharedView(),
  new: accommodationSharedView(),
};
