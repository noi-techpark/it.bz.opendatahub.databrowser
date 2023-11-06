// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { AxiosError } from 'axios';
import { ref, Ref, watch } from 'vue';
import { ParameterValue } from './types';
import * as R from 'ramda';
import {
  ArrayPropertyConfig,
  TargetPropertyName,
  PropertyMappings,
} from '../../datasetConfig/types';

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

export const buildTargetObject = (
  data: unknown,
  propertyMappings: PropertyMappings | undefined,
  params?: Record<string, unknown>
) => {
  if (propertyMappings == null) {
    return { ...params };
  }

  const extractedFields = mapValuesWithIndex(data, propertyMappings);
  return { ...extractedFields, ...params };
};

export const usePropertyMapping = () => {
  // const replacements = useApiParameterReplacements();

  // const mapWithIndex = (
  //   data: unknown,
  //   propertyMappings?: PropertyMappings,
  //   params?: Record<string, unknown>
  // ) => {
  //   if (propertyMappings == null) {
  //     return { ...params };
  //   }

  //   const extractedFields = mapValuesWithIndex(data, propertyMappings);
  //   return { ...extractedFields, ...params };
  // };

  const mapListWithIndex = (
    data: unknown,
    propertyMapping: ArrayPropertyConfig['listFields'],
    params?: Record<string, unknown>
  ) => {
    const {
      pathToParent,
      propertyMappings: fields,
      attributeName,
    } = propertyMapping;

    // Return object has a property whose name is the value of the "attributeName" variable
    // e.g. value of "attributeName" is "abcdefg", then the result object will have a property "abcdefg"
    const defaultResult = { [attributeName]: [], ...params };

    // Get array from input data
    // const pathToParentWithReplacements = replacePlaceholders(
    //   pathToParent,
    //   replacements.value
    // );
    const path = pathToParent.split('.');
    const lensePath = R.lensPath(path);
    const dataArray = R.view(lensePath, data);

    if (dataArray == null || !Array.isArray(dataArray)) {
      return defaultResult;
    }

    // If fields is undefined or empty, then the object defined by parentPath
    // is returned as it is. This is useful e.g. for an array of simple types
    // (strings, numbers or booleans)
    if (isPropertyMappingsEmpty(fields)) {
      return { ...defaultResult, [attributeName]: dataArray };
    }

    const listOfExtractedFields = dataArray.map((item) => {
      return mapValuesWithIndex(item, fields);
    });

    return { ...defaultResult, [attributeName]: listOfExtractedFields };
  };

  // const mapWithReverseIndex = (
  //   item: Record<string, unknown>,
  //   reversePropertyMapping: Record<string, string>,
  //   baseItem?: Record<string, unknown>
  // ) => {
  //   const extractedFields = mapValuesWithReverseIndex(
  //     item,
  //     reversePropertyMapping,
  //     // replacements.value,
  //     baseItem
  //   );
  //   return { ...extractedFields };
  // };

  return {
    // mapWithIndex,
    mapListWithIndex,
    // mapWithReverseIndex,
  };
};

export const isPropertyMappingsEmpty = (
  propertyMappings?: PropertyMappings
): propertyMappings is undefined =>
  propertyMappings == null || Object.keys(propertyMappings).length === 0;

export const replacePlaceholders = (
  s: string,
  replacements?: Record<string, string>
): string => {
  if (replacements == null) {
    return s;
  }

  return Object.keys(replacements).reduce(
    (prev, curr) => prev.replace(`{${curr}}`, replacements[curr]),
    s
  );
};

const mapValuesWithIndex = (
  item: unknown,
  propertyMappings: PropertyMappings
  // replacements: Record<string, string>
) =>
  Object.keys(propertyMappings).reduce<Record<TargetPropertyName, unknown>>(
    (prev, key) => {
      const property = propertyMappings[key];
      // const propertyWithReplacements = replacePlaceholders(
      //   property,
      //   replacements
      // );
      const path = property.split(/(?<!\\)\./).map((p) => p.replace(/\\/g, ''));
      const lensePath = R.lensPath(path);
      const value = R.view(lensePath, item);
      // console.log('mapValuesWithIndex', {
      //   propertyWithReplacements,
      //   key,
      //   value,
      //   path,
      //   item,
      // });

      return { ...prev, [key]: value };
    },
    {}
  );

// const mapValuesWithReverseIndex = (
//   item: Record<string, unknown>,
//   reversePropertyMapping: Record<string, string>,
//   // replacements: Record<string, string>,
//   baseItem?: Record<string, unknown>
// ) =>
//   Object.entries(reversePropertyMapping).reduce<Record<string, unknown>>(
//     (prev, [itemKey, resultKey]) => {
//       // const propertyWithReplacements = replacePlaceholders(
//       //   resultKey,
//       //   replacements
//       // );
//       const path = resultKey.split('.');
//       const value = item[itemKey];
//       return R.assocPath(path, value, prev);
//     },
//     baseItem ?? {}
//   );
