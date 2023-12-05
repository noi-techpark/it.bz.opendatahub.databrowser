// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { sourceListView } from './source.listView';
import { sourceSharedView } from './source.sharedView';

export const sourceViews = {
  table: sourceListView,
  detail: sourceSharedView(),
  edit: sourceSharedView(),
  new: sourceSharedView(),
};
