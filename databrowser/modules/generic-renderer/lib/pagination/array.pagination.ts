import { BasePagination, PaginationType } from './pagination';

export interface ArrayPagination extends BasePagination {
  total: number;
  type: PaginationType.ARRAY;
}

export const defaultArrayPagination: ArrayPagination = {
  hasPrevious: false,
  hasNext: false,
  total: 0,
  type: PaginationType.ARRAY,
};

export type WithArrayPagination = any[];

export const isWithArrayPagination = (data: any): data is WithArrayPagination =>
  data != null && Array.isArray(data);

export const paginationFromArrayData = (
  data: WithArrayPagination
): ArrayPagination => {
  if (data == null) {
    return defaultArrayPagination;
  }

  const total = data.length;

  return { ...defaultArrayPagination, total };
};
