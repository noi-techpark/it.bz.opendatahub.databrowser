// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { WithTourismPagination, Pagination2 } from '../types';

export const tourismPagination = <T>(
  data: WithTourismPagination<T>,
  { pageSize }: { pageSize: number }
): Pagination2 => {
  const totalItems = data.TotalResults;
  const currentPage = data.CurrentPage;
  const pageCount = Math.floor(totalItems / pageSize) + 1;
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < pageCount;

  return {
    totalItems,
    pageCount,
    pageSize,
    currentPage,
    hasPrevious,
    hasNext,
  };
};
