import { useQuery, UseQueryOptions } from 'vue-query';
import { QueryFunction, QueryKey } from 'react-query/types/core';

export const useApi = <QueryFnData, Error, Data>(
  queryKey: QueryKey,
  fetcher: QueryFunction<QueryFnData>,
  options?: Omit<
    UseQueryOptions<QueryFnData, Error, Data, QueryKey>,
    'queryKey' | 'queryFn'
  >
) => {
  const result = useQuery<QueryFnData, Error, Data>(queryKey, fetcher, {
    enabled: true,
    keepPreviousData: true,
    retry: false,
    ...options,
  });

  return result;
};
