// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { MaybeRef, ToRefs, toRefs, toValue } from 'vue';
import { DatasetConfig } from './types';
import { reactiveComputed } from '@vueuse/core';

interface ComputeDatasetConfigSource {
  isEmbeddedSource: boolean;
  isGeneratedSource: boolean;
}

export const computeDatasetConfigSource = (
  datasetConfig?: DatasetConfig
): ComputeDatasetConfigSource => ({
  isEmbeddedSource: datasetConfig?.source === 'embedded',
  isGeneratedSource: datasetConfig?.source === 'generated',
});

export const useDatasetConfigSourceComputations = (
  datasetConfig: MaybeRef<DatasetConfig | undefined>
): ToRefs<ComputeDatasetConfigSource> => {
  const result = reactiveComputed(() =>
    computeDatasetConfigSource(toValue(datasetConfig))
  );

  return toRefs(result);
};
