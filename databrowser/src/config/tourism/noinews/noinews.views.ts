// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { noinewsListView } from './noinews.listView';
import { noinewsSharedView } from './noinews.sharedView';

export const noinewsViews = {
  table: noinewsListView,
  detail: noinewsSharedView(),
  edit: noinewsSharedView(),
  new: noinewsSharedView(),
};
