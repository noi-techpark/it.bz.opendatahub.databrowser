// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { mobilityPagination } from '../mapper/mobilityPagination';
import { staticPagination } from '../mapper/staticPagination';
import {
  ChangePaginationWithQuery,
  PaginationCallback,
  PaginationWithCallbackProvider,
  isWithMobilityPagination,
} from '../types';

export const mobilityPaginationProvider = <T>(
  changePagination: ChangePaginationWithQuery
): PaginationWithCallbackProvider<T> => {
  return (data: T) => {
    const pagination = isWithMobilityPagination<T>(data)
      ? mobilityPagination<T>(data)
      : staticPagination();

    return {
      ...pagination,
      ...mobilityPaginationCallback(changePagination, pagination.pageSize),
    };
  };
};

export const mobilityPaginationCallback = (
  changePagination: ChangePaginationWithQuery,
  pageSize: number
): PaginationCallback => ({
  goToPage: (page) => {
    console.log('mobility goToPage callback');
    changePagination({ offset: (page - 1) * pageSize });
  },
  changePageSize: (size) => {
    console.log('mobility changePageSize callback');
    changePagination({ limit: size });
  },
});
