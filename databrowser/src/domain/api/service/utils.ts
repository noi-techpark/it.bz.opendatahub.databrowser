// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { AxiosError } from 'axios';
import * as R from 'ramda';
import { ref, Ref, watch } from 'vue';
import {
  ArrayMapping,
  ObjectMapping,
  PropertyConfig,
  TargetPropertyName,
} from '../../datasetConfig/types';
import { ParameterValue } from './types';

export interface UseAsOptions {
  twoWayBinding?: boolean;
}

/**
 * Return the input parameter value as a list.
 *
 * The reactivity works in both directions.
 */
export const useAsList = (
  input: Ref<ParameterValue | undefined>,
  options?: UseAsOptions
) => {
  const currentValue = ref<(string | null)[]>([]);

  watch(
    () => input.value,
    (value) => {
      const isArray = Array.isArray(value);
      if (isArray) {
        currentValue.value = value;
      } else if (value !== undefined) {
        currentValue.value = [value];
      }
    },
    { immediate: true }
  );

  const { twoWayBinding } = options ?? { twoWayBinding: true };
  if (twoWayBinding) {
    watch(
      () => currentValue.value,
      (value) => (input.value = value),
      { immediate: true }
    );
  }

  return currentValue;
};

/**
 * Return the input parameter value as a set.
 *
 * The reactivity works in both directions.
 */
export const useAsSet = (
  input: Ref<ParameterValue | undefined>,
  options?: UseAsOptions
) => {
  const currentValue = ref(new Set<string | null>());

  watch(
    () => input.value,
    (value) => {
      const isArray = Array.isArray(value);
      const arr = isArray ? value : [value];
      const filtered = arr.filter((a) => a !== undefined) as (string | null)[];
      currentValue.value = new Set(filtered);
    },
    { immediate: true }
  );

  const { twoWayBinding } = options ?? { twoWayBinding: true };
  if (twoWayBinding) {
    watch(
      () => currentValue.value,
      (value) => (input.value = Array.from(value)),
      { immediate: true }
    );
  }

  return currentValue;
};

export const toErrorString = (error: unknown): string => {
  if (typeof error === 'string') {
    return error;
  }
  if (error instanceof AxiosError) {
    const detail = error?.response?.data;
    if (detail == null) {
      return JSON.stringify(error);
    }
    return `${error} (${JSON.stringify(detail)}))`;
  }
  return JSON.stringify(error);
};

export const extractValueByPath = (data: unknown, path: string) => {
  const pathAsArray = path.split('.');
  const lensePath = R.lensPath(pathAsArray);
  return R.view(lensePath, data);
};

export const buildTargetFromMapping = (
  data: unknown,
  propertyConfig: PropertyConfig,
  params?: Record<string, unknown>
) =>
  propertyConfig.objectMapping != null
    ? buildTargetFromObjectMapping(data, propertyConfig.objectMapping, params)
    : buildTargetFromArrayMapping(data, propertyConfig.arrayMapping, params);

export const buildTargetFromObjectMapping = (
  data: unknown,
  objectMapping: ObjectMapping | undefined,
  params?: Record<string, unknown>
) => {
  if (objectMapping == null) {
    return { ...params };
  }

  const extractedFields = Object.keys(objectMapping).reduce<
    Record<TargetPropertyName, unknown>
  >((prev, key) => {
    const property = objectMapping[key];
    const value = extractValueByPath(data, property);
    return { ...prev, [key]: value };
  }, {});

  return { ...extractedFields, ...params };
};

export const buildTargetFromArrayMapping = (
  data: unknown,
  arrayMapping: ArrayMapping,
  params?: Record<string, unknown>
) => {
  const { pathToParent, objectMapping, targetPropertyName } = arrayMapping;

  // Return object has a property whose name is the value of the "targetPropertyName" variable
  // e.g. value of "targetPropertyName" is "abcdefg", then the result object will have a property "abcdefg"
  const defaultResult = { [targetPropertyName]: [], ...params };

  // Get array from input data
  const dataArray = extractValueByPath(data, pathToParent);

  // If data is not an array, return default result
  if (dataArray == null || !Array.isArray(dataArray)) {
    return defaultResult;
  }

  // If object mapping is undefined or empty, then the object defined by parentPath
  // is returned as it is. This is useful e.g. for an array of simple types
  // (strings, numbers or booleans)
  if (isObjectMappingEmpty(objectMapping)) {
    return { ...defaultResult, [targetPropertyName]: dataArray };
  }

  // For each entry in the array, build target objects as defined by the object mapping
  const arrayOfTargetObjects = dataArray.map((item) => {
    return buildTargetFromObjectMapping(item, objectMapping);
  });

  return { ...defaultResult, [targetPropertyName]: arrayOfTargetObjects };
};

export const isObjectMappingEmpty = (
  objectMapping?: ObjectMapping
): objectMapping is undefined =>
  objectMapping == null || Object.keys(objectMapping).length === 0;
