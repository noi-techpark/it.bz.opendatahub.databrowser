// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { AxiosError } from 'axios';
import { computed, ref, Ref, watch } from 'vue';
import { stringifyParameter } from './query';
import { ParameterValue } from './types';
import * as R from 'ramda';
import {
  ArrayPropertyConfig,
  ObjectPropertyConfig,
} from '../../datasetConfig/types';
import { useApiParameterStore } from './apiParameterStore';
import { storeToRefs } from 'pinia';

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

// export const useApiParameterReplacements = () => {
//   const { allApiParams } = storeToRefs(useApiParameterStore());
//   // const { allApiParameters } = useApiParameterHandler();

//   return computed(() => {
//     console.log('------------allApiParameters', allApiParams.value);

//     return Object.entries(allApiParameters.value).reduce<
//       Record<string, string>
//     >(
//       (previous, [key, value]) => ({
//         ...previous,
//         [key]: stringifyParameter(value),
//       }),
//       {}
//     );
//   });
// };
// let counter = 0;

// export const useReplaceWithApiParameters = () => {
//   // const replacements = useApiParameterReplacements();
//   // console.log('replacements', JSON.stringify(replacements.value));
//   // console.log('replacements');
//   const internalCounter = counter++;
//   console.log('replacements', internalCounter);

//   const replace = (s: string): string => {
//     console.log('replacing', internalCounter);
//     const replacements = useApiParameterStore().allApiParams;
//     return replacePlaceholders(s, replacements);
//   };

//   return { replace };
// };

export const usePropertyMapping = () => {
  // const replacements = useApiParameterReplacements();

  const mapWithIndex = (
    data: unknown,
    propertyMapping?: ObjectPropertyConfig['fields'],
    params?: Record<string, unknown>
  ) => {
    if (propertyMapping == null) {
      return { ...params };
    }

    const extractedFields = mapValuesWithIndex(
      data,
      propertyMapping
      // replacements.value
    );
    return { ...extractedFields, ...params };
  };

  const mapListWithIndex = (
    data: unknown,
    propertyMapping: ArrayPropertyConfig['listFields'],
    params?: Record<string, unknown>
  ) => {
    const { pathToParent, fields, attributeName } = propertyMapping;

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
    if (isFieldsEmpty(fields)) {
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
    mapWithIndex,
    mapListWithIndex,
    // mapWithReverseIndex,
  };
};

export const isFieldsEmpty = (
  fields?: Record<string, string>
): fields is undefined => fields == null || Object.keys(fields).length === 0;

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
  propertyMapping: Record<string, string>
  // replacements: Record<string, string>
) =>
  Object.keys(propertyMapping).reduce<Record<string, unknown>>((prev, key) => {
    const property = propertyMapping[key];
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
  }, {});

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
