// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { computed, ref } from 'vue';
import {
  ApiParameterOptions,
  ApiParameterValidator,
  ApiParameters,
  ApiQuery,
  ParameterValue,
} from './types';
import { useParameterStore } from './parameterStore';

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
    .filter(([key, value]) => {
      console.log('removeDefaultValues', key, value, defaultApiParameters[key]);

      return defaultApiParameters[key] !== value;
    })
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

let apiParameterHandler: ApiQuery | null = null;

export const useApiParameterHandler = () => {
  if (apiParameterHandler == null) {
    apiParameterHandler = useApiParameterHandlerInternal();
  }
  return apiParameterHandler;
};

const useApiParameterHandlerInternal = (): ApiQuery => {
  const currentApiParameters = computed({
    get: () => useParameterStore().params,
    set: (value) => useParameterStore().setParameters(value),
  });
  const defaultApiParameters = ref<ApiParameters>({});

  const setApiParameters = (apiParameters: ApiParameters): void => {
    const nextApiParameters = removeUndefinedValues({ ...apiParameters });

    const validApiParameters = computeValidApiParameters(
      nextApiParameters,
      validators
    );

    useParameterStore().setParameters(validApiParameters);
  };

  const setDefaultApiParameters = (apiParameters: ApiParameters): void => {
    const nextApiParameters = removeUndefinedValues({ ...apiParameters });
    defaultApiParameters.value = nextApiParameters;
    console.log(
      'setDefaultApiParameters defaultApiParameters',
      defaultApiParameters.value
    );
  };

  const allApiParameters = computed(() => {
    return {
      ...defaultApiParameters.value,
      ...currentApiParameters.value,
    };
  });

  const cleanApiParameters = computed(() =>
    removeDefaultValues(allApiParameters.value, defaultApiParameters.value)
  );

  const cleanApiParametersExtendWith = (
    apiParameters: ApiParameters
  ): ApiParameters =>
    removeDefaultValues(
      { ...cleanApiParameters.value, ...apiParameters },
      defaultApiParameters.value
    );

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

    useParameterStore().setParameters(validApiParameters);
  };

  const updateApiParameterValue = (
    name: string,
    value?: ParameterValue
  ): void => setApiParameters({ ...cleanApiParameters.value, [name]: value! });

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
        useParameterStore().getParameter(name) ??
        defaultApiParameters.value[name],
      set: (value) => updateApiParameterValue(name, value),
    });
  };

  return {
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
  };
};

export const apiParameters = {
  language: useApiParameterHandler().useApiParameter('language'),
};
