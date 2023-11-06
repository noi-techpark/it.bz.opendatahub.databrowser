// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetConfig, ViewKey } from '../types';
import { usePropertyMapping } from '../../api';
import { buildFieldReplacer } from '../fieldReplacer';
import { applyReplacementsToView } from './enhanceView';

const { mapWithIndex } = usePropertyMapping();

interface GetDatasetView {
  datasetConfig: DatasetConfig;
  viewKey: ViewKey;
  apiQuery: Record<string, string>;
}

export const getDatasetViewInfo = ({
  datasetConfig,
  viewKey,
  apiQuery,
}: GetDatasetView): {
  view: ReturnType<typeof applyReplacementsToView>;
  getDataForField: (data: unknown, name: string) => unknown;
} => {
  const { replaceFields } = buildFieldReplacer(apiQuery);
  const getDataForField = (data: unknown, name: string) => {
    const fieldWithReplacements = replaceFields({
      field: name,
    });
    return mapWithIndex(data, fieldWithReplacements).field;
  };

  const view = applyReplacementsToView(viewKey, datasetConfig, replaceFields);

  return {
    view,
    getDataForField,
  };
};
