// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { MaybeRef } from 'vue';
import {
  buildAuthInterceptor,
  useBaseAxiosFetch,
} from '../../../api/client/fetcher/axios';

export const useSingleRecordLoadData = (
  fullPath: MaybeRef<string | undefined>
) => {
  useBaseAxiosFetch(fullPath, {
    beforeFetch: buildAuthInterceptor(),
  });
  const { data, error, isError, isLoading } = useBaseAxiosFetch(fullPath, {
    beforeFetch: buildAuthInterceptor(),
  });

  return {
    data,
    error,
    isError,
    isDataLoading: isLoading,
  };
};
