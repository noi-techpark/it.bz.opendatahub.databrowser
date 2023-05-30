import {
  FilterOperator,
  Rawfilter,
  RawfilterParser,
  isFilterOperator,
} from '../types';

// This regex is used to parse the rawfilter parameter from the url.
//
// See https://github.com/noi-techpark/odh-docs/wiki/Using-rawfilter-and-rawsort-on-the-Tourism-Api#rawfilter
// for more information about the rawfilter parameter.
//
// ------------------------------------------------------------
//
//                 !!!! IMPORTANT !!!!
//
// The regex is not perfect, in some cases it matches invalid values like "isnull(field, value)"
// but that kind of rawfilter value causes the backend to fail with a 500 error, so this should
// not be a huge problem.
//
// Another drawback of the regex is that it does not support deep nested and / or conditions.
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
// - eq(field, value)
// - ne(field, value)
// - gt(field, value)
// - lt(field, value)
// - ge(field, value)
// - le(field, value)
// - isnull(field)
// - isnotnull(field)
// - in(field, value)
// - nin(field, value)
//
// Where:
// - operator is one of the above: eq, ne, gt, lt, ge, le, isnull, isnotnull, in, nin
//
// - field is a string:
//   - it can contain dots (.) to target nested fields
//   - it can contain brackets ([]) -- with optional star ([*]) -- to target all array elements
//   - it can contain brackets with a number (e.g. [0]) to target a specific array element
//
// - value is:
//   - boolean
//   - number
//   - empty brackets ([])
//   - string surrounded by single or double quotes
//   - undefined for isnull and isnotnull operators
const filterRegex =
  /(?<operator>eq|ne|gt|lt|ge|le|isnull|isnotnull|in|nin)\((?<field>\w+(\.(\w+|\[(\*|\d+)?\]))*)(,\s*(?<value>true|false|\d+|\[\]|'(?:[^']|'')*'|"(?:[^"]|"")*"))?\)/g;

export const parseFilterWithRegex: RawfilterParser = (rawfilter) => {
  // If rawfilter is undefined, return an empty array.
  if (rawfilter == undefined) {
    return [];
  }

  // If rawfilter does not match the filterRegex, return an empty array.
  const matches = rawfilter.matchAll(filterRegex);
  if (matches == null) {
    return [];
  }

  const soho = Array.from(matches, (m) => m.groups)
    .filter((g) => g != null && g.field != null && isFilterOperator(g.operator))
    .map<Rawfilter>((g) => {
      const field = convertToField(g!.field);
      const operator = g!.operator as FilterOperator;
      const value = convertToValue(g!.value);

      return { field, operator, value };
    });

  return soho;
};

const convertToField = (field: string) => {
  // Handle array fields for includes / not includes operators
  if (field.endsWith('.[*]')) {
    return field.substring(0, field.length - 4);
  }
  return field;
};

const convertToValue = (value: string | undefined) => {
  if (value === 'true') {
    return true;
  } else if (value === 'false') {
    return false;
  } else if (value === '[]') {
    return [];
  } else if (value === undefined) {
    return undefined;
  } else if (value.match(/^'(.*)'$/)) {
    return value.replace(/^'(.*)'$/, '$1');
  } else if (value.match(/^"(.*)"$/)) {
    return value.replace(/^"(.*)"$/, '$1');
  } else if (value.match(/^\d+$/)) {
    return Number(value);
  } else {
    return undefined;
  }
};
