// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { regionListView } from './region.listView';
import { regionSharedView } from './region.sharedView';

export const regionViews = {
  table: regionListView,
  detail: regionSharedView(),
  edit: regionSharedView(),
  new: regionSharedView(),
};
