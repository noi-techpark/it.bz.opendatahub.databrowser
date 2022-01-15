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
export const useAxiosFetcher =
  () =>
  async ({ queryKey: [url] }: any): Promise<AxiosResponse> => {
    const axios = inject<AxiosInstance>('axios')!;
    return await axios.get(url);
  };
