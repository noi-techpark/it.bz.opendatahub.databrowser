import {
  BasePagination,
  defaultPaginationUrlBuilder,
  PaginationType,
  PaginationUrlBuilder,
} from './pagination';

export interface TourismPagination extends BasePagination {
  TotalResults: number;
  TotalPages: number;
  CurrentPage: number;
  PreviousPage: string | null;
  NextPage: string | null;
  type: PaginationType.TOURISM;
}

export const defaultTourismPagination: TourismPagination = {
  hasPrevious: false,
  hasNext: false,
  TotalResults: 0,
  TotalPages: 0,
  CurrentPage: 1,
  PreviousPage: null,
  NextPage: null,
  type: PaginationType.TOURISM,
};

export interface WithTourismPagination extends TourismPagination {
  Seed?: string | null;
  Items: any[];
}

export const isWithTourismPagination = (
  data: any
): data is WithTourismPagination =>
  data != null &&
  (data as WithTourismPagination).TotalResults != null &&
  (data as WithTourismPagination).TotalPages != null &&
  (data as WithTourismPagination).Items != null;

export const paginationFromTourismData = (
  data: WithTourismPagination
): TourismPagination => {
  if (data == null) {
    return defaultTourismPagination;
  }

  const { TotalResults, TotalPages, CurrentPage, PreviousPage, NextPage } =
    data;

  const hasPrevious = PreviousPage != null && PreviousPage.length > 0;
  const hasNext = NextPage != null && NextPage.length > 0;

  return {
    ...defaultTourismPagination,
    hasPrevious,
    hasNext,
    TotalResults,
    TotalPages,
    CurrentPage,
    PreviousPage,
    NextPage,
  };
};

export const paginationBuilderForTourismData = (
  url: string,
  data: WithTourismPagination
): PaginationUrlBuilder => {
  if (url == null || data == null) {
    return defaultPaginationUrlBuilder;
  }

  return {
    getUrlForCurrentPage: () => url,
    getUrlForNextPage: () => data.NextPage ?? '',
    getUrlForPreviousPage: () => data.PreviousPage ?? '',
  };
};
