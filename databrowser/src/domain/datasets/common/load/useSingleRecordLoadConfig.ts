// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { storeToRefs } from 'pinia';
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
  } = storeToRefs(useDatasetInfoStore());

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
