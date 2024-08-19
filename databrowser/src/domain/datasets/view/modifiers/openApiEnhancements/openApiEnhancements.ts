// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { MaybeRef, Ref, ref, toValue, watchEffect } from 'vue';
import {
  domainIsKnownToHaveOpenApiDocument,
  useOpenApi,
} from '../../../../openApi';
import { DatasetDomain, DatasetPath } from '../../../config/types';
import { ViewConfigWithType } from '../../types';
import { computeViewWithOpenApiEnhancements } from './computeDeprecationAndRequiredAndReference';

export const useOpenApiEnhancements = (
  datasetDomain: MaybeRef<DatasetDomain | undefined>,
  datasetPath: MaybeRef<DatasetPath | undefined>,
  view: MaybeRef<ViewConfigWithType | undefined>
): Ref<ViewConfigWithType | undefined> => {
  const viewWithOpenApiEnhancements = ref<ViewConfigWithType | undefined>(
    toValue(view)
  );

  watchEffect(async () => {
    const datasetDomainValue = toValue(datasetDomain);
    const datasetPathValue = toValue(datasetPath);
    const viewValue = toValue(view);

    // Assign the original view value to the reactive viewWithOpenApiEnhancements
    // because the original view value is the default value that is returned if the
    // OpenAPI documents are loading or the enhancements fail.
    viewWithOpenApiEnhancements.value = viewValue;

    // If any of the values needed for computation is undefined, do nothing
    if (
      datasetDomainValue == null ||
      datasetPathValue == null ||
      viewValue == null
    ) {
      return;
    }

    // Check that domain is known to have an OpenAPI document
    if (!domainIsKnownToHaveOpenApiDocument(datasetDomainValue)) {
      console.warn(
        `Domain ${datasetDomainValue} is not known to have an OpenAPI document, view is not enhanced with OpenAPI information.`
      );
      return;
    }

    // Load OpenAPI document and then enhance view
    useOpenApi()
      .loadDocument(datasetDomainValue)
      .then((doc) => {
        const view = computeViewWithOpenApiEnhancements(
          doc,
          datasetDomainValue,
          datasetPathValue,
          viewValue
        );
        viewWithOpenApiEnhancements.value = view;
      });
  });

  return viewWithOpenApiEnhancements;
};
