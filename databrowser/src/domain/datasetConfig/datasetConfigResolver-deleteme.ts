// // SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
// //
// // SPDX-License-Identifier: AGPL-3.0-or-later

// import {
//   DatasetDomain,
//   DetailViewConfig,
//   EditViewConfig,
//   NewViewConfig,
//   ListViewConfig,
//   QuickViewConfig,
//   DatasetPath,
//   DatasetConfig,
// } from './types';
// import { LocationQuery, useRouter } from 'vue-router';
// import {
//   PaginationWithCallback,
//   stringifyParameter,
//   usePropertyMapping,
// } from '../api';
// import { Ref, ref, watch } from 'vue';
// import { useDatasetSourceStore } from './store/datasetSourceStore';
// import { storeToRefs } from 'pinia';
// import { DatasetConfigLoader } from './loader/types';
// import { FieldsReplacer, buildFieldReplacer } from './fieldReplacer';
// import {
//   applyReplacementsToDetailView,
//   applyReplacementsToEditView,
//   applyReplacementsToNewView,
//   applyReplacementsToQuickView,
//   applyReplacementsToTableView,
// } from './enhanceView';
// import { loadDatasetConfig } from './loader/dispatchingLoader';
// import {
//   computeDatasetDomain,
//   computeDatasetPath,
//   computeViewFlags,
// } from './routeConverter';
// import { computePagination } from '../api/pagination/pagination';

// export type ResolvedDatasetConfig = {
//   datasetConfig: Ref<DatasetConfig | undefined>;
//   isResolving: Ref<boolean>;
//   tableView: Ref<ListViewConfig | undefined>;
//   detailView: Ref<DetailViewConfig | undefined>;
//   editView: Ref<EditViewConfig | undefined>;
//   newView: Ref<NewViewConfig | undefined>;
//   quickView: Ref<QuickViewConfig | undefined>;
//   apiPath: Ref<string | undefined>;
//   configSource: Ref<DatasetConfigLoader | undefined>;
//   paginationProvider: Ref<
//     ((data: unknown) => PaginationWithCallback) | undefined
//   >;
//   hasDetailView: Ref<boolean>;
//   hasEditView: Ref<boolean>;
//   hasNewView: Ref<boolean>;
//   hasQuickView: Ref<boolean>;
//   datasetDomain: Ref<string | undefined>;
//   isEmbeddedSource: Ref<boolean>;
//   isGeneratedSource: Ref<boolean>;
//   getDataForField: Ref<(data: unknown, name: string) => unknown>;
//   isTableView: Ref<boolean>;
//   isDetailView: Ref<boolean>;
//   isEditView: Ref<boolean>;
//   isNewView: Ref<boolean>;
//   isQuickView: Ref<boolean>;
// };

// const { mapWithIndex } = usePropertyMapping();

// export const computeDatasetConfigForCurrentRoute =
//   (): ResolvedDatasetConfig => {
//     const isResolving = ref(false);
//     const datasetConfig = ref<DatasetConfig | undefined>();
//     // const resolvedDatasetConfig = ref<DatasetConfig>();
//     const tableView = ref<ListViewConfig | undefined>();
//     const detailView = ref<DetailViewConfig | undefined>();
//     const editView = ref<EditViewConfig | undefined>();
//     const newView = ref<NewViewConfig | undefined>();
//     const quickView = ref<QuickViewConfig | undefined>();

//     const apiPath = ref<string | undefined>();

//     const configSource = ref<Exclude<DatasetConfigLoader, 'any'>>();

//     const datasetDomain = ref<DatasetDomain>();

//     const hasDetailView = ref(false);
//     const hasEditView = ref(false);
//     const hasNewView = ref(false);
//     const hasQuickView = ref(false);

//     const isTableView = ref(false);
//     const isDetailView = ref(false);
//     const isEditView = ref(false);
//     const isNewView = ref(false);
//     const isQuickView = ref(false);

//     // const defaultQueryParams = ref<Record<string, string>>({});
//     const allParams = ref<Record<string, string>>({});

//     const replaceFields = ref<FieldsReplacer>((fields) => fields ?? {});
//     const getDataForField = ref<(data: unknown, name: string) => unknown>(
//       (data) => data
//     );

//     const paginationProvider = ref<(data: unknown) => PaginationWithCallback>();

//     const isGeneratedSource = ref(false);
//     const isEmbeddedSource = ref(false);

