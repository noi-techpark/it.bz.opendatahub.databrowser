// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { staticPagination } from '../mapper/staticPagination';
import { PaginationWithCallbackProvider } from '../types';

export const staticPaginationProvider = (): PaginationWithCallbackProvider => {
  return () => ({
    ...staticPagination(),
    goToPage: () => {},
    changePageSize: () => {},
  });
};
