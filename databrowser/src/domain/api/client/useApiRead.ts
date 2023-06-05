// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useQuery, UseQueryOptions } from 'vue-query';
import { computed, reactive, Ref, shallowReactive, watch } from 'vue';
import { useAuth } from '../../auth/store/auth';
import { useAxiosFetcher } from './fetcher/axios';
import { useUrlQuery } from '../service/urlQueryHandler';
import { AxiosResponse } from 'axios';
import { useDatasetConfigStore } from '../../datasetConfig/store/datasetConfigStore';

const useAsQueryKey = (queryKey: Ref<string>) => {
  const result = reactive(['']);

  watch(
    () => queryKey.value,
    (key) => (result[0] = key),
    { immediate: true }
  );

  return result;
};

export const useApiReadForCurrentDataset = <
  T = unknown,
  E = unknown
>(options?: {
  resultMapper?: (data: T) => T;
  withQueryParameters?: boolean;
}) => {
  const { resultMapper, withQueryParameters = true } = options ?? {};
  const datasetConfigStore = useDatasetConfigStore();
  const url = computed(() => datasetConfigStore.currentPath ?? '');
  const fetchUrl = withQueryParameters
    ? useUrlQuery().useUrlWithQueryParameters(url)
    : url;
  const queryKey = useAsQueryKey(fetchUrl);
  const queryFn = useAxiosFetcher<T, E>();
  const select = (axiosResponse: AxiosResponse<T>): T => {
    const data = axiosResponse.data;
    return resultMapper != null ? resultMapper(data) : data;
  };

  const apiResult = useApiRead<AxiosResponse<T>, E, T>({
    queryKey,
    queryFn,
    select,
  });
  return { ...apiResult, url: fetchUrl };
};

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