//     const router = useRouter();
//     const datasetSourceStore = useDatasetSourceStore();
//     const { source } = storeToRefs(datasetSourceStore);
//     watch(
//       [router.currentRoute, source],
//       async ([route, preferredSource]) => {
//         isResolving.value = true;

//         datasetDomain.value = computeDatasetDomain(route);
//         const datasetPath = computeDatasetPath(route);

//         console.group('computeDatasetConfig');
//         console.time('computeDatasetConfig');

//         const config = await loadDatasetConfig(
//           preferredSource,
//           datasetDomain.value,
//           datasetPath.pathParams
//         );

//         datasetConfig.value = config;

//         console.timeEnd('computeDatasetConfig');
//         console.groupEnd();

//         // It is important to set the source in the store, because
//         // it may differ from the preferredSource if the preferredSource
//         // is 'any' and the loaded config is embedded or generated
//         datasetSourceStore.source = config.source;

//         isEmbeddedSource.value = config.source === 'embedded';
//         isGeneratedSource.value = config.source === 'generated';

//         ////////
//         // End config resolution
//         ////////

//         apiPath.value = computeUrl(config.baseUrl, datasetPath);

//         // isEmbeddedConfig.value = config.source === 'embedded';

//         // isGeneratedConfig.value = config.source === 'generated';

//         const viewFlags = computeViewFlags(route);

//         isTableView.value = viewFlags.isTableView;
//         isDetailView.value = viewFlags.isDetailView;
//         isEditView.value = viewFlags.isEditView;
//         isNewView.value = viewFlags.isNewView;
//         isQuickView.value = viewFlags.isQuickView;

//         // Compute default query params and replacements
//         const defaultQueryParams = isTableView.value
//           ? config.views?.table?.defaultQueryParams ?? {}
//           : isDetailView.value
//           ? config.views?.detail?.defaultQueryParams ?? {}
//           : isEditView.value
//           ? config.views?.edit?.defaultQueryParams ?? {}
//           : isNewView.value
//           ? config.views?.new?.defaultQueryParams ?? {}
//           : isQuickView.value
//           ? config.views?.quick?.defaultQueryParams ?? {}
//           : {};

//         allParams.value = Object.entries(defaultQueryParams).reduce<
//           Record<string, string>
//         >((prev, [key, defaultValue]) => {
//           if (route.query[key] == null) {
//             return {
//               ...prev,
//               [key]: defaultValue,
//             };
//           }
//           return {
//             ...prev,
//             [key]: stringifyParameter(route.query[key]),
//           };
//         }, {});

//         // Compute views
//         replaceFields.value = buildFieldReplacer(allParams.value).replaceFields;
//         if (isTableView.value) {
//           tableView.value = applyReplacementsToTableView(
//             config,
//             replaceFields.value
//           );
//         } else if (isDetailView.value) {
//           detailView.value = applyReplacementsToDetailView(
//             config,
//             replaceFields.value
//           );
//         } else if (isEditView.value) {
//           editView.value = applyReplacementsToEditView(
//             config,
//             replaceFields.value
//           );
//         } else if (isNewView.value) {
//           newView.value = applyReplacementsToNewView(
//             config,
//             replaceFields.value
//           );
//         } else if (isQuickView.value) {
//           quickView.value = applyReplacementsToQuickView(
//             config,
//             replaceFields.value
//           );
//         }

//         getDataForField.value = (data: unknown, name: string) => {
//           const fieldWithReplacements = replaceFields.value({ field: name });
//           return mapWithIndex(data, fieldWithReplacements).field;
//         };

//         // Init pagination
//         paginationProvider.value = computePagination(
//           datasetDomain.value,
//           allParams.value,
//           (query) =>
//             router.push({ ...route, query: { ...route.query, ...query } })
//         );

//         // Remove default query params from url
//         const sanitizedQuery = Object.entries(route.query)
//           .filter(
//             ([key, value]) =>
//               !(key in defaultQueryParams && value === defaultQueryParams[key])
//           )
//           .reduce<LocationQuery>(
//             (prev, [key, value]) => ({ ...prev, [key]: value }),
//             {}
//           );

//         await router.replace({
//           ...route,
//           query: sanitizedQuery,
//         });
//         // End of remove default query params from url

//         hasDetailView.value = config.views?.detail != null;
//         hasEditView.value = config.views?.edit != null;
//         hasNewView.value = config.views?.new != null;
//         hasQuickView.value = config.views?.quick != null;

//         isResolving.value = false;
//       },
//       { immediate: true }
//     );

