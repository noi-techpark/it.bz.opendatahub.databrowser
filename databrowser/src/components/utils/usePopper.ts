import { ref, onMounted, watchEffect } from 'vue';
import { createPopper, OptionsGeneric } from '@popperjs/core';

export function usePopper(options: OptionsGeneric<any>) {
  const reference = ref<any>(null);
  const popper = ref<any>(null);

  onMounted(() => {
    watchEffect((onInvalidate) => {
      if (!popper.value) {
        return;
      }
      if (!reference.value) {
        return;
      }

      const popperEl = popper.value.el || popper.value;
      const referenceEl = reference.value.el || reference.value;

      if (!(referenceEl instanceof HTMLElement)) return;
      if (!(popperEl instanceof HTMLElement)) return;

      const { destroy } = createPopper(referenceEl, popperEl, options);

      onInvalidate(destroy);
    });
  });

  return [reference, popper];
}
