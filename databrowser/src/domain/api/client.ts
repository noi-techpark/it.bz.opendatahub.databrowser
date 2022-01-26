import { useQuery, UseQueryOptions } from 'vue-query';
import { QueryFunction, QueryKey } from 'react-query/types/core';
import { computed, reactive } from 'vue';
import { useStore } from 'vuex';

export const useApi = <QueryFnData, Error, Data>(
  queryKey: QueryKey,
  fetcher: QueryFunction<QueryFnData>,
  options?: Omit<
    UseQueryOptions<QueryFnData, Error, Data, QueryKey>,
    'queryKey' | 'queryFn'
  >
) => {
  const store = useStore();
  const authReady = computed(() => store.getters['auth/ready']);

  const reactiveOptions = reactive({
    enabled: authReady,
    keepPreviousData: true,
    retry: false,
    ...options,
  });

  const result = useQuery<QueryFnData, Error, Data>(
    queryKey,
    fetcher,
    // Being reactive, the options must be casted to any in order to be accepted
    reactiveOptions as any
  );

  return result;
};
