// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import {
  isWithArrayPagination,
  isWithMobilityPagination,
  isWithTourismPagination,
} from '../../../api';
import { Domain } from '../../../datasetConfig/types';
import { domainIsKnownToHaveOpenApiDocument } from '../../../openApi';

const identity = <T = unknown, S = T>(data: T) => data as unknown as S;

export const extractTableData = <T = unknown, S = unknown>(
  domain: Domain | undefined
): ((data: T) => S) => {
  if (!domainIsKnownToHaveOpenApiDocument(domain)) {
    console.error(
      `No data extraction algorithm found for domain ${domain}, returning identity function`
    );
    return identity;
  }

  switch (domain) {
    case 'tourism':
      return tourismDataExtractor();
    case 'mobility':
      return mobilityDataExtractor();
  }
};

const tourismDataExtractor = <T = unknown, S = unknown>(): ((data: T) => S) => {
  return (data) => {
    if (isWithTourismPagination<T>(data)) {
      return data.Items as unknown as S;
    } else if (isWithArrayPagination<T>(data)) {
      return data as unknown as S;
    }

    console.error(
      `Pagination type could not be recognized, returning identity function`
    );
    return [] as unknown as S;
  };
};

const mobilityDataExtractor = <T = unknown, S = unknown>(): ((
  data: T
) => S) => {
  return (data) => {
    if (isWithMobilityPagination<T>(data)) {
      return data as unknown as S;
    }

    console.error(
      `Pagination type could not be recognized, returning identity function`
    );
    return [] as unknown as S;
  };
};
