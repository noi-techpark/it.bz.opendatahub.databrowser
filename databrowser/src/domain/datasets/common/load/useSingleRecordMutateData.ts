// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { MaybeRef, computed, toValue } from 'vue';
import {
  buildAuthInterceptor,
  useBaseAxiosMutate,
} from '../../../api/client/axiosFetcher';

export const useSingleRecordMutateData = (
  fullPath: MaybeRef<string | undefined>,
  isNewView: MaybeRef<boolean>
) => {
  const method = computed(() => (toValue(isNewView) ? 'post' : 'put'));

  const { data, error, isLoading, isError, isSuccess, mutate } =
    useBaseAxiosMutate<any>(fullPath, {
      method,
      beforeFetch: buildAuthInterceptor(),
    });

  return {
    mutateData: data,
    mutateError: error,
    isMutateLoading: isLoading,
    isMutateError: isError,
    isMutateSuccess: isSuccess,
    mutate,
  };
};
