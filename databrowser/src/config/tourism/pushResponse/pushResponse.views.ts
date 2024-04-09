// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { pushResponseListView } from './pushResponse.listView';
import { pushResponseSharedView } from './pushResponse.sharedView';

export const pushResponseViews = {
  table: pushResponseListView,
  detail: pushResponseSharedView(),
  edit: pushResponseSharedView(),
  new: pushResponseSharedView(),
};
