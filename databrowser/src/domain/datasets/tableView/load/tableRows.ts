// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { MaybeRef, computed, toValue } from 'vue';
import { Pagination2, isWithArrayPagination } from '../../../api';

const buildFallbackRows = (pageSize: number) =>
  [...Array(pageSize).keys()].map((_, index) => ({ Id: index }));

export const computeTableRows = (
  isLoading: boolean,
  pagination: Pagination2,
  data: unknown[] | null,
  responseData: unknown | null
) => {
  // If there are no items yet (e.g. because of initial load),
  // show a fallback table with empty rows
  if (isLoading) {
    return buildFallbackRows(pagination.pageSize ?? 25);
  }

  // If the data is null / undefined (e.g. because of an error),
  // show an empty table
  if (data == null) {
    return [];
  }

  // If the data is an array, return the slice of the array
  // corresponding to the current page and page size
  if (isWithArrayPagination(responseData)) {
    const { currentPage, pageSize } = pagination;
    const start = (currentPage - 1) * pageSize;
    const end = currentPage * pageSize;
    return data.slice(start, end);
  }

  // In all other cases, return just the data
  return data;
};

export const useTableRows = (
  isLoading: MaybeRef<boolean>,
  pagination: MaybeRef<Pagination2>,
  data: MaybeRef<unknown[] | null>,
  responseData: MaybeRef<unknown | null>
) =>
  computed(() =>
    computeTableRows(
      toValue(isLoading),
      toValue(pagination),
      toValue(data),
      toValue(responseData)
    )
  );
