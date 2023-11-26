// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { storeToRefs } from 'pinia';
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
  } = storeToRefs(useDatasetInfoStore());

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
