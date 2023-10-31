// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia';
import { readonly, ref, watch } from 'vue';
import { stringifyQuery, useRouter } from 'vue-router';
import {
  computeDatasetDomain,
  computeDatasetPath,
  computeViewKey,
} from '../routeConverter';
import { DatasetDomain, DatasetPath, ViewConfig, ViewKey } from '../types';
import { useDatasetSourceStore } from './datasetSourceStore';
import { useDatasetConfig } from '../datasetConfigResolver';
import { stringifyRouteQueryValues } from '../utils';
import { DatasetConfigSource } from '../loader/types';
import { buildFieldReplacer } from '../fieldReplacer';
import { usePropertyMapping } from '../../api';
import { applyReplacementsToView } from '../enhanceView';
import { getDatasetApiUrlInfo } from '../useDatasetApiPath';
import { getDatasetViewInfo } from '../useDatasetView';

const { mapWithIndex } = usePropertyMapping();

export const useDatasetConfigStore = defineStore('datasetConfigStore', () => {
  const router = useRouter();
  const datasetSourceStore = useDatasetSourceStore();
  const { source } = storeToRefs(datasetSourceStore);

  const datasetSource = ref<DatasetConfigSource>();
  const datasetDomain = ref<DatasetDomain>();
  const datasetPath = ref<DatasetPath>();

  const viewKey = ref<ViewKey>();
  const urlQuery = ref<Record<string, string>>();

  const view = ref<ViewConfig>();
  const getDataForField = ref<(data: unknown, name: string) => unknown>();
  const apiPath = ref<string>();

  watch(
    [router.currentRoute, source],
    async ([routeValue, sourceValue]) => {
      // Handle routing changes
      datasetSource.value = sourceValue;
      datasetDomain.value = computeDatasetDomain(routeValue.params.domain);
      datasetPath.value = computeDatasetPath(routeValue);
      viewKey.value = computeViewKey(routeValue);
      urlQuery.value = stringifyRouteQueryValues(routeValue.query);
    },
    { immediate: true }
  );

  const { isResolving, datasetConfig } = useDatasetConfig(
    datasetSource,
    datasetDomain,
    datasetPath.value?.pathParams
  );

  watch(
    [isResolving],
    (isResolvingValue) => {
      // Some sanity checks
      if (isResolvingValue) {
        return;
      }

      if (datasetConfig.value == null) {
        console.warn('Dataset config is undefined');
        return;
      }

      if (viewKey.value == null) {
        console.warn('View key is undefined');
        return;
      }

      if (datasetPath.value == null) {
        console.warn('Dataset path is undefined');
        return;
      }

      // Set dataset source in store from resolved dataset config
      // This is necessary, because the resolved dataset config
      // might have a different source than the one in the store
      // (e.g. when a dataset config fallback is used)
      source.value = datasetConfig.value.source;

      // Compute
      // - view
      // - query params (with respect do default query params)
      // - field replacement function
      // - api path
      // const apiQuery = {
      //   ...(datasetConfig.value.views?.[viewKey.value]?.defaultQueryParams ??
      //     {}),
      //   ...urlQuery.value,
      // };

      // apiPath.value = computeApiPath(
      //   datasetConfig.value.baseUrl,
      //   datasetPath.value,
      //   apiQuery
      // );

      const urlInfo = getDatasetApiUrlInfo({
        datasetConfig: datasetConfig.value,
        viewKey: viewKey.value,
        datasetPath: datasetPath.value,
        urlQuery: urlQuery.value ?? {},
      });
      apiPath.value = urlInfo.apiPath;

      const viewInfo = getDatasetViewInfo({
        datasetConfig: datasetConfig.value,
        viewKey: viewKey.value,
        apiQuery: urlInfo.apiQuery ?? {},
      });
      getDataForField.value = viewInfo.getDataForField;
      view.value = viewInfo.view;
      // const { replaceFields } = buildFieldReplacer(urlInfo.apiQuery);
      // getDataForField.value = (data: unknown, name: string) => {
      //   const fieldWithReplacements = replaceFields({
      //     field: name,
      //   });
      //   return mapWithIndex(data, fieldWithReplacements).field;
      // };

      // view.value = applyReplacementsToView(
      //   viewKey.value,
      //   datasetConfig.value,
      //   replaceFields
      // );
    },
    { immediate: true }
  );

  return {
    isResolving: readonly(isResolving),
    view: readonly(view),
    getDataForField: readonly(getDataForField),
    apiPath: readonly(apiPath),
    datasetDomain: readonly(datasetDomain),
  };
});

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

// Add support for hot-module-reload
if (import.meta.hot) {
  import.meta.hot.accept(
    acceptHMRUpdate(useDatasetConfigStore, import.meta.hot)
  );
}
