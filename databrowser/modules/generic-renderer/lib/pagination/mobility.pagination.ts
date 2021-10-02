import {
  BasePagination,
  defaultPaginationUrlBuilder,
  PaginationType,
  PaginationUrlBuilder,
} from './pagination';

export interface MobilityPagination extends BasePagination {
  offset: number;
  limit: number;
  type: PaginationType.MOBILITY;
}

export const defaultMobilityPagination: MobilityPagination = {
  hasPrevious: false,
  hasNext: false,
  offset: 0,
  limit: 0,
  type: PaginationType.MOBILITY,
};

export interface WithMobilityPagination extends MobilityPagination {
  data: any[];
}

export const isWithMobilityPagination = (
  data: any
): data is WithMobilityPagination =>
  data != null &&
  (data as WithMobilityPagination).offset != null &&
  (data as WithMobilityPagination).limit != null &&
  (data as WithMobilityPagination).data != null;

export const paginationFromMobilityData = (
  data: WithMobilityPagination
): MobilityPagination => {
  if (data == null) {
    return defaultMobilityPagination;
  }

  const { limit, offset } = data;

  const hasPrevious = data.offset > 0;
  const hasNext = data.data != null ? data.data.length === limit : false;

  return { ...defaultMobilityPagination, hasPrevious, hasNext, limit, offset };
};

export const paginationBuilderForMobilityData = (
  url: string,
  data: WithMobilityPagination
): PaginationUrlBuilder => {
  if (url == null || data == null) {
    return defaultPaginationUrlBuilder;
  }

  const offsetUrls = buildOffsetUrls(new URL(url), data);

  return {
    getUrlForCurrentPage: () => url,
    getUrlForNextPage: () => offsetUrls.nextOffsetUrl,
    getUrlForPreviousPage: () => offsetUrls.previousOffsetUrl,
  };
};

const buildOffsetUrls = (
  url: URL,
  data: WithMobilityPagination
): { nextOffsetUrl: string; previousOffsetUrl: string } => {
  const previousOffset = Math.max(data.offset - data.limit, 0);
  url.searchParams.set('offset', previousOffset.toString());
  const previousOffsetUrl = url.toString();

  const nextOffset = data.offset + data.limit;
  url.searchParams.set('offset', nextOffset.toString());
  const nextOffsetUrl = url.toString();

  return { nextOffsetUrl, previousOffsetUrl };
};
