// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { tourismAssociationListView } from './tourismAssociation.listView';
import { tourismAssociationSharedView } from './tourismAssociation.sharedView';

export const tourismAssociationViews = {
  table: tourismAssociationListView,
  detail: tourismAssociationSharedView(),
  edit: tourismAssociationSharedView(),
  new: tourismAssociationSharedView(),
};
