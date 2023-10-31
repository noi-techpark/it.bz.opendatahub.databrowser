// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Pagination2 } from '../..';

export const defaultPaginationProvider = (): Pagination2 => ({
  totalItems: 0,
  pageCount: 0,
  pageSize: 0,
  currentPage: 1,
  hasPrevious: false,
  hasNext: false,
});
