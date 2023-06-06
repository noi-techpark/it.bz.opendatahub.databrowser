// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { metaRegionListView } from './metaRegion.listView';
import { metaRegionSharedView } from './metaRegion.sharedView';

export const metaRegionViews = {
  table: metaRegionListView,
  detail: metaRegionSharedView(),
  edit: metaRegionSharedView(),
};
