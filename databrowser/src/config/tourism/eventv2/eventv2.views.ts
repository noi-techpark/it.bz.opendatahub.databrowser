// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { eventv2ListView } from './eventv2.listView';
import { eventv2SharedView } from './eventv2.sharedView';

export const eventv2Views = {
  table: eventv2ListView,
  detail: eventv2SharedView(),
  edit: eventv2SharedView(),
  new: eventv2SharedView(),
};
