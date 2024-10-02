// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { reactiveComputed } from '@vueuse/core';
import { MaybeRef, toRefs, toValue, watch } from 'vue';
import { useRouter } from 'vue-router';
import {
  ViewConfigWithType,
  isSingleRecordViewConfig,
} from '../../../view/types';

interface ComputeSingleRecordSlug {
  slug: string;
  isSlugValid: boolean;
}

export const computeSingleRecordSlug = (
  view: ViewConfigWithType | undefined,
  currentRouteHash: string | undefined
): ComputeSingleRecordSlug => {
  if (!isSingleRecordViewConfig(view)) {
    return { slug: '', isSlugValid: false };
  }
  const elements = view.elements;

  const initialSlug = elements?.[0]?.slug ?? '';

  // Compute set of allowed slugs from render config
  const configuredMainSlugs = elements?.map((vc) => vc.slug) ?? [];
  const configuredSubSlugs =
    elements?.flatMap((item) =>
      item.subElements?.map((item) => item.elements.slug)
    ) ?? [];

  const allowedSlugs = new Set([...configuredMainSlugs, ...configuredSubSlugs]);

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
  view: MaybeRef<ViewConfigWithType | undefined>,
  currentRouteHash: MaybeRef<string | undefined>
) => {
  const result = reactiveComputed(() =>
    computeSingleRecordSlug(toValue(view), toValue(currentRouteHash))
  );

  return toRefs(result);
};

export const useComputeSingleRecordSlugWithRouter = (
  view: MaybeRef<ViewConfigWithType | undefined>
) => {
  const router = useRouter();

  const result = reactiveComputed(() =>
    computeSingleRecordSlug(
      toValue(view),
      toValue(router.currentRoute.value.hash)
    )
  );

  watch(
    () => result.isSlugValid,
    (isSlugValid) => {
      if (!isSlugValid) {
        router.replace({
          hash: '',
          query: router.currentRoute.value.query,
        });
      }
    }
  );

  return toRefs(result);
};
