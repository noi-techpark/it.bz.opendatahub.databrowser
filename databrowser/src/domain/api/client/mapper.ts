// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { ApiParams, stringifyParameter } from '..';
import {
  isWithArrayPagination,
  isWithMobilityPagination,
  isWithTourismPagination,
  PaginationData,
  WithMobilityPagination,
  WithTourismPagination,
} from './types';
import { defaultPagination } from './defaultValues';
import { useApiParameterStore } from '../service/apiParameterStore';
import { storeToRefs } from 'pinia';

// interface PaginationContext {
//   defaultParameters?: ApiParameters;
//   parameters?: ApiParameters;
// }

// const { updateApiParameterValue } = useApiParameterHandler();
export const tourismPaginatedMapper = <T>(
  data: WithTourismPagination<T>,
  params?: ApiParams
  // context?: PaginationContext
): PaginationData<T> => {
  const totalItems = data.TotalResults;

  // const parameters = {
  //   ...context?.defaultParameters,
  //   ...context?.parameters,
  // };

  const pageSize =
    params?.pagesize != null
      ? parseInt(stringifyParameter(params.pagesize), 10)
      : 0;
  const currentPage = data.CurrentPage;

  const pageCount = Math.floor(totalItems / pageSize) + 1;
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < pageCount;

  const { currentApiParams } = storeToRefs(useApiParameterStore());

  return {
    items: data.Items,
    pagination: {
      totalItems,
      pageCount,
      pageSize,
      currentPage,
      hasPrevious,
      hasNext,
      goToPage: (value: number) =>
        (currentApiParams.value['pagenumber'] = value.toString()),
      // updateApiParameterValue('pagenumber', value.toString()),
      changePageSize: (value: number) =>
        (currentApiParams.value['pagesize'] = value.toString()),
      // updateApiParameterValue('pagesize', value.toString()),
    },
  };
};

export const mobilityPaginatedMapper = <T>(
  data: WithMobilityPagination<T>
): PaginationData<T> => {
  // Arbitrary number, because there is no way to
  // know the total number of items in mobility API
  const totalItems = Infinity;
  const pageSize = data.limit;
  const currentPage = Math.floor(data.offset / pageSize) + 1;

  const pageCount = Infinity;
  const hasPrevious = data.offset > 0;
  const hasNext = data.data.length === pageSize;

  const { currentApiParams } = storeToRefs(useApiParameterStore());

  return {
    items: data.data,
    pagination: {
      totalItems,
      pageCount,
      pageSize,
      currentPage,
      hasPrevious,
      hasNext,
      goToPage: (value: number) =>
        (currentApiParams.value['offset'] = (
          (value - 1) *
          data.limit
        ).toString()),
      //   'offset',
      //   ((value - 1) * data.limit).toString()
      // ),
      changePageSize: (value: number) =>
        (currentApiParams.value['limit'] = value.toString()),
      // updateApiParameterValue('limit', value.toString()),
    },
  };
};

export const arrayPaginatedMapper = <T = unknown>(
  data: T[],
  params?: ApiParams
  // context?: PaginationContext
): PaginationData<T> => {
  const totalItems = data.length;

  // const parameters = {
  //   ...context?.defaultParameters,
  //   ...context?.parameters,
  // };

  const pageSize =
    params?.pagesize != null
      ? parseInt(stringifyParameter(params.pagesize), 10)
      : 0;

  const currentPage =
    params?.pagenumber != null
      ? parseInt(stringifyParameter(params.pagenumber), 10)
      : 1;

  const start = (currentPage - 1) * pageSize;
  const items = data.slice(currentPage, start + pageSize);

  const pageCount = pageSize === 0 ? 1 : Math.floor(totalItems / pageSize) + 1;
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < pageCount;

  const { currentApiParams } = storeToRefs(useApiParameterStore());

  return {
    items,
    pagination: {
      totalItems,
      pageCount,
      pageSize,
      currentPage,
      hasPrevious,
      hasNext,
      goToPage: (value: number) =>
        (currentApiParams.value['pagenumber'] = value.toString()),
      // updateApiParameterValue('pagenumber', value.toString()),
      changePageSize: (value: number) =>
        (currentApiParams.value['pagesize'] = value.toString()),
      // updateApiParameterValue('pagesize', value.toString()),
    },
  };
};

export const unifyPagination = <T = unknown>(
  data: T,
  params?: ApiParams
  // context?: PaginationContext
): PaginationData<T> => {
  if (isWithTourismPagination<T>(data)) {
    return tourismPaginatedMapper<T>(data, params);
  }

  if (isWithMobilityPagination<T>(data)) {
    return mobilityPaginatedMapper<T>(data);
  }

  if (isWithArrayPagination<T>(data)) {
    return arrayPaginatedMapper<T>(data, params);
  }

  return {
    items: [],
    pagination: defaultPagination,
  };
};
