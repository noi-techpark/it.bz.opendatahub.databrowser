// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { BaseFilter } from '../types';

export const buildMobilityFilterValues = (updatedFilters: BaseFilter[]) =>
  updatedFilters.reduce<string[]>((prev, curr) => {
    if (curr.value === '' || curr.value == null) {
      return prev;
    }

    const value = toMobilityFilterValue(curr);

    if (value === '' || value == null) {
      return prev;
    }

    switch (curr.operator) {
      case 'eq':
        return [...prev, `${curr.propertyPath}.eq.${value}`];
      case 'neq':
        return [...prev, `${curr.propertyPath}.neq.${value}`];
      case 'gt':
        return [...prev, `${curr.propertyPath}.gt.${value}`];
      case 'gteq':
        return [...prev, `${curr.propertyPath}.gteq.${value}`];
      case 'lt':
        return [...prev, `${curr.propertyPath}.lt.${value}`];
      case 'lteq':
        return [...prev, `${curr.propertyPath}.lteq.${value}`];
      case 'in':
        return [...prev, `${curr.propertyPath}.in.(${value})`];
      case 'nin':
        return [...prev, `${curr.propertyPath}.nin.(${value})`];
      case 're':
        return [...prev, `${curr.propertyPath}.re.${value}`];
      case 'ire':
        return [...prev, `${curr.propertyPath}.ire.${value}`];
      case 'nre':
        return [...prev, `${curr.propertyPath}.nre.${value}`];
      case 'nire':
        return [...prev, `${curr.propertyPath}.nire.${value}`];
      case 'bbi':
        return [...prev, `${curr.propertyPath}.bbi.(${value})`];
      case 'bbc':
        return [...prev, `${curr.propertyPath}.bbc.(${value})`];
      default:
        return prev;
    }
  }, []);

// We need to surround the filter value with double quotes only if it is a string.
// If its a string, we need to further check if it can be converted to a number
// or boolean. If so, no double quotes must be added.
const toMobilityFilterValue = ({ operator, value }: BaseFilter) => {
  if (typeof value !== 'string') {
    return value;
  }

  const number = Number(value);
  if (!isNaN(number)) {
    return number;
  }

  const lowerCasedValue = value.toLowerCase();
  if (lowerCasedValue === 'true' || lowerCasedValue === 'false') {
    return value;
  }

  if (operator === 'bbi' || operator === 'bbc') {
    return `${value}`;
  }

  return `"${value}"`;
};
