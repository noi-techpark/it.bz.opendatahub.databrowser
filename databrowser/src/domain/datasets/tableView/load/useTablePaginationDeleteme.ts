// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import {
  PaginationData,
  arrayPaginatedMapper,
  defaultPagination,
  isWithArrayPagination,
  isWithMobilityPagination,
  isWithTourismPagination,
  mobilityPaginatedMapper,
  tourismPaginatedMapper,
} from '../../../api';
import { Domain } from '../../../datasetConfig/types';

interface TableSettings<T> {
  dataMapper: DataMapper<T>;
}

type DataMapper<T = unknown> = (data: T) => PaginationData<T>;

const defaultDataMapper = <T = unknown>(): PaginationData<T> => ({
  items: [],
  pagination: defaultPagination,
});

export const computePagination = <T = unknown>(
  domain: Domain | undefined,
  allParams: Record<string, string>
): TableSettings<T> => {
  console.warn('computeTableSettings', domain, allParams);
  if (domain === 'tourism') {
    const dataMapper = (data: T) => {
      if (isWithTourismPagination<T>(data)) {
        return tourismPaginatedMapper<T>(data, allParams);
      }
      if (isWithArrayPagination<T>(data)) {
        return arrayPaginatedMapper<T>(data, allParams);
      }
      return defaultDataMapper<T>();
    };

    return { dataMapper };
  }

  if (domain === 'mobility') {
    const dataMapper = (data: T) => {
      if (isWithMobilityPagination<T>(data)) {
        return mobilityPaginatedMapper<T>(data);
      }
      return defaultDataMapper<T>();
    };

    return { dataMapper };
  }

  return { dataMapper: defaultDataMapper };
};
