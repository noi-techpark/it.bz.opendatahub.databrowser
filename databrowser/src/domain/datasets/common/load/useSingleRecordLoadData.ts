// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { MaybeRef, watchEffect } from 'vue';
import {
  buildAuthInterceptor,
  useBaseAxiosFetch,
} from '../../../api/client/axiosFetcher';

export const useSingleRecordLoadData = (
  fullPath: MaybeRef<string | undefined>
) => {
  const { data, error, isError, isLoading } = useBaseAxiosFetch(fullPath, {
    beforeFetch: buildAuthInterceptor(),
  });

  watchEffect(() => console.log('fullPath', fullPath));

  return {
    data,
    error,
    isError,
    isDataLoading: isLoading,
  };
};
