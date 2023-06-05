// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { tourismAssociationListListView } from './tourismAssociationList.listView';
import { tourismAssociationListSharedView } from './tourismAssociationList.sharedView';

export const tourismAssociationListViews = {
  table: tourismAssociationListListView,
  detail: tourismAssociationListSharedView(),
  edit: tourismAssociationListSharedView(),
  new: tourismAssociationListSharedView(),
};
