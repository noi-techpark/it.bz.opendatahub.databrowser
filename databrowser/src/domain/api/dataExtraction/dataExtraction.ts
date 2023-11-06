// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import {
  isWithTourismPagination,
  isWithArrayPagination,
  isWithMobilityPagination,
  Pagination2,
} from '../pagination/types';

// const identity = <T = unknown, S = T>(data: T) => data as unknown as S;

export const extractListData = (data: unknown): unknown[] => {
  if (data == null) {
    return [];
  }

  if (isWithTourismPagination(data)) {
    return data.Items;
  } else if (isWithArrayPagination(data)) {
    return data;
  } else if (isWithMobilityPagination(data)) {
    return data.data;
  }

  console.error(`Unknown data shape, returning empty array`);
  return [];
};

// export const extractListDataForDomain = <T = unknown, S = T[]>(
//   domain: Domain | undefined
// ): ((data: T) => S) => {
//   if (!domainIsKnownToHaveOpenApiDocument(domain)) {
//     console.error(
//       `No data extraction algorithm found for domain ${domain}, returning identity function`
//     );
//     return identity;
//   }

//   switch (domain) {
//     case 'tourism':
//       return tourismDataExtractor();
//     case 'mobility':
//       return mobilityDataExtractor();
//   }
// };

// export const tourismDataExtractor = <T = unknown, S = T[]>(): ((
//   data: T
// ) => S) => {
//   return (data) => {
//     if (isWithTourismPagination<T>(data)) {
//       return data.Items as unknown as S;
//     } else if (isWithArrayPagination<T>(data)) {
//       return data as unknown as S;
//     }

//     console.error(
//       `Pagination type could not be recognized, returning identity function`
//     );
//     return [] as unknown as S;
//   };
// };

// export const mobilityDataExtractor = <T = unknown, S = T[]>(): ((
//   data: T
// ) => S) => {
//   return (data) => {
//     if (isWithMobilityPagination<T>(data)) {
//       return data as unknown as S;
//     }

//     console.error(
//       `Pagination type could not be recognized, returning identity function`
//     );
//     return [] as unknown as S;
//   };
// };
