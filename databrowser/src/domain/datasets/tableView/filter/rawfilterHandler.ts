import { computed } from 'vue';
import { stringifyParameter, useApiQuery } from '../../../api';
import { parseFilterWithRegex } from './parser/parseFilterWithRegex';
import { Rawfilter } from './types';

export const useRawfilterHandler = () => {
  const { updateApiParameterValue, useApiParameter } = useApiQuery();
  const currentRawfilter = useApiParameter('rawfilter');

  const rawfilters = computed<Rawfilter[]>(() =>
    parseRawfilter(stringifyParameter(currentRawfilter.value))
  );

  const updateRawfilters = (updatedFilters: Rawfilter[]) => {
    const filterValues = updatedFilters.reduce<string[]>((prev, curr) => {
      if (
        curr.operator !== 'isnull' &&
        curr.operator !== 'isnotnull' &&
        (curr.value === '' || curr.value == null)
      ) {
        return prev;
      }

      switch (curr.operator) {
        case 'eq':
          return [...prev, `eq(${curr.field},'${curr.value}')`];
        case 'ne':
          return [...prev, `ne(${curr.field},'${curr.value}')`];
        case 'gt':
          return [...prev, `gt(${curr.field},'${curr.value}')`];
        case 'ge':
          return [...prev, `ge(${curr.field},'${curr.value}')`];
        case 'lt':
          return [...prev, `lt(${curr.field},'${curr.value}')`];
        case 'le':
          return [...prev, `le(${curr.field},'${curr.value}')`];
        case 'isnull':
          return [...prev, `isnull(${curr.field})`];
        case 'isnotnull':
          return [...prev, `isnotnull(${curr.field})`];
        case 'in':
          return [...prev, `in(${curr.field},'${curr.value}')`];
        case 'nin':
          return [...prev, `nin(${curr.field},'${curr.value}')`];
      }
    }, []);

    const rawfilter =
      filterValues.length > 0 ? `and(${filterValues.join(',')})` : undefined;

    updateApiParameterValue('rawfilter', rawfilter);
  };

  return { rawfilters, updateRawfilters };
};

export const parseRawfilter = (rawfilter?: string) =>
  parseFilterWithRegex(rawfilter);
