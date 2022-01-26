import { ref, Ref, watch } from 'vue';
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
