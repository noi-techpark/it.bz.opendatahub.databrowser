// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { representationListView } from './representation.listView';
import { representationSharedView } from './representation.sharedView';

export const representationViews = {
  table: representationListView,
  detail: representationSharedView(),
};
