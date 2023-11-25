// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { storeToRefs } from 'pinia';
import { useDatasetInfoStore } from '../../../datasetConfig/store/datasetInfoStore';
import { useNormalizePath } from './normalizedPath';

export const useSingleRecordLoadConfig = () => {
  const {
    isLoading: isConfigLoading,
    view,
    extractValueByPath,
    fullPath,
    datasetDomain,
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

  const normalizedPath = useNormalizePath(fullPath, datasetDomain);

  return {
    fullPath,
    normalizedPath,
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
  };
};
