import { QueryParameterValue } from './types';

export const stringifyParameter = (value: QueryParameterValue): string => {
  if (value === undefined) {
    return '';
  }
  if (value === null) {
    return 'null';
  }

  return Array.isArray(value) ? value.join(',') : value;
};
