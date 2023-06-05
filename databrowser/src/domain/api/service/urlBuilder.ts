// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { ApiParameters, ParameterValue } from './types';

const concatParameters = (
  name: string,
  parameterValue?: ParameterValue
): string[] => {
  if (parameterValue === undefined) {
    return [];
  }

  const params = Array.isArray(parameterValue)
    ? parameterValue
    : [parameterValue];
  return params.map((value) => `${name}=${value}`);
};

export const buildUrlQuery = (
  apiParameters?: ApiParameters,
  firstChar = ''
): string => {
  if (apiParameters == null) {
    return '';
  }

  const queryParams = Object.keys(apiParameters).reduce((prev, filterName) => {
    const parameterValue = apiParameters[filterName];
    return [...prev, ...concatParameters(filterName, parameterValue)];
  }, [] as string[]);

  return queryParams.length > 0 ? firstChar + queryParams.join('&') : '';
};
