import { snowReportListView } from './snowReport.listView';
import { snowReportSharedView } from './snowReport.sharedView';

export const snowReportViews = {
  table: snowReportListView,
  detail: snowReportSharedView(),
  edit: snowReportSharedView(),
  new: snowReportSharedView(),
};
