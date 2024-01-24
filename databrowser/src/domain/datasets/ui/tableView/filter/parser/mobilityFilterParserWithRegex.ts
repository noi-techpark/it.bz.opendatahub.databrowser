// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import {
  FilterOperator,
  BaseFilter,
  StringFilterParser,
  isFilterOperator,
} from '../types';

// This regex is used to parse the where parameter from the Mobility API URL.
//
// ------------------------------------------------------------
//
//                 !!!! IMPORTANT !!!!
//
// The regex is not perfect, e.g. it does not support deep nested and / or conditions.
// Since this kind of nested filters are out of scope for the MVP, we can live with this.
//
// The backend uses a full CFG parser. Implementing the parser in the frontend as regex was a
// tradeoff between simplicity and download size. Parsers add a lot download volume to the
// frontend, e.g. chevrotain + custom lexer and parser definitions add ~ 60KB zipped).
//
// In the end, if we see that the regex is not enough, we can always implement the parser in the
// frontend using a library like chevrotain.
//
// ------------------------------------------------------------
//
// The regex matches the following:
// - propertyPath.eq.value
// - propertyPath.neq.value
// - propertyPath.gt.value
// - propertyPath.lt.value
// - propertyPath.gteq.value
// - propertyPath.lteq.value
// - propertyPath.re.value
// - propertyPath.ire.value
// - propertyPath.nre.value
// - propertyPath.nire.value
// - propertyPath.in.(value1,value2,...)
// - propertyPath.nin.(value1,value2,...)
// - propertyPath.bbi.(bounding box, e.g 11,46,12,47,4326 where the ordering inside the list is left-x, left-y, right-x, right-y and SRID (optional))
// - propertyPath.bbc.(bounding box, e.g 11,46,12,47,4326 where the ordering inside the list is left-x, left-y, right-x, right-y and SRID (optional))
//
// Where:
// - operator is one of the above: eq, neq, gt, lt, gteq, lteq, re, ire, nre, nire, in, nin, bbi, bbc
//   - eq: equal
//   - neq: not equal
//   - gt: greater than
//   - lt: lower than
//   - gteq: greater than or equal
//   - lteq: lower than or equal
//   - re: regular expression
//   - ire: case insensitive regular expression
//   - nre: negated regular expression
//   - nire: negated case insensitive regular expression
//   - in: in list
//   - nin: not in list
//   - bbi: bounding box intersects
//   - bbc: bounding box contains
//
// - propertyPath is a string, that must not contain the dot (.) character
//
// - value is:
//   - boolean
//   - number
//   - string surrounded by double quotes
const filterRegex =
  /(?<propertyPath>\w+)\.(?<operator>eq|neq|gt|lt|gteq|lteq|re|ire|nre|nire|in|nin|bbi|bbc)\.(?<value>true|false|\d+|"\w*"|\([\w.,]*\))/g;

export const mobilityParseFilterWithRegex: StringFilterParser = (
  filterString
) => {
  // If filterString is undefined, return an empty array.
  if (filterString == undefined) {
    return [];
  }

  // If filterString does not match the filterRegex, return an empty array.
  const matches = filterString.matchAll(filterRegex);
  if (matches == null) {
    return [];
  }

  const soho = Array.from(matches, (m) => m.groups)
    .filter(
      (g) => g != null && g.propertyPath != null && isFilterOperator(g.operator)
    )
    .map<BaseFilter>((g) => {
      const propertyPath = convertToPropertyPath(g!.propertyPath);
      const operator = g!.operator as FilterOperator;
      const value = convertToValue(g!.value);

      return { propertyPath: propertyPath, operator, value };
    });

  return soho;
};

const convertToPropertyPath = (propertyPath: string) => {
  return propertyPath;
};

const convertToValue = (value: string | undefined) => {
  if (value === 'true') {
    return true;
  } else if (value === 'false') {
    return false;
  } else if (value === undefined) {
    return undefined;
  } else if (value.match(/^"\w*"$/)) {
    return value.replace(/^"(\w*)"$/, '$1');
  } else if (value.match(/^\([\w.,]*\)$/)) {
    return value.replace(/^\(([\w.,]*)\)$/, '$1');
  } else if (value.match(/^\d+$/)) {
    return Number(value);
  } else {
    return undefined;
  }
};
