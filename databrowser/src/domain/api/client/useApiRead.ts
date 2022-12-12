import { useQuery, UseQueryOptions } from 'vue-query';
import { computed, reactive, Ref, watch } from 'vue';
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

export const useApiReadForCurrentDataset = (options?: {
  resultMapper?: (data: any) => any;
  withQueryParameters?: boolean;
  skipAuth?: boolean;
}) => {
  const { resultMapper, withQueryParameters = true } = options ?? {};
  const datasetConfigStore = useDatasetConfigStore();
  const url = computed(() => datasetConfigStore.currentPath ?? '');
  const fetchUrl = withQueryParameters
    ? useUrlQuery().useUrlWithQueryParameters(url)
    : url;
  const queryKey = useAsQueryKey(fetchUrl);
  const queryFn = useAxiosFetcher();
  const select = (axiosResponse: unknown): unknown => {
    const data = (axiosResponse as AxiosResponse).data;
    return resultMapper != null ? resultMapper(data) : data;
  };

  const apiResult = useApiRead(
    { queryKey, queryFn, select },
    options?.skipAuth || false
  );
  return { ...apiResult, url: fetchUrl };
};

export const useApiRead = (queryOptions: UseQueryOptions, skipAuth = false) => {
  const auth = skipAuth ? null : useAuth();
  const isReady = skipAuth ? true : computed(() => auth?.ready);

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
