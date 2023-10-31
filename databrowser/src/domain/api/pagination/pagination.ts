// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Domain } from '../../datasetConfig/types';
import { domainIsKnownToHaveOpenApiDocument } from '../../openApi';
import {
  isWithTourismPagination,
  isWithArrayPagination,
  isWithMobilityPagination,
  PaginationWithCallback,
  Pagination2,
} from '../client/types';
import { stringifyParameter } from '../service/query';
import { defaultPaginationProvider } from './provider/defaultPaginationProvider';
import { tourismPaginationProvider } from './provider/tourismPaginationProvider';
import { arrayPaginationProvider } from './provider/arrayPaginationProvider';
import { mobilityPaginationProvider } from './provider/mobilityPaginationProvider';

export const computePagination = <T = unknown>(
  domain: Domain | undefined,
  params: Record<string, string>,
  changeRouteQuery: (query: Record<string, string | number>) => Promise<unknown>
): ((data: T) => PaginationWithCallback) => {
  if (!domainIsKnownToHaveOpenApiDocument(domain)) {
    console.error(
      `No pagination algorithm found for domain ${domain}, returning identity function`
    );
    return () => ({
      ...defaultPaginationProvider(),
      goToPage: () => {},
      changePageSize: () => {},
    });
  }

  switch (domain) {
    case 'tourism': {
      const computePagination = tourismPagination(params);
      return (data) => {
        const pagination = computePagination(data);
        return {
          ...pagination,
          goToPage: (page) => {
            console.log('tourism goToPage callback');
            // router.push({
            //   ...router.currentRoute,
            //   query: { ...router.currentRoute.value.query, pagenumber: page },
            // });
            changeRouteQuery({ pagenumber: page });
          },
          changePageSize: (size) => {
            console.log('tourism changePageSize callback');
            // router.push({
            //   ...router.currentRoute,
            //   query: { ...router.currentRoute.value.query, pagesize: size },
            // });
            changeRouteQuery({ pagesize: size });
          },
        };
      };
    }
    case 'mobility': {
      const computePagination = mobilityPagination();
      return (data) => {
        const pagination = computePagination(data);
        return {
          ...pagination,
          goToPage: (page) => {
            console.log('mobility goToPage callback');
            // router.push({
            //   ...router.currentRoute,
            //   query: {
            //     ...router.currentRoute.value.query,
            //     offset: (page - 1) * pagination.pageSize,
            //   },
            // });
            changeRouteQuery({ offset: (page - 1) * pagination.pageSize });
          },
          changePageSize: (size) => {
            console.log('mobility changePageSize callback');
            // router.push({
            //   ...router.currentRoute,
            //   query: { ...router.currentRoute.value.query, limit: size },
            // });
            changeRouteQuery({ limit: size });
          },
        };
      };
    }
  }
};

export const tourismPagination = <T>(
  //   data: WithTourismPagination<T>,
  params: Record<string, string>
): ((data: T) => Pagination2) => {
  return (data: T) => {
    if (isWithTourismPagination<T>(data)) {
      const pageSize =
        params.pagesize != null
          ? parseInt(stringifyParameter(params.pagesize), 10)
          : 0;
      return tourismPaginationProvider<T>(data, { pageSize });
    }
    if (isWithArrayPagination<T>(data)) {
      const pageSize =
        params.pagesize != null
          ? parseInt(stringifyParameter(params.pagesize), 10)
          : 0;
      const currentPage =
        params.pagenumber != null
          ? parseInt(stringifyParameter(params.pagenumber), 10)
          : 0;
      return arrayPaginationProvider<T>(data, { pageSize, currentPage });
    }
    return defaultPaginationProvider();
  };
};

export const mobilityPagination = <T>(): ((data: T) => Pagination2) => {
  return (data: T) => {
    if (isWithMobilityPagination<T>(data)) {
      return mobilityPaginationProvider<T>(data);
    }
    return defaultPaginationProvider();
  };
};
