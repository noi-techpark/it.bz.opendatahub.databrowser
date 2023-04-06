import { computed, Ref } from 'vue';
import { Tone, Variant } from './types';

const toneClass: Record<Tone, string> = {
  ['primary']: 'text-green-500',
  ['text']: 'text-gray-900',
  ['white']: 'text-white',
};

const variantClass: Record<Variant, string> = {
  ['no-underline']: 'no-underline',
  ['underline']: 'underline',
};

export const useClassNames = (tone: Ref<Tone>, variant: Ref<Variant>) =>
  computed(() => [
    'rounded',
    toneClass[tone.value],
    variantClass[variant.value],
  ]);
