// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { venueListView } from './venue.listView';
import { venueSharedView } from './venue.sharedView';

export const venueViews = {
  table: venueListView,
  detail: venueSharedView(),
  edit: venueSharedView(),
  new: venueSharedView(),
};
