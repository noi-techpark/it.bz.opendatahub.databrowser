// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetConfig } from './types';
import { MaybeRef, ref, toValue, watch } from 'vue';
import { DatasetConfigSource } from './loader/types';
import { loadDatasetConfig } from './loader/dispatchingLoader';
import { toError } from '../utils/errorConverter';

export const useDatasetConfigResolver = (
  preferredSource: MaybeRef<DatasetConfigSource | undefined>,
  domain: MaybeRef<string | undefined>,
  path: MaybeRef<string[] | undefined>
) => {
  const isResolving = ref(false);
  const datasetConfig = ref<DatasetConfig>();
  const isError = ref(false);
  const error = ref<Error>();

  watch(
    [
      () => toValue(preferredSource),
      () => toValue(domain),
      () => toValue(path),
    ],
    async ([preferredSourceValue, domainValue, pathValue]) => {
      isResolving.value = true;
      isError.value = false;
      error.value = undefined;

      if (
        preferredSourceValue == null ||
        domainValue == null ||
        pathValue == null
      ) {
        console.group('Could not resolve data config: missing parameters');
        console.debug('Preferred source', preferredSourceValue);
        console.debug('Domain', domainValue);
        console.debug('Path params', pathValue);
        console.groupEnd();
        datasetConfig.value = undefined;

        isResolving.value = false;
        return;
      }

      try {
        datasetConfig.value = await loadDatasetConfig(
          preferredSourceValue,
          domainValue,
          pathValue
        );
      } catch (err) {
        console.error(err);
        datasetConfig.value = undefined;
        isError.value = true;
        error.value = toError(err);
      }

      isResolving.value = false;
    },
    { immediate: true }
  );

  return {
    isResolving,
    isError,
    datasetConfig,
    error,
  };
};
