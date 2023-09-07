// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { computed } from 'vue';
import { PaginationData } from '../../../api';
import {
  buildAuthInterceptor,
  useBaseAxiosFetch,
} from '../../../api/client/fetcher/axios';
import { useSingleDatasetConfig } from './useSingleDatasetConfig';

const buildFallbackRows = (pageSize: number) =>
  [...Array(pageSize).keys()].map((_, index) => ({ Id: index }));

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
  };
};
