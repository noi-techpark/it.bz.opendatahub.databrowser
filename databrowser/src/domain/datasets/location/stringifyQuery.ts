// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

/**
 * Converts a route query value as provided by vue-query to a string.
 *
 * Special care is taken for array values, which are serialized according to the
 * OpenAPI specification. See https://swagger.io/docs/specification/serialization/
 *
 * @param value The value to stringify.
 * @param arraySerializer The serializer to use for array values, defaults to commaDelimited.
 * @returns The stringified value.
 */
export const stringifyQueryValue = (
  value: string | null | (string | null)[] | undefined,
  arraySerializer:
    | 'commaDelimited'
    | 'spaceDelimited'
    | 'pipeDelimited' = 'commaDelimited'
): string | null | undefined => {
  if (value == null) {
    return value;
  }

  if (!Array.isArray(value)) {
    return value as string | null | undefined;
  }

  switch (arraySerializer) {
    case 'commaDelimited':
      return value.join(',');
    case 'spaceDelimited':
      return value.join(' ');
    case 'pipeDelimited':
      return value.join('|');
  }
};

/**
 * Converts a route query object as provided by vue-query to an object that contains
 * the URI encoded string representation of the query and an object with its parts,
 * where all keys and values are strings.
 *
 * Special care is taken for array values, which are serialized according to the
 * OpenAPI specification. See https://swagger.io/docs/specification/serialization/
 *
 * @param query The query object to stringify.
 * @param arraySerializer The serializer to use for array values, defaults to commaDelimited.
 * @returns An object with the string representation of the query and its parts.
 */
export const stringifyRouteQuery = (
  query: Record<string, string | null | (string | null)[]> | undefined,
  arraySerializer:
    | 'commaDelimited'
    | 'spaceDelimited'
    | 'pipeDelimited'
    | 'exploded' = 'commaDelimited'
): Record<string, string> => {
  if (query == null) {
    return {};
  }

  // Extract the key and value from each query part
  return Object.entries(query).reduce<Record<string, string>>(
    (prev, [key, value]) => {
      // If the value is null, we need to set it to an empty string, because
      // otherwise the query string would contain a key without a value, which
      // is not allowed.
      if (value === null) {
        return { ...prev, [key]: '' };
      }

      // If the value is not an array, we can simply stringify it
      if (!Array.isArray(value)) {
        const stringifiedValue = stringifyQueryValue(value);
        // Cast to string is correct, because we know that the value is neither an array nor null
        return { ...prev, [key]: stringifiedValue as string };
      }

      // If the value is an array, we need to serialize it
      if (arraySerializer !== 'exploded') {
        const stringifiedValue = stringifyQueryValue(value, arraySerializer);
        // Cast to string is correct, because we know that the value is neither an array nor null
        return { ...prev, [key]: stringifiedValue as string };
      }

      // If the value is an array and the array serializer is set to exploded,
      // we need to create a separate query part for each array element
      // For example, if the query is { key: ['value1', 'value2'] }, the
      // stringified query would be 'key=value1&key=value2'
      // Since we already have the key, we only need to add the exploded values,
      // separated by the key
      const stringifiedValue = value.join(`&${key}=`);
      return { ...prev, [key]: stringifiedValue };
    },
    {}
  );
};
