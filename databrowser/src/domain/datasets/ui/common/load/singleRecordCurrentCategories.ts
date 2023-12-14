// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { MaybeRef, computed, toValue } from 'vue';
import { Category } from '../../category/types';

export const computeSingleRecordCurrentCategory = (
  categories: Category[],
  slug: string
) => categories.find((category) => slug === category.slug);

export const useComputeSingleRecordCurrentCategory = (
  categories: MaybeRef<Category[]>,
  slug: MaybeRef<string>
) =>
  computed(() =>
    computeSingleRecordCurrentCategory(toValue(categories), toValue(slug))
  );
