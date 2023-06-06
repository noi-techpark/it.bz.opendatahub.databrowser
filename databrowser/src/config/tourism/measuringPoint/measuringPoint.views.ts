// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { measuringPointListView } from './measuringPoint.listView';
import { measuringPointSharedView } from './measuringPoint.sharedView';

export const measuringPointViews = {
  table: measuringPointListView,
  detail: measuringPointSharedView(),
  edit: measuringPointSharedView(),
  new: measuringPointSharedView(),
};
