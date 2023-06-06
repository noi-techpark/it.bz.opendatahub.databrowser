// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { snowReportListView } from './snowReport.listView';
import { snowReportSharedView } from './snowReport.sharedView';

export const snowReportViews = {
  table: snowReportListView,
  detail: snowReportSharedView(),
  edit: snowReportSharedView(),
  new: snowReportSharedView(),
};
