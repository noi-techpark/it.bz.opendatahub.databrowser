// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { skiAreaListView } from './skiArea.listView';
import { skiAreaSharedView } from './skiArea.sharedView';

export const skiAreaViews = {
  table: skiAreaListView,
  detail: skiAreaSharedView(),
  edit: skiAreaSharedView(),
  new: skiAreaSharedView(),
};
