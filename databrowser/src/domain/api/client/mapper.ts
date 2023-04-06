import { ApiParameters, stringifyParameter } from '..';
import {
  isWithArrayPagination,
  isWithTourismPagination,
  PaginationData,
  WithTourismPagination,
} from './types';

interface PaginationContext {
  defaultParameters?: ApiParameters;
  parameters?: ApiParameters;
}

export const tourismPaginatedMapper = (
  data: WithTourismPagination,
  context?: PaginationContext
): PaginationData => {
  const total = data.TotalResults;

  const parameters = {
    ...context?.defaultParameters,
    ...context?.parameters,
  };

  const size =
    parameters.pagesize != null
      ? parseInt(stringifyParameter(parameters.pagesize), 10)
      : 0;
  const page = data.CurrentPage;

  return {
    items: data.Items,
    pagination: {
      total,
      page,
      size,
    },
  };
};

export const arrayPaginatedMapper = (
  data: unknown[],
  context?: PaginationContext
): PaginationData => {
  const total = data.length;

  const parameters = {
    ...context?.defaultParameters,
    ...context?.parameters,
  };

  const size =
    parameters.pagesize != null
      ? parseInt(stringifyParameter(parameters.pagesize), 10)
      : 0;

  const page =
    parameters.pagenumber != null
      ? parseInt(stringifyParameter(parameters.pagenumber), 10)
      : 1;

  const start = (page - 1) * size;
  const items = data.slice(page, start + size);

  return {
    items,
    pagination: {
      total,
      page,
      size,
    },
  };
};

export const unifyPagination = <T = unknown>(
  data: T,
  context?: PaginationContext
): PaginationData<T> => {
  if (isWithTourismPagination(data)) {
    return tourismPaginatedMapper(data, context);
  }

  if (isWithArrayPagination(data)) {
    return arrayPaginatedMapper(data, context);
  }

  return {
    items: [],
    pagination: {
      page: 1,
      size: 0,
      total: 0,
    },
  };
};
