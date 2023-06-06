// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { withOdhBaseUrl } from '../../config/utils';
import { SupportedDomains } from './types';

export const domains = {
  tourism: {
    description: 'Open Data Hub Tourism API',
    documentUrl: withOdhBaseUrl('/swagger/v1/swagger.json'),
    baseUrl: withOdhBaseUrl(''),
  },
  mobility: {
    description: 'Open Data Hub Mobility API',
    documentUrl: 'https://mobility.api.opendatahub.bz.it/v2/apispec',
    baseUrl: 'https://mobility.api.opendatahub.bz.it',
  },
};

export const domainKeys = new Set(Object.keys(domains));

export const isDomainKnown = (s: string): s is SupportedDomains =>
  domainKeys.has(s);
