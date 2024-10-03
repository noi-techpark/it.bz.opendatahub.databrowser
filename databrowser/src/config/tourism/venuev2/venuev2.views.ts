// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { venuev2ListView } from './venuev2.listView';
import { venuev2SharedView } from './venuev2.sharedView';

export const venuev2Views = {
  table: venuev2ListView,
  detail: venuev2SharedView(),
  edit: venuev2SharedView(),
  new: venuev2SharedView(),
};
