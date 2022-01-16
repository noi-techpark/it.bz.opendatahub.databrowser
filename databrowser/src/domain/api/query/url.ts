import { reactive, watch } from 'vue';
import { useApiQuery } from '../../../lib/apiQuery/apiQueryHandler';
import { buildQueryFilter } from '../fetcher/list';

export const useUrl = (baseUrl?: string) => {
  const apiQuery = useApiQuery();
  const fetchUrl = reactive(['']);

  watch(
    () => apiQuery.currentQueryParameters.value,
    (queryParameters) => {
      const queryFilters = buildQueryFilter(queryParameters, '?');
      fetchUrl[0] = `${baseUrl}${queryFilters}`;
    },
    { immediate: true }
  );

  return fetchUrl;
};
