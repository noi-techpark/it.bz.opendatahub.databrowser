// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Pagination } from './types';

export const arrayPagination = (data: unknown[]): Pagination => {
  const totalItems = data.length;
  const currentPage = 1;
  const pageCount = 1;
  const hasPrevious = false;
  const hasNext = false;
  const pageSize = totalItems;

  return {
    totalItems,
    pageCount,
    pageSize,
    currentPage,
    hasPrevious,
    hasNext,
    hasPagination: hasPrevious || hasNext,
  };
};
