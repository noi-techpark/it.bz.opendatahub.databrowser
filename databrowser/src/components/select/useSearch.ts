// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useFuse } from '@vueuse/integrations/useFuse';
import { computed, ref, Ref } from 'vue';
import { SelectOption } from './types';

export const useSearch = (options: Ref<SelectOption[]>) => {
  const searchTerm = ref('');

  const { results } = useFuse(searchTerm, options, {
    fuseOptions: {
      keys: ['label'],
      threshold: 0.2,
      ignoreLocation: true,
      shouldSort: false,
    },
  });

  const searchResults = computed<SelectOption[]>(() =>
    results.value.length === 0
      ? options.value
      : results.value.map((r) => r.item)
  );

  return {
    searchTerm,
    searchResults,
  };
};
