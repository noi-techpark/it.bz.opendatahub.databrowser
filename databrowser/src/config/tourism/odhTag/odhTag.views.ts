// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { odhTagListView } from './odhTag.listView';
import { odhTagSharedView } from './odhTag.sharedView';

export const odhTagViews = {
  table: odhTagListView,
  detail: odhTagSharedView(),
  edit: odhTagSharedView(),
  new: odhTagSharedView(),
};
