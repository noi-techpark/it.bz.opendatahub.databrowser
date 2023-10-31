// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { Ref, ref, watchEffect } from 'vue';
import { DatasetConfig, DatasetPath, ViewKey } from './types';
import { stringifyQuery } from 'vue-router';

interface UseDatasetApiUrlInfo {
  datasetConfig: Ref<DatasetConfig | undefined>;
  viewKey: Ref<ViewKey | undefined>;
  datasetPath: Ref<DatasetPath | undefined>;
  urlQuery: Ref<Record<string, string> | undefined>;
}

export const useDatasetApiUrlInfo = ({
  datasetConfig,
  viewKey,
  datasetPath,
  urlQuery,
}: UseDatasetApiUrlInfo) => {
  const apiPath = ref<string>();

  watchEffect(() => {
    if (
      datasetConfig.value == null ||
      viewKey.value == null ||
      datasetPath.value == null
    ) {
      apiPath.value = undefined;
      return;
    }

    const apiQuery = {
      ...(datasetConfig.value.views?.[viewKey.value]?.defaultQueryParams ?? {}),
      ...(urlQuery.value ?? {}),
    };

    apiPath.value = computeApiPath(
      datasetConfig.value.baseUrl,
      datasetPath.value,
      apiQuery
    );
  });
  return { apiPath };
};

interface GetDatasetApiUrlInfo {
  datasetConfig: DatasetConfig;
  viewKey: ViewKey;
  datasetPath: DatasetPath;
  urlQuery: Record<string, string>;
}

export const getDatasetApiUrlInfo = ({
  datasetConfig,
  viewKey,
  datasetPath,
  urlQuery,
}: GetDatasetApiUrlInfo): {
  apiPath: string | undefined;
  apiQuery: Record<string, string> | undefined;
} => {
  if (datasetConfig == null || viewKey == null || datasetPath == null) {
    return {
      apiPath: undefined,
      apiQuery: undefined,
    };
  }

  const apiQuery = {
    ...(datasetConfig.views?.[viewKey]?.defaultQueryParams ?? {}),
    ...(urlQuery ?? {}),
  };

  const apiPath = computeApiPath(datasetConfig.baseUrl, datasetPath, apiQuery);

  return { apiPath, apiQuery };
};

const computeApiPath = (
  baseUrl: string,
  datasetPath: DatasetPath,
  query: Record<string, string>
) => {
  const { pathParams, pathId } = datasetPath;

  const url = `${baseUrl}/${pathParams.join('/')}`;
  const fullPath = pathId == null ? url : `${url}/${pathId}`;

  const queryString = stringifyQuery(query);
  return `${fullPath}${queryString.length === 0 ? '' : queryString}`;
};
