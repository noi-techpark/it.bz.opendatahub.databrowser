// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export interface Pagination {
  totalItems: number;
  pageCount: number;
  pageSize: number;
  currentPage: number;
  hasPrevious: boolean;
  hasNext: boolean;
  hasPagination: boolean;
}

export interface WithTourismPagination<T = unknown> {
  CurrentPage: number;
  TotalResults: number;
  TotalPages: number;
  PreviousPage: string | null | undefined;
  NextPage: string | null | undefined;
  Items: T[];
}

export const isWithTourismPagination = <T = unknown>(
  data: unknown
): data is WithTourismPagination<T> => {
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
