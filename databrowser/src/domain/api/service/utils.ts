import { AxiosError } from 'axios';
import { computed, ref, Ref, watch } from 'vue';
import { useApiQuery } from './apiQueryHandler';
import { stringifyParameter } from './query';
import { ParameterValue } from './types';
import * as R from 'ramda';

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

export const useApiParameterReplacements = () => {
  const apiQuery = useApiQuery();

  return computed(() =>
    Object.entries(apiQuery.allApiParameters.value).reduce<
      Record<string, string>
    >(
      (previous, [key, value]) => ({
        ...previous,
        [key]: stringifyParameter(value),
      }),
      {}
    )
  );
};

export const useReplaceWithApiParameters = () => {
  const replacements = useApiParameterReplacements();

  const replace = (s: string): string =>
    replacePlaceholders(s, replacements.value);

  return { replace };
};

export const usePropertyMapping = () => {
  const replacements = useApiParameterReplacements();

  const mapWithIndex = (
    item: unknown,
    propertyMapping: Record<string, string>,
    params?: Record<string, unknown>
  ) => {
    const extractedFields = mapValuesWithIndex(
      item,
      propertyMapping,
      replacements.value
    );
    return { ...extractedFields, ...params };
  };

  const mapWithReverseIndex = (
    item: Record<string, unknown>,
    reversePropertyMapping: Record<string, string>,
    baseItem?: Record<string, unknown>
  ) => {
    const extractedFields = mapValuesWithReverseIndex(
      item,
      reversePropertyMapping,
      replacements.value,
      baseItem
    );
    return { ...extractedFields };
  };

  return { mapWithIndex, mapWithReverseIndex };
};

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
  propertyMapping: Record<string, string>,
  replacements: Record<string, string>
) =>
  Object.keys(propertyMapping).reduce<Record<string, unknown>>((prev, key) => {
    const property = propertyMapping[key];
    const propertyWithReplacements = replacePlaceholders(
      property,
      replacements
    );
    const path = propertyWithReplacements.split('.');
    const lensePath = R.lensPath(path);
    const value = R.view(lensePath, item);
    return { ...prev, [key]: value };
  }, {});

const mapValuesWithReverseIndex = (
  item: Record<string, unknown>,
  reversePropertyMapping: Record<string, string>,
  replacements: Record<string, string>,
  baseItem?: Record<string, unknown>
) =>
  Object.entries(reversePropertyMapping).reduce<Record<string, unknown>>(
    (prev, [itemKey, resultKey]) => {
      const propertyWithReplacements = replacePlaceholders(
        resultKey,
        replacements
      );
      const path = propertyWithReplacements.split('.');
      const value = item[itemKey];
      return R.assocPath(path, value, prev);
    },
    baseItem ?? {}
  );
