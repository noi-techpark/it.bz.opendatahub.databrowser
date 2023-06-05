// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { App, computed, inject, ref } from 'vue';
import {
  ApiParameterOptions,
  ApiParameterValidator,
  ApiQuery,
  ApiParameters,
  ParameterValue,
} from './types';

export const apiQueryHandlerKey = 'api-query-handler';

const removeUndefinedValues = (parameters: ApiParameters): ApiParameters =>
  Object.entries(parameters)
    // Remove all entries where value === undefined
    .filter(([, value]) => value !== undefined)
    .reduce((previous, [key, value]) => ({ ...previous, [key]: value }), {});

const removeDefaultValues = (
  apiParameters: ApiParameters,
  defaultApiParameters: ApiParameters
): ApiParameters =>
  Object.entries(apiParameters)
    // Remove all entries where value === default value
    .filter(([key, value]) => defaultApiParameters[key] !== value)
    .reduce((previous, [key, value]) => ({ ...previous, [key]: value }), {});

const computeValidApiParameters = (
  parameters: ApiParameters,
  validators: Record<string, ApiParameterValidator>
): ApiParameters =>
  Object.entries(parameters).reduce((previous, [key, value]) => {
    const validator = validators[key];
    // If value is not valid, then don't include it in result
    if (validator != null && !validator(value)) {
      return previous;
    }
    return { ...previous, [key]: value };
  }, {});

/**
 * This plugin provides the API parameter handling.
 *
 * It is store agnostic. Take a look at urlQueryHander.ts
 * which uses the URL as store.
 */
export const createApiQueryHandler = (): ApiQuery => {
  /**
   * Set the API parameters.
   *
   * Parameters with value "undefined" are not included
   * in the API parameter set. If validators are defined
   * for an API parameter, it will be invoked.
   */
  const currentApiParameters = ref<ApiParameters>({});
  const setApiParameters = (apiParameters: ApiParameters): void => {
    const nextApiParameters = removeUndefinedValues({ ...apiParameters });

    const validApiParameters = computeValidApiParameters(
      nextApiParameters,
      validators
    );

    currentApiParameters.value = validApiParameters;
  };

  /**
   * Set default API parameters.
   *
   * Parameters with value "undefined" are not included
   * in the API parameter set.
   */
  const defaultApiParameters = ref<ApiParameters>({});
  const setDefaultApiParameters = (apiParameters: ApiParameters): void => {
    const nextApiParameters = removeUndefinedValues({ ...apiParameters });
    defaultApiParameters.value = nextApiParameters;
  };

  /**
   * This ref contains a merge of all API parameters (default and current).
   *
   * Note that a default API parameter is overwritten by the current API parameter
   * given that a current API parameter with the same name exists.
   */
  const allApiParameters = computed(() => {
    return {
      ...defaultApiParameters.value,
      ...currentApiParameters.value,
    };
  });

  /**
   * This ref contains those API parameters that are not set to its default values.
   */
  const cleanApiParameters = computed(() =>
    removeDefaultValues(allApiParameters.value, defaultApiParameters.value)
  );

  /**
   * This function extends the current cleanApiParameters with the given
   * apiParameters and performs a cleanup on the result. Cleanup means,
   * that parameter values set to default are removed.
   */
  const cleanApiParametersExtendWith = (
    apiParameters: ApiParameters
  ): ApiParameters =>
    removeDefaultValues(
      { ...cleanApiParameters.value, ...apiParameters },
      defaultApiParameters.value
    );

  /**
   * Update API parameter validator function.
   *
   * If the validator function is null or undefined, it will not be registered.
   * Instead, if a validator function for the given name exists, that one will
   * be removed.
   */
  const validators: Record<string, ApiParameterValidator> = {};
  const updateApiParameterValidator = (
    name: string,
    validator?: (value: ParameterValue) => boolean
  ) => {
    if (validator == null) {
      delete validators[name];
    } else {
      validators[name] = validator;
    }

    const validApiParameters = computeValidApiParameters(
      currentApiParameters.value,
      validators
    );

    currentApiParameters.value = validApiParameters;
  };

  /**
   * Set the value for the parameter with the given name.
   *
   * If the new value is strictly "undefined", the parameter
   * will be removed from the API parameter set.
   */
  const updateApiParameterValue = (
    name: string,
    value?: ParameterValue
  ): void => setApiParameters({ ...cleanApiParameters.value, [name]: value! });

  /**
   * Utility function to work with a single reactive parameter.
   */
  const useApiParameter = (name: string, options?: ApiParameterOptions) => {
    const { validator, defaultValue } = options ?? {};

    if (validator !== undefined) {
      // Add validator if defined
      updateApiParameterValidator(name, validator);
    }

    if (defaultValue !== undefined) {
      // Add default value if defined
      setDefaultApiParameters({
        ...defaultApiParameters.value,
        [name]: defaultValue,
      });
    }

    return computed({
      get: () =>
        currentApiParameters.value[name] ?? defaultApiParameters.value[name],
      set: (value) => updateApiParameterValue(name, value),
    });
  };

  const result: ApiQuery = {
    currentApiParameters,
    defaultApiParameters,
    allApiParameters,
    cleanApiParameters,
    setApiParameters,
    updateApiParameterValue,
    setDefaultApiParameters,
    useApiParameter,
    updateApiParameterValidator,
    cleanApiParametersExtendWith,

    install(app: App) {
      const apiQueryHandler = this;
      app.provide(apiQueryHandlerKey, apiQueryHandler);
      app.config.globalProperties.$apiQuery = apiQueryHandler;
    },
  };

  return result;
};

export const useApiQuery = (): ApiQuery => inject(apiQueryHandlerKey)!;
