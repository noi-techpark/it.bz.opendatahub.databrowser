// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { MaybeRef } from 'vue';
import {
  buildAuthInterceptor,
  useBaseAxiosFetch,
} from '../../../api/client/fetcher/axios';
import { extractListData } from '../../../api/dataExtraction/dataExtraction';

export const useLoadTableData = (fullPath: MaybeRef<string | undefined>) => {
  const { data, responseData, isError, error, isLoading } = useBaseAxiosFetch(
    fullPath,
    {
      beforeFetch: buildAuthInterceptor(),
      afterFetch: (ctx) => extractListData(ctx.data),
    }
  );

  return {
    isDataLoading: isLoading,
    data,
    responseData,
    isError,
    error,
  };
};
