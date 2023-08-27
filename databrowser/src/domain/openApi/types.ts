// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { OpenAPIV3 } from 'openapi-types';
import { knownDomainsWithOpenApiDocument } from './domain';

// Disable typescript error for next line, the export OpenApi is used
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export import OpenApi = OpenAPIV3;

export interface DocumentState {
  loading: boolean;
  loaded: boolean;
  error: Error | null;
}

export type KnownDomainsWithOpenApiDocument =
  keyof typeof knownDomainsWithOpenApiDocument;

export const isKnownDomainWithOpenApiDocument = (
  domain: string
): domain is KnownDomainsWithOpenApiDocument =>
  Object.keys(knownDomainsWithOpenApiDocument).includes(domain);
