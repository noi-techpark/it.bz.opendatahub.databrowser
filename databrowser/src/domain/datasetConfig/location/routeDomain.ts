// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { RouteDomain } from '../types';
import { domainIsKnownToHaveOpenApiDocument } from '../../openApi';
import { RouteLocationNormalizedLoaded } from 'vue-router';

export const computeRouteDomain = (
  route: RouteLocationNormalizedLoaded
): RouteDomain => {
  const domainCandidate = route.params.domain;
  if (domainCandidate == null || Array.isArray(domainCandidate)) {
    return 'no-dataset-domain-in-url';
  }
  return domainIsKnownToHaveOpenApiDocument(domainCandidate)
    ? domainCandidate
    : 'unknown';
};
