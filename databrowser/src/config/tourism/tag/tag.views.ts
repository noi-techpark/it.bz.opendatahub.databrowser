// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { tagListView } from './tag.listView';
import { tagSharedView } from './tag.sharedView';

export const tagViews = {
  table: tagListView,
  detail: tagSharedView(),
  edit: tagSharedView(),
  new: tagSharedView(),
};
