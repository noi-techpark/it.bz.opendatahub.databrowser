import { useQuery, UseQueryOptions } from 'vue-query';
import { computed, reactive, Ref, watch } from 'vue';
import { useAuth } from '../../auth/store/auth';
import { useAxiosFetcher } from './fetcher/axios';
import { ViewConfig } from '../../viewConfig/types';
import { useUrlQuery } from '../service/urlQueryHandler';
import { AxiosResponse } from 'axios';

const useAsQueryKey = (queryKey: Ref<string>) => {
  const result = reactive(['']);

  watch(
    () => queryKey.value,
    (key) => (result[0] = key),
    { immediate: true }
  );

  return result;
};

export const useApiForViewConfig = (
  viewConfig: Ref<ViewConfig>,
  resultMapper?: (data: any) => any
) => {
  const url = computed(() => viewConfig.value.baseUrl + viewConfig.value.path);
  const urlWithQueryParams = useUrlQuery().useUrlWithQueryParameters(url);
  const queryKey = useAsQueryKey(urlWithQueryParams);
  const queryFn = useAxiosFetcher();
  const select = (axiosResponse: unknown): unknown => {
    const data = (axiosResponse as AxiosResponse).data;
    return resultMapper != null ? resultMapper(data) : data;
  };

  const apiResult = useApi({ queryKey, queryFn, select });
  return { ...apiResult, url: urlWithQueryParams };
};

export const useApi = (queryOptions: UseQueryOptions) => {
  const auth = useAuth();
  const isReady = computed(() => auth.ready);

  const reactiveOptions: UseQueryOptions = reactive({
    enabled: isReady,
    keepPreviousData: true,
    retry: false,
    // Set cacheTime to 0, otherwise there are sometimes queryKey errors
    cacheTime: 0,
    structuralSharing: false,
    ...queryOptions,
  });

  return useQuery(reactiveOptions);
};
