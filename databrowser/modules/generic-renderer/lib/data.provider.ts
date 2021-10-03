import {
  isWithArrayPagination,
  paginationFromArrayData,
} from './pagination/array.pagination';
import {
  isWithMobilityPagination,
  paginationBuilderForMobilityData,
  paginationFromMobilityData,
} from './pagination/mobility.pagination';
import { BasePagination, PaginationUrlBuilder } from './pagination/pagination';
import {
  isWithTourismPagination,
  paginationBuilderForTourismData,
  paginationFromTourismData,
} from './pagination/tourism.pagination';
import { $axios, $loading } from '~/utils/nuxt-accessors';

export type FetchedData = Record<string, any> | any[];

export interface FetchResult {
  data: FetchedData;
  pagination?: BasePagination;
  paginationBuilder?: PaginationUrlBuilder;
}

/**
 *
 * @param axios Fetch data from the given URL.
 * @param url The URL from where to fetch the data.
 * @returns A promise. When resolved it contains data of type FetchResult.
 * When rejected, it contains an error descrifption.
 */
export const fetchData = async (url: string): Promise<FetchResult> => {
  $loading.start();
  const responseData = await $axios.$get(url, { progress: false });
  $loading.finish();

  // Check response type
  if (responseData == null) {
    // If respone is null or undefined, throw an error
    throw new Error(`Response data from is empty, url was ${url}`);
  } else if (isWithTourismPagination(responseData)) {
    // Handle Open Data Hub Tourim API pageable result
    const data = responseData.Items instanceof Array ? responseData.Items : [];
    const pagination = paginationFromTourismData(responseData);
    const paginationBuilder = paginationBuilderForTourismData(
      url,
      responseData
    );
    return { data, pagination, paginationBuilder };
  } else if (isWithMobilityPagination(responseData)) {
    // Handle Open Data Hub Mobility API pageable result
    const data = Array.isArray(responseData.data) ? responseData.data : [];
    const pagination = paginationFromMobilityData(responseData);
    const paginationBuilder = paginationBuilderForMobilityData(
      url,
      responseData
    );
    return { data, pagination, paginationBuilder };
  } else if (isWithArrayPagination(responseData)) {
    // Handle array result
    const data = responseData;
    const pagination = paginationFromArrayData(responseData);
    return { data, pagination };
  } else if (typeof responseData === 'object') {
    // The response may be an object (e.g. the response for a single entity)
    // In that case, just use the respone data as it is.
    return { data: responseData };
  }

  // eslint-disable-next-line no-console
  console.error(`Got unknown response content from URL ${url}`, responseData);
  throw new Error('Unknown response content');
};
