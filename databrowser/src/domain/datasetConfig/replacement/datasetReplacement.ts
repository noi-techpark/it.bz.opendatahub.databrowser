// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import {
  DatasetConfig,
  DatasetQuery,
  ToMaybeRefs,
  ViewConfig,
  ViewKey,
} from '../types';
import { usePropertyMapping } from '../../api';
import { buildFieldReplacer } from '../fieldReplacer';
import { applyReplacementsToView } from '../view/enhanceView';
import { reactiveComputed } from '@vueuse/core';
import { ToRefs, toRefs, toValue } from 'vue';

const { mapWithIndex } = usePropertyMapping();

interface ComputeDatasetReplacement {
  view: ViewConfig | undefined;
  getDataForField: (data: unknown, name: string) => unknown;
}

interface ComputeDatasetReplacementParams {
  datasetConfig: DatasetConfig | undefined;
  viewKey: ViewKey | undefined;
  datasetQuery: DatasetQuery | undefined;
}

export const computeDatasetReplacement = ({
  datasetConfig,
  viewKey,
  datasetQuery,
}: ComputeDatasetReplacementParams): ComputeDatasetReplacement => {
  const { replaceFields } = buildFieldReplacer(datasetQuery);
  const getDataForField = (data: unknown, name: string) => {
    const fieldWithReplacements = replaceFields({
      field: name,
    });
    return mapWithIndex(data, fieldWithReplacements).field;
  };

  if (viewKey == null || datasetConfig == null) {
    return {
      view: undefined,
      getDataForField,
    };
  }

  const view = applyReplacementsToView(viewKey, datasetConfig, replaceFields);

  return {
    view,
    getDataForField,
  };
};

export const useComputeDatasetReplacement = (
  params: ToMaybeRefs<ComputeDatasetReplacementParams>
): ToRefs<ComputeDatasetReplacement> => {
  const result = reactiveComputed(() => {
    const datasetConfig = toValue(params.datasetConfig);
    const viewKey = toValue(params.viewKey);
    const datasetQuery = toValue(params.datasetQuery);

    return computeDatasetReplacement({
      datasetConfig,
      viewKey,
      datasetQuery,
    });
  });

  return toRefs(result);
};
