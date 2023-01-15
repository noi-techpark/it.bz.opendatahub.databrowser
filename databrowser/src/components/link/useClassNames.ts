import { computed, Ref } from 'vue';
import { Tone } from './types';

const toneClass: Record<Tone, string> = {
  [Tone.primary]: 'text-green-500',
};

export const useClassNames = (tone: Ref<string | Tone>) =>
  computed(() => {
    const classNames = [];

    const toneClasses = toneClass[tone.value as Tone];
    if (toneClasses != null) {
      classNames.push(toneClasses);
    }

    return classNames;
  });
