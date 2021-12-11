import { calculatePagination } from '@aboutbits/pagination';

type PaginationPrevious = Partial<
  Pick<NonNullable<ReturnType<typeof calculatePagination>>, 'previous'>
>;

type PaginationNext = Partial<
  Pick<NonNullable<ReturnType<typeof calculatePagination>>, 'next'>
>;

export type SetupResult = {
  currentPageNumber: string;
  pageNumbers: string[];
} & PaginationPrevious &
  PaginationNext;
