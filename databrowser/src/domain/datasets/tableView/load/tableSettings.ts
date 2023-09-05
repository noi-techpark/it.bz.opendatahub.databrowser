// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import {
  defaultMobilityTableQueryParameters,
  defaultTourismTableQueryParameters,
} from '../defaultValues';
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
import { DatasetDomain } from '../../../datasetConfig/types';
import { LocationQuery } from 'vue-router';

interface TableSettings<T> {
  defaultQueryParams: LocationQuery;
  dataMapper: DataMapper<T>;
}

type DataMapper<T = unknown> = (data: T) => PaginationData<T>;

const defaultDataMapper = <T = unknown>(): PaginationData<T> => ({
  items: [],
  pagination: defaultPagination,
});

export const computeTableSettings = <T = unknown>(
  domain: DatasetDomain | undefined,
  routeQuery: LocationQuery
): TableSettings<T> => {
  console.warn('computeTableSettings', domain, routeQuery);
  if (domain === 'tourism') {
    const defaultQueryParams = {
      ...defaultTourismTableQueryParameters,
    };

    const dataMapper = (data: T) => {
      const allApiParams = {
        ...defaultQueryParams,
        ...routeQuery,
      };

      if (isWithTourismPagination<T>(data)) {
        return tourismPaginatedMapper<T>(data, allApiParams);
      }
      if (isWithArrayPagination<T>(data)) {
        return arrayPaginatedMapper<T>(data, allApiParams);
      }
      return defaultDataMapper<T>();
    };

    return { defaultQueryParams, dataMapper };
  }

  if (domain === 'mobility') {
    const defaultQueryParams = {
      ...defaultMobilityTableQueryParameters,
    };

    const dataMapper = (data: T) => {
      if (isWithMobilityPagination<T>(data)) {
        return mobilityPaginatedMapper<T>(data);
      }
      return defaultDataMapper<T>();
    };

    return { defaultQueryParams, dataMapper };
  }

  return { defaultQueryParams: {}, dataMapper: defaultDataMapper };
};
