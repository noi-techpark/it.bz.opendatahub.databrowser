// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { eventOriginsListView } from './eventOrigins.listView';
import { eventOriginsSharedView } from './eventOrigins.sharedView';

export const eventOriginsViews = {
  table: eventOriginsListView,
  detail: eventOriginsSharedView(),
};
