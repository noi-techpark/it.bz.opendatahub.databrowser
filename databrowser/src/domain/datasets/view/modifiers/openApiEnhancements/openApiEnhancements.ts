// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { MaybeRef, ref, toValue, watchEffect } from 'vue';
import {
  domainIsKnownToHaveOpenApiDocument,
  useOpenApi,
} from '../../../../openApi';
import {
  DatasetDomain,
  DatasetPath,
  ViewConfig,
  ViewKey,
} from '../../../config/types';
import { computeViewWithOpenApiEnhancements } from './computeDeprecationAndRequired';

export const useOpenApiEnhancements = (
  datasetDomain: MaybeRef<DatasetDomain | undefined>,
  datasetPath: MaybeRef<DatasetPath | undefined>,
  viewKey: MaybeRef<ViewKey | undefined>,
  view: MaybeRef<ViewConfig | undefined>
) => {
  const viewWithOpenApiEnhancements = ref(toValue(view));

  watchEffect(async () => {
    const datasetDomainValue = toValue(datasetDomain);
    const datasetPathValue = toValue(datasetPath);
    const viewKeyValue = toValue(viewKey);
    const viewValue = toValue(view);

    // Assign the original view value to the reactive viewWithOpenApiEnhancements
    // because the original view value is the default value that is returned if the
    // OpenAPI documents are loading or the enhancements fail.
    viewWithOpenApiEnhancements.value = viewValue;

    // If any of the values needed for computation is undefined, do nothing
    if (
      datasetDomainValue == null ||
      datasetPathValue == null ||
      viewValue == null ||
      viewKeyValue == null
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
          viewKeyValue,
          viewValue
        );
        viewWithOpenApiEnhancements.value = view;
      });
  });

  return viewWithOpenApiEnhancements;
};
