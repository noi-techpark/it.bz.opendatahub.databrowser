export enum PaginationType {
  TOURISM = 'tourism',
  MOBILITY = 'mobility',
  ARRAY = 'array',
  UNKNOWN = 'array',
}

export interface Pagination {
  total: number;
  page: number;
  size: number;
}

export interface PaginationData {
  items: any[];
  pagination: Pagination;
}

export interface WithTourismPagination {
  CurrentPage: number;
  TotalResults: number;
  TotalPages: number;
  Items: any[];
}

export const isWithTourismPagination = (
  data: any
): data is WithTourismPagination =>
  data != null &&
  (data as WithTourismPagination).TotalResults != null &&
  (data as WithTourismPagination).TotalPages != null &&
  (data as WithTourismPagination).Items != null;

export const isWithArrayPagination = (data: any): data is unknown[] =>
  Array.isArray(data);
