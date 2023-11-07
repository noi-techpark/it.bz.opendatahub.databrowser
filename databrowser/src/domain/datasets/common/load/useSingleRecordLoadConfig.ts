// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { storeToRefs } from 'pinia';
import { useDatasetConfigStore } from '../../../datasetConfig/store/datasetConfigStore';
import { useNormalizePath } from './normalizedPath';

export const useSingleRecordLoadConfig = () => {
  const {
    isResolving,
    view,
    getDataForField,
    fullPath,
    datasetDomain,
    isEmbeddedSource,
    isGeneratedSource,
    hasEditView,
    hasNewView,
    hasDetailView,
    hasQuickView,
    addRecordSupported,
    editRecordSupported,
  } = storeToRefs(useDatasetConfigStore());

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
    view,
    isConfigLoading: isResolving,
    getDataForField,
    isEmbeddedSource,
    isGeneratedSource,
  };
};
