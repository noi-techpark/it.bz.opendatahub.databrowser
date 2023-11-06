// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { MaybeRef, computed, toValue } from 'vue';
import {
  DetailElements,
  DetailViewConfig,
  EditViewConfig,
  NewViewConfig,
  ViewConfig,
} from '../../../datasetConfig/types';
import { useI18n } from 'vue-i18n';

interface ComputeSingleRecordCategories {
  name: string;
  slug: string;
  subCategories: DetailElements['subcategories'];
  isAnyPropertyRequired: boolean;
}

export const computeSingleRecordCategories = (
  view: ViewConfig | undefined,
  isGeneratedSource: boolean
): ComputeSingleRecordCategories[] => {
  if (view == null) {
    return [];
  }

  const elements = (view as DetailViewConfig | EditViewConfig | NewViewConfig)
    ?.elements;

  // There are cases where there are no elements, e.g,
  // if permissions change. Do nothing in that case
  if (elements == null) {
    return [];
  }

  const fallbackName = useI18n().t('datasets.generated.categoryName');

  // Compute categories
  return elements.map((element) => {
    // If config is generated, use fallback name.
    // Otherwise, use name as defined by config
    const name = isGeneratedSource ? fallbackName : element.name;

    const isAnyPropertyRequired = hasAnyRequiredProperty(element);

    return {
      name,
      slug: element.slug,
      // to: {
      //   hash: `#${element.slug}`,
      //   query: currentRouteQuery,
      // },
      subCategories: element.subcategories,
      isAnyPropertyRequired,
    };
  });
};

export const useComputeSingleRecordCategories = (
  view: MaybeRef<ViewConfig | undefined>,
  isGeneratedSource: MaybeRef<boolean>
) =>
  computed(() =>
    computeSingleRecordCategories(toValue(view), toValue(isGeneratedSource))
  );

const hasAnyRequiredProperty = (element: DetailElements) =>
  element.subcategories.some((sub) =>
    sub.properties.some((prop) => prop.required === true)
  );
