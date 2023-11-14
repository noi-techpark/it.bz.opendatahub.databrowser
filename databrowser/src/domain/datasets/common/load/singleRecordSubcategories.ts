// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { MaybeRef, computed, toValue } from 'vue';
import { CellComponent } from '../../../cellComponents/types';
import { Category, SubCategory } from '../../category/types';

const subcategoriesCount = 5;
const propertiesCount = 5;

// Compute subcategories with loading support
export const computeSingleRecordSubcategories = (
  isLoading: boolean,
  category: Category | undefined
): SubCategory[] => {
  if (!isLoading) {
    return category?.subCategories || [];
  }

  return [...Array(subcategoriesCount).keys()].map(() => ({
    name: '',
    properties: [...Array(propertiesCount).keys()].map(() => ({
      title: '',
      component: CellComponent.LoadingCell,
      objectMappings: {},
    })),
  }));
};

export const useSingleRecordSubcategories = (
  isLoading: MaybeRef<boolean>,
  category: MaybeRef<Category | undefined>
) =>
  computed(() =>
    computeSingleRecordSubcategories(toValue(isLoading), toValue(category))
  );
