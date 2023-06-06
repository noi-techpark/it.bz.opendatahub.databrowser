// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { municipalityListView } from './municipality.listView';
import { municipalitySharedView } from './municipality.sharedView';

export const municipalityViews = {
  table: municipalityListView,
  detail: municipalitySharedView(),
  edit: municipalitySharedView(),
  new: municipalitySharedView(),
};
