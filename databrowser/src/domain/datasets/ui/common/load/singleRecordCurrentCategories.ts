// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { MaybeRef, computed, toValue } from 'vue';
import { Category } from '../../category/types';

export const computeSingleRecordCurrentCategory = (
  categories: Category[],
  slug: string
) => {
  const foundMainCategory = categories.find(
    (category) => slug === category.slug
  );

  if (foundMainCategory) return foundMainCategory;

  const categoriesSubElements = categories
    .filter((item) => item.subElements)
    .flatMap((item) => item.subElements);

  return categoriesSubElements.find((item) => item?.elements?.slug === slug)
    ?.elements;
};

export const useComputeSingleRecordCurrentCategory = (
  categories: MaybeRef<Category[]>,
  slug: MaybeRef<string>
) =>
  computed(() =>
    computeSingleRecordCurrentCategory(toValue(categories), toValue(slug))
  );
