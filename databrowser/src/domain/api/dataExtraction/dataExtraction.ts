// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import {
  isWithTourismPagination,
  isWithArrayPagination,
  isWithMobilityPagination,
} from '../pagination/types';

export const unwrapData = <T = unknown>(data: unknown): T[] => {
  if (data == null) {
    return [];
  }

  if (isWithTourismPagination<T>(data)) {
    return data.Items;
  } else if (isWithArrayPagination<T>(data)) {
    return data;
  } else if (isWithMobilityPagination<T>(data)) {
    return data.data;
  }

  console.error(`Unknown data shape, returning empty array`);
  return [];
};
