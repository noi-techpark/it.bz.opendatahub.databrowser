// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { MaybeRef, computed, toValue } from 'vue';
import { buildAuthInterceptor, useBaseAxiosFetch } from '../../../api';
import { DatasetDomain } from '../../../datasetConfig/types';
import { useNormalizePath } from './normalizedPath';

export const useSingleRecordLoadData = (
  datasetDomain: MaybeRef<DatasetDomain | undefined>,
  fullPath: MaybeRef<string | undefined>,
  isNewView: MaybeRef<boolean>
) => {
  const normalizedPath = useNormalizePath(fullPath, datasetDomain);

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
