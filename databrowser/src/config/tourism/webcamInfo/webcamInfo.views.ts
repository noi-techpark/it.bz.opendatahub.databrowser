// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { webcamInfoListView } from './webcamInfo.listView';
import { webcamInfoSharedView } from './webcamInfo.sharedView';

export const webcamInfoViews = {
  table: webcamInfoListView,
  detail: webcamInfoSharedView(),
  edit: webcamInfoSharedView(),
  new: webcamInfoSharedView(),
};
