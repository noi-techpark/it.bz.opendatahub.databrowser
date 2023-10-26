// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useQuery, UseQueryOptions } from 'vue-query';
import { computed, shallowReactive } from 'vue';
import { useAuth } from '../../auth/store/auth';

export const useApiRead = <
  TResponseData = unknown,
  TError = unknown,
  TData = TResponseData
>(
  queryOptions: UseQueryOptions<TResponseData, TError, TData>
) => {
  const auth = useAuth();
  const isReady = computed(() => auth.ready);

  const reactiveOptions = shallowReactive({
    enabled: isReady,
    keepPreviousData: true,
    retry: false,
    // Set cacheTime to 0, otherwise there are sometimes queryKey errors
    cacheTime: 0,
    structuralSharing: false,
    ...queryOptions,
  });

  const apiResult = useQuery(reactiveOptions);

  const isStartOrFetch = computed(
    () =>
      (!apiResult.isSuccess.value && !apiResult.isError.value) ||
      apiResult.isFetching.value
  );

  return { ...apiResult, isStartOrFetch };
};
