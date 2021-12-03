import { AxiosInstance } from 'axios';
import { inject } from 'vue';
import { QueryFunctionContext } from 'react-query/types/core';
import { QueryParameters } from '../../../lib/urlQuery/types';

type FetchResult<T> = T | T[] | void;

interface FetcherQueryKeyParams {
  url?: string;
  queryParameters?: QueryParameters;
}

type QueryParamType = string | string[] | number | number[];

const concatFilters = (queryParam?: QueryParamType): string => {
  if (queryParam == null) {
    return '';
  }
  if (Array.isArray(queryParam)) {
    return queryParam.join(',');
  }
  return queryParam.toString();
};

const buildQueryFilter = (
  queryFilters?: Record<string, QueryParamType>,
  firstChar = ''
): string => {
  if (queryFilters == null) {
    return '';
  }

  const queryParams = Object.keys(queryFilters).reduce(
    (prev, filterName) => [
      ...prev,
      `${filterName}=${concatFilters(queryFilters[filterName])}`,
    ],
    [] as string[]
  );

  return queryParams.length > 0 ? firstChar + queryParams.join('&') : '';
};

export const buildListApiFetcher = (config: {
  defaultQueryParameters: Record<string, string>;
}) => {
  const axios = inject<AxiosInstance>('axios');

  if (axios == null) {
    throw new Error('Injected axios instance is undefined');
  }

  const fetcher = async ({
    queryKey,
  }: QueryFunctionContext): Promise<FetchResult<unknown>> => {
    const { url, queryParameters } = queryKey[1] as FetcherQueryKeyParams;

    if (axios == null || url == null || url.length === 0) {
      // Resolve with void if data is not fetchable
      return Promise.resolve();
    }

    // Set default query parameters
    const queryParametersWithDefaults = {
      ...config.defaultQueryParameters,
      ...queryParameters,
    };

    // Build query filters (may be the empty string if no queryParams are given)
    const queryFilters = buildQueryFilter(queryParametersWithDefaults, '?');

    const fetchUrl = `${url}${queryFilters}`;

    const { data } = await axios.get(fetchUrl);

    return data;
  };

  return fetcher;
};
