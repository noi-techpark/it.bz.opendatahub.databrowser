// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { stringifyQuery } from 'vue-router';
import {
  DatasetId,
  DatasetPath,
  DatasetQuery,
} from '../../datasetConfig/types';
import {
  DomainWithOpenApiDocument,
  domainWithOpenApiDocument,
} from '../../openApi';

export const computeApiBaseUrl = (domain: DomainWithOpenApiDocument) =>
  domainWithOpenApiDocument[domain].baseUrl;

export const computeApiPath = (path: DatasetPath) => path.join('/');

export const computeApiFullUrl = (
  domain: DomainWithOpenApiDocument,
  path: DatasetPath,
  id: DatasetId | undefined,
  query: DatasetQuery | undefined
) => {
  const baseUrl = computeApiBaseUrl(domain);
  const pathString = computeApiPath(path);
  const idString = id == null ? '' : `/${id}`;
  const queryString = query == null ? '' : `?${stringifyQuery(query.raw)}`;
  return `${baseUrl}/${pathString}${idString}${queryString}`;
};
