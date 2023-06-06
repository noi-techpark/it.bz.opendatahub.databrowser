// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { experienceAreaListView } from './experienceArea.listView';
import { experienceAreaSharedView } from './experienceArea.sharedView';

export const experienceAreaViews = {
  table: experienceAreaListView,
  detail: experienceAreaSharedView(),
  edit: experienceAreaSharedView(),
  new: experienceAreaSharedView(),
};
