// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Pagination2 } from '../types';

export const arrayPagination = <T = unknown>(
  data: T[],
  { pageSize, currentPage }: { pageSize: number; currentPage: number }
): Pagination2 => {
  const totalItems = data.length;

  // const pageSize =
  //   routeQuery.pagesize != null
  //     ? parseInt(stringifyParameter(routeQuery.pagesize), 10)
  //     : 0;

  // const currentPage =
  //   routeQuery.pagenumber != null
  //     ? parseInt(stringifyParameter(routeQuery.pagenumber), 10)
  //     : 1;

  const pageCount = pageSize === 0 ? 1 : Math.floor(totalItems / pageSize) + 1;
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < pageCount;

  // const { currentApiParams } = storeToRefs(useApiParameterStore());

  return {
    totalItems,
    pageCount,
    pageSize,
    currentPage,
    hasPrevious,
    hasNext,
  };
};