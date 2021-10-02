// TODO: this file may be deleted because it is outdated and superseded by specialized implementations for tourism, mobility and array

import { WithMobilityPagination } from './mobility.pagination';
import { WithTourismPagination } from './tourism.pagination';

export interface GenericPagination {
  // Number of elements on each page
  limit: number;
  // Start index
  offset: number;
  // Total number of elements
  total: number;
}

export const defaultPagination: GenericPagination = {
  limit: 0,
  offset: 0,
  total: 0,
};

export const getPageCount = (pagination: GenericPagination): number => {
  if (
    pagination == null ||
    pagination.total == null ||
    pagination.total === 0 ||
    pagination.limit == null ||
    pagination.limit === 0
  ) {
    return 1;
  }
  const { limit, total } = pagination;
  const division = Math.floor(total / limit);
  const reminder = total % limit;
  return reminder > 0 ? division + 1 : division;
};

/**
 * Compute the current page from the given pagination.
 *
 * If the pagination parameter or any of its properties is undefined / null,
 * this method returns 1.
 *
 * Otherwise the result is computed as follows: (offset / limit) + 1
 *
 * Note that there are some special cases when the current page is computed
 * from a pagination with offset, limit and total. For some of them, the
 * output just has to be defined in some way.
 *
 * Special case 1: offset + limit > total && limit > offset
 * Result: 2
 * Reasoning: offset > 0 means we're not on the first page and offset + limit > total
 * means we're on the last page. Therefor we define the current page as 2.
 *
 * Special case 2: offset + limit > total && limit <= offset
 * Result: (offset / sanitizedLimit) + 1, where sanitizedLimit = total - offset
 * Reasoning: offset > 0 means we're not on the first page and offset + limit <= total
 * means we're not the last page. Compute the last page using sanitizedLimit
 *
 * @param pagination
 * @returns
 */
export const getCurrentPage = (pagination: GenericPagination): number => {
  if (
    pagination == null ||
    pagination.limit == null ||
    pagination.limit === 0 ||
    pagination.offset == null ||
    pagination.offset === 0 ||
    pagination.total == null ||
    pagination.total === 0
  ) {
    return 1;
  }

  const { limit, offset, total } = pagination;

  // Special case 1
  if (offset + limit > total && limit > offset) {
    return 2;
  }

  // Compute sanitizedLimit, taking into account special case 2
  const sanitizedLimit = offset + limit > total ? total - offset : limit;

  return Math.floor(offset / sanitizedLimit) + 1;
};

export const paginationFromArray = (data: any[]): GenericPagination => {
  const itemCount = data?.length ?? 0;
  return {
    limit: itemCount,
    offset: 0,
    total: itemCount,
  };
};

export const genericPaginationFromTourismData = (
  data: WithTourismPagination,
  firstPage = 0
): GenericPagination => {
  if (data == null) {
    return defaultPagination;
  }
  const totalResults = data.TotalResults ?? 0;
  const totalPages = data.TotalPages ?? 0;
  const currentPage = data.CurrentPage ?? 0;
  const itemsLength = data.Items?.length ?? 0;
  const hasNextPage = data.NextPage != null && data.NextPage.length > 0;

  const limit =
    hasNextPage || totalPages <= 1
      ? itemsLength
      : // Compute skipped items (total - itemsLength) and divide it by (number of pages -1). The -1 has to be applied,
        // because the division refers to the number of skipped items
        Math.abs(Math.floor((totalResults - itemsLength) / (totalPages - 1)));

  const currentOffsetPage = currentPage - firstPage;
  const offset = currentOffsetPage * limit;

  return { limit, offset, total: totalResults };
};

export const genericPaginationFromMobilityData = (
  data: WithMobilityPagination
): GenericPagination => {
  if (data == null) {
    return defaultPagination;
  }

  const { limit, offset } = data;

  return { ...defaultPagination, limit, offset };
};

export const hasNextPage = (pagination: GenericPagination): boolean =>
  getCurrentPage(pagination) < getPageCount(pagination);

export const hasPreviousPage = (pagination: GenericPagination): boolean =>
  getCurrentPage(pagination) > 1;
