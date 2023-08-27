// // SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
// //
// // SPDX-License-Identifier: AGPL-3.0-or-later

// import { computed } from 'vue';
// import {
//   ApiParameterOptions,
//   ApiParameterValidator,
//   ApiParameters,
//   ApiQuery,
//   ParameterValue,
// } from './types';
// import { useParameterStore } from './parameterStore';

// const removeUndefinedValues = (parameters: ApiParameters): ApiParameters =>
//   Object.entries(parameters)
//     // Remove all entries where value === undefined
//     .filter(([, value]) => value !== undefined)
//     .reduce((previous, [key, value]) => ({ ...previous, [key]: value }), {});

// const removeDefaultValues = (
//   apiParameters: ApiParameters,
//   defaultApiParameters: ApiParameters
// ): ApiParameters =>
//   Object.entries(apiParameters)
//     // Remove all entries where value === default value
//     .filter(([key, value]) => defaultApiParameters[key] !== value)
//     .reduce((previous, [key, value]) => ({ ...previous, [key]: value }), {});

// const computeValidApiParameters = (
//   parameters: ApiParameters,
//   validators: Record<string, ApiParameterValidator>
// ): ApiParameters =>
//   Object.entries(parameters).reduce((previous, [key, value]) => {
//     const validator = validators[key];
//     // If value is not valid, then don't include it in result
//     if (validator != null && !validator(value)) {
//       return previous;
//     }
//     return { ...previous, [key]: value };
//   }, {});

// export const useApiParameterHandler = () => useApiParameterHandlerInternal();

// const useApiParameterHandlerInternal = (): ApiQuery => {
//   const currentApiParameters = computed({
//     get: () => useParameterStore().params,
//     set: (value) => (useParameterStore().params = value),
//   });
//   const defaultApiParameters = computed({
//     get: () => useParameterStore().defaultParams,
//     set: (value) => (useParameterStore().defaultParams = value),
//   });

//   const setApiParameters = (apiParameters: ApiParameters): void => {
//     const nextApiParameters = removeUndefinedValues({ ...apiParameters });

//     const validApiParameters = computeValidApiParameters(
//       nextApiParameters,
//       useParameterStore().validators
//     );

//     useParameterStore().params = validApiParameters;
//   };

//   const setDefaultApiParameters = (apiParameters: ApiParameters): void => {
//     const nextApiParameters = removeUndefinedValues({ ...apiParameters });
//     defaultApiParameters.value = nextApiParameters;
//   };

//   const allApiParameters = computed(() => {
//     return {
//       ...defaultApiParameters.value,
//       ...currentApiParameters.value,
//     };
//   });

//   const cleanApiParameters = computed(() =>
//     removeDefaultValues(allApiParameters.value, defaultApiParameters.value)
//   );

//   const cleanApiParametersExtendWith = (
//     apiParameters: ApiParameters
//   ): ApiParameters =>
//     removeDefaultValues(
//       { ...cleanApiParameters.value, ...apiParameters },
//       defaultApiParameters.value
//     );

//   const updateApiParameterValue = (
//     name: string,
//     value?: ParameterValue
//   ): void => setApiParameters({ ...cleanApiParameters.value, [name]: value! });

//   const useApiParameter = (name: string, options?: ApiParameterOptions) => {
//     const { defaultValue } = options ?? {};

//     if (defaultValue !== undefined) {
//       // Add default value if defined
//       setDefaultApiParameters({
//         ...defaultApiParameters.value,
//         [name]: defaultValue,
//       });
//     }

//     return computed({
//       get: () =>
//         useParameterStore().params[name] ?? defaultApiParameters.value[name],
//       set: (value) => updateApiParameterValue(name, value),
//     });
//   };

//   return {
//     currentApiParameters,
//     defaultApiParameters,
//     allApiParameters,
//     cleanApiParameters,
//     setApiParameters,
//     updateApiParameterValue,
//     setDefaultApiParameters,
//     useApiParameter,
//     cleanApiParametersExtendWith,
//   };
// };

// export const apiParametersOld = {
//   language: useApiParameterHandler().useApiParameter('language'),
// };
