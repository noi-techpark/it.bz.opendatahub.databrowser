// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import {
  isWithArrayPagination,
  isWithMobilityPagination,
  isWithTourismPagination,
} from '../data/pagination/types';

export const unwrapData = <T>(data: unknown): T => {
  if (data == null) {
    return [] as T;
  }

  if (isWithTourismPagination<T>(data)) {
    return data.Items as T;
  } else if (isWithArrayPagination<T>(data)) {
    return data as T;
  } else if (isWithMobilityPagination<T>(data)) {
    return data.data as T;
  }

  return data as T;
};
