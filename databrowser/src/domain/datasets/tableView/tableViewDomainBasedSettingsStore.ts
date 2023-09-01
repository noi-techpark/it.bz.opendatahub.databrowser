// // SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
// //
// // SPDX-License-Identifier: AGPL-3.0-or-later

// import { defineStore, storeToRefs } from 'pinia';
// import { watch } from 'vue';
// import {
//   defaultMobilityTableQueryParameters,
//   defaultTourismTableQueryParameters,
// } from './defaultValues';
// import {
//   PaginationData,
//   arrayPaginatedMapper,
//   defaultPagination,
//   isWithArrayPagination,
//   isWithMobilityPagination,
//   isWithTourismPagination,
//   mobilityPaginatedMapper,
//   tourismPaginatedMapper,
//   // useApiParameterHandler,
// } from '../../api';
// import { useApiParameterStore } from '../../api/service/apiParameterStore';
// import { useDatasetConfigStore } from '../../datasetConfig/datasetConfigStore';

// type DataMapper<T = unknown> = (data: T) => PaginationData<T>;

// const defaultDataMapper: DataMapper = () => ({
//   items: [],
//   pagination: defaultPagination,
// });

// export const tableViewDomainBasedSettingsStore = defineStore(
//   'tableViewDomainBasedSettings',
//   () => {
//     const { currentDomain } = storeToRefs(useDatasetConfigStore());

//     const { allApiParams, defaultApiParams } = storeToRefs(
//       useApiParameterStore()
//     );

//     let dataMapper: DataMapper = defaultDataMapper;

//     watch(
//       currentDomain,
//       (domain) => {
//         console.log('!!!!! !!! tableViewDomainBasedSettingsStore', domain);

//         // const defaultTableQueryParams: ApiParameters = {};

//         switch (domain) {
//           case 'tourism': {
//             defaultApiParams.value = {
//               ...defaultTourismTableQueryParameters,
//             };

//             dataMapper = (data) => {
//               if (isWithTourismPagination(data)) {
//                 return tourismPaginatedMapper(data, allApiParams.value);
//               }
//               if (isWithArrayPagination(data)) {
//                 return arrayPaginatedMapper(data, allApiParams.value);
//               }
//               return defaultDataMapper(data);
//             };
//             break;
//           }
//           case 'mobility': {
//             defaultApiParams.value = {
//               ...defaultMobilityTableQueryParameters,
//             };

//             dataMapper = (data) => {
//               console.log('mobility dataMapper', data);

//               if (isWithMobilityPagination(data)) {
//                 return mobilityPaginatedMapper(data);
//               }
//               return defaultDataMapper(data);
//             };
//             console.log('ismobility');

//             break;
//           }
//           case 'unknown': {
//             console.debug(
//               `Current URL is a dataset URL but the domain ${domain} is not known to have an OpenAPI document`
//             );

//             defaultApiParams.value = {};

//             dataMapper = defaultDataMapper;
//             break;
//           }
//           case 'no-dataset-domain-in-url': {
//             console.debug('Current URL is not a dataset URL');

//             defaultApiParams.value = {};

//             dataMapper = defaultDataMapper;
//           }
//         }

//         // setDefaultApiParameters(defaultTableQueryParams);
//       },
//       { immediate: true }
//     );

//     return {
//       dataMapper,
//     };
//   }
// );
