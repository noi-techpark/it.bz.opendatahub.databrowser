// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { stringifyParameter } from '../api';
import { domainIsKnownToHaveOpenApiDocument } from '../openApi';

export const computeCurrentDomain = (
  domainFromRoutingParam: string | string[]
) => {
  if (domainFromRoutingParam == null) {
    return 'no-dataset-domain-in-url';
  }
  const routeFromParams = stringifyParameter(domainFromRoutingParam);
  return domainIsKnownToHaveOpenApiDocument(routeFromParams)
    ? routeFromParams
    : 'unknown';
};
