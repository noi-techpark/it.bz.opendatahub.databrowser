// // SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
// //
// // SPDX-License-Identifier: AGPL-3.0-or-later

// import { stringifyParameter } from '..';
// import {
//   isWithArrayPagination,
//   isWithMobilityPagination,
//   isWithTourismPagination,
//   PaginationData,
//   WithMobilityPagination,
//   WithTourismPagination,
// } from '../pagination/types';
// import { defaultPagination } from './defaultValues';
// import { useApiParameterStore } from '../service/apiParameterStore';
// import { storeToRefs } from 'pinia';
// import { LocationQuery, useRoute, useRouter } from 'vue-router';
// import { computed } from 'vue';
// import { useUrlQueryStore } from '../service/urlQueryStore';

// export const tourismPaginatedMapper = <T>(
//   data: WithTourismPagination<T>,
//   routeQuery: LocationQuery
// ): PaginationData<T> => {
//   const totalItems = data.TotalResults;

//   const pageSize =
//     routeQuery.pagesize != null
//       ? parseInt(stringifyParameter(routeQuery.pagesize), 10)
//       : 0;
//   const currentPage = data.CurrentPage;

//   const pageCount = Math.floor(totalItems / pageSize) + 1;
//   const hasPrevious = currentPage > 1;
//   const hasNext = currentPage < pageCount;

//   const { currentApiParams } = storeToRefs(useApiParameterStore());
//   useUrlQueryStore();

//   return {
//     items: data.Items,
//     pagination: {
//       totalItems,
//       pageCount,
//       pageSize,
//       currentPage,
//       hasPrevious,
//       hasNext,
//       goToPage: (value: number) =>
//         (currentApiParams.value['pagenumber'] = value.toString()),
//       changePageSize: (value: number) =>
//         (currentApiParams.value['pagesize'] = value.toString()),
//     },
//   };
// };

// export const mobilityPaginatedMapper = <T>(
//   data: WithMobilityPagination<T>
// ): PaginationData<T> => {
//   // Arbitrary number, because there is no way to
//   // know the total number of items in mobility API
//   const totalItems = Infinity;
//   const pageSize = data.limit;
//   const currentPage = Math.floor(data.offset / pageSize) + 1;

//   const pageCount = Infinity;
//   const hasPrevious = data.offset > 0;
//   const hasNext = data.data.length === pageSize;

//   const { currentApiParams } = storeToRefs(useApiParameterStore());

//   return {
//     items: data.data,
//     pagination: {
//       totalItems,
//       pageCount,
//       pageSize,
//       currentPage,
//       hasPrevious,
//       hasNext,
//       goToPage: (value: number) =>
//         (currentApiParams.value['offset'] = (
//           (value - 1) *
//           data.limit
//         ).toString()),
//       changePageSize: (value: number) =>
//         (currentApiParams.value['limit'] = value.toString()),
//     },
//   };
// };

// export const arrayPaginatedMapper = <T = unknown>(
//   data: T[],
//   routeQuery: LocationQuery
// ): PaginationData<T> => {
//   const totalItems = data.length;

//   const pageSize =
//     routeQuery.pagesize != null
//       ? parseInt(stringifyParameter(routeQuery.pagesize), 10)
//       : 0;

//   const currentPage =
//     routeQuery.pagenumber != null
//       ? parseInt(stringifyParameter(routeQuery.pagenumber), 10)
//       : 1;

//   const start = (currentPage - 1) * pageSize;
//   const items = data.slice(currentPage, start + pageSize);

//   const pageCount = pageSize === 0 ? 1 : Math.floor(totalItems / pageSize) + 1;
//   const hasPrevious = currentPage > 1;
//   const hasNext = currentPage < pageCount;

//   const { currentApiParams } = storeToRefs(useApiParameterStore());

//   return {
//     items,
//     pagination: {
//       totalItems,
//       pageCount,
//       pageSize,
//       currentPage,
//       hasPrevious,
//       hasNext,
//       goToPage: (value: number) =>
//         (currentApiParams.value['pagenumber'] = value.toString()),
//       changePageSize: (value: number) =>
//         (currentApiParams.value['pagesize'] = value.toString()),
//     },
//   };
// };

// export const unifyPagination = <T = unknown>(
//   data: T,
//   routeQuery: LocationQuery
// ): PaginationData<T> => {
//   if (isWithTourismPagination<T>(data)) {
//     return tourismPaginatedMapper<T>(data, routeQuery);
//   }

//   if (isWithMobilityPagination<T>(data)) {
//     return mobilityPaginatedMapper<T>(data);
//   }

//   if (isWithArrayPagination<T>(data)) {
//     return arrayPaginatedMapper<T>(data, routeQuery);
//   }

//   return {
//     items: [],
//     pagination: defaultPagination,
//   };
// };
