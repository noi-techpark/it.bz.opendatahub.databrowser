// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { stringifyQuery } from 'vue-router';
import { StringifiedRouteQuery } from './types';

/**
 * Converts a route query object as provided by vue-query to an object with its
 * string representation and its parts, where all keys and values are strings.
 *
 * The mapping to strings is done with the help of vue-router's stringifyQuery function.
 *
 * @param query The query object to stringify.
 * @returns An object with the string representation of the query and its parts.
 */
export const stringifyRouteQuery = (
  query: Record<string, string | null | (string | null)[]> | undefined
): StringifiedRouteQuery => {
  if (query == null) {
    return { asString: '', stringParts: {} };
  }

  // Stringify the query object using vue-router's stringifyQuery function
  const asString = stringifyQuery(query);

  // Split the stringified query into its parts
  const parts = asString.split('&');

  // Extract the key and value from each query part
  const stringParts = parts.reduce<Record<string, string>>(
    (prev, queryPart) => {
      const indexOfAssignment = queryPart.indexOf('=');
      const key = queryPart.slice(0, indexOfAssignment);
      const value = queryPart.slice(indexOfAssignment + 1);
      return { ...prev, [key]: value };
    },
    {}
  );

  return { asString, stringParts };
};

export const stringifyRouteQueryValue = (
  queryValue: string | null | (string | null)[] | undefined
): string => {
  if (queryValue == null) {
    return '';
  }

  const tmpQuery = { key: queryValue };

  const { stringParts } = stringifyRouteQuery(tmpQuery);

  return stringParts.key ?? '';
};
