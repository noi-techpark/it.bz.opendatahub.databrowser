// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { eventListView } from './event.listView';
import { eventSharedView } from './event.sharedView';

export const eventViews = {
  table: eventListView,
  detail: eventSharedView(),
  edit: eventSharedView(),
  new: eventSharedView(),
};
