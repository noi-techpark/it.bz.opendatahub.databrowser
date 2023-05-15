import { ApiParameters, stringifyParameter } from '..';
import {
  isWithArrayPagination,
  isWithTourismPagination,
  PaginationData,
  WithTourismPagination,
} from './types';
import { defaultPagination } from './defaultValues';

interface PaginationContext {
  defaultParameters?: ApiParameters;
  parameters?: ApiParameters;
}

export const tourismPaginatedMapper = <T>(
  data: WithTourismPagination<T>,
  context?: PaginationContext
): PaginationData<T> => {
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

export const arrayPaginatedMapper = <T = unknown>(
  data: T[],
  context?: PaginationContext
): PaginationData<T> => {
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
  if (isWithTourismPagination<T>(data)) {
    return tourismPaginatedMapper<T>(data, context);
  }

  if (isWithArrayPagination<T>(data)) {
    return arrayPaginatedMapper<T>(data, context);
  }

  return {
    items: [],
    pagination: defaultPagination,
  };
};
