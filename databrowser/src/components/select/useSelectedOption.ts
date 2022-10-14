import { ref, Ref, watch } from 'vue';
import { SelectOption } from './types';

const getSelectedOption = (options: SelectOption[]) =>
  options.find((option) => option.selected) ?? options[0] ?? undefined;

export const useSelectedOption = (options: Ref<SelectOption[]>) => {
  const selectedOption = ref(getSelectedOption(options.value));

  watch(
    () => options.value,
    (options) => (selectedOption.value = getSelectedOption(options))
  );

  return selectedOption;
};
