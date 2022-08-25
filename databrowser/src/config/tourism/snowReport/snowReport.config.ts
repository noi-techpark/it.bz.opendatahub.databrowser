import { DatasetConfig } from '../../../domain/datasetConfig/types';
import { domains } from '../../../domain/openApi';
import { snowReportDescription } from './snowReport.description';
import { snowReportOperations } from './snowReport.operations';
import { snowReportViews } from './snowReport.views';
import { snowReportRoute } from './snowReport.route';

export const snowReportConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: domains.tourism.baseUrl,
  route: snowReportRoute,
  description: snowReportDescription,
  views: snowReportViews,
  operations: snowReportOperations,
};
