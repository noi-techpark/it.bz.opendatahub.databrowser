// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetConfig } from './types';
import { MaybeRef, ref, toValue, watch } from 'vue';
import { DatasetConfigSource } from './load/types';
import { loadDatasetConfig } from './load/datasetConfigLoader';
import { toError } from '../utils/errorConverter';

export const resolveDatasetConfig = async (
  preferredSource: DatasetConfigSource | undefined,
  domain: string | undefined,
  path: string[] | undefined
) => {
  if (preferredSource == null || domain == null || path == null) {
    console.group('Could not resolve data config: missing parameters');
    console.debug('Preferred source', preferredSource);
    console.debug('Domain', domain);
    console.debug('Path params', path);
    console.groupEnd();
    return;
  }

  return await loadDatasetConfig(preferredSource, domain, path);
};

export const useResolveDatasetConfig = (
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
      console.log('Resolving dataset config');

      isResolving.value = true;
      isError.value = false;
      error.value = undefined;

      try {
        datasetConfig.value = await resolveDatasetConfig(
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
