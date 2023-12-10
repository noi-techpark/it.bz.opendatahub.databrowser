// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { MaybeRef, Ref, computed, toValue } from 'vue';
import { DatasetDomain, DatasetQuery } from '../../datasets/config/types';
import { arrayPagination } from './arrayPagination';
import { emptyPagination } from './emptyPagination';
import { mobilityPagination } from './mobilityPagination';
import { tourismPagination } from './tourismPagination';
import {
  Pagination,
  isWithArrayPagination,
  isWithMobilityPagination,
  isWithTourismPagination,
} from './types';

export const computePagination = (
  domain: DatasetDomain | undefined,
  query: Record<string, string> | undefined,
  data: unknown
): Pagination => {
  if (
    data == null ||
    domain == null ||
    domain === 'no-dataset-domain-in-url' ||
    domain === 'unknown'
  ) {
    return emptyPagination();
  }

  switch (domain) {
    case 'tourism': {
      if (isWithTourismPagination(data)) {
        return tourismPagination(data, { query });
      }
      if (isWithArrayPagination(data)) {
        return arrayPagination(data);
      }
      return emptyPagination();
    }
    case 'mobility': {
      if (isWithMobilityPagination(data)) {
        return mobilityPagination(data);
      }
      if (isWithArrayPagination(data)) {
        return arrayPagination(data);
      }
      return emptyPagination();
    }
  }
};

export const usePagination = (
  domain: MaybeRef<DatasetDomain | undefined>,
  query: MaybeRef<DatasetQuery | undefined>,
  data: MaybeRef<unknown | undefined>
): Ref<Pagination> => {
  return computed<Pagination>(() => {
    const domainValue = toValue(domain);
    const queryValue = toValue(query)?.stringified;
    const dataValue = toValue(data);

    return computePagination(domainValue, queryValue, dataValue);
  });
};
