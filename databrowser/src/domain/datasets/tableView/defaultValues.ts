// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Pagination, defaultPagination } from '../../api';
import { defaultLanguage } from '../language';

export const pageSizeOptions: { value: string; label: string }[] = [
  {
    value: '25',
    label: '25',
  },
  {
    value: '50',
    label: '50',
  },
  {
    value: '75',
    label: '75',
  },
  {
    value: '100',
    label: '100',
  },
];

export const validPageSizes = pageSizeOptions.map((option) => option.value);

export const defaultPageSize = Number(pageSizeOptions[0].value);

export const defaultTourismTablePageNumber = 1;
export const defaultTourismTableQueryParameters = {
  pagesize: defaultPageSize.toString(),
  pagenumber: defaultTourismTablePageNumber.toString(),
  language: defaultLanguage,
};

export const defaultMobilityTablePageNumber = 0;
export const defaultMobilityTableQueryParameters = {
  limit: defaultPageSize.toString(),
  offset: defaultMobilityTablePageNumber.toString(),
};

export const defaultTablePagination: Pagination = {
  ...defaultPagination,
  pageSize: defaultPageSize,
};
