// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { minPageSize } from '../ui/tableView/defaultValues';
import { Pagination, WithMobilityPagination } from './types';

export const mobilityPagination = (
  data: WithMobilityPagination
): Pagination => {
  // If the number of records is < minPageSize, then show all records
  if (data.data.length < minPageSize) {
    return {
      totalItems: data.data.length,
      pageCount: 1,
      pageSize: data.data.length,
      currentPage: 1,
      hasPrevious: false,
      hasNext: false,
      hasPagination: false,
    };
  }

  // Set totalItems to an Infinity, because there is
  // no way to know the total number of items in mobility API
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