//     return {
//       isResolving,
//       datasetConfig,
//       tableView,
//       detailView,
//       editView,
//       newView,
//       quickView,
//       apiPath,
//       configSource,
//       paginationProvider,

//       hasDetailView,
//       hasEditView,
//       hasNewView,
//       hasQuickView,

//       datasetDomain,

//       isEmbeddedSource,
//       isGeneratedSource,

//       getDataForField,

//       isTableView,
//       isDetailView,
//       isEditView,
//       isNewView,
//       isQuickView,
//       // isEmbeddedConfig,
//       // isGeneratedConfig,
//     };
//     // return {
//     //   isResolving,
//     //   resolvedDatasetConfig,
//     //   defaultQueryParams,
//     //   allParams,
//     //   tableView,
//     //   detailView,
//     //   editView,
//     //   newView,
//     //   quickView,
//     //   replaceFields,
//     //   getDataForField,
//     // };
//   };

// // export const computeDatasetConfig = async (
// //   datasetDomain: DatasetDomain,
// //   datasetPath: DatasetPath,
// //   preferredSource: DatasetConfigProvider
// // ) => {
// //   console.group('computeDatasetConfig');
// //   console.time('computeDatasetConfig');

// //   const config = await loadDatasetConfig(
// //     preferredSource,
// //     datasetDomain,
// //     datasetPath.pathParams
// //   );

// //   const currentPath = computeUrl(config.baseUrl, datasetPath);

// //   const isSourceEmbedded = config.source === 'embedded';

// //   const isSourceGenerated = config.source === 'generated';

// //   const hasDetailView = config.views?.detail != null;

// //   const hasEditView = config.views?.edit != null;

// //   const hasNewView = config.views?.new != null;

// //   const hasQuickView = config.views?.quick != null;

// //   console.timeEnd('computeDatasetConfig');
// //   console.groupEnd();

// //   return {
// //     currentPath,
// //     config,
// //     hasConfig: config != null,
// //     hasDetailView,
// //     hasEditView,
// //     hasNewView,
// //     hasQuickView,
// //     isSourceEmbedded,
// //     isSourceGenerated,
// //     source: preferredSource,
// //   };
// // };

// const computeUrl = (baseUrl: string, datasetPath: DatasetPath) => {
//   const { pathParams, pathId } = datasetPath;
//   const url = `${baseUrl}/${pathParams.join('/')}`;
//   return pathId == null ? url : `${url}/${pathId}`;
// };

// // const nameToViewKey = (name?: string | symbol | null): ViewKey | undefined => {
// //   if (name == null) {
// //     return undefined;
// //   }
// //   switch (name) {
// //     case DatasetPage.DETAIL:
// //       return View.DETAIL;
// //     case DatasetPage.EDIT:
// //       return View.EDIT;
// //     case DatasetPage.NEW:
// //       return View.NEW;
// //     case DatasetPage.QUICK:
// //       return View.QUICK;
// //     case DatasetPage.RAW:
// //       return View.RAW;
// //     case DatasetPage.TABLE:
// //       return View.TABLE;
// //     default:
// //       return undefined;
// //   }
// // };

// // const viewKeyToFlags = (
// //   viewKey?: ViewKey
// // ): {
// //   isTableView: boolean;
// //   isDetailView: boolean;
// //   isEditView: boolean;
// //   isQuickView: boolean;
// //   isRawView: boolean;
// //   isNewView: boolean;
// // } => ({
// //   isTableView: viewKey === View.TABLE,
// //   isDetailView: viewKey === View.DETAIL,
// //   isEditView: viewKey === View.EDIT,
// //   isQuickView: viewKey === View.QUICK,
// //   isRawView: viewKey === View.RAW,
// //   isNewView: viewKey === View.NEW,
// // });

// // export const toDatasetRoute = (
// //   domain: DatasetDomain,
// //   route: RouteLocationNormalizedLoaded
// // ): DatasetRoute => {
// //   const path = route.params.pathParams;
// //   if (path == null) {
// //     return { domain, pathParams: [] };
// //   }

// //   // Ensure to use an array as pathParams
// //   const pathParams = Array.isArray(path) ? path : path.split('/');

// //   // Return route without id if id is not defined
// //   if (route.params.id == null) {
// //     return { domain, pathParams };
// //   }

// //   // Ensure to use a string as id
// //   const id = stringifyParameter(route.params.id);
// //   return { domain, pathParams, id };
// // };
