import { snowReportDetailView } from './snowReport.detailView';
import { snowReportEditView } from './snowReport.editView';
import { snowReportListView } from './snowReport.listView';

export const snowReportViews = {
  table: snowReportListView,
  detail: snowReportDetailView,
  edit: snowReportEditView,
};
