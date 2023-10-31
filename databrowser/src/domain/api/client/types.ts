// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export enum PaginationType {
  TOURISM = 'tourism',
  MOBILITY = 'mobility',
  ARRAY = 'array',
  UNKNOWN = 'array',
}

export interface Pagination {
  totalItems: number;
  pageCount: number;
  pageSize: number;
  currentPage: number;
  hasPrevious: boolean;
  hasNext: boolean;

  goToPage: (value: number) => void;
  changePageSize: (value: number) => void;
}

export interface Pagination2 {
  totalItems: number;
  pageCount: number;
  pageSize: number;
  currentPage: number;
  hasPrevious: boolean;
  hasNext: boolean;

  // goToPage: (callbackFn: (value: number) => void) => (value: number) => void;
  // changePageSize: (
  //   callbackFn: (value: number) => void
  // ) => (value: number) => void;
}

export interface PaginationWithCallback extends Pagination2 {
  goToPage: (page: number) => void;
  changePageSize: (size: number) => void;
}

export interface PaginationData<T = unknown> {
  items: T[];
  pagination: Pagination;
}

export interface WithTourismPagination<T = unknown> {
  CurrentPage: number;
  TotalResults: number;
  TotalPages: number;
  Items: T[];
}

export const isWithTourismPagination = <T = unknown>(
  data: unknown
): data is WithTourismPagination<T> => {
  // console.log('isWithTourismPagination2q', data);

  return (
    data != null &&
    (data as WithTourismPagination).TotalResults != null &&
    (data as WithTourismPagination).TotalPages != null &&
    (data as WithTourismPagination).Items != null
  );
};

export interface WithMobilityPagination<T = unknown> {
  limit: number;
  offset: number;
  data: T[];
}

export const isWithMobilityPagination = <T = unknown>(
  data: unknown
): data is WithMobilityPagination<T> =>
  data != null &&
  (data as WithMobilityPagination).limit != null &&
  (data as WithMobilityPagination).offset != null &&
  (data as WithMobilityPagination).data != null;

export const isWithArrayPagination = <T = unknown>(
  data: unknown
): data is T[] => Array.isArray(data);
