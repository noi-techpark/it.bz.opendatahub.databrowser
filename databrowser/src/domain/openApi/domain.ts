// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { withOdhBaseUrl } from '../../config/utils';
import { KnownDomainsWithOpenApiDocument } from './types';

export const knownDomainsWithOpenApiDocument = {
  tourism: {
    description: 'Open Data Hub Tourism API',
    documentUrl: withOdhBaseUrl('/json/swagger.json'),
    baseUrl: withOdhBaseUrl(''),
  },
  mobility: {
    description: 'Open Data Hub Mobility API',
    documentUrl: 'https://mobility.api.opendatahub.com/v2/apispec',
    baseUrl: 'https://mobility.api.opendatahub.com',
  },
};

const domainKeys = new Set(Object.keys(knownDomainsWithOpenApiDocument));

export const domainIsKnownToHaveOpenApiDocument = (
  s: string
): s is KnownDomainsWithOpenApiDocument => domainKeys.has(s);
