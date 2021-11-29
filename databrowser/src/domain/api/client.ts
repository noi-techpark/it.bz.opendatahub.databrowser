import { useQuery } from 'vue-query';
import { QueryFunction, QueryKey } from 'react-query/types/core';

export const useApi = <T, Q extends QueryKey>(
  queryKey: Q,
  fetcher: QueryFunction<T>
) => {
  const result = useQuery(queryKey, fetcher, {
    enabled: true,
    keepPreviousData: true,
    retry: false,
    // TODO: check if this comment and setting can be removed
    // Need to set cacheTime to 0, otherwise cached values will show up when the same
    // dataset is displayed again. This would not be much of an issue, the problem is
    // pagination, that is not synchronized together with cached data. There seems to
    // be no easy way to restore pagination data together with the data. Setting
    // cacheTime to 0 solves that problem by not caching at all.
    // cacheTime: 0,
  });

  return result;
};
