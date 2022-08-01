import { AxiosError } from 'axios';
import { ref, Ref, watch } from 'vue';
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

export const useFieldExtraction = () => {
  const apiQuery = useApiQuery();

  const getValue = (
    item: any,
    fields: Record<string, string>,
    params?: Record<string, string>
  ) => {
    const replacements = Object.entries(apiQuery.allApiParameters.value).reduce(
      (previous, [key, value]) => ({
        ...previous,
        [key]: stringifyParameter(value),
      }),
      {}
    );

    const extractedFields = extractField(item, fields, replacements);
    return { ...extractedFields, ...params };
  };

  return { getValue };
};

const extractField = (
  item: unknown,
  fields: Record<string, string>,
  replacements?: Record<string, string>
) =>
  Object.keys(fields).reduce((prev, key) => {
    const sourceField = fields[key];

    const fieldName = replacePlaceholders(sourceField, replacements);

    const path = fieldName.split('.');
    const lensePath = R.lensPath(path);
    const value = R.view(lensePath, item);
    return { ...prev, [key]: value };
  }, {});

const replacePlaceholders = (
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
