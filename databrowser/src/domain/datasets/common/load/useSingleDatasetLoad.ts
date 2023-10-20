// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { computed } from 'vue';
import {
  buildAuthInterceptor,
  useBaseAxiosFetch,
} from '../../../api/client/fetcher/axios';
import { useSingleDatasetConfig } from './useSingleDatasetConfig';
import { CellComponent } from '../../../cellComponents/types';

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

  const subcategoriesWithLoadingSupport = computed(() => {
    if (!isLoading.value) {
      return subcategories.value;
    }

    return [...Array(5).keys()].map(() => ({
      name: '',
      properties: [...Array(5).keys()].map(() => ({
        title: '',
        component: CellComponent.LoadingCell,
        fields: {},
      })),
    }));
  });

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
    subcategories: subcategoriesWithLoadingSupport,
    currentCategory,
  };
};
