import { snowReportDetailView } from './snowReport.detailView';
import { snowReportEditView } from './snowReport.editView';
import { snowReportListView } from './snowReport.listView';
import { snowReportQuickView } from './snowReport.quickView';

export const snowReportViews = {
  table: snowReportListView,
  detail: snowReportDetailView,
  quick: snowReportQuickView,
  edit: snowReportEditView,
};
