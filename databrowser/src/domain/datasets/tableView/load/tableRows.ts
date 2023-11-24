// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { MaybeRef, computed, toValue } from 'vue';

export const computeTableRows = (
  isLoading: boolean,
  data: unknown[] | null
) => {
  // While loading show a table with empty rows
  if (isLoading) {
    return Array(25);
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
