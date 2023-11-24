// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { MaybeRef, computed, toValue } from 'vue';

const buildFallbackRows = (pageSize: number) =>
  [...Array(pageSize).keys()].map((_, index) => ({ Id: index }));

export const computeTableRows = (
  isLoading: boolean,
  data: unknown[] | null
) => {
  // If there are no items yet (e.g. because of initial load),
  // show a fallback table with empty rows
  if (isLoading) {
    return buildFallbackRows(25);
  }

  // If the data is null / undefined (e.g. because of an error),
  // show an empty table
  if (data == null) {
    return [];
  }

  // In all other cases, return just the data
  return data;
};

export const useTableRows = (
  isLoading: MaybeRef<boolean>,
  data: MaybeRef<unknown[] | null>
) => computed(() => computeTableRows(toValue(isLoading), toValue(data)));
