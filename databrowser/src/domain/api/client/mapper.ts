import { toRaw } from 'vue';
import {
  isWithArrayPagination,
  isWithTourismPagination,
  PaginationData,
  WithTourismPagination,
} from './types';

export const tourismPaginatedMapper = (
  data: WithTourismPagination
): PaginationData => {
  const total = data.TotalResults;

  const sizeHasDivider = total % data.TotalPages !== 0;
  const size = Math.floor(total / data.TotalPages) + (sizeHasDivider ? 1 : 0);
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
  context: {
    defaultParameters: Record<string, string>;
    parameters: Record<string, string>;
  }
): PaginationData => {
  const total = data.length;

  // Set default page size if not defined
  const queryParametersWithPageSize = {
    ...toRaw(context.defaultParameters),
    ...toRaw(context.parameters),
  };

  const size = parseInt(queryParametersWithPageSize.pagesize, 10);

  const pageNumberFromFilter = parseInt(queryParametersWithPageSize.pagenumber);

  const page = pageNumberFromFilter ?? 1;

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

export const unifyPagination = (
  data: unknown,
  context: {
    defaultParameters: any;
    parameters: any;
  }
): PaginationData => {
  if (isWithTourismPagination(data)) {
    return tourismPaginatedMapper(data);
  }

  if (isWithArrayPagination(data)) {
    const { parameters, defaultParameters } = context;

    return arrayPaginatedMapper(data, {
      defaultParameters,
      parameters,
    });
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
