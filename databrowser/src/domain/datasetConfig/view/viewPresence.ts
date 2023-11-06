// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { MaybeRef, ToRefs, toRefs, toValue } from 'vue';
import { DatasetConfig } from '../types';
import { reactiveComputed } from '@vueuse/core';

interface ComputeViewPresence {
  hasTableView: boolean;
  hasEditView: boolean;
  hasNewView: boolean;
  hasDetailView: boolean;
  hasQuickView: boolean;
  hasRawView: boolean;
}

export const computeViewPresence = (
  datasetConfig: DatasetConfig | undefined
): ComputeViewPresence => ({
  hasTableView: datasetConfig?.views?.table != null,
  hasDetailView: datasetConfig?.views?.detail != null,
  hasEditView: datasetConfig?.views?.edit != null,
  hasNewView: datasetConfig?.views?.new != null,
  hasQuickView: datasetConfig?.views?.quick != null,
  hasRawView: datasetConfig?.views?.raw != null,
});

export const useComputeViewPresence = (
  datasetConfig: MaybeRef<DatasetConfig | undefined>
): ToRefs<ComputeViewPresence> => {
  const result = reactiveComputed(() =>
    computeViewPresence(toValue(datasetConfig))
  );

  return toRefs(result);
};
