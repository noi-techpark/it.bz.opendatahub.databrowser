// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { MaybeRef, computed, toValue } from 'vue';
import { useI18n } from 'vue-i18n';
import { DetailElements, SubCategoryElement } from '../../../config/types';
import {
  ViewConfigWithType,
  isSingleRecordViewConfig,
} from '../../../view/types';

export interface ComputeSingleRecordCategories {
  name: string;
  slug: string;
  visible: boolean;
  subCategories: SubCategoryElement[];
  subElements?: {
    objectPath: string;
    elements: ComputeSingleRecordCategories;
  }[];
  isAnyPropertyRequired: boolean;
}

export const computeSingleRecordCategories = (
  view: ViewConfigWithType | undefined,
  isGeneratedSource: boolean,
  categoryFallbackName = 'All data'
): ComputeSingleRecordCategories[] => {
  if (!isSingleRecordViewConfig(view)) {
    return [];
  }

  const elements = view.elements;

  // There are cases where there are no elements, e.g,
  // if permissions change. Do nothing in that case
  if (elements == null) {
    return [];
  }

  // Compute categories
  return elements.map((element) => {
    // If config is generated, use fallback name.
    // Otherwise, use name as defined by config
    const name = isGeneratedSource ? categoryFallbackName : element.name;

    const isAnyPropertyRequired = hasAnyRequiredProperty(element);

    return {
      name,
      visible: element.visible !== false,
      slug: element.slug,
      subCategories: element.subcategories,
      subElements: element.subElements?.map((item) => {
        return {
          objectPath: item.objectPath,
          elements: {
            name: item.elements.name,
            slug: item.elements.slug,
            visible: item.elements.visible !== false,
            subCategories: item.elements.subcategories,
            isAnyPropertyRequired: hasAnyRequiredProperty(item.elements),
          },
        };
      }),
      isAnyPropertyRequired,
    };
  });
};

export const useComputeSingleRecordCategories = (
  view: MaybeRef<ViewConfigWithType | undefined>,
  isGeneratedSource: MaybeRef<boolean>
) => {
  const categoryFallbackName = useI18n().t('datasets.generated.categoryName');
  return computed(() =>
    computeSingleRecordCategories(
      toValue(view),
      toValue(isGeneratedSource),
      categoryFallbackName
    )
  );
};

const hasAnyRequiredProperty = (element: DetailElements) =>
  element.subcategories?.some((sub) =>
    sub.properties.some((prop) => prop.required === true)
  );
