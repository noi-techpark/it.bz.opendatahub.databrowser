// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import {
  isWithTourismPagination,
  isWithArrayPagination,
  isWithMobilityPagination,
} from '../pagination/types';

export const unwrapData = (data: unknown): unknown[] => {
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
