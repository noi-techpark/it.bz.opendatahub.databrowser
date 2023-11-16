// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { MaybeRef, computed, toValue } from 'vue';
import { buildAuthInterceptor, useBaseAxiosFetch } from '../../../api';

export const useSingleRecordLoadData = (
  normalizedPath: MaybeRef<string | undefined>,
  isNewView: MaybeRef<boolean>
) => {
  // Don't fetch data if we are in a new view
  const enabled = computed(() => !toValue(isNewView));

  const { data, error, isError, isLoading } = useBaseAxiosFetch(
    normalizedPath,
    {
      beforeFetch: buildAuthInterceptor(),
      enabled,
    }
  );

  return {
    data,
    error,
    isError,
    isDataLoading: isLoading,
  };
};
