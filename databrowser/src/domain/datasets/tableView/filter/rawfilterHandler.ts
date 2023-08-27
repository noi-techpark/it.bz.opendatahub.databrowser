// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { computed } from 'vue';
// import { stringifyParameter, useApiParameterHandler } from '../../../api';
import { parseFilterWithRegex } from './parser/parseFilterWithRegex';
import { Rawfilter } from './types';
import { storeToRefs } from 'pinia';
import { useApiParameterStore } from '../../../api/service/apiParameterStore';

export const useRawfilterHandler = () => {
  // const { updateApiParameterValue, useApiParameter } = useApiParameterHandler();
  // const currentRawfilter = useApiParameter('rawfilter');
  const { currentApiParams } = storeToRefs(useApiParameterStore());

  const rawfilters = computed<Rawfilter[]>(() =>
    parseRawfilter(currentApiParams.value.rawfilter)
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
          return [...prev, `in(${curr.field}.[*],'${curr.value}')`];
        case 'nin':
          return [...prev, `nin(${curr.field}.[*],'${curr.value}')`];
        case 'like':
          return [...prev, `like(${curr.field},'${curr.value}')`];
        case 'likein':
          return [...prev, `likein(${curr.field}.[*],'${curr.value}')`];
      }
    }, []);

    // const rawfilter =
    //   filterValues.length > 0 ? `and(${filterValues.join(',')})` : undefined;
    // updateApiParameterValue('rawfilter', rawfilter);

    if (filterValues.length > 0) {
      currentApiParams.value['rawfilter'] = `and(${filterValues.join(',')})`;
    } else {
      delete currentApiParams.value['rawfilter'];
    }
  };

  return { rawfilters, updateRawfilters };
};

export const parseRawfilter = (rawfilter?: string) =>
  parseFilterWithRegex(rawfilter);
