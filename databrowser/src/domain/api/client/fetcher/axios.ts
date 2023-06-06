// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { AxiosInstance, AxiosResponse } from 'axios';
import { inject } from 'vue';

/**
 * Use Axios to build a fetcher function.
 *
 * Note that this function uses Vue3 inject to get the axios instance. Please
 * make sure that axios can be injected with the 'axios' key.
 *
 * @returns A function that, when invoked, fetches data from the given URL.
 */
export const useAxiosFetcher = <T = any, D = any>() => {
  const axios = inject<AxiosInstance>('axios')!;

  return async ({ queryKey: [url] }: any): Promise<AxiosResponse<T, D>> =>
    await axios.get(url);
};

export const useAxiosFileDownloader = () => {
  const axios = inject<AxiosInstance>('axios')!;

  return {
    download: async (url: string) => {
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
