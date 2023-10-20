// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { computed } from 'vue';
import {
  buildAuthInterceptor,
  useBaseAxiosFetch,
} from '../../../api/client/fetcher/axios';
import { useSingleDatasetConfig } from './useSingleDatasetConfig';

export const useSingleDatasetLoad = <T = unknown>() => {
  // Resolve view config
  const {
    url,
    allParams,
    addRecordSupported,
    editRecordSupported,
    hasDetailView,
    hasEditView,
    hasNewView,
    hasQuickView,
    detailView,
    editView,
    newView,
    quickView,
    isResolving,
    getDataForField,
    slug,
    categories,
    subcategories,
    currentCategory,
  } = useSingleDatasetConfig();

  // Fetch data
  const {
    data,
    error,
    isError,
    isLoading: isDataLoading,
  } = useBaseAxiosFetch<T | null, T>(url, {
    beforeFetch: buildAuthInterceptor(),
  });

  const isLoading = computed(() => isResolving.value || isDataLoading.value);

  console.log('useSingleDatasetLoad');

  // isNewView.value
  //   ? {
  //       isError: ref(false),
  //       isLoading: ref(false),
  //       data: ref(),
  //       error: ref(),
  //       url: computed(() => datasetConfigStore.currentPath ?? ''),
  //     }
  //   : useSingleDatasetLoad();

  return {
    data,
    allParams,
    addRecordSupported,
    editRecordSupported,
    hasDetailView,
    hasEditView,
    hasNewView,
    hasQuickView,
    detailView,
    editView,
    newView,
    quickView,
    isError,
    isLoading,
    error,
    url,
    getDataForField,
    slug,
    categories,
    subcategories,
    currentCategory,
  };
};
