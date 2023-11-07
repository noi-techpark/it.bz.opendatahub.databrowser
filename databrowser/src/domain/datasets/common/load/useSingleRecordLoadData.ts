// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { MaybeRef } from 'vue';
import {
  buildAuthInterceptor,
  useBaseAxiosFetch,
} from '../../../api/client/axiosFetcher';

export const useSingleRecordLoadData = (
  normalizedPath: MaybeRef<string | undefined>
) => {
  const { data, error, isError, isLoading } = useBaseAxiosFetch(
    normalizedPath,
    {
      beforeFetch: buildAuthInterceptor(),
    }
  );

  return {
    data,
    error,
    isError,
    isDataLoading: isLoading,
  };
};
