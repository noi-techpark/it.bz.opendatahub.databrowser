// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { eventShortListView } from './eventShort.listView';
import { eventShortSharedView } from './eventShort.sharedView';

export const eventShortViews = {
  table: eventShortListView,
  detail: eventShortSharedView(),
  edit: eventShortSharedView(),
  new: eventShortSharedView(),
};
