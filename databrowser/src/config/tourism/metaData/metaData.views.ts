// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { metaDataListView } from './metaData.listView';
import { metaDataSharedView } from './metaData.sharedView';

export const metaDataViews = {
  table: metaDataListView,
  detail: metaDataSharedView(),
  edit: metaDataSharedView(),
  new: metaDataSharedView(),
};
