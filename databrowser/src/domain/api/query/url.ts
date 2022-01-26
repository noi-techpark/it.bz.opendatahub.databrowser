import { reactive, Ref, watch } from 'vue';

export const useAsQueryKey = (queryKey: Ref<string>) => {
  const result = reactive(['']);

  watch(
    () => queryKey.value,
    (key) => (result[0] = key),
    { immediate: true }
  );

  return result;
};
