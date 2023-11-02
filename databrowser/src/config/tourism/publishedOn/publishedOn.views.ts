// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { publishedOnListView } from './publishedOn.listView';
import { publishedOnSharedView } from './publishedOn.sharedView';

export const publishedOnViews = {
  table: publishedOnListView,
  detail: publishedOnSharedView(),
  edit: publishedOnSharedView(),
  new: publishedOnSharedView(),
};
