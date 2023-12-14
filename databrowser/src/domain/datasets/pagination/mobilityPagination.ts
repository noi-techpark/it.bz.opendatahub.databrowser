// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Pagination, WithMobilityPagination } from './types';

export const mobilityPagination = (
  data: WithMobilityPagination
): Pagination => {
  // Arbitrary number, because there is no way to
  // know the total number of items in mobility API
  const totalItems = Infinity;
  const pageSize = data.limit;
  const currentPage = Math.floor(data.offset / pageSize) + 1;

  const pageCount = Infinity;
  const hasPrevious = data.offset > 0;
  const hasNext = data.data.length === pageSize;

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
