// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { articleListView } from './article.listView';
import { articleSharedView } from './article.sharedView';

export const articleViews = {
  table: articleListView,
  detail: articleSharedView(),
  edit: articleSharedView(),
  new: articleSharedView(),
};
