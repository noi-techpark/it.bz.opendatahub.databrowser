// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { computed } from 'vue';
import { useSingleRecordLoadConfig } from './useSingleRecordLoadConfig';
import { useSingleRecordSubcategories } from './singleRecordSubcategories';
import { useSingleRecordLoadData } from './useSingleRecordLoadData';
import { useComputeSingleRecordSlugWithRouter } from './singleRecordSlug';
import { useComputeSingleRecordCategories } from './singleRecordCategories';
import { useComputeSingleRecordCurrentCategory } from './singleRecordCurrentCategories';

export const useSingleRecordLoad = () => {
  // Load single record config
  const {
    fullPath,
    normalizedPath,
    addRecordSupported,
    editRecordSupported,
    hasDetailView,
    hasEditView,
    hasNewView,
    hasQuickView,
    view,
    isConfigLoading,
    getDataForField,
    isEmbeddedSource,
    isGeneratedSource,
  } = useSingleRecordLoadConfig();

  // Load single record data
  const { data, error, isError, isDataLoading } =
    useSingleRecordLoadData(normalizedPath);

  // Compute loading state
  const isLoading = computed(
    () => isConfigLoading.value || isDataLoading.value
  );

  // Compute slug and handle slug routing
  const { slug } = useComputeSingleRecordSlugWithRouter(view);

  // Compute categories
  const categories = useComputeSingleRecordCategories(view, isGeneratedSource);

  // Compute current category
  const currentCategory = useComputeSingleRecordCurrentCategory(
    categories,
    slug
  );

  // Compute subcategories with loading support
  const subcategories = useSingleRecordSubcategories(
    isLoading,
    currentCategory
  );

  return {
    data,
    addRecordSupported,
    editRecordSupported,
    hasDetailView,
    hasEditView,
    hasNewView,
    hasQuickView,
    view,
    isError,
    isLoading,
    error,
    fullPath,
    getDataForField,
    isEmbeddedSource,
    isGeneratedSource,
    slug,
    categories,
    subcategories,
    currentCategory,
  };
};
