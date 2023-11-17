// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetConfig } from './types';
import { MaybeRef, computed, ref, toValue, watch } from 'vue';
import { DatasetConfigSource } from './load/types';
import { loadDatasetConfig } from './load/datasetConfigLoader';
import { toError } from '../utils/convertError';

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

  // Convert path to string for comparison in the watcher below.
  // The reason to do this is that the path is an array and therefore
  // a reference type. This means that the watcher triggers also when
  // the content of the array stays the same, but the reference changes,
  // which may happen e.g. when the route changes and the path array
  // is recreated. Since we are only interested in the content of the
  // array, we convert it to a string and use the string as the value
  // to compare in the watcher.
  const pathAsString = computed(() => toValue(path)?.join('/'));

  watch(
    [() => toValue(preferredSource), () => toValue(domain), pathAsString],
    async ([preferredSourceValue, domainValue]) => {
      console.log('Resolving dataset config');

      isResolving.value = true;
      isError.value = false;
      error.value = undefined;

      try {
        const pathValue = toValue(path);
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
