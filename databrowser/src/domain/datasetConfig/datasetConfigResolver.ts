// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { DatasetDomain, DatasetPath, DatasetConfig } from './types';
import { MaybeRef, ref, toValue, watch } from 'vue';
import { DatasetConfigSource } from './loader/types';
import { loadDatasetConfig } from './loader/dispatchingLoader';

export const useDatasetConfig = (
  preferredSource: MaybeRef<DatasetConfigSource | undefined>,
  datasetDomain: MaybeRef<DatasetDomain | undefined>,
  datasetPathParams: MaybeRef<DatasetPath['pathParams'] | undefined>
) => {
  const isResolving = ref(false);
  const datasetConfig = ref<DatasetConfig>();

  watch(
    [
      () => toValue(preferredSource),
      () => toValue(datasetDomain),
      () => toValue(datasetPathParams),
    ],
    async ([
      preferredSourceValue,
      datasetDomainValue,
      datasetPathParamsValue,
    ]) => {
      isResolving.value = true;

      if (
        preferredSourceValue != null &&
        datasetDomainValue != null &&
        datasetPathParamsValue != null
      ) {
        try {
          datasetConfig.value = await loadDatasetConfig(
            preferredSourceValue,
            datasetDomainValue,
            datasetPathParamsValue
          );
        } catch (err) {
          console.error(err);
          datasetConfig.value = undefined;
        }
      } else {
        console.group('Could not resolve data config: missing parameters');
        console.debug('Preferred source', preferredSourceValue);
        console.debug('Domain', datasetDomainValue);
        console.debug('Path params', datasetPathParamsValue);
        console.groupEnd();
        datasetConfig.value = undefined;
      }

      isResolving.value = false;
    },
    { immediate: true }
  );

  return { isResolving, datasetConfig };
};

// export const resolveDatasetConfig = (
//   preferredSource: DatasetConfigSource | undefined,
//   datasetDomain: DatasetDomain | undefined,
//   datasetPathParams: DatasetPath['pathParams'] | undefined
// ) => {
//   const isResolving = ref(false);
//   const datasetConfig = ref<DatasetConfig>();

//   if (
//     preferredSource != null &&
//     datasetDomain != null &&
//     datasetPathParams != null
//   ) {
//     isResolving.value = true;
//     loadDatasetConfig(preferredSource, datasetDomain, datasetPathParams)
//       .then((config) => (datasetConfig.value = config))
//       .catch((err) => console.error(err))
//       .finally(() => (isResolving.value = false));
//   }

//   return { isResolving, datasetConfig };
// };

// const nameToViewKey = (name?: string | symbol | null): ViewKey | undefined => {
//   if (name == null) {
//     return undefined;
//   }
//   switch (name) {
//     case DatasetPage.DETAIL:
//       return View.DETAIL;
//     case DatasetPage.EDIT:
//       return View.EDIT;
//     case DatasetPage.NEW:
//       return View.NEW;
//     case DatasetPage.QUICK:
//       return View.QUICK;
//     case DatasetPage.RAW:
//       return View.RAW;
//     case DatasetPage.TABLE:
//       return View.TABLE;
//     default:
//       return undefined;
//   }
// };

// const viewKeyToFlags = (
//   viewKey?: ViewKey
// ): {
//   isTableView: boolean;
//   isDetailView: boolean;
//   isEditView: boolean;
//   isQuickView: boolean;
//   isRawView: boolean;
//   isNewView: boolean;
// } => ({
//   isTableView: viewKey === View.TABLE,
//   isDetailView: viewKey === View.DETAIL,
//   isEditView: viewKey === View.EDIT,
//   isQuickView: viewKey === View.QUICK,
//   isRawView: viewKey === View.RAW,
//   isNewView: viewKey === View.NEW,
// });

// export const toDatasetRoute = (
//   domain: DatasetDomain,
//   route: RouteLocationNormalizedLoaded
// ): DatasetRoute => {
//   const path = route.params.pathParams;
//   if (path == null) {
//     return { domain, pathParams: [] };
//   }

//   // Ensure to use an array as pathParams
//   const pathParams = Array.isArray(path) ? path : path.split('/');

//   // Return route without id if id is not defined
//   if (route.params.id == null) {
//     return { domain, pathParams };
//   }

//   // Ensure to use a string as id
//   const id = stringifyParameter(route.params.id);
//   return { domain, pathParams, id };
// };
