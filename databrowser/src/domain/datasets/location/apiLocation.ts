// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { stringifyQuery } from 'vue-router';
import {
  DatasetDomain,
  DatasetId,
  DatasetPath,
  DatasetQuery,
} from '../config/types';
import {
  domainIsKnownToHaveOpenApiDocument,
  domainWithOpenApiDocument,
} from '../../openApi';

export const computeApiBaseUrl = (domain: DatasetDomain) => {
  if (domainIsKnownToHaveOpenApiDocument(domain)) {
    return domainWithOpenApiDocument[domain].baseUrl;
  }
  console.error('Unknown domain, can not compute base URL', domain);
};

export const computeApiPath = (path: DatasetPath) => path.join('/');

export const computeApiFullUrl = (
  domain: DatasetDomain,
  path: DatasetPath,
  id: DatasetId | undefined,
  query: DatasetQuery | undefined
) => {
  const baseUrl = computeApiBaseUrl(domain);
  const pathString = computeApiPath(path);

  if (domain === 'tourism') {
    const idString = id == null ? '' : `/${id}`;
    const queryString = query == null ? '' : `?${stringifyQuery(query.raw)}`;
    return `${baseUrl}/${pathString}${idString}${queryString}`;
  }

  if (domain === 'mobility') {
    const enhancedQuery = query == null ? {} : { ...query.raw };
    if (id != null) {
      // TODO: handle case where "where" is already defined
      enhancedQuery['where'] = `and(scode.eq."${id}")`;
    }
    const queryString = `?${stringifyQuery(enhancedQuery)}`;
    const latest = id != null ? '/*/latest' : '';
    return `${baseUrl}/${pathString}${latest}${queryString}`;
  }

  // Default if domain is unknown
  const idString = id == null ? '' : `/${id}`;
  const queryString = query == null ? '' : `?${stringifyQuery(query.raw)}`;
  return `${baseUrl}/${pathString}${idString}${queryString}`;
};
