// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { toRefs } from 'vue';
import { useDatasetInfoStore } from '../../../datasetConfig/store/datasetInfoStore';

export const useSingleRecordLoadConfig = () => {
  const {
    isLoading: isConfigLoading,
    view,
    extractValueByPath,
    fullPath,
    datasetDomain,
    datasetPath,
    datasetQuery,
    isEmbeddedSource,
    isGeneratedSource,
    hasEditView,
    hasNewView,
    hasDetailView,
    hasQuickView,
    isNewView,
    addRecordSupported,
    editRecordSupported,
    // Note: using toRefs here instead of storeToRefs because storeToRefs
    // breaks hot module reload for the "view" property.
    // This could be an issue if some store properties were not present
    // during this invocation, but in our case we are sure that all properties
    // are present (in the store itself they are refs / computed values).
    // See also: https://github.com/vuejs/pinia/blob/v2/packages/pinia/src/storeToRefs.ts
  } = toRefs(useDatasetInfoStore());

  return {
    fullPath,
    addRecordSupported,
    editRecordSupported,
    hasDetailView,
    hasEditView,
    hasNewView,
    hasQuickView,
    isNewView,
    view,
    isConfigLoading,
    extractValueByPath,
    isEmbeddedSource,
    isGeneratedSource,
    datasetDomain,
    datasetPath,
    datasetQuery,
  };
};
