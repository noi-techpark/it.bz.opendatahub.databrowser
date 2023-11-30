// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useDatasetQueryStore } from '../../../datasetConfig/store/datasetQueryStore';
import { DatasetDomain } from '../../../datasetConfig/types';
import { useDatasetBaseInfoStore } from '../../config/store/datasetBaseInfoStore';
import { mobilityParseFilterWithRegex } from './parser/mobilityParseFilterWithRegex';
import { tourismParseFilterWithRegex } from './parser/tourismParseFilterWithRegex';
import { Rawfilter } from './types';

export const useRawfilterHandler = () => {
  const { datasetDomain } = storeToRefs(useDatasetBaseInfoStore());

  const rawFilter = useDatasetQueryStore().handle('rawfilter');
  const whereFilter = useDatasetQueryStore().handle('where');

  const rawfilters = computed<Rawfilter[]>(() =>
    parseRawfilter(datasetDomain.value, whereFilter.value)
  );

  const updateRawfilters = (updatedFilters: Rawfilter[]) => {
    if (datasetDomain.value === 'tourism') {
      const filterValues = computeFilterValuesForTourism(updatedFilters);
      rawFilter.value =
        filterValues.length > 0 ? `and(${filterValues.join(',')})` : undefined;
    }
    if (datasetDomain.value === 'mobility') {
      const filterValues = computeFilterValuesForMobility(updatedFilters);
      whereFilter.value =
        filterValues.length > 0 ? `and(${filterValues.join(',')})` : undefined;
    }
  };

  return { rawfilters, updateRawfilters };
};

export const parseRawfilter = (
  datasetDomain: DatasetDomain | undefined,
  rawfilter?: string
): Rawfilter[] => {
  if (datasetDomain === 'tourism') {
    return tourismParseFilterWithRegex(rawfilter);
  }
  if (datasetDomain === 'mobility') {
    return mobilityParseFilterWithRegex(rawfilter);
  }
  console.error('Unknown datasetDomain', datasetDomain);
  return [];
};

const computeFilterValuesForTourism = (updatedFilters: Rawfilter[]) =>
  updatedFilters.reduce<string[]>((prev, curr) => {
    if (
      curr.operator !== 'isnull' &&
      curr.operator !== 'isnotnull' &&
      (curr.value === '' || curr.value == null)
    ) {
      return prev;
    }

    switch (curr.operator) {
      case 'eq':
        return [...prev, `eq(${curr.propertyPath},'${curr.value}')`];
      case 'ne':
        return [...prev, `ne(${curr.propertyPath},'${curr.value}')`];
      case 'gt':
        return [...prev, `gt(${curr.propertyPath},'${curr.value}')`];
      case 'ge':
        return [...prev, `ge(${curr.propertyPath},'${curr.value}')`];
      case 'lt':
        return [...prev, `lt(${curr.propertyPath},'${curr.value}')`];
      case 'le':
        return [...prev, `le(${curr.propertyPath},'${curr.value}')`];
      case 'isnull':
        return [...prev, `isnull(${curr.propertyPath})`];
      case 'isnotnull':
        return [...prev, `isnotnull(${curr.propertyPath})`];
      case 'in':
        return [...prev, `in(${curr.propertyPath}.[*],'${curr.value}')`];
      case 'nin':
        return [...prev, `nin(${curr.propertyPath}.[*],'${curr.value}')`];
      case 'like':
        return [...prev, `like(${curr.propertyPath},'${curr.value}')`];
      case 'likein':
        return [...prev, `likein(${curr.propertyPath}.[*],'${curr.value}')`];
      default:
        return prev;
    }
  }, []);

const computeFilterValuesForMobility = (updatedFilters: Rawfilter[]) =>
  updatedFilters.reduce<string[]>((prev, curr) => {
    const value = toMobilityFilterValue(curr);

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
const toMobilityFilterValue = ({ operator, value }: Rawfilter) => {
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
