// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useRouter } from 'vue-router';
import { DetailViewConfig, ViewConfig } from '../../../datasetConfig/types';
import { MaybeRef, toRefs, toValue, watchEffect } from 'vue';
import { reactiveComputed } from '@vueuse/core';

interface ComputeSingleRecordSlug {
  slug: string;
  isSlugValid: boolean;
}

export const computeSingleRecordSlug = (
  view: ViewConfig | undefined,
  currentRouteHash: string | undefined
): ComputeSingleRecordSlug => {
  const elements = (view as DetailViewConfig)?.elements;

  const initialSlug = elements?.[0]?.slug ?? '';

  // Compute set of allowed slugs from render config
  const configuredSlugs = elements?.map((vc) => vc.slug) ?? [];
  const allowedSlugs = new Set(configuredSlugs);

  // Slug = URL hash value (if present) without leading '#'
  const slug = currentRouteHash?.substring(1);

  // Check if slug is string of length > 0 and that an according slug exists
  const isSlugValid = slug != null && slug.length > 0 && allowedSlugs.has(slug);

  // If slug is not valid, then return the initial slug
  if (!isSlugValid) {
    return { slug: initialSlug, isSlugValid };
  }

  // Return slug
  return { slug, isSlugValid };
};

export const useComputeSingleRecordSlug = (
  view: MaybeRef<ViewConfig | undefined>,
  currentRouteHash: MaybeRef<string | undefined>
) => {
  const result = reactiveComputed(() =>
    computeSingleRecordSlug(toValue(view), toValue(currentRouteHash))
  );

  return toRefs(result);
};

export const useComputeSingleRecordSlugWithRouter = (
  view: MaybeRef<ViewConfig | undefined>
) => {
  const router = useRouter();

  const result = reactiveComputed(() =>
    computeSingleRecordSlug(
      toValue(view),
      toValue(router.currentRoute.value.hash)
    )
  );

  watchEffect(() => {
    if (!result.isSlugValid) {
      router.replace({
        hash: '',
        query: router.currentRoute.value.query,
      });
    }
  });

  return toRefs(result);
};
