// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useDatasetConfigStore } from '../../../datasetConfig/store/datasetConfigStore';
import { storeToRefs } from 'pinia';

export const useSingleRecordLoadConfig = () => {
  const {
    isResolving,
    view,
    getDataForField,
    fullPath,
    isEmbeddedSource,
    isGeneratedSource,
    hasEditView,
    hasNewView,
    hasDetailView,
    hasQuickView,
    addRecordSupported,
    editRecordSupported,
  } = storeToRefs(useDatasetConfigStore());

  return {
    fullPath,
    addRecordSupported,
    editRecordSupported,
    hasDetailView,
    hasEditView,
    hasNewView,
    hasQuickView,
    view,
    isConfigLoading: isResolving,
    getDataForField,
    isEmbeddedSource,
    isGeneratedSource,
  };
};

// const handleSlug = (router: Router, elements?: DetailElements[]) => {
//   const initialSlug = elements?.[0]?.slug ?? '';

//   // Compute set of allowed slugs from render config
//   const configuredSlugs = elements?.map((vc) => vc.slug) ?? [];
//   const allowedSlugs = new Set(configuredSlugs);

//   // Slug = URL hash value (if present) without leading '#'
//   const slug = router.currentRoute.value.hash?.substring(1);

//   // Check if slug is string of length > 0 and that an according slug exists
//   const isSlugValid = slug != null && slug.length > 0 && allowedSlugs.has(slug);

//   // If slug is not valid, then remove it from URL and return initial slug
//   if (!isSlugValid) {
//     router.replace({
//       hash: '',
//       query: router.currentRoute.value.query,
//     });

//     return initialSlug;
//   }

//   // Return slug
//   return slug;
// };

// const hasAnyRequiredField = (element: DetailElements) =>
//   element.subcategories.some((sub) =>
//     sub.properties.some((prop) => prop.required === true)
//   );
