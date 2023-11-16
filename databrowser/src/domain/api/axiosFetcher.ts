// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  MaybeRef,
  computed,
  inject,
  ref,
  shallowRef,
  toValue,
  watch,
} from 'vue';
import { useAuth } from '../auth/store/auth';
import { storeToRefs } from 'pinia';

type BeforeFetchFn<T = unknown> = (
  config: AxiosRequestConfig<T>
) => Promise<AxiosRequestConfig<T>> | AxiosRequestConfig<T>;

type AfterFetchFn<ReturnData = unknown, ResponseData = ReturnData> = (
  ctx: AxiosResponse<ResponseData>
) => Promise<ReturnData> | ReturnData;

interface OnFetchErrorContext<T = unknown, E = unknown> {
  error: E;
  response: AxiosResponse<T>;
  data: T | null;
}

interface UseAxiosFetchOptions<
  ReturnData = unknown,
  ResponseData = ReturnData,
  RequestData = unknown
> {
  method?: MaybeRef<'get' | 'post' | 'put' | 'patch' | 'delete'>;
  payload?: MaybeRef<RequestData | undefined>;
  type?: string;
  beforeFetch?: BeforeFetchFn<RequestData>;
  afterFetch?: AfterFetchFn<ReturnData, ResponseData>;
  onFetchError?: (ctx: OnFetchErrorContext) => void;
  instance?: AxiosInstance;
  enabled?: MaybeRef<boolean>;
}

export const useBaseAxiosMutate = <
  ReturnData = unknown,
  ResponseData = ReturnData,
  RequestData = unknown
>(
  url: MaybeRef<string | undefined>,
  options?: Omit<
    UseAxiosFetchOptions<ReturnData, ResponseData, RequestData>,
    'enabled'
  >
) => {
  const enabled = ref(false);
  const payload = ref<RequestData>();

  const mutate = (requestData: RequestData) => {
    payload.value = requestData;
    enabled.value = true;
  };

  const result = useBaseAxiosFetch<ReturnData, ResponseData, RequestData>(url, {
    ...options,
    enabled,
    payload,
  });

  watch(result.isFinished, () => (enabled.value = false), { immediate: true });

  return { ...result, mutate };
};

/**
 * Base data fetcher using axios.
 *
 * When the url changes, the fetcher is re-invoked.
 *
 * @param url The url to fetch.
 * @param options The options to use for the fetcher.
 */
// TODO: maybe rename to useBaseFetch? on the other side, many types are from axios
export const useBaseAxiosFetch = <
  ReturnData = unknown,
  ResponseData = ReturnData,
  RequestData = unknown
>(
  url: MaybeRef<string | undefined>,
  options?: UseAxiosFetchOptions<ReturnData, ResponseData, RequestData>
) => {
  const {
    method = 'get',
    payload = undefined,
    type = 'application/json',
    beforeFetch = (config) => config,
    afterFetch = (ctx) => ctx.data as unknown as ReturnData,
    onFetchError = (ctx) => ctx,
    instance: axiosInstance = axios.create(),
    enabled,
  } = options ??
  ({} as UseAxiosFetchOptions<ReturnData, ResponseData, RequestData>);

  // Need to cast type for data in order to make it work with shallowRef
  const data = shallowRef<ReturnData | null>(null);
  const responseData = shallowRef<ResponseData | null>(null);
  const error = shallowRef<unknown>(null);
  const isLoading = ref(false);
  const isFinished = ref(false);
  const urlInternal = ref<string>();

  watch(
    [() => toValue(enabled), () => toValue(url), () => toValue(method)],
    async ([enabledValue, urlValue, methodValue]) => {
      // Do nothing if request is not enabled
      if (enabledValue === false) {
        console.log('Fetch is disabled');

        return;
      }

      if (urlValue == null) {
        console.debug('Fetch url is undefined, not fetching');
        return;
      }

      // Reset state before fetching
      error.value = null;
      isLoading.value = true;
      isFinished.value = false;

      // Compute config
      const config = await beforeFetch({
        url: urlValue,
        method: methodValue,
        data: toValue(payload),
        headers: {
          Accept: type,
        },
      });

      // Set urlInternal because it may be overridden by beforeFetch
      urlInternal.value = config.url;

      await axiosInstance
        .request<ResponseData>(config)
        .then((response) => {
          responseData.value = response.data;
          return response;
        })
        .then(afterFetch)
        .then((responseData) => (data.value = responseData))
        .catch((err) => {
          data.value = null;
          error.value = err;
          onFetchError(err);
        })
        .finally(() => {
          isLoading.value = false;
          isFinished.value = true;
        });
    },
    { immediate: true }
  );

  const isError = computed(() => error.value != null);
  const isSuccess = computed(() => isFinished.value && !isError.value);

  return {
    data,
    responseData,
    error,
    isLoading,
    isFinished,
    isSuccess,
    isError,
    url: urlInternal,
  };
};

export const buildAuthInterceptor = <T>(): BeforeFetchFn<T> => {
  const addAuthToCtx = (
    ctx: AxiosRequestConfig<T>,
    authenticated: boolean,
    accessToken: string | null
  ) => {
    if (authenticated) {
      ctx.headers = {
        ...ctx.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }
  };

  const { ready, isAuthenticated, accessToken } = storeToRefs(useAuth());

  return async (ctx) => {
    return new Promise((resolve) => {
      watch(
        ready,
        (ready) => {
          if (ready) {
            addAuthToCtx(ctx, isAuthenticated.value, accessToken.value);
            resolve(ctx);
          }
        },
        { immediate: true }
      );
    });
  };
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
