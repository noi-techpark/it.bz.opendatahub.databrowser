// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { MaybeRef } from 'vue';
import { buildAuthInterceptor, useBaseAxiosFetch } from '../../api';
import { unwrapData } from '../../api/dataExtraction/dataExtraction';

export const useLoadData = (fullPath: MaybeRef<string | undefined>) => {
  const { data, responseData, isError, error, isLoading } = useBaseAxiosFetch(
    fullPath,
    {
      beforeFetch: buildAuthInterceptor(),
      afterFetch: (ctx) => unwrapData(ctx.data),
    }
  );

  return {
    data,
    responseData,
    isError,
    error,
    isLoading,
  };
};
