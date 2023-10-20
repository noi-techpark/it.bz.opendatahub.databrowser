// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { ref, watch } from 'vue';
import { Router, stringifyQuery, useRouter } from 'vue-router';
import { computeDatasetConfigForCurrentRoute } from '../../../datasetConfig/datasetConfig';
import { useDatasetPermissions } from '../../../datasetConfig/useDatasetPermissions';
import { Category, SubCategory } from '../../category/types';
import { DetailElements } from '../../../datasetConfig/types';
import { useI18n } from 'vue-i18n';

export const useSingleDatasetConfig = () => {
  const {
    resolvedDatasetConfig,
    allParams,
    isResolving,
    detailView,
    editView,
    newView,
    quickView,
    getDataForField,
  } = computeDatasetConfigForCurrentRoute();

  const url = ref<string>();
  const hasDetailView = ref(false);
  const hasEditView = ref(false);
  const hasNewView = ref(false);
  const hasQuickView = ref(false);

  const categories = ref<Category[]>([]);
  const subcategories = ref<SubCategory[]>([]);
  const slug = ref('');
  const currentCategory = ref<Category | undefined>();

  const { addRecordSupported, editRecordSupported } = useDatasetPermissions(
    resolvedDatasetConfig
  );

  const router = useRouter();
  const i18n = useI18n();

  watch(
    isResolving,
    (resolving) => {
      if (resolving) {
        return;
      }

      hasDetailView.value = resolvedDatasetConfig.value?.hasDetailView ?? false;
      hasEditView.value = resolvedDatasetConfig.value?.hasEditView ?? false;
      hasNewView.value = resolvedDatasetConfig.value?.hasNewView ?? false;
      hasQuickView.value = resolvedDatasetConfig.value?.hasQuickView ?? false;

      // Compute url
      url.value = computeUrl(
        resolvedDatasetConfig.value?.currentPath,
        allParams.value
      );

      // Compute categories
      if (
        !resolvedDatasetConfig.value?.isDetailView &&
        !resolvedDatasetConfig.value?.isEditView &&
        !resolvedDatasetConfig.value?.isNewView
      ) {
        slug.value = '';
        currentCategory.value = undefined;
        return;
      }

      const views = resolvedDatasetConfig.value?.config.views;
      const elements = resolvedDatasetConfig.value?.isNewView
        ? views?.new?.elements
        : resolvedDatasetConfig.value?.isDetailView
        ? views?.detail?.elements
        : views?.edit?.elements;

      // There are cases where there are no elements, e.g,
      // if permissions change. Do nothing in that case
      if (elements == null) {
        return;
      }

      // Handle slug
      slug.value = handleSlug(router, elements);

      // Compute categories
      categories.value = elements.map((element) => {
        // If config is generated, use translated name.
        // Otherwise, use name as defined by config
        const name =
          resolvedDatasetConfig.value?.source === 'generated'
            ? i18n.t('datasets.generated.categoryName')
            : element.name;

        const isAnyFieldRequired = hasAnyRequiredField(element);

        return {
          name,
          slug: element.slug,
          to: {
            hash: `#${element.slug}`,
            query: router.currentRoute.value.query,
          },
          subCategories: element.subcategories,
          isAnyFieldRequired,
        };
      });

      // Compute subcategories
      subcategories.value =
        elements.find((config) => config.slug === slug.value)?.subcategories ??
        [];

      // Compute current category
      currentCategory.value = categories.value.find(
        (category) => slug.value === category.slug
      );
    },
    { immediate: true }
  );

  return {
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
  };
};

const computeUrl = (
  currentPath: string | undefined,
  allParams: Record<string, string>
) => {
  if (currentPath == null) {
    return undefined;
  }

  const queryParams = stringifyQuery(allParams);

  return currentPath + (queryParams.length > 0 ? '?' + queryParams : '');
};

const handleSlug = (router: Router, elements?: DetailElements[]) => {
  const initialSlug = elements?.[0]?.slug ?? '';

  // Compute set of allowed slugs from render config
  const configuredSlugs = elements?.map((vc) => vc.slug) ?? [];
  const allowedSlugs = new Set(configuredSlugs);

  // Slug = URL hash value (if present) without leading '#'
  const slug = router.currentRoute.value.hash?.substring(1);

  // Check if slug is string of length > 0 and that an according slug exists
  const isSlugValid = slug != null && slug.length > 0 && allowedSlugs.has(slug);

  // If slug is not valid, then remove it from URL and return initial slug
  if (!isSlugValid) {
    router.replace({
      hash: '',
      query: router.currentRoute.value.query,
    });

    return initialSlug;
  }

  // Return slug
  return slug;
};

const hasAnyRequiredField = (element: DetailElements) =>
  element.subcategories.some((sub) =>
    sub.properties.some((prop) => prop.required === true)
  );
