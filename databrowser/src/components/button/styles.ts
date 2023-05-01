import { Size, Tone, Variant } from './types';

export const variantClass: Record<Variant, Record<Tone, String>> = {
  [Variant.solid]: {
    [Tone.primary]:
      'border border-transparent bg-green-500 text-white hover:bg-green-700 focus-visible:bg-green-700 focus-visible:outline-green-700',
  },
  [Variant.ghost]: {
    [Tone.primary]:
      'font-normal border text-green-500 hover:bg-green-500/10 hover:border-green-500 focus-visible:bg-green-500/10 focus-visible:text-green-500',
  },
};

export const sizeClass: Record<Size, String> = {
  [Size.xs]: 'font-semibold rounded leading-tight',
  [Size.xm2col]:
    'gap-3 justify-center pt-1.5 pb-1.5 pr-6 pl-2.5 w-full md:w-fit font-semibold rounded leading-tight',
  [Size.sm]: 'pt-1.5 pb-1.5 px-6 font-semibold rounded leading-tight',
  [Size.md]: 'pt-2.5 pb-3 px-9 font-semibold rounded leading-tight',
  [Size.md2col]:
    'gap-3 justify-center pt-2.5 pb-3 pr-6 pl-2.5 w-full md:w-fit font-semibold rounded leading-tight',
};
