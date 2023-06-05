// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { wineAwardListView } from './wineAward.listView';
import { wineAwardSharedView } from './wineAward.sharedView';

export const wineAwardViews = {
  table: wineAwardListView,
  detail: wineAwardSharedView(),
  edit: wineAwardSharedView(),
  new: wineAwardSharedView(),
};
