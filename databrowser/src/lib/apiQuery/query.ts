import { ParameterValue } from './types';

export const stringifyParameter = (value: ParameterValue): string => {
  if (value === undefined) {
    return '';
  }
  if (value === null) {
    return 'null';
  }

  return Array.isArray(value) ? value.join(',') : value;
};
