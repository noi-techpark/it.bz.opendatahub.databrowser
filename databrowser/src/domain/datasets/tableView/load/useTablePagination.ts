// // SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
// //
// // SPDX-License-Identifier: AGPL-3.0-or-later

// import {
//   Pagination,
//   PaginationData,
//   arrayPaginatedMapper,
//   defaultPagination,
//   isWithArrayPagination,
//   isWithMobilityPagination,
//   isWithTourismPagination,
//   mobilityPaginatedMapper,
//   tourismPaginatedMapper,
// } from '../../../api';
// import { Domain } from '../../../datasetConfig/types';
// import { domainIsKnownToHaveOpenApiDocument } from '../../../openApi';

// interface TableSettings<T> {
//   dataMapper: DataMapper<T>;
// }

// type DataMapper<T = unknown> = (data: T) => PaginationData<T>;

// const defaultDataMapper = <T = unknown>(): PaginationData<T> => ({
//   items: [],
//   pagination: defaultPagination,
// });

// export const computeTablePagination = <T = unknown>(
//   domain: Domain | undefined,
//   allParams: Record<string, string>
// ): ((data: T) => Pagination) => {
//   if (!domainIsKnownToHaveOpenApiDocument(domain)) {
//     console.error(
//       `No data extraction algorithm found for domain ${domain}, returning identity function`
//     );
//     return () => defaultPagination;
//   }

//   switch (domain) {
//     case 'tourism':
//       return tourismPagination();
//     case 'mobility':
//       return mobilityPagination();
//   }

//   if (domain === 'tourism') {
//     const dataMapper = (data: T) => {
//       if (isWithTourismPagination<T>(data)) {
//         return tourismPaginatedMapper<T>(data, allParams);
//       }
//       if (isWithArrayPagination<T>(data)) {
//         return arrayPaginatedMapper<T>(data, allParams);
//       }
//       return defaultDataMapper<T>();
//     };

//     return { dataMapper };
//   }

//   if (domain === 'mobility') {
//     const dataMapper = (data: T) => {
//       if (isWithMobilityPagination<T>(data)) {
//         return mobilityPaginatedMapper<T>(data);
//       }
//       return defaultDataMapper<T>();
//     };

//     return { dataMapper };
//   }

//   return { dataMapper: defaultDataMapper };
// };
