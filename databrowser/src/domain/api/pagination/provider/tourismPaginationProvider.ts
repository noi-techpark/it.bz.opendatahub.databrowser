// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { stringToNumber } from '../../../utils/convertType';
import { arrayPagination } from '../mapper/arrayPagination';
import { staticPagination } from '../mapper/staticPagination';
import { tourismPagination } from '../mapper/tourismPagination';
import {
  ChangePaginationWithQuery,
  isWithArrayPagination,
  isWithTourismPagination,
  PaginationCallback,
  PaginationWithCallbackProvider,
} from '../types';

export const tourismPaginationProvider = <T>(
  query: Record<string, string> | undefined,
  changePagination: ChangePaginationWithQuery
): PaginationWithCallbackProvider<T> => {
  return (data: T) => {
    if (isWithTourismPagination<T>(data)) {
      const pageSize = stringToNumber(query?.pagesize, 0);
      const pagination = tourismPagination<T>(data, { pageSize });
      return { ...pagination, ...tourismPaginationCallback(changePagination) };
    }

    if (isWithArrayPagination<T>(data)) {
      const pageSize = stringToNumber(query?.pagesize, 0);
      const currentPage = stringToNumber(query?.pagenumber, 0);
      const pagination = arrayPagination<T>(data, { pageSize, currentPage });
      return { ...pagination, ...tourismPaginationCallback(changePagination) };
    }

    console.log('data', data);

    const pageSize = stringToNumber(query?.pagesize, 0);
    const pagination = { ...staticPagination(), pageSize };
    return { ...pagination, ...tourismPaginationCallback(changePagination) };
  };
};

export const tourismPaginationCallback = (
  changePagination: ChangePaginationWithQuery
): PaginationCallback => ({
  goToPage: (page) => {
    console.log('tourism goToPage callback');
    changePagination({ pagenumber: page });
  },
  changePageSize: (size) => {
    console.log('tourism changePageSize callback');
    changePagination({ pagesize: size });
  },
});
