// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import {
  QueryFunction,
  UseQueryOptions,
  useMutation,
  useQuery,
} from '@tanstack/vue-query';
import { MaybeRef, computed, readonly, toValue } from 'vue';
import { axiosWithMaybeAuth } from './apiAuth';

export const useApiRead = <TQueryFnData = unknown, TData = TQueryFnData>(
  url: MaybeRef<string | undefined>,
  options?: UseQueryOptions<TQueryFnData, Error, TData, TQueryFnData> & {
    withAuth?: boolean;
  }
) => {
  // Compute query key from url
  const queryKey = readonly(
    computed<(string | undefined)[]>(() => [toValue(url)])
  );

  // Create query function using axios
  const queryFn: QueryFunction<TQueryFnData, readonly unknown[]> = async ({
    queryKey: [url],
  }) => {
    const axiosInstance = await axiosWithMaybeAuth(options?.withAuth ?? false);
    return axiosInstance
      .get<TQueryFnData>(url as string)
      .then((response) => response.data);
  };

  // Run query
  return useQuery({ retry: 1, ...options, queryKey, queryFn });
};

export const useApiMutate = (
  url: MaybeRef<string | undefined>,
  options?: {
    method: MaybeRef<'post' | 'put' | 'patch' | 'delete'>;
  }
) => {
  const result = useMutation({
    mutationFn: async (requestData: unknown) => {
      const axiosInstance = await axiosWithMaybeAuth(true);
      return axiosInstance
        .request({
          url: toValue(url),
          method: toValue(options?.method),
          data: requestData,
        })
        .then((response) => response.data);
    },
  });
  return result;
};

export const useAxiosFileDownloader = () => {
  return {
    download: async (url: string) => {
      const axios = await axiosWithMaybeAuth(true);
      const response = await axios.get(url);

      const blob = new Blob([JSON.stringify(response.data, null, 2)], {
        type: 'application/json',
      });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'dataset.json';
      link.click();
      URL.revokeObjectURL(link.href);
      link.remove();
    },
  };
};
