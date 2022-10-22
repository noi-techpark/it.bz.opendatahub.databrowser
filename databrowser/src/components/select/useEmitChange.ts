import { Ref, watch } from 'vue';
import { SelectOption } from './types';

export const useEmitChange = (
  emit: (event: 'change', ...args: any[]) => void,
  selectedOption: Ref<SelectOption>
) => {
  watch(
    () => selectedOption.value,
    (newOption, oldOption) => {
      if (newOption == null) {
        return;
      }
      if (newOption.value !== oldOption?.value) {
        // Wait a bit before emitting the value such that the listbox options container can hide
        setTimeout(
          () => emit('change', newOption.value ?? newOption.label),
          50
        );
      }
    }
  );
};
