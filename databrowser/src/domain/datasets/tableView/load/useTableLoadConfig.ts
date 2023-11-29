// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { toRefs } from 'vue';
import { useDatasetInfoStore } from '../../../datasetConfig/store/datasetInfoStore';

export const useTableLoadConfig = () => {
  const {
    isLoading,
    view,
    fullPath,
    hasDetailView,
    hasQuickView,
    datasetDomain,
    datasetPath,
    datasetQuery,
    editRecordSupported,
    // Note: using toRefs here instead of storeToRefs because storeToRefs
    // breaks hot module reload for the "view" property.
    // This could be an issue if some store properties were not present
    // during this invocation, but in our case we are sure that all properties
    // are present (in the store itself they are refs / computed values).
    // See also: https://github.com/vuejs/pinia/blob/v2/packages/pinia/src/storeToRefs.ts
  } = toRefs(useDatasetInfoStore());

  return {
    datasetDomain,
    datasetQuery,
    datasetPath,
    isConfigLoading: isLoading,
    view,
    fullPath,
    hasDetailView,
    hasQuickView,
    editRecordSupported,
  };
};
