import { computed, Ref } from 'vue';
import { useVueFuse } from 'vue-fuse';
import { SelectOption } from './types';

export const useSearch = (options: Ref<SelectOption[]>) => {
  const { search: searchTerm, results: fuseResults } = useVueFuse(
    options.value,
    {
      keys: ['label'],
      threshold: 0.2,
      ignoreLocation: true,
      shouldSort: false,
    }
  );

  const searchResults = computed(() =>
    searchTerm.value.length === 0 ? options.value : fuseResults.value
  );

  return {
    searchTerm,
    searchResults,
  };
};
