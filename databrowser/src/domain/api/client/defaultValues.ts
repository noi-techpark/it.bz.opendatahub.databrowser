// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Pagination } from '../pagination/types';

export const defaultPagination: Pagination = {
  totalItems: 0,
  pageCount: 0,
  pageSize: 0,
  currentPage: 1,
  hasPrevious: false,
  hasNext: false,
  goToPage: () => {},
  changePageSize: () => {},
};
