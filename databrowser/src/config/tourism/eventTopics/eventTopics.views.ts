// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { eventTopicsListView } from './eventTopics.listView';
import { eventTopicsSharedView } from './eventTopics.sharedView';

export const eventTopicsViews = {
  table: eventTopicsListView,
  detail: eventTopicsSharedView(),
  edit: eventTopicsSharedView(),
};
