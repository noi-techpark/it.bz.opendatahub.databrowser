import { inject } from '@vue/runtime-core';
import { AxiosInstance, AxiosResponse } from 'axios';
import { useQuery } from 'vue-query';
import { UseQueryReturnType } from 'vue-query/lib/vue/useBaseQuery';

export type GetApiSpecResult<T> = UseQueryReturnType<AxiosResponse<T>, Error>;

export const useGetApiSpec = <T>(
  url: string,
  options = { immediateLoad: true }
): GetApiSpecResult<T> => {
  const axios = inject<AxiosInstance>('axios');

  if (axios != null) {
    const fetcher = async (): Promise<AxiosResponse<T>> => axios.get(url);

    return useQuery<AxiosResponse<T>, Error, AxiosResponse<T>>(url, fetcher, {
      enabled: options.immediateLoad,
    });
  }

  throw new Error('Injected axios instance is undefined');
};
