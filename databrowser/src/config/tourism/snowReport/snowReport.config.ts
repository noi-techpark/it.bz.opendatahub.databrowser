// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetConfig } from '../../../domain/datasetConfig/types';
import { knownDomainsWithOpenApiDocument } from '../../../domain/openApi';
import { snowReportDescription } from './snowReport.description';
import { snowReportOperations } from './snowReport.operations';
import { snowReportViews } from './snowReport.views';
import { snowReportRoute } from './snowReport.route';

export const snowReportConfig: DatasetConfig = {
  source: 'embedded',
  baseUrl: knownDomainsWithOpenApiDocument.tourism.baseUrl,
  route: snowReportRoute,
  description: snowReportDescription,
  views: snowReportViews,
  operations: snowReportOperations,
};
