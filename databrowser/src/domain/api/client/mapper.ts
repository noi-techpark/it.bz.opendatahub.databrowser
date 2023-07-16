// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { ApiParameters, stringifyParameter } from '..';
import {
  isWithArrayPagination,
  isWithMobilityPagination,
  isWithTourismPagination,
  PaginationData,
  WithMobilityPagination,
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

export const mobilityPaginatedMapper = <T>(
  data: WithMobilityPagination<T>
): PaginationData<T> => {
  // TODO: arbitrary number; is there some way to get the total number of items?
  const total = 1000;
  const size = data.limit;
  const page = Math.floor(data.offset / size) + 1;

  return {
    items: data.data,
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

  if (isWithMobilityPagination<T>(data)) {
    return mobilityPaginatedMapper<T>(data);
  }

  if (isWithArrayPagination<T>(data)) {
    return arrayPaginatedMapper<T>(data, context);
  }

  return {
    items: [],
    pagination: defaultPagination,
  };
};
