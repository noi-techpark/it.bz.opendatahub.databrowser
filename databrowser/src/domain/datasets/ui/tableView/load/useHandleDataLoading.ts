// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { MaybeRef, computed, toValue } from 'vue';

export const handleDataLoading = (
  isLoading: boolean,
  data: unknown[] | null
) => {
  // While loading show a table with empty rows
  if (isLoading) {
    return [...Array(25).keys()];
  }

  // If the data is null / undefined (e.g. because of an error),
  // show an empty table
  if (data == null) {
    return [];
  }

  // In all other cases, return just the data
  return data;
};

export const useHandleDataLoading = (
  isLoading: MaybeRef<boolean>,
  data: MaybeRef<unknown[] | null>
) => computed(() => handleDataLoading(toValue(isLoading), toValue(data)));
