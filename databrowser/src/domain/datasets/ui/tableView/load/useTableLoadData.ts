// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { MaybeRef } from 'vue';
import {
  buildAuthInterceptor,
  useBaseAxiosFetch,
} from '../../../../api/axiosFetcher';
import { unwrapData } from '../../../../api/dataExtraction';

export const useTableLoadData = (fullPath: MaybeRef<string | undefined>) => {
  const { data, error, isError, isLoading, responseData } = useBaseAxiosFetch(
    fullPath,
    {
      beforeFetch: buildAuthInterceptor(),
      afterFetch: (ctx) => unwrapData<unknown[]>(ctx.data),
    }
  );

  return {
    data,
    error,
    isError,
    isDataLoading: isLoading,
    responseData,
  };
};
